import * as THREE from 'three';
import { fork, put, takeEvery } from 'redux-saga/effects';
import { actionCreator, MOUSEWHEEL_DOWN, MOUSEWHEEL_UP, MOUSEWHEEL_UPDATE, RENDERER_CREATED } from '../actions';

export function* initThreeSaga() {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight);

    yield put(actionCreator(RENDERER_CREATED, renderer));
    yield fork(drawFrame, mesh, scene, camera, renderer);
    yield takeEvery(MOUSEWHEEL_UP, mouseWheel, camera, true);
    yield takeEvery(MOUSEWHEEL_DOWN, mouseWheel, camera, false);
}

export function* drawFrame(mesh, scene, camera, renderer) {
    while (1) {
        yield new Promise((resolve) => requestAnimationFrame(resolve));

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);
    }
}

export function* mouseWheel(camera, isUpOrDown) {
    if (isUpOrDown) {
        camera.zoom += 1;
        yield put(actionCreator(MOUSEWHEEL_UPDATE, camera.zoom));
    } else if (!isUpOrDown) {
        camera.zoom -= 1;
        yield put(actionCreator(MOUSEWHEEL_UPDATE, camera.zoom));
    }
}
