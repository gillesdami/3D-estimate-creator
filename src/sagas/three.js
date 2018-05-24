import * as THREE from 'three';
import {call, fork, put, takeEvery, select} from 'redux-saga/effects';
import OrbitControls from 'three-orbitcontrols';
import {addAppareal, addObject, reloadObjects} from './addObject';
import { getSettingsState } from '../selectors';
import {
    actionCreator,
    ADD_OBJECT_DISPLAYED,
    APPAREL_CHANGED,
    DBCLICKED_CANVAS, DELETE_OBJECT_DISPLAYED, DISPLAY_GRID, HIDE_DETAILS_PANEL,
    MOUSE_CLICK,
    MOUSE_MOVE,
    MOUSE_UP,
    RENDERER_CREATED,
    SET_RENDERER_SIZE,
    SETTING_CHANGED,
    SHOW_DETAILS_PANEL_FROM_SCENE,
    TOGGLE_CLICK_FROM_OBJECT,
    RESIZE_GRID
} from '../actions';
import moveObject from './moveObject';

const cameraFrustum = 70;

export function* initThreeSaga() {
    const camera = new THREE.PerspectiveCamera(cameraFrustum, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.set(0, -15, 15);
    camera.up = new THREE.Vector3(0, 0, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    window.THREE = THREE;//debug
    window.scene = scene;//debug

    const grassGeometry = new THREE.BoxGeometry(50, 50, 0);
    const grassMaterial = new THREE.MeshBasicMaterial({color: 0x008000});
    const grassMesh = new THREE.Mesh(grassGeometry, grassMaterial);
    grassMesh.position.z = -0.51;
    grassMesh.userData.unclickable = true;
    grassMesh.name = "grassMesh";
    scene.add(grassMesh);

    const axes = new THREE.AxesHelper(2);
    axes.name = "axes";
    scene.add(axes);

    const gridHelper = new THREE.GridHelper(50, 50);
    gridHelper.rotateX(Math.PI / 2);
    gridHelper.name = "gridHelper";
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.position.set(4, -10, 10);
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth * 0.65, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2.1;

    yield put(actionCreator(RENDERER_CREATED, renderer));
    yield fork(drawFrame, scene, camera, renderer);
    yield takeEvery(ADD_OBJECT_DISPLAYED, addObject, scene);
    yield takeEvery(SET_RENDERER_SIZE, setRendererSize);
    yield takeEvery(SETTING_CHANGED, compareSetting, scene);
    yield takeEvery(APPAREL_CHANGED, compareApparel, scene);
    yield takeEvery(MOUSE_CLICK, mouseClick, scene, camera, renderer);
    yield takeEvery(DBCLICKED_CANVAS, doubleClickSelection, camera, scene);
    yield takeEvery(MOUSE_MOVE, moveObject, scene, camera, renderer, controls);
    yield takeEvery(MOUSE_UP, reactivateControls, controls);
    yield takeEvery(DELETE_OBJECT_DISPLAYED, deleteObjectFromScene, scene);
    yield takeEvery(DISPLAY_GRID, displayGrid, scene);
    yield takeEvery(RESIZE_GRID, resizeGrid, scene);
    yield call(reloadObjects, scene)
}

export function* reactivateControls(controls) {
    controls.enableRotate = true;
}

export function* deleteObjectFromScene(scene, action) {
    const objectToDelete = scene.getObjectByName(action.payload.uid);

    if (objectToDelete) {
        objectToDelete.parent.remove(objectToDelete);
    }

    yield put(actionCreator(HIDE_DETAILS_PANEL));
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
    
    mouse.x = (action.payload.event.layerX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(action.payload.event.layerY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true).filter(obj => obj.object instanceof THREE.Mesh && !obj.object.userData.unclickable);

    if (intersects.length > 0) {
        //Object before scene
        let objectToFind;
        intersects[0].object.traverseAncestors(obj => {
            if (obj.parent && obj.parent.type === 'Scene') objectToFind = obj;
        });

        yield put(actionCreator(SHOW_DETAILS_PANEL_FROM_SCENE, {
            uid: objectToFind.name,
            objectsDisplayed: action.payload.objectsDisplayed
        }));
    } else {
        yield put(actionCreator(TOGGLE_CLICK_FROM_OBJECT));
    }
}

export function* compareSetting(scene, action) {
    if(action.payload != null) {

    }
}

export function* compareApparel(scene, action) {
    if (action.payload != null) {
        const {apparel, itemName, uid} = action.payload;
        const object = scene.getObjectByName(uid);


        let apparelToDelete = scene.getObjectByName(uid).getObjectByName(apparel.type);
        while(apparelToDelete != null) {
            apparelToDelete.parent.remove(apparelToDelete);
            apparelToDelete = scene.getObjectByName(uid).getObjectByName(apparel.type);
        }

        yield call(addAppareal, scene, itemName, object, apparel.type, apparel.value);
    }
}

export function* displayGrid(scene, action) {
    if(action.payload.displayGrid) {
        const axes = new THREE.AxesHelper(2);
        axes.name = "axes";
        scene.add(axes);

        const sizeGrid = yield select(getSettingsState);
        if (!sizeGrid) return;

        const newGridHelper = new THREE.GridHelper(sizeGrid.sizeGrid, sizeGrid.sizeGrid);
        newGridHelper.rotateX(Math.PI / 2);
        newGridHelper.name = "gridHelper";
        scene.add(newGridHelper);
    } else {
        scene.remove(scene.getObjectByName("axes"));
        scene.remove(scene.getObjectByName("gridHelper"));
    }
}

export function* resizeGrid(scene, action) {
    scene.remove(scene.getObjectByName("gridHelper"));
    scene.remove(scene.getObjectByName("grassMesh"));

    const newGridHelper = new THREE.GridHelper(action.payload.sizeGrid, action.payload.sizeGrid);
    newGridHelper.rotateX(Math.PI / 2);
    newGridHelper.name = "gridHelper";
    scene.add(newGridHelper);

    const grassGeometry = new THREE.BoxGeometry(action.payload.sizeGrid, action.payload.sizeGrid, 0);
    const grassMaterial = new THREE.MeshBasicMaterial({color: 0x008000});
    const grassMesh = new THREE.Mesh(grassGeometry, grassMaterial);
    grassMesh.position.z = -0.51;
    grassMesh.userData.unclickable = true;
    grassMesh.name = "grassMesh";
    scene.add(grassMesh);
}

export function* doubleClickSelection(camera, scene, renderer, action) {
    /*console.log("welcome to saga doubleClickSelection");

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = (action.payload.event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(action.payload.event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log("touched me");
    console.log(scene.children);
    console.log(intersects);*/
    // intersects[ 0 ].object.material.color.set( 0xff0000 );

}