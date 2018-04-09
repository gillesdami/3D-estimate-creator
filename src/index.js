import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import { initSaga } from './sagas';

const initstate = localStorage["store"] || {
    objects: {
        item: {name: "item"},
        item2: {name: "item2"}
    }
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, initstate, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(initSaga);
