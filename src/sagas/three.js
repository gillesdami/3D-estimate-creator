import * as THREE from 'three';
import {all, fork, put, takeEvery} from 'redux-saga/effects';
import OrbitControls from 'three-orbitcontrols';
import addObject from './addObject';
import {
    actionCreator,
    ADD_OBJECT_DISPLAYED,
    APPAREL_CHANGED,
    MOUSE_CLICK,
    RENDERER_CREATED,
    SET_RENDERER_SIZE,
    SETTING_CHANGED,
    DBCLICKED_CANVAS,
    SHOW_DETAILS_PANEL_FROM_SCENE,
    TOGGLE_CLICK_FROM_OBJECT
} from '../actions';

const cameraFrustum = 70;

export function* initThreeSaga() {
    const camera = new THREE.PerspectiveCamera(cameraFrustum, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.set(0, -10, 10);
    camera.up = new THREE.Vector3(0, 0, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    window.THREE = THREE;//debug
    window.scene = scene;//debug

    const axes = new THREE.AxesHelper(2);
    scene.add(axes);

    const gridHelper = new THREE.GridHelper(50, 50);
    gridHelper.rotateX(Math.PI / 2);
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xccccff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth * 0.65, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2.1;

    yield put(actionCreator(RENDERER_CREATED, renderer));
    yield fork(drawFrame, scene, camera, renderer);
    yield takeEvery(ADD_OBJECT_DISPLAYED, addObject, scene);
    yield takeEvery(SET_RENDERER_SIZE, setRendererSize);
    yield takeEvery(SETTING_CHANGED, compareSetting);
    yield takeEvery(APPAREL_CHANGED, compareApparel);
    yield takeEvery(MOUSE_CLICK, mouseClick, scene, camera, renderer);
    yield takeEvery(DBCLICKED_CANVAS, doubleClickSelection, camera, scene);
}

export function* drawFrame(scene, camera, renderer) {
    while (1) {
        yield new Promise((resolve) => requestAnimationFrame(resolve));
        renderer.render(scene, camera);
    }
}

export function* setRendererSize(action) {
    action.payload.renderer.setSize(action.payload.width, action.payload.height);
}

export function* mouseClick(scene, camera, renderer, action) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = (action.payload.event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (action.payload.event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true).filter(obj => obj.object instanceof THREE.Mesh);

    if (intersects.length > 0) {
        //Object before scene
        let objectToFind;
        intersects[0].object.traverseAncestors(obj => {
            if (obj.parent && obj.parent.type === 'Scene') objectToFind = obj;
        });

        console.log(objectToFind);

        yield put(actionCreator(SHOW_DETAILS_PANEL_FROM_SCENE, {uid: objectToFind.name,
            objectsDisplayed: action.payload.objectsDisplayed}));
    } else {
        yield put(actionCreator(TOGGLE_CLICK_FROM_OBJECT));
    }
}

export function* compareSetting(action) {

}

export function* compareApparel(action) {
    /*const {apparel, itemName} = action.payload;
    const objectsDisplayed = $select(objectsDisplayed);

    objectsDisplayed.forEach(obj => {
        if (obj.name === itemName) {
            obj.apparels.forEach(objApparel => {
                if (objApparel.type === apparel.type) {
                    if (objApparel.value != apparel.value) {

                    }
                }
            });
        }
    })*/
}

export function* doubleClickSelection(camera, scene) {
    console.log("welcome to saga doubleClickSelection");

    // //your object to be clicked
    // const object;
    //
    // //vector from camera to mouse
    // const vectorMouse = new THREE.Vector3(
    //     -(window.innerWidth / 2 - e.clientX) * 2 / window.innerWidth,
    //     (window.innerHeight / 2 - e.clientY) * 2 / window.innerHeight,
    //     -1 / Math.tan((cameraFrustum/2) * Math.PI / 180)
    // );
    //
    // vectorMouse.applyQuaternion(camera.quaternion);
    // vectorMouse.normalize();
    //
    // //vector from camera to object
    // const vectorObject = new THREE.Vector3(
    //     object.x - camera.position.x,
    //     object.y - camera.position.y,
    //     object.z - camera.position.z
    // );
    //
    // vectorObject.normalize();
    //
    // if (vectorMouse.angleTo(vectorObject) * 180 / Math.PI < 1) {
    //     //mouse's position is near object's position
    //     console.log("ohh you touch my tralala");
    // }

}