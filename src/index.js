import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import compose from 'redux/es/compose';
import reducer from './reducers';
import { initSaga } from './sagas';

const initstate = localStorage["store"] || {};

//DEBUG
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
window.store = createStore(reducer, initstate, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(initSaga);

console.log(store);