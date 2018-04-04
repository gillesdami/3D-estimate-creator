import { call } from 'redux-saga/effects';
import Vue from 'vue';
import App from '../vues/App.vue';

export function* initSaga() {
    yield call(console.log, "hello world !");

    new Vue({
        el: 'body',
        render: h => h(App)
    });
}
