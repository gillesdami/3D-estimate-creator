export const rootselector = (store) => store;
export const getCollapsibleState = (store, section, category = "") => store.collapsiblesStatus[section+category];
export const rendererSelector = (store) => store.renderer;
export const getDetailsState = store => store.details || {};
export const getSettingsState = store => store.settings || {};
export const objectsDisplayed = (store) => store.objectsDisplayed;
export const totalSelector = (store, objectsAvailable) => objectsDisplayed(store).map(e => objectsAvailable[e.name].price).reduce((acc, val) => acc + val["ILE DE FRANCE"], 0);