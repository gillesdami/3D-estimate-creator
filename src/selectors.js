export const rootselector = (state) => state;
export const getSectionCollapsibleState = (store, section) => store.collapsiblesStatus[section] || {};
export const getDetailsState = store => store.details || {};