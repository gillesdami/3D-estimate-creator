import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import compose from 'redux/es/compose';
import reducer from './reducers';
import { initSaga } from './sagas';

const initstate = localStorage["store"] || {
    objectsDisplayed: [
        {
            name: "tente",
            position: "",
            rotation: "",
            settings: [{
                type: 'color',
                value: 'default'
            }]
        }
    ],
    helper: {
        isDisplay: false
    }
};

//DEBUG
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, initstate, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(initSaga);
