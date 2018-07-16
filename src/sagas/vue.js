import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { rootselector } from '../selectors';
import Vue from 'vue';
import App from '../vues/App.vue';
import { actionCreator, RENDERER_CREATED, VIEW_CREATED } from '../actions';

export function* initVueSaga() {
    const store = yield select(rootselector);

    yield take(RENDERER_CREATED);

    const vue = yield new Promise(resolve => {
        new Vue({
            el: 'body',
            render: h => h(App),
            created() {
                resolve(this);
            },
            methods: {
                select: function (selector, ...args) {
                    return selector(store, ...args);
                }
            }
        });
    });

    yield put(actionCreator(VIEW_CREATED, vue));
    yield takeEvery(yield call(domChannel, vue), dispatchSaga);
    yield takeEvery('*', updateVue, vue);
}

export function* dispatchSaga(action) {
    yield put(action);
}

export function* updateVue(vue) {
    vue.$forceUpdate();

    for (let child in vue.$children) {
        yield call(updateVue, vue.$children[child]);
    }
}

/**
 * Create a channel from the listening on put events
 * @param {Vue} vue
 */
function domChannel(vue) {
    return eventChannel(emitter => {
        vue.$on('put', emitter);

        // The subscriber must return an unsubscribe function
        return () => {
        }
    })
}

export const $select = (selector, ...args) => selector(window.store.getState(), ...args);
