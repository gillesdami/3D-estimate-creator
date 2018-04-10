import { combineReducers } from 'redux';
import { VIEW_CREATED } from '../actions';
import { objectSections } from './drawerReducer';

const rootReducer = combineReducers({
    objectSections,

    "vue": (state = {}, action) => {
        console.log(state, action);
        switch(action.type) {
            case VIEW_CREATED:
                return {vue: action.payload};
            default:
                return state;
        }
    }
});

export default rootReducer;