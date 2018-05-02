import * as THREE from 'three';
import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import OrbitControls from 'three-orbitcontrols';
import ColladaLoader from 'three-collada-loader';
import {
    actionCreator,
    ADD_3D_OBJECT,
    ADD_OBJECT_DISPLAYED,
    APPAREL_CHANGED,
    MOUSE_CLICK,
    RENDERER_CREATED,
    SET_RENDERER_SIZE,
    SETTING_CHANGED
} from '../actions';

export function* initThreeSaga() {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.z = 10;
    camera.position.y = -10;
    camera.up = new THREE.Vector3(0, 0, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const axes = new THREE.AxesHelper(2);
    scene.add(axes);

    const gridHelper = new THREE.GridHelper(50, 25);
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
    yield takeEvery(MOUSE_CLICK, mouseClick, {renderer, scene, raycaster, camera, mouse});
}

export function* drawFrame(scene, camera, renderer) {
    while (1) {
        yield new Promise((resolve) => requestAnimationFrame(resolve));
        renderer.render(scene, camera);
    }
}

export function* addObject(scene, action) {
    const {itemName, item} = action.payload;

    const obj = yield call(loadModel, itemName, itemName);
    const bb = new THREE.Box3();
    bb.setFromObject(obj);
    yield call(setBoxCenter, obj, new THREE.Vector3(0, 0, (bb.max.z - bb.min.z) / 2));
    scene.add(obj);

    const calls = {};

    item.apparels.forEach((appareal) => {
        calls[appareal.type] = call(addAppareal, scene, itemName, obj, appareal.type, appareal.value || appareal.values[0]);
    });

    const apparealsIds = yield all(calls);

    yield put(actionCreator(ADD_3D_OBJECT, {
        uid: item.uid,
        instance: obj,
        apparels: apparealsIds
    }));
}

export function* addAppareal(scene, itemName, parentObj, apparealType, apparealValue) {
    if (apparealValue === "aucun") return null;

    let obj, parentBox = new THREE.Box3(), bb = new THREE.Box3(), parentCenter;
    parentBox = parentBox.setFromObject(parentObj);

    switch (apparealType) {
        case "toit":
            obj = yield call(loadModel, itemName, apparealValue);
            yield call(setBoxCenter, obj, new THREE.Vector3(0, 0, -.75 + parentBox.max.z));
            break;
        case "plancher":
            obj = yield call(loadModel, itemName, apparealValue);
            yield call(setBoxCenter, obj);
            break;
        case "rideau":
            obj = new THREE.Group();

            let rideau = yield call(loadModel, itemName, apparealValue);
            bb.setFromObject(rideau);
            rideau.traverse((o) => {if(o.material) o.material.side = THREE.DoubleSide;});
            
            yield call(setBoxCenter, rideau, new THREE.Vector3(parentBox.min.x, 0, ((bb.max.z - bb.min.z)/2) + .1));
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI/2);
            yield call(setBoxCenter, rideau, new THREE.Vector3(0, parentBox.min.y, ((bb.max.z - bb.min.z)/2) + .1));
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI/2);
            yield call(setBoxCenter, rideau, new THREE.Vector3(parentBox.max.x, 0, ((bb.max.z - bb.min.z)/2) + .1));
            obj.add(rideau);

            rideau = rideau.clone();
            rideau.rotateZ(Math.PI/2);
            yield call(setBoxCenter, rideau, new THREE.Vector3(0, parentBox.max.y, ((bb.max.z - bb.min.z)/2) + .1));
            obj.add(rideau);
            break;
        case "lestage":
            obj = new THREE.Group();

            let lestage = yield call(loadModel, itemName, apparealValue);
            bb = new THREE.Box3();
            bb.setFromObject(lestage);

            yield call(setBoxCenter, lestage, new THREE.Vector3(parentBox.min.x - .5, parentBox.min.y - .5, (bb.max.z - bb.min.z)/2));
            obj.add(lestage);

            lestage = lestage.clone();
            yield call(setBoxCenter, lestage, new THREE.Vector3(parentBox.max.x + .5, parentBox.max.y + .5, (bb.max.z - bb.min.z)/2));
            obj.add(lestage);
            
            lestage = lestage.clone();
            yield call(setBoxCenter, lestage, new THREE.Vector3(parentBox.min.x - .5, parentBox.max.y + .5, (bb.max.z - bb.min.z)/2));
            obj.add(lestage);
            
            lestage = lestage.clone();
            yield call(setBoxCenter, lestage, new THREE.Vector3(parentBox.max.x + .5, parentBox.min.y - .5, (bb.max.z - bb.min.z)/2));
            obj.add(lestage);
            break;
        default:
            yield call(setBoxCenter, obj);
    }

    scene.add(obj);

    yield put(actionCreator(ADD_3D_OBJECT, {
        uid: obj.id,
        instance: obj,
        apparels: {}
    }));

    return obj.id;
}

export function loadModel(dir, name) {
    return new Promise((resolve, reject) => {
        const loader = new ColladaLoader();

        loader.load(
            `/models/${dir}/${name}.dae`,
            (collada) => resolve(collada.scene),
            () => {
            }, //progress
            reject
        );
    });
}

export function* setBoxCenter(obj, position = new THREE.Vector3()) {
    const bb = new THREE.Box3();
    const center = new THREE.Vector3();
    bb.setFromObject(obj);
    bb.getCenter(center);
    obj.position.x += position.x - center.x;
    obj.position.y += position.y - center.y;
    obj.position.z += position.z - center.z;
}

export function* setRendererSize(action) {
    action.payload.renderer.setSize(action.payload.width, action.payload.height);
}

export function* mouseClick(params, action) {
    params.mouse.x = ( action.payload.event.clientX / params.renderer.domElement.clientWidth ) * 2 - 1;
    params.mouse.y = - ( action.payload.event.clientY / params.renderer.domElement.clientHeight ) * 2 + 1;

    params.raycaster.setFromCamera( params.mouse, params.camera );

    const intersects = params.raycaster.intersectObjects( params.scene.children );
    console.log(intersects);

    // intersects[ 0 ].object.material.color.set( 0xff0000 );
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
