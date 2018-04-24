import {combineReducers} from 'redux';
import {collapsiblesStatus} from './drawerReducer';
import {deleteAll, details, helper, objectsDisplayed, renderer} from './3dReducer';

const rootReducer = combineReducers({
    collapsiblesStatus,
    objectsDisplayed,
    details,
    helper,
    deleteAll,
    renderer
});

export default rootReducer;