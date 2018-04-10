export const actionCreator = (type, payload) => ({
    type: type, 
    payload: payload,
});

export const VIEW_CREATED = "VIEW_CREATED";
export const CLICKED_OBJECT_ITEM_ICON = "CLICKED_OBJECT_ITEM_ICON";
export const SETTING_CHANGED = "SETTING_CHANGED";
export const DELETE_ALL = "DELETE_ALL";
export const TOGGLE_HELPER_PANEL = "TOGGLE_HELPER_PANEL";