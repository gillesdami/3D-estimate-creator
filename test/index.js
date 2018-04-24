import * as THREE from 'three';
import { expectSaga } from 'redux-saga-test-plan';
import { describe, it } from 'mocha';
import { mouseWheel } from "../src/sagas/three";
import { actionCreator, MOUSEWHEEL_UPDATE } from "../src/actions";
import { combineReducers } from 'redux';
import { camera } from '../src/reducers/3dReducer';

/*describe("hello world", function () {
    it("log hello world", function () {
        const initState = {"hi": "hi"};
        const finalState = initState;

        return expectSaga(initSaga/!*, ...sagaParams*!/)
        // Assert that the `call` will eventually happen.
            .call(console.log, "hello world !")

            // Dispatch any actions that the saga will `take`.
            .dispatch({type: 'USELESS_TEST', payload: 42})

            //lets start the saga with this state
            .withState(initState)

            //we except this test when the saga is completed
            .hasFinalState(initState)

            // Start the test. Returns a Promise.
            .run();
    });
});*/

describe("mousewheel test", function () {
    const cameraInit = new THREE.PerspectiveCamera(70, 0, 0.01, 10);
    const initState = {zoomFactor: cameraInit.zoom};
    const finalStateUp = {zoomFactor: cameraInit.zoom + 1};

    it("log mousewheel up", function () {
        return expectSaga(mouseWheel, cameraInit, true)
            .withReducer(camera)
            .put(actionCreator(MOUSEWHEEL_UPDATE, cameraInit.zoom + 1))
            .withState(initState)
            .hasFinalState(finalStateUp)
            .run();
    });

    it("log mousewheel down", function () {
        return expectSaga(mouseWheel, cameraInit, false)
            .withReducer(camera)
            .put(actionCreator(MOUSEWHEEL_UPDATE, cameraInit.zoom - 1))
            .withState(initState)
            .hasFinalState(initState)
            .run();
    });
});