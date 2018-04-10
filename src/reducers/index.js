import { combineReducers } from 'redux';
import { objectSections } from './drawerReducer';
import { objectsDisplayed, helper } from './3dReducer';
import { VIEW_CREATED } from '../actions';

const rootReducer = combineReducers({
    objectSections,
    objectsDisplayed,
    helper,
    //todo remove
    "vue": (state = {}, action) => {
        console.log(state, action);
        switch (action.type) {
            case VIEW_CREATED:
                return {vue: action.payload};
            default:
                return state;
        }
    }
});

export default rootReducer;