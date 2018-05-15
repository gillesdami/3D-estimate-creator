import { CLICKED_COLLAPSIBLE } from '../actions';

export const COLLAPSED = false;
export const EXPANDED = true;

//state = { [sectionName]: { self: bool, [categoryName]: bool, ...}, ...}
export const collapsiblesStatus = (state = {}, action) => {
    switch(action.type) {
        //togle collapsible boolean
        case CLICKED_COLLAPSIBLE:
        return {
            ...state,
            [action.payload.section+(action.payload.category||"")]: !state[action.payload.section+(action.payload.category||"")]
        };
        default:
            return state;
    }
};