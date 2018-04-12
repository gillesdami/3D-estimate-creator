import { combineReducers } from 'redux';
import { collapsiblesStatus } from './drawerReducer';
import { VIEW_CREATED } from '../actions';
import { objectsDisplayed, helper, deleteAll, renderer, details } from './3dReducer';

const rootReducer = combineReducers({
    collapsiblesStatus,
    objectsDisplayed,
    details,
    helper,
    deleteAll,
    renderer
});

export default rootReducer;