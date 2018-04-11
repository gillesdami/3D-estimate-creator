import { combineReducers } from 'redux';
import { collapsiblesStatus } from './drawerReducer';
import { VIEW_CREATED } from '../actions';
import { objectsDisplayed, helper, deleteAll } from './3dReducer';

const rootReducer = combineReducers({
    collapsiblesStatus,
    objectsDisplayed,
    helper,
    deleteAll,

    //todo remove
    "vue": (state = {}, action) => {
        console.log(state, action);
        switch (action.type) {
            case VIEW_CREATED:
                console.log(action.payload);
                return {vue: action.payload};
            default:
                return state;
        }
    }
});

export default rootReducer;