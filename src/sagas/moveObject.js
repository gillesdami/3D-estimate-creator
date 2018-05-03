import * as THREE from 'three';
import { getDetailsState } from '../selectors';
import { select } from 'redux-saga/effects';

export default function* moveObject(scene, camera, renderer, orbitControls, action) {
    if(action.payload.event.buttons !== 1) return;
    
    const selectedObject = yield select(getDetailsState);
    if(!selectedObject.item) return;

    const selectedObject3D = scene.getObjectByName(selectedObject.item.uid);
    if(!selectedObject3D) return;

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const mouseProjection = new THREE.Vector3();

    mouse.x = (action.payload.event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (action.payload.event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const collisionBox = new THREE.Box3();
    collisionBox.setFromObject(selectedObject3D);

    const intersectObjectPoint = new THREE.Vector3();
    raycaster.ray.intersectBox(collisionBox, intersectObjectPoint);
    if(intersectObjectPoint.z === 0) return;
    
    //stop the camera
    orbitControls.enableRotate = false;

    raycaster.ray.intersectPlane(new THREE.Plane(camera.up), mouseProjection);

    selectedObject3D.position.x = Math.max(-25, Math.min(25, mouseProjection.x));
    selectedObject3D.position.y = Math.max(-25, Math.min(25, mouseProjection.y));
}