import { combineReducers } from 'redux';
import { objectSections } from './drawerReducer';
import { CLICKED_OBJECT_ITEM_ICON, VIEW_CREATED, SETTING_CHANGED } from '../actions';

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
    
    //todo remove
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