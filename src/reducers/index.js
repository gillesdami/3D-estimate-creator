import { combineReducers } from 'redux';
import { collapsiblesStatus } from './drawerReducer';
import { objectsDisplayed, helper, deleteAll, renderer, details, camera } from './3dReducer';

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