import { combineReducers } from 'redux';
import { TOGGLE_HELPER_PANEL, VIEW_CREATED } from '../actions';
import { objectSections } from './drawerReducer';
import { objectsDisplayed } from './3dReducer';
import { VIEW_CREATED } from '../actions';

const rootReducer = combineReducers({
    objectSections,
    objectsDisplayed,
    "helper": (state = {}, action) => {
        switch (action.type) {
            case TOGGLE_HELPER_PANEL:
                return Object.assign(state, {['isDisplay']: !state['isDisplay']});
            default:
                return state;
        }
    },
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