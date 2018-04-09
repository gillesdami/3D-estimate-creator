import { call, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import Vue from 'vue';
import App from '../vues/App.vue';

export function* initSaga() {
    yield call(console.log, "hello world !");

    const vue = yield new Promise(resolve => {
        new Vue({
            el: 'body',
            render: h => h(App),
            created() {
                resolve(this);
            },
        });
    });

    const chan = yield call(domChannel, vue);
    while (true) {
        let action = yield take(chan);
        console.log(action);
    }
}

function domChannel(vue) {
    return eventChannel(emitter => {
        vue.$on('put', emitter);

        // The subscriber must return an unsubscribe function
        return () => {}
    })
}
