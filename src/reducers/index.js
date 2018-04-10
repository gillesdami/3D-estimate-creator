import { combineReducers } from 'redux';
import { CLICKED_OBJECT_ITEM_ICON, VIEW_CREATED, SETTING_CHANGED } from '../actions';

const rootReducer = combineReducers({
    "objects": (state = {}, action) => {
        switch(action.type) {
            case CLICKED_OBJECT_ITEM_ICON:
                return Object.assign(state, {[action.payload.name]: {name: "clicked"}});
            default:
                return state;
        }
    },
    "objectsDisplayed": (state = [], action) => {
        switch (action.type) {
            case SETTING_CHANGED:
                // Update objectsDisplayed
                return state.map(object => {
                    if (object.name === action.payload.itemName) {
                        return {
                            ...object,
                            settings: object.settings.map(setting => {
                                if (setting.type === action.payload.setting.type) {
                                    return {
                                        ...setting,
                                        value: action.payload.setting.value
                                    }
                                }

                                return setting;
                            })
                        }
                    }

                    return object;
                });

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