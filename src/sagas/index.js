import { call } from 'redux-saga/effects';

export function* initSaga() {
    yield call(console.log, "hello world !");
}