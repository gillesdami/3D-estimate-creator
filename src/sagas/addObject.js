import * as THREE from 'three';
import { all, call, put, select } from 'redux-saga/effects';
import { getSpansState, objectsDisplayed } from '../selectors';

import loadModel from './util/colladaLoader';
import setBoxCenter from './util/setBoxCenter';
import { actionCreator, ADDED_OBJECT_DISPLAYED, OBJECT_DISPLAYED_LOADING, RESET_NUMBER_SPANS, ADD_SPAN_NUMBER } from '../actions';
import { addSpan } from "./handleSpan";

export function* reloadObjects(scene) {
    const objectsFromStore = yield select(objectsDisplayed);

    yield put(actionCreator(RESET_NUMBER_SPANS));

    const spanFromStore = yield select(getSpansState);

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

        if (objD.position) base.position.set(objD.position.x, objD.position.y, base.position.z);
    }

    if (spanFromStore) {

        for (const span of spanFromStore) {
            const item = objectsFromStore.filter(i => i.uid === span.uid)[0];

            for (const s of span.lastSpansAdded) {
                yield put(actionCreator(ADD_SPAN_NUMBER, {
                    uid: span.uid,
                    itemName: span.itemName,
                    item,
                    uidSpan: s
                }));

                yield call(addSpan, scene,
                    {
                        payload: {
                            uid: span.uid,
                            itemName: span.itemName,
                            item,
                            uidSpan: s
                        }
                    }
                );
            }
        }
    }
}

export function* addObject(scene, action) {

    yield put(actionCreator(OBJECT_DISPLAYED_LOADING));

    const {itemName, item, uid} = action.payload;

    const base = yield call(loadModel, itemName, itemName);
    base.name = uid;
    scene.add(base);

    const calls = {};

    item.apparels.forEach((appareal) => {
        calls[appareal.type] = call(addAppareal, scene, itemName, base, appareal.type, appareal.value || appareal.values[0].name, item.settings); // TODO appareal.value to understand apareal.values[0] changed to apareal.values[0].name
    });

    yield all(calls);
    yield put(actionCreator(ADDED_OBJECT_DISPLAYED));

    return base;
}

export function* addAppareal(scene, itemName, parentObj, apparealType, apparealValue, settings) {
    if (apparealValue.name === "aucun") return null;

    const obj = new THREE.Group();
    const parentBox = parentObj.userData.bb;
    const model = yield call(loadModel, itemName, apparealValue.name);
    let bb;

    model.name = apparealType;

    console.log(parentObj);

    switch (apparealType) {
        case "Pignon":
            let hight = 2.2;
            if(itemName.includes("5m")) hight = 2.9;

            model.position.set(((parentBox.max.x - parentBox.min.x) / 2) + 0.05, 0, hight);

            let pignon = model.clone();
            pignon.rotateZ(Math.PI);
            pignon.position.set(((parentBox.min.x - parentBox.max.x) / 2) - 0.05, 0, hight);
            obj.add(pignon);
            break;
        case "Renforcement" :
            let z = 0;
            if (apparealValue.name.includes("renforcement")) z = 1;

            model.position.set(0, (parentBox.max.y - parentBox.min.y) / 2, z);

            let renf = model.clone();
            renf.rotateZ(Math.PI);
            renf.position.set(0, (parentBox.min.y - parentBox.max.y) / 2, z);
            obj.add(renf);
            break;
        case "Structure pignon":
            model.position.set((parentBox.max.x - parentBox.min.x) / 2, 0, 0);

            let struct = model.clone();
            struct.rotateZ(Math.PI);
            struct.position.set((parentBox.min.x - parentBox.max.x) / 2, 0, 0);
            obj.add(struct);
            break;
        case "Toit pagode":
            let zSet = settings.find((e) => e.type === "hmin" && e.value['Toit pagode']);
            model.position.set(0, 0, zSet ? zSet.value['Toit pagode'] : parentBox.max.z);
            break;
        case "Toit travee":
            const zSet2 = settings.find((e) => e.type === "hmin" && e.value['Toit travee']);
            model.position.set(0, 0, zSet2 ? zSet2.value['Toit travee'] : parentBox.max.z - 1.03);
            break;
        case "Plancher":
            break;
        case "Rideau":
            bb = model.userData.bb;
            model.traverse((o) => {
                if (o.material) o.material.side = THREE.DoubleSide;
            });
            if (itemName.includes("Tente de reception"))
                model.rotateZ(Math.PI / 2);
            model.position.set((parentBox.min.x - parentBox.max.x) / 2, 0, 0);

            let rideau = model.clone();
            rideau.rotateZ(Math.PI / 2);
            rideau.position.set(0, (parentBox.min.y - parentBox.max.y) / 2, 0);
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI / 2);
            rideau.position.set((parentBox.max.x - parentBox.min.x) / 2, 0, 0);
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI / 2);
            rideau.position.set(0, (parentBox.max.y - parentBox.min.y) / 2, 0);
            obj.add(rideau);
            break;
        case "Rideau Longueur":
            bb = model.userData.bb;
            model.traverse((o) => {
                if (o.material) o.material.side = THREE.DoubleSide;
            });
            model.position.set(0, (parentBox.min.y - parentBox.max.y) / 2, 0);

            let rideauLongueur = model.clone();
            rideauLongueur.rotateZ(Math.PI);
            rideauLongueur.position.set(0, (parentBox.max.y - parentBox.min.y) / 2, 0);
            obj.add(rideauLongueur);
            break;
        case "Rideau Largeur":
            bb = model.userData.bb;
            model.traverse((o) => {
                if (o.material) o.material.side = THREE.DoubleSide;
            });
            model.position.set((parentBox.min.x - parentBox.max.x) / 2, 0, 0);

            let rideauLargeur = model.clone();
            rideauLargeur.rotateZ(Math.PI);
            rideauLargeur.position.set((parentBox.max.x - parentBox.min.x) / 2, 0, 0);
            obj.add(rideauLargeur);
            break;
        case "Lestage":
            bb = model.userData.bb;
            model.position.set((parentBox.min.x - parentBox.max.x) / 2 - .5, (parentBox.min.y - parentBox.max.y) / 2 - .5, 0);

            let lestage = model.clone();
            lestage.position.set((parentBox.max.x - parentBox.min.x) / 2 + .5, (parentBox.min.y - parentBox.max.y) / 2 - .5, 0);
            obj.add(lestage);

            lestage = lestage.clone();
            lestage.position.set((parentBox.max.x - parentBox.min.x) / 2 + .5, (parentBox.max.y - parentBox.min.y) / 2 + .5, 0);
            obj.add(lestage);

            lestage = lestage.clone();
            lestage.position.set((parentBox.min.x - parentBox.max.x) / 2 - .5, (parentBox.max.y - parentBox.min.y) / 2 + .5, 0);
            obj.add(lestage);
            break;
        default:
            yield call(setBoxCenter, obj, obj);
    }

    obj.add(model);
    parentObj.add(obj);
}