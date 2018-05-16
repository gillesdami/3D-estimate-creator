import { combineReducers } from 'redux';
import { collapsiblesStatus } from './drawerReducer';
import { settings, deleteAll, details, helper, objectsDisplayed, renderer } from './3dReducer';

const rootReducer = combineReducers({
    collapsiblesStatus,
    objectsDisplayed,
    details,
    helper,
    settings,
    deleteAll,
    renderer,
});

export default rootReducer;