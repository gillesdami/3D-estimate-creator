import * as THREE from 'three';
import { all, call, select } from 'redux-saga/effects';
import { objectsDisplayed } from '../selectors';

import loadModel from './util/colladaLoader';
import setBoxCenter from './util/setBoxCenter';

export function* reloadObjects(scene) {
    const objectsFromStore = yield select(objectsDisplayed);

    for (const objD of objectsFromStore) {
        const obj = new THREE.Group();
        const base = yield call(loadModel, objD.name, objD.name);
        obj.name = objD.uid;

        const bb = new THREE.Box3();
        bb.setFromObject(base);
        yield call(setBoxCenter, scene, base, new THREE.Vector3(0, 0, (bb.max.z - bb.min.z) / 2));

        obj.add(base);
        scene.add(obj);

        const calls = {};

        objD.apparels.forEach((appareal) => {
            calls[appareal.type] = call(addAppareal, scene, objD.name, base, appareal.type, appareal.value || appareal.values[0]);
        });

        const apparealsIds = yield all(calls);
    }
}

export function* addObject(scene, action) {
    const {itemName, item, uid} = action.payload;

    const obj = new THREE.Group();
    const base = yield call(loadModel, itemName, itemName);
    obj.name = uid;

    const bb = new THREE.Box3();
    bb.setFromObject(base);
    yield call(setBoxCenter, scene, base, new THREE.Vector3(0, 0, (bb.max.z - bb.min.z) / 2));

    obj.add(base);
    scene.add(obj);

    const calls = {};

    item.apparels.forEach((appareal) => {
        calls[appareal.type] = call(addAppareal, scene, itemName, base, appareal.type, appareal.value || appareal.values[0]);
    });

    const apparealsIds = yield all(calls);
}

export function* addAppareal(scene, itemName, parentObj, apparealType, apparealValue) {
    if (apparealValue === "aucun") return null;

    let obj = new THREE.Group(),
        parentBox = new THREE.Box3(),
        bb = new THREE.Box3();

    parentBox = parentBox.setFromObject(parentObj);

    switch (apparealType) {
        case "Pignon":
            let pignon = yield call(loadModel, itemName, apparealValue);
            pignon.name = "Pignon";
            yield call(setBoxCenter, obj, pignon, new THREE.Vector3(2.45, 0, parentBox.max.z - 1));

            obj.add(pignon);
            break;

        case "Croix de saint andre":
            let croixDeSaintAndre = yield call(loadModel, itemName, apparealValue);
            croixDeSaintAndre.name = "Croix de saint andre";
            yield call(setBoxCenter, obj, croixDeSaintAndre,new THREE.Vector3(0, 5.1, parentBox.max.z - 3.40));
            obj.add(croixDeSaintAndre);

            croixDeSaintAndre = croixDeSaintAndre.clone();
            croixDeSaintAndre.rotateZ(Math.PI);
            yield call(setBoxCenter, obj, croixDeSaintAndre,new THREE.Vector3(0, -5.1, parentBox.max.z - 3.40));
            obj.add(croixDeSaintAndre);

            break;

        case "Barre de pignon":
            let barreDePignon =  yield call(loadModel, itemName, apparealValue);
            barreDePignon.name = "Barre de pignon";
            yield call(setBoxCenter, obj, barreDePignon, new THREE.Vector3(2.45, 0, parentBox.max.z - 2.48));

            obj.add(barreDePignon);
            break;

        case "Toit pagode":
            let toitPagode = yield call(loadModel, itemName, apparealValue);
            toitPagode.name = "Toit pagode";
            yield call(setBoxCenter, obj, toitPagode, new THREE.Vector3(0, 0, -.75 + parentBox.max.z));

            obj.add(toitPagode);
            break;

        case "Toit travee":
            let toitTravee = yield call(loadModel, itemName, apparealValue);
            toitTravee.name = "Toit travee";
            yield call(setBoxCenter, obj, toitTravee, new THREE.Vector3(0, 0, parentBox.max.z - 1.03));

            obj.add(toitTravee);
            break;

        case "Plancher":
            let plancher = yield call(loadModel, itemName, apparealValue);
            plancher.name = "Plancher";
            yield call(setBoxCenter, obj, plancher);

            obj.add(plancher);
            break;

        case "Rideau":
            let rideau = yield call(loadModel, itemName, apparealValue);
            rideau.name = "Rideau";
            bb.setFromObject(rideau);
            rideau.traverse((o) => {if(o.material) o.material.side = THREE.DoubleSide;});

            yield call(setBoxCenter, obj, rideau, new THREE.Vector3(parentBox.min.x, 0, ((bb.max.z - bb.min.z)/2) + .1));
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI/2);
            yield call(setBoxCenter, obj, rideau, new THREE.Vector3(0, parentBox.min.y, ((bb.max.z - bb.min.z)/2) + .1));
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI/2);
            yield call(setBoxCenter, obj, rideau, new THREE.Vector3(parentBox.max.x, 0, ((bb.max.z - bb.min.z)/2) + .1));
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI/2);
            yield call(setBoxCenter, obj, rideau, new THREE.Vector3(0, parentBox.max.y, ((bb.max.z - bb.min.z)/2) + .1));
            obj.add(rideau);
            break;

        case "Lestage":
            let lestage = yield call(loadModel, itemName, apparealValue);
            lestage.name = "Lestage";
            bb = new THREE.Box3();
            bb.setFromObject(lestage);

            yield call(setBoxCenter, obj, lestage, new THREE.Vector3(parentBox.min.x - .5, parentBox.min.y - .5, (bb.max.z - bb.min.z)/2));
            obj.add(lestage);

            lestage = lestage.clone();
            yield call(setBoxCenter, obj, lestage, new THREE.Vector3(parentBox.max.x + .5, parentBox.max.y + .5, (bb.max.z - bb.min.z)/2));
            obj.add(lestage);

            lestage = lestage.clone();
            yield call(setBoxCenter, obj, lestage, new THREE.Vector3(parentBox.min.x - .5, parentBox.max.y + .5, (bb.max.z - bb.min.z)/2));
            obj.add(lestage);

            lestage = lestage.clone();
            yield call(setBoxCenter, obj, lestage, new THREE.Vector3(parentBox.max.x + .5, parentBox.min.y - .5, (bb.max.z - bb.min.z)/2));
            obj.add(lestage);
            break;
        default:
            yield call(setBoxCenter, obj, obj);
    }

    obj.applyMatrix(new THREE.Matrix4().getInverse(parentObj.matrixWorld));
    parentObj.add(obj);

    obj.position.x += parentObj.position.x;
    obj.position.y += parentObj.position.y;

    return obj.id;
}