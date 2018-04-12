import { DELETE_ALL, SETTING_CHANGED, TOGGLE_HELPER_PANEL } from "../actions";

const defaultObjectsDisplayedState = [
    {
        name: "Tente de réception - 10m x [3]m",
        position: "",
        rotation: "",
        settings: [{
            name: 'longueur',
            value: 'default'
        }],
        apparels: [
            {
                type: 'rideau',
                name: 'rideau 3x3',
                value: 'blanc'
            },
            {
                type: 'rideau',
                name: 'rideau 3x3',
                value: 'blanc'
            },
            {
                type: 'pignon',
                name: 'pignon 3x3',
                value: 'cristal'
            },

            {
                type: 'toit',
                name: 'toit 3x3',
                value: 'toit'
            }
        ]
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