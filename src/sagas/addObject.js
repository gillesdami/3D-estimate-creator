import * as THREE from 'three';
import { all, call, select } from 'redux-saga/effects';
import { objectsDisplayed } from '../selectors';

import loadModel from './util/colladaLoader';
import setBoxCenter from './util/setBoxCenter';

export function* reloadObjects(scene) {
    const objectsFromStore = yield select(objectsDisplayed);

    for (const objD of objectsFromStore) {
        const base = yield call(
            addObject, 
            scene, 
            {
                payload: {
                    itemName: objD.name,
                    item: objD,
                    uid: objD.uid
                }
            });

        if(objD.position) base.position.set(objD.position.x, objD.position.y, base.position.z);
    }
}

export function* addObject(scene, action) {
    const {itemName, item, uid} = action.payload;

    const base = yield call(loadModel, itemName, itemName);
    base.name = uid;
    scene.add(base);

    const calls = {};

    item.apparels.forEach((appareal) => {
        calls[appareal.type] = call(addAppareal, scene, itemName, base, appareal.type, appareal.value || appareal.values[0]);
    });

    yield all(calls);

    return base;
}

export function* addAppareal(scene, itemName, parentObj, apparealType, apparealValue) {
    if (apparealValue === "aucun") return null;

    const obj = new THREE.Group();
    const parentBox = parentObj.userData.bb;
    const model = yield call(loadModel, itemName, apparealValue);
    let bb;

    model.name = apparealType;

    switch (apparealType) {
        case "Pignon":
            model.position.set(2.45, 0, parentBox.max.z - 1);
            break;
        case "Croix de saint andre":
            model.position.set(0, 5.1, parentBox.max.z - 3.40);

            let copy = model.clone();
            copy.rotateZ(Math.PI);
            copy.position.set(0, -5.1, parentBox.max.z - 3.40);

            obj.add(copy);
            break;
        case "Barre de pignon":
            model.position.set(2.45, 0, parentBox.max.z - 2.48);
            break;
        case "Toit pagode":
            model.position.set(0, 0, 2.56);
            break;
        case "Toit travee":
            model.position.set(0, 0, parentBox.max.z - 1.03);
            break;
        case "Plancher":
            break;
        case "Rideau":
            bb = model.userData.bb;
            model.traverse((o) => {if(o.material) o.material.side = THREE.DoubleSide;});
            if(itemName.includes("Tente de reception"))
                model.rotateZ(Math.PI / 2);
            model.position.set((parentBox.min.x - parentBox.max.x)/2, 0, 0);

            let rideau = model.clone();
            rideau.rotateZ(Math.PI/2);
            rideau.position.set(0, (parentBox.min.y - parentBox.max.y)/2, 0);
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI/2);
            rideau.position.set((parentBox.max.x - parentBox.min.x)/2, 0, 0);
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI/2);
            rideau.position.set(0, (parentBox.max.y - parentBox.min.y)/2, 0);
            obj.add(rideau);
            break;
        case "Lestage":
            bb = model.userData.bb;
            model.position.set((parentBox.min.x - parentBox.max.x)/2 - .5, (parentBox.min.y - parentBox.max.y)/2 - .5, 0);

            let lestage = model.clone();
            lestage.position.set((parentBox.max.x - parentBox.min.x)/2 + .5, (parentBox.min.y - parentBox.max.y)/2 - .5, 0);
            obj.add(lestage);

            lestage = lestage.clone();
            lestage.position.set((parentBox.max.x - parentBox.min.x)/2 + .5, (parentBox.max.y - parentBox.min.y)/2 + .5, 0);
            obj.add(lestage);

            lestage = lestage.clone();
            lestage.position.set((parentBox.min.x - parentBox.max.x)/2 - .5, (parentBox.max.y - parentBox.min.y)/2 + .5, 0);
            obj.add(lestage);
            break;
        default:
            yield call(setBoxCenter, obj, obj);
    }
    
    obj.add(model);
    parentObj.add(obj);
}