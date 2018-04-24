import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import ColladaLoader from 'three-collada-loader';
import {call, fork, put, takeEvery} from 'redux-saga/effects';
import {
    actionCreator,
    ADD_3D_OBJECT,
    ADD_OBJECT_DISPLAYED,
    MOUSE_MOVE,
    RENDERER_CREATED,
    SET_RENDERER_SIZE
} from '../actions';

export function* initThreeSaga() {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.y = -10;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
	const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

	const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*0.65, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    yield put(actionCreator(RENDERER_CREATED, renderer));
    yield fork(drawFrame, scene, camera, renderer);
    yield takeEvery(ADD_OBJECT_DISPLAYED, addObject, scene);
    yield takeEvery(SET_RENDERER_SIZE, setRendererSize);
    yield takeEvery(MOUSE_MOVE, setRendererSize);
}

export function* drawFrame(scene, camera, renderer) {
    while(1) {
        yield new Promise((resolve) => requestAnimationFrame(resolve));
        renderer.render( scene, camera );
    }
}

export function* addObject(scene, action) {
    const {itemName, item} = action.payload;

    const mesh = yield call(loadModel, itemName, itemName);
    scene.add(mesh);

    //center the mesh on vec0
    const bb = new THREE.Box3();
    const center = new THREE.Vector3();
    bb.setFromObject(mesh);
    bb.getCenter(center);
    mesh.position.x -= center.x;
    mesh.position.y -= center.y;
    mesh.position.z -= center.z;   

    yield put(actionCreator(ADD_3D_OBJECT, {
        uid: item.uid,
        instance: mesh,
        apparels: {} //TODO
    }));
}

export function loadModel(dir, name) {
    return new Promise((resolve, reject) => {
        const loader = new ColladaLoader();

        loader.load(
            `/models/${dir}/${name}.dae`, 
            (collada) => resolve(collada.scene),
            () => {}, //progress
            reject
        );
    });
}

export function* setRendererSize(action) {
    action.payload.renderer.setSize(action.payload.width, action.payload.height);
}

export function* mouseMove(camera, action) {
    // console.log(action.payload.mouseEvent);

    if (action.payload.click === 'left') {

    } else {
        // camera.setPosition();
    }
}