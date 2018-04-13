export const actionCreator = (type, payload) => ({
    type: type,
    payload: payload,
});

/**
 * collapsiblesStatus actions
 */
export const CLICKED_COLLAPSIBLE = "CLICKED_COLLAPSIBLE";

/**
 * objectsDisplayed actions
 */
export const ADD_OBJECT_DISPLAYED = 'ADD_OBJECT_DISPLAYED';
export const SETTING_CHANGED = "SETTING_CHANGED";
export const APPAREL_CHANGED = "APPAREL_CHANGED";

/**
 * detailsPanel actions
 */
export const TOGGLE_DETAILS_PANEL = "TOGGLE_DETAILS_PANEL";


/**
 * helperPanel actions
 */
export const TOGGLE_HELPER_PANEL = "TOGGLE_HELPER_PANEL";

/**
 * deleteAll actions
 */
export const DELETE_ALL = "DELETE_ALL";

/**
 * vue actions
 */
export const VIEW_CREATED = "VIEW_CREATED";

/**
 * three actions
 */
export const RENDERER_CREATED = "RENDERER_CREATED";
export const SET_RENDERER_SIZE = "SET_RENDERER_SIZE";