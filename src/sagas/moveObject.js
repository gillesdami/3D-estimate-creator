import * as THREE from 'three';
import { getDetailsState, getSettingsState } from '../selectors';
import { put, select } from 'redux-saga/effects';
import { actionCreator, POSITION_CHANGED } from '../actions'


export default function* moveObject(scene, camera, renderer, orbitControls, action) {
    if (action.payload.event.buttons !== 1) return;

    const selectedObject = yield select(getDetailsState);
    if (!selectedObject.item) return;

    const selectedObject3D = scene.getObjectByName(selectedObject.item.uid);
    if (!selectedObject3D) return;

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const mouseProjection = new THREE.Vector3();

    mouse.x = (action.payload.event.layerX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(action.payload.event.layerY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const collisionBox = new THREE.Box3();
    collisionBox.setFromObject(selectedObject3D);

    const intersectObjectPoint = new THREE.Vector3();
    raycaster.ray.intersectBox(collisionBox, intersectObjectPoint);
    if (intersectObjectPoint.z === 0) return;

    //stop the camera
    orbitControls.enableRotate = false;

    raycaster.ray.intersectPlane(new THREE.Plane(camera.up), mouseProjection);

    const sizeGrid = yield select(getSettingsState);
    if (!sizeGrid) return;

    selectedObject3D.position.x = Math.max(-sizeGrid.sizeGrid / 2, Math.min(sizeGrid.sizeGrid / 2, mouseProjection.x));
    selectedObject3D.position.y = Math.max(-sizeGrid.sizeGrid / 2, Math.min(sizeGrid.sizeGrid / 2, mouseProjection.y));

    yield put(actionCreator(POSITION_CHANGED, {
        uid: selectedObject.item.uid,
        x: selectedObject3D.position.x,
        y: selectedObject3D.position.y
    }));
}