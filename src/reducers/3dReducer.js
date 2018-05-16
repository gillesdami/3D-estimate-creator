import {
    ADD_OBJECT_DISPLAYED,
    APPAREL_CHANGED,
    DELETE_ALL,
    RENDERER_CREATED,
    SETTING_CHANGED,
    SHOW_DETAILS_PANEL,
    HIDE_DETAILS_PANEL,
    TOGGLE_HELPER_PANEL, SHOW_DETAILS_PANEL_FROM_SCENE, TOGGLE_CLICK_FROM_OBJECT,
    POSITION_CHANGED,
    DELETE_OBJECT_DISPLAYED, TOGGLE_SETTINGS_PANEL
} from "../actions";

import objectsAvailable from '../../resources/objectsAvailable.json'

const defaultHelperState = {
    isDisplayed: false
};

const defaultSettingsState = {
    isDisplayed: false
};

const defaultDetailsState = {
    isDisplayed: false,
    clickFromObject: false,
    itemName: null,
    item: null
};

export const objectsDisplayed = (state = [], action) => {
    switch (action.type) {
        case ADD_OBJECT_DISPLAYED:
            return [
                ...state,
                {
                    uid: action.payload.uid,
                    name: action.payload.itemName,
                    settings: action.payload.item.settings,
                    apparels: action.payload.item.apparels
                }
            ];
        case DELETE_OBJECT_DISPLAYED:
            return state.filter(obj => obj.uid !== action.payload.uid);
        case SETTING_CHANGED:
            return state.map(object => {
                if (object.uid === action.payload.uid) {
                    return {
                        ...object,
                        settings: object.settings.map(setting => {
                            if (setting.name === action.payload.setting.name) {
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
        case APPAREL_CHANGED:
            return state.map(object => {
                if (object.uid === action.payload.uid) {
                    return {
                        ...object,
                        apparels: object.apparels.map(apparel => {
                            if (apparel.type === action.payload.apparel.type) {
                                return {
                                    ...apparel,
                                    value: action.payload.apparel.value
                                }
                            }

                            return apparel;
                        })
                    }
                }

                return object;
            });
        case POSITION_CHANGED:
            return state.map(object => {
                if (object.uid === action.payload.uid) {
                    return {
                        ...object,
                        position: {
                            x: action.payload.x,
                            y: action.payload.y
                        }
                    }
                }

                return object;
            });
        default:
            return state;
    }
};

export const details = (state = defaultDetailsState, action) => {
    switch (action.type) {
        case APPAREL_CHANGED:
            return {
                ...state,
                item: {
                    ...state.item,
                    apparels: state.item.apparels.map(apparel => {
                        if (apparel.type === action.payload.apparel.type) {
                            return {
                                ...apparel,
                                value: action.payload.apparel.value
                            }
                        }

                        return apparel;
                    })
                }
            };
        case SHOW_DETAILS_PANEL:
            return {
                ...state,
                isDisplayed: true,
                clickFromObject: false,
                itemName: action.payload.itemName,
                item: {
                    ...action.payload.item,
                    uid: action.payload.uid
                }
            };
        case SHOW_DETAILS_PANEL_FROM_SCENE:
            const objDisplayed = action.payload.objectsDisplayed.find(obj => obj.uid === action.payload.uid);

            let objAvailable;
            for(const key of Object.keys(objectsAvailable)) {
                if (key === objDisplayed.name) {
                    objAvailable = objectsAvailable[key];
                }
            }

            return {
                ...state,
                isDisplayed: true,
                clickFromObject: true,
                itemName: objDisplayed.name,
                item: {
                    ...objAvailable,
                    settings: objDisplayed.settings,
                    apparels: objDisplayed.apparels,
                    uid: action.payload.uid
                }
            };
        case TOGGLE_CLICK_FROM_OBJECT:
            if (state.clickFromObject) {
                return {
                    ...state,
                    clickFromObject: !state.clickFromObject
                };
            } else {
                return state;
            }
        case HIDE_DETAILS_PANEL:
            return {
                ...state,
                isDisplayed: false
            };
        default:
            return state;
    }
};

export const helper = (state = defaultHelperState, action) => {
    switch (action.type) {
        case TOGGLE_HELPER_PANEL:
            return Object.assign(state, {['isDisplayed']: !state['isDisplayed']});
        default:
            return state;
    }
};

export const settings = (state = defaultSettingsState, action) => {
    switch (action.type) {
        case TOGGLE_SETTINGS_PANEL:
            return Object.assign(state, {['isDisplayed']: !state['isDisplayed']});
        default:
            return state;
    }
};

export const deleteAll = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ALL:
            localStorage.clear();
            location.reload(true);
            return state;
        default:
            return state;
    }
};

export const renderer = (state = {}, action) => {
    switch (action.type) {
        case RENDERER_CREATED:
            return action.payload;
        default:
            return state;
    }
};