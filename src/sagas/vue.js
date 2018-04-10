import { call,  put, takeEvery, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { rootselector } from '../selectors';
import Vue from 'vue';
import App from '../vues/App.vue';
import { actionCreator, VIEW_CREATED } from '../actions';

export function* initVueSaga() {
    const store = yield select(rootselector);

    const vue = yield new Promise(resolve => {
        new Vue({
            el: 'body',
            render: h => h(App, {props: {store: store}}),
            created() {
                resolve(this);
            },
        });
    });
    
    yield put(actionCreator(VIEW_CREATED, vue));
    yield takeEvery(yield call(domChannel, vue), dispatchSaga);
}

export function* dispatchSaga(action) {
    yield put(action);
}

/**
 * Create a channel from the listening on put events
 * @param {Vue} vue
 */
function domChannel(vue) {
    return eventChannel(emitter => {
        vue.$on('put', emitter);

        // The subscriber must return an unsubscribe function
        return () => {}
    })
}
