import {
    ADD_OBJECT_DISPLAYED,
    ADD_SPAN,
    APPAREL_CHANGED,
    DELETE_ALL, DELETE_LAST_SPAN_ADDED,
    DELETE_OBJECT_DISPLAYED,
    DELETE_SPAN,
    HIDE_DETAILS_PANEL,
    LAST_SPAN_ADDED,
    OBJECT_DISPLAYED_LOADED,
    OBJECT_DISPLAYED_LOADING,
    POSITION_CHANGED,
    RENDERER_CREATED, RESET_ITEM_SPAN, RESET_NUMBER_SPANS,
    SAVE_OBJECTS_IN_RECAP,
    SETTING_CHANGED,
    SHOW_DETAILS_PANEL,
    SHOW_DETAILS_PANEL_FROM_SCENE,
    TOGGLE_CLICK_FROM_OBJECT,
    TOGGLE_HELPER_PANEL,
    TOGGLE_RECAP_PANEL_FORM,
    TOGGLE_RECAP_PANEL_MAIN,
    TOGGLE_RECAP_PANEL_RECAP,
    TOGGLE_SETTINGS_PANEL,
    VALIDATE_OBJECT_DISPLAYED
} from "../actions";

const defaultHelperState = {
    isDisplayed: false
};

const defaultSettingsState = {
    isDisplayed: false
};

const defaultRecapOrderState = {
    isMainDisplayed: false,
    isRecapDisplayed: false,
    isFormDisplayed: false,
    objectsInRecap: null
};

const defaultDetailsState = {
    isDisplayed: false,
    clickFromObject: false,
    objectLoaded: true,
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
                    apparels: action.payload.item.apparels,
                    isValidated: action.payload.isValidated
                }
            ];
        case VALIDATE_OBJECT_DISPLAYED:
            return state.map(object => {
                if (object.uid === action.payload.uid) {
                    return {
                        ...object,
                        isValidated: action.payload.isValidated
                    }
                }
                return object
            });
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
        case OBJECT_DISPLAYED_LOADING:
            return {
                ...state,
                isDisplayed: false,
                objectLoaded: false
            };
        case OBJECT_DISPLAYED_LOADED:
            return {
                ...state,
                isDisplayed: true,
                objectLoaded: true
            };
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
            for (const key of Object.keys(window.objectsAvailable)) {
                if (key === objDisplayed.name) {
                    objAvailable = window.objectsAvailable[key];
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

export const recapOrder = (state = defaultRecapOrderState, action) => {
    switch (action.type) {
        case TOGGLE_RECAP_PANEL_MAIN:
            return {
                isMainDisplayed: !state['isMainDisplayed'],
                isRecapDisplayed: true,
                isFormDisplayed: false
            };
        case TOGGLE_RECAP_PANEL_RECAP:
            return {
                ...state,
                isRecapDisplayed: true,
                isFormDisplayed: false
            };
        case TOGGLE_RECAP_PANEL_FORM:
            return {
                ...state,
                isRecapDisplayed: false,
                isFormDisplayed: true
            };
        case SAVE_OBJECTS_IN_RECAP :
            return {
                ...state,
                objectsInRecap: action.payload.objectsInRecap
            };
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

/*

[
    {
        uid,
        itemName,
        spansNumber,
        .
        .
        .
    }
]

 */
export const spans = (state = [], action) => {
    switch (action.type) {
        case ADD_SPAN:
            const existingObj = state.find(obj => obj.uid === action.payload.uid);
            if (existingObj) {
                return state.map(obj => {
                    if (obj.uid === action.payload.uid) {
                        return {
                            ...obj,
                            spansNumber: ++obj.spansNumber
                        }
                    } else {
                        return obj;
                    }
                });
            } else {
                return [
                    ...state,
                    {
                        uid: action.payload.uid,
                        itemName: action.payload.itemName,
                        spansNumber: 1,
                        lastSpansAdded: []
                    }
                ];
            }
        case DELETE_SPAN:
            const objToDelete = state.find(obj => obj.uid === action.payload.uid);
            return state.map(obj => {
                if (objToDelete && obj.spansNumber > 0) {
                    return {
                        ...obj,
                        spansNumber: --obj.spansNumber
                    }
                } else {
                    return obj;
                }
            });
        case LAST_SPAN_ADDED:
            const existingObjToAddSpan = state.find(obj => obj.uid === action.payload.uid);
            if (existingObjToAddSpan) {
                return state.map(obj => {

                    if (obj.uid === action.payload.uid && obj.lastSpansAdded.indexOf(action.payload.lastSpansAdded) === -1) {
                        return {
                            ...obj,
                            lastSpansAdded: [
                                ...obj.lastSpansAdded,
                                action.payload.lastSpansAdded
                            ]
                        }
                    } else {
                        return obj;
                    }
                });
            } else {
                return state;
            }
        case DELETE_LAST_SPAN_ADDED:
            const existingObjToDeleteSpan = state.find(obj => obj.uid === action.payload.uid);
            if (existingObjToDeleteSpan) {
                return state.map(obj => {
                    if (obj.uid === action.payload.uid) {
                        return {
                            ...obj,
                            lastSpansAdded: obj.lastSpansAdded.filter(span => span !== action.payload.uidToDelete)
                        }
                    } else {
                        return obj;
                    }
                });
            } else {
                return state;
            }
        case RESET_NUMBER_SPANS :
            return state.map(obj => {
                return {
                    ...obj,
                    spansNumber: 0
                }
            });
        case RESET_ITEM_SPAN :
            return state.filter(obj => obj.uid !== action.payload.uid);
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