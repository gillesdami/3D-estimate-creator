import { fork } from 'redux-saga/effects';
import { initVueSaga } from './vue';
import { initThreeSaga } from './three';

export function* initSaga() {
    yield fork(initVueSaga);
    // yield fork(initThreeSaga);
}
