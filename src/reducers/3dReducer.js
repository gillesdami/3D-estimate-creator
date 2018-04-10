import {SETTING_CHANGED, TOGGLE_HELPER_PANEL} from "../actions";

const defaultObjectsDisplayedState = [
    {
        name: "tente",
        position: "",
        rotation: "",
        settings: [{
            type: 'color',
            value: 'default'
        }]
    }
];

export const objectsDisplayed = (state = [], action) => {
    switch (action.type) {
        case SETTING_CHANGED:
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
            return defaultObjectsDisplayedState;
    }
};

export const helper = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_HELPER_PANEL:
            return Object.assign(state, {['isDisplay']: !state['isDisplay']});
        default:
            return state;
    }
};