export const actionCreator = (type, payload) => ({
    type: type,
    payload: payload,
});

// region collapsiblesStatus actions
export const CLICKED_COLLAPSIBLE = "CLICKED_COLLAPSIBLE";
// endregion

// region clickableCanvas actions
export const DBCLICKED_CANVAS = "DBCLICKED_CANVAS";
// endregion

// region objectsDisplayed actions
export const ADD_OBJECT_DISPLAYED = 'ADD_OBJECT_DISPLAYED';
export const SETTING_CHANGED = "SETTING_CHANGED";
export const APPAREL_CHANGED = "APPAREL_CHANGED";
// endregion

// region detailsPanel actions
export const TOGGLE_DETAILS_PANEL = "TOGGLE_DETAILS_PANEL";
// endregion

// region detailsPanel actions
export const SHOW_DETAILS_PANEL = "SHOW_DETAILS_PANEL";
export const HIDE_DETAILS_PANEL = "HIDE_DETAILS_PANEL";
// endregion

// region helperPanel actions
export const TOGGLE_HELPER_PANEL = "TOGGLE_HELPER_PANEL";
// endregion

// region deleteAll actions
export const DELETE_ALL = "DELETE_ALL";
// endregion

// region vue actions
export const VIEW_CREATED = "VIEW_CREATED";
// endregion

// region three actions
export const RENDERER_CREATED = "RENDERER_CREATED";
export const SET_RENDERER_SIZE = "SET_RENDERER_SIZE";
export const MOUSE_MOVE = "MOUSE_MOVE";
// endregion