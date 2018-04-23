import * as THREE from 'three';
import {fork, put, takeEvery} from 'redux-saga/effects';
import {actionCreator, RENDERER_CREATED, SET_RENDERER_SIZE} from '../actions';

export function* initThreeSaga() {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
	camera.position.z = 1;

	const scene = new THREE.Scene();

	const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	const material = new THREE.MeshNormalMaterial();

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*0.65, window.innerHeight);
    
    yield put(actionCreator(RENDERER_CREATED, renderer));
    yield fork(drawFrame, mesh, scene, camera, renderer);

    yield takeEvery(SET_RENDERER_SIZE, setRendererSize);
}

export function* drawFrame(mesh, scene, camera, renderer) {
    while(1) {
        yield new Promise((resolve) => requestAnimationFrame(resolve));

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
    
        renderer.render( scene, camera );
    }
}

export function* setRendererSize(action) {
    action.payload.renderer.setSize(action.payload.width, action.payload.height);
}