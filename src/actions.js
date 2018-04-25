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
export const SHOW_DETAILS_PANEL = "SHOW_DETAILS_PANEL";
export const HIDE_DETAILS_PANEL = "HIDE_DETAILS_PANEL";


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
export const MOUSEWHEEL_UP = "MOUSEWHEEL_UP";
export const MOUSEWHEEL_DOWN = "MOUSEWHEEL_DOWN";
export const MOUSEWHEEL_UPDATE = "MOUSEWHEEL_UPDATE";
export const ADD_3D_OBJECT = "ADD_3D_OBJECT";
export const SET_RENDERER_SIZE = "SET_RENDERER_SIZE";
export const MOUSE_MOVE = "MOUSE_MOVE";
