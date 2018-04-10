import { combineReducers } from 'redux';
import { CLICKED_OBJECT_ITEM_ICON, VIEW_CREATED } from '../actions';

const rootReducer = combineReducers({
    "objects": (state = {}, action) => {
        switch(action.type) {
            case CLICKED_OBJECT_ITEM_ICON:
                return Object.assign(state, {[action.payload.name]: {name: "clicked"}});
            default:
                return state;
        }
    },

    //todo remove
    "vue": (state = {}, action) => {
        console.log(state, action);
        switch(action.type) {
            case VIEW_CREATED:
                return {vue: action.payload};
            case CLICKED_OBJECT_ITEM_ICON:
                console.log(state.vue);
                state.vue.$forceUpdate();
                return {vue: state.vue};
            default:
                return state;
        }
    }
});

export default rootReducer;