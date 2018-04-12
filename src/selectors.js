export const rootselector = (state) => state;
export const getSectionCollapsibleState = (store, section) => store.collapsiblesStatus[section] || {self: false};
export const getCategoryCollapsibleState = (store, section, category) => getSectionCollapsibleState(store, section)[category] || false;