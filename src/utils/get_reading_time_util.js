'use strict';

/**
 * @param {string} text
 * @returns {number}
 */

const AVG_READ_WPM = 238;
const getReadingTime = (text) => Math.ceil(text.split(' ').length / AVG_READ_WPM);

module.exports = getReadingTime;