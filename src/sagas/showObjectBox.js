import * as THREE from 'three';
import {call, takeEvery, take} from 'redux-saga/effects';
import {APPAREL_CHANGED, POSITION_CHANGED, SHOW_DETAILS_PANEL_FROM_SCENE, SHOW_DETAILS_PANEL, HIDE_DETAILS_PANEL, ADDED_OBJECT_DISPLAYED} from '../actions';

class SelectedBoxHelper extends THREE.BoxHelper {
    constructor(object) {
        super(object, 0xff00ff);
    }
}

export default function* initShowObjectBox(scene) {
    yield takeEvery(SHOW_DETAILS_PANEL, showSelectedBoxHelper, scene);
    yield takeEvery(SHOW_DETAILS_PANEL_FROM_SCENE, showSelectedBoxHelper, scene);
    yield takeEvery(HIDE_DETAILS_PANEL, hideSelectedBoxHelper, scene);
    yield takeEvery(POSITION_CHANGED, updateSelectedBoxHelper, scene);
}

function* showSelectedBoxHelper(scene, action) {
    yield call(hideSelectedBoxHelper, scene);

    let object = scene.getObjectByName(action.payload.uid);

    if(!object) {
        //when called from SHOW_DETAILS_PANEL the object is not added to the scene yet
        yield take(ADDED_OBJECT_DISPLAYED);
        object = scene.getObjectByName(action.payload.uid);
    }
    
    scene.add(new SelectedBoxHelper(object));
}

function* hideSelectedBoxHelper(scene) {
    const helper = scene.children.find((o) => o instanceof SelectedBoxHelper);

    if(!helper) return;

    scene.remove(helper);
}

function* updateSelectedBoxHelper(scene) {
    const helper = scene.children.find((o) => o instanceof SelectedBoxHelper);

    if(!helper) return;

    helper.update();
}