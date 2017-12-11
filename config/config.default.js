'use strict';

/**
 * egg-i18next default config
 * @member Config#i18next
 * @property {String} SOME_KEY - some description
 */
exports.i18next = {
  defaultLocale: 'en-US',
  loadPath: '/config/locale/{{lng}}/{{ns}}.json',
  init: {},
};
