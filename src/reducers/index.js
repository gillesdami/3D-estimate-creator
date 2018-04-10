import { combineReducers } from 'redux';
import { SETTING_CHANGED, TOGGLE_HELPER_PANEL, VIEW_CREATED } from '../actions';
import { objectSections } from './drawerReducer';

const rootReducer = combineReducers({
    objectSections,
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