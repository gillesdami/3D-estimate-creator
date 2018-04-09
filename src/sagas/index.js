import { fork } from 'redux-saga/effects';
import { initVueSaga } from './vue';

export function* initSaga() {
    yield fork(initVueSaga);
}
