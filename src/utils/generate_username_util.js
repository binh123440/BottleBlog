'use strict';

/**
 * @param {string} name
 * @returns {string}
 */

module.exports = (name) => {
    const username = name.toLowerCase().replace(' ','');
    return `${username}-${Date.now()}`;
}