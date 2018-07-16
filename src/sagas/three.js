import * as THREE from 'three';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import OrbitControls from 'three-orbitcontrols';
import { addAppareal, addObject, reloadObjects } from './addObject';
import {
    actionCreator,
    ADD_OBJECT_DISPLAYED,
    ADDED_OBJECT_DISPLAYED,
    APPAREL_CHANGED,
    DBCLICKED_CANVAS,
    DELETE_OBJECT_DISPLAYED,
    HIDE_DETAILS_PANEL,
    MOUSE_CLICK,
    MOUSE_MOVE,
    MOUSE_UP,
    OBJECT_DISPLAYED_LOADED,
    RENDERER_CREATED,
    SEND_ESTIMATION,
    SET_RENDERER_SIZE,
    SETTING_CHANGED,
    SHOW_DETAILS_PANEL_FROM_SCENE,
    TOGGLE_CLICK_FROM_OBJECT
} from '../actions';
import moveObject from './moveObject';
import initShowObjectBox from './showObjectBox';

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
    scene.add(grassMesh);

    const axes = new THREE.AxesHelper(2);
    scene.add(axes);

    const gridHelper = new THREE.GridHelper(50, 50);
    gridHelper.rotateX(Math.PI / 2);
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
    yield takeEvery(ADDED_OBJECT_DISPLAYED, objectLoaded);
    yield takeEvery(SEND_ESTIMATION, sendEstimation);
    yield call(reloadObjects, scene);
    yield fork(initShowObjectBox, scene);
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

export function* objectLoaded() {
    yield put(actionCreator(OBJECT_DISPLAYED_LOADED));
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
    if (action.payload != null) {

    }
}

export function* compareApparel(scene, action) {
    if (action.payload != null) {
        const {apparel, itemName, uid, settings} = action.payload;
        const object = scene.getObjectByName(uid);


        let apparelToDelete = scene.getObjectByName(uid).getObjectByName(apparel.type);
        while (apparelToDelete != null) {
            apparelToDelete.parent.remove(apparelToDelete);
            apparelToDelete = scene.getObjectByName(uid).getObjectByName(apparel.type);
        }

        yield call(addAppareal, scene, itemName, object, apparel.type, apparel.value, settings);
    }
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

export function* sendEstimation(action) {

    let detailContent = "";

    action.payload.objects.forEach(obj => {
        detailContent += obj.name + "\t (qte : " + obj.qte + ")\n" +
            obj.apparels.map(ap => {
                return "\t" + ap.value + "\n";
            }) + "\n\n";
    });

    const content = "Bonjour l'équipe ATAWA !\n\n" +
        "Je souhaiterai avoir une estimation du prix de mon panier :\n" +
        +detailContent + "\n\n" +
        "Bonne journée.\n\n" +
        "Cordialement,\n\n" +
        action.payload.firstname + " " + action.payload.lastname;

    postRequest('https://api.sendinblue.com/v2.0',
        {
            'to': "alex.vacheret@free.fr", //admin@atawa.com
            'from': action.payload.email,
            'subject': "Demande d'estimation - " + action.payload.firstname + " " + action.payload.firstname,
            'html': content
        })
        .then(data => console.log(data))
}

function postRequest(url, data) {
    return fetch(url, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: data, // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            'Content-type' : 'text/html',
            'api-key': ''
        }),
    })
        .then(response => console.log(response))
        .catch(error => console.error(error))
}