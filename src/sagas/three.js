import * as THREE from 'three';
import ColladaLoader from 'three-collada-loader';
import { create } from '../util';
import { put, takeEvery, fork, call } from 'redux-saga/effects';
import { RENDERER_CREATED, actionCreator, ADD_OBJECT_DISPLAYED, ADD_3D_OBJECT, SET_RENDERER_SIZE } from '../actions';

export function* initThreeSaga() {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100000);
	camera.position.z = 1;
console.warn(camera);
	const scene = new THREE.Scene();

	const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	const material = new THREE.MeshNormalMaterial();

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
                
	const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*0.65, window.innerHeight);
    
    yield put(actionCreator(RENDERER_CREATED, renderer));
    yield fork(drawFrame, scene, camera, renderer);
    yield takeEvery(ADD_OBJECT_DISPLAYED, addObject, scene);
    yield takeEvery(SET_RENDERER_SIZE, setRendererSize);
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
    console.log(mesh);
    scene.add(mesh);

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