/**
 * Helper effect to instanciate classes 
 * 
 * @param {class} someClass 
 * @param {Array} args 
 */
export const create = (someClass, ...args) => call(() => new someClass(...args))