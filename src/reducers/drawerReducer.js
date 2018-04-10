import { CLICKED_OBJECT_SECTION, CLICKED_OBJECT_ITEM_CATEGORY } from '../actions';

export const objectSections = (state = {}, action) => {
    switch(action.type) {
        case CLICKED_OBJECT_SECTION:
            return {...state, [action.payload.name]: !state[action.payload.name]};
        case CLICKED_OBJECT_ITEM_CATEGORY:
            return {...state, objectCategories: objectCategories(state.objectCategories, action)};
        default:
            return state;
    }
};

export const objectCategories = (state = {}, action) => {
    switch(action.type) {
        case CLICKED_OBJECT_ITEM_CATEGORY:
            return {...state, [action.payload.name]: !state[action.payload.name]};
        default:
            return state;
    }
};