import * as THREE from 'three';
import { all, call, put, select } from 'redux-saga/effects';
import setBoxCenter from './util/setBoxCenter';
import { getSpansState } from '../selectors';
import { updateSelectedBoxHelper } from './showObjectBox';

import loadModel from './util/colladaLoader';
import {
    actionCreator,
    DELETE_LAST_SPAN_ADDED,
    DELETE_SPAN,
    LAST_SPAN_ADDED,
    OBJECT_DISPLAYED_LOADING ,
    OBJECT_DISPLAYED_LOADED
} from "../actions";
import { addAppareal } from "./addObject";

export function* addSpan(scene, action) {

    yield put(actionCreator(OBJECT_DISPLAYED_LOADING));

    const generateUid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

    const {uid, itemName, item, uidSpan} = action.payload;

    const base = scene.getObjectByName(uid);

    // Pour avoir le spansNumber et mettre les travées a la bonne distance
    const spanState = yield select(getSpansState);
    const currentSpan = spanState.filter(span => span.uid === uid);

    let sizeSpan = 3;
    if(itemName.includes("5m")) sizeSpan = 5;
    // Position de la tente mere + le nombre de travees * 3m + la future travees
    // TODO Le 25 a changer quand on mettra une taille dynamique de la grille
    if (base.position.x + sizeSpan * currentSpan[0].spansNumber + 3 > 25) {
        alert("La travée va sortir de la grille, impossible de l'ajouter");

        yield put(actionCreator(DELETE_SPAN, {
            uid: item.uid,
            itemName: itemName,
            item: item,
            shouldIDeleteIt: false
        }));

        yield put(actionCreator(OBJECT_DISPLAYED_LOADED));

        return null;
    }

    const baseToAdd = yield call(loadModel, itemName, itemName);
    if(uidSpan) {
        baseToAdd.name = uidSpan;
    } else baseToAdd.name = generateUid();
    baseToAdd.position.set((sizeSpan * currentSpan[0].spansNumber), 0, 0); // y:0 et z:0 car placement par rapport a la tente mere
    base.add(baseToAdd);

    // Delete rideaux et structure pignon pour les remettre mieux après
    deleteSomething(base, "Rideau Largeur");
    deleteSomething(base, "Rideau Largeur Start");
    deleteSomething(base, "Structure pignon");
    deleteSomething(base, "Structure pignon Start");
    deleteSomething(base, "Pignon");
    deleteSomething(base, "Pignon Start");

    const calls = {};

    item.apparels.forEach((appareal) => {
        // Cas général
        if(appareal.type !== "Renforcement")
            calls[appareal.type] = call(addApparealSpan, scene, itemName, baseToAdd, appareal.type, appareal.value || appareal.values[0].name, item.settings);

        // Pour gestion des elements "start"
        if (appareal.type === "Rideau Largeur")
            calls["Rideau Largeur Start"] = call(addApparealSpan, scene, itemName, base, "Rideau Largeur Start", appareal.value || appareal.values[0].name, item.settings);
        if (appareal.type === "Pignon")
            calls["Pignon Start"] = call(addApparealSpan, scene, itemName, base, "Pignon Start", appareal.value || appareal.values[0].name, item.settings);
        if(appareal.type === "Renforcement" && currentSpan[0].spansNumber % 3 === 0)
            calls[appareal.type] = call(addApparealSpan, scene, itemName, baseToAdd, appareal.type, appareal.value || appareal.values[0].name, item.settings);
        if(appareal.type === "Structure pignon")
            calls["Structure pignon Start"] = call(addApparealSpan, scene, itemName, base, "Structure pignon Start", appareal.value || appareal.values[0].name, item.settings);
    });

    yield all(calls);

    yield put(actionCreator(LAST_SPAN_ADDED, {
        uid: uid,
        lastSpansAdded: baseToAdd.name
    }));

    yield call(updateSelectedBoxHelper, scene);

    yield put(actionCreator(OBJECT_DISPLAYED_LOADED));


    console.log(base);

    return base;
}

function deleteSomething (base, name) {
    let apparelToDelete = base.getObjectByName(name);
    while (apparelToDelete != null) {
        apparelToDelete.parent.remove(apparelToDelete);
        apparelToDelete = base.getObjectByName(name);
    }
}

export function* addApparealSpan(scene, itemName, parentObj, apparealType, apparealValue, settings) {
    if (apparealValue.name === "aucun") return null;

    const obj = new THREE.Group();
    const parentBox = parentObj.userData.bb;
    const model = yield call(loadModel, itemName, apparealValue.name);
    let bb;

    model.name = apparealType;

    let hight = 2.2;
    if(itemName.includes("5m")) hight = 2.9;


    switch (apparealType) {
        case "Pignon Start" :
            model.rotateZ(Math.PI);
            model.position.set(((parentBox.min.x - parentBox.max.x) / 2) - 0.05, 0, hight);
            break;
        case "Pignon":
            model.position.set(((parentBox.max.x - parentBox.min.x) / 2) + 0.05, 0, hight);
            break;
        case "Renforcement" :
            let z = 0;
            if(apparealValue.name.includes("renforcement")) z = 1;

            model.position.set(0, (parentBox.max.y - parentBox.min.y) / 2, z);

            let renf = model.clone();
            renf.rotateZ(Math.PI);
            renf.position.set(0, (parentBox.min.y - parentBox.max.y) / 2, z);
            obj.add(renf);
            break;
        case "Structure pignon Start" :
            model.position.set((parentBox.min.x - parentBox.max.x) / 2, 0, 0);
            break;
        case "Structure pignon":
            model.rotateZ(Math.PI);
            model.position.set((parentBox.max.x - parentBox.min.x) / 2, 0, 0);
            break;
        case "Toit pagode":
            model.position.set(0, 0,
                settings.find((e) => e.type === "hmin" && e.value['Toit pagode']).value['Toit pagode']);
            break;
        case "Toit travee":
            model.position.set(0, 0, parentBox.max.z - 1.03);
            break;
        case "Plancher":
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
        case "Rideau Largeur Start":
            bb = model.userData.bb;
            model.traverse((o) => {
                if (o.material) o.material.side = THREE.DoubleSide;
            });
            model.position.set((parentBox.min.x - parentBox.max.x) / 2, 0, 0);
            break;
        case "Rideau Largeur":
            bb = model.userData.bb;
            model.traverse((o) => {
                if (o.material) o.material.side = THREE.DoubleSide;
            });
            model.position.set((parentBox.max.x - parentBox.min.x) / 2, 0, 0);
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

export function* deleteSpan(scene, action) {

    yield put(actionCreator(OBJECT_DISPLAYED_LOADING));

    const {uid, itemName, item, shouldIDeleteIt} = action.payload;

    // Si on ajoute une travee mais qu'elle sort de la grille cette saga est quand meme appellee
    if (!shouldIDeleteIt) return null;

    const base = scene.getObjectByName(uid);

    const spanState = yield select(getSpansState);

    const currentSpanItem = spanState.filter(span => span.uid === uid);
    const itemSpans = currentSpanItem[0].lastSpansAdded;

    let spanToDelete = base.getObjectByName(itemSpans[itemSpans.length - 1]);
    const uidToDelete = spanToDelete.name;

    if (spanToDelete) {
        spanToDelete.parent.remove(spanToDelete);

        // Pour placer le rideau lageur / Pignon / Structure pignon de la fin, on l'ajoute a l'avant dernière travées (celle qui deviendra la dernière après que la dernière soit delete)
        const calls = {};
        item.apparels.forEach((appareal) => {
            if (appareal.type === "Rideau Largeur" || appareal.type === "Pignon" ||appareal.type === "Structure pignon") {
                if (itemSpans.length === 1) {
                    calls[appareal.type] = call(addApparealSpan, scene, itemName, base, appareal.type, appareal.value || appareal.values[0].name, item.settings);
                } else
                    calls[appareal.type] = call(addApparealSpan, scene, itemName, base.getObjectByName(itemSpans[itemSpans.length - 2]), appareal.type, appareal.value || appareal.values[0].name, item.settings);
            }
        });

        yield all(calls);

        yield put(actionCreator(DELETE_LAST_SPAN_ADDED, {
            uid: uid,
            uidToDelete
        }));
    }

    yield call(updateSelectedBoxHelper, scene);

    yield put(actionCreator(OBJECT_DISPLAYED_LOADED));

}