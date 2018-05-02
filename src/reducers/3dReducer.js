import {
    ADD_OBJECT_DISPLAYED,
    APPAREL_CHANGED,
    DELETE_ALL,
    RENDERER_CREATED,
    SETTING_CHANGED,
    SHOW_DETAILS_PANEL,
    HIDE_DETAILS_PANEL,
    TOGGLE_HELPER_PANEL
} from "../actions";

const defaultHelperState = {
    isDisplayed: false
};

const defaultDetailsState = {
    isDisplayed: false,
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
        case SETTING_CHANGED:
            return state.map(object => {
                if (object.name === action.payload.itemName) {
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
                if (object.name === action.payload.itemName) {
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
            });
        default:
            return state;
    }
};

export const details = (state = defaultDetailsState, action) => {
    switch (action.type) {
        case SHOW_DETAILS_PANEL:
            return {
                ...state,
                isDisplayed: true,
                itemName: action.payload.itemName,
                item: {
                    ...action.payload.item,
                    uid: action.payload.uid
                }
            };
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