import { DELETE_ALL, SETTING_CHANGED, TOGGLE_HELPER_PANEL } from "../actions";

const defaultObjectsDisplayedState = [
    {
        name: "Tente",
        position: "",
        rotation: "",
        settings: [{
            name: 'couleur',
            value: 'default'
        },{
            name: 'longueur',
            value: 'default'
        },{
            name: 'hauteur',
            value: 'default'
        }]
    }
];

const defaultHelperState = {
    isDisplay: false
};

export const objectsDisplayed = (state = [], action) => {
    switch (action.type) {
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

        default:
            return defaultObjectsDisplayedState;
    }
};

export const helper = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_HELPER_PANEL:
            return Object.assign(state, {['isDisplay']: !state['isDisplay']});
        default:
            return defaultHelperState;
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