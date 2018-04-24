import { combineReducers } from 'redux';
import { collapsiblesStatus } from './drawerReducer';
import { camera, deleteAll, details, helper, objectsDisplayed, renderer } from './3dReducer';

const rootReducer = combineReducers({
    collapsiblesStatus,
    objectsDisplayed,
    details,
    helper,
    deleteAll,
    renderer,
    camera
});

export default rootReducer;