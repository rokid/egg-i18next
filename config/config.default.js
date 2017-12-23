'use strict';

/**
 * egg-i18next default config
 * @member Config#i18next
 * @property {String} SOME_KEY - some description
 */
exports.i18next = {
  queryField: 'locale',
  cookieField: 'locale',
  cookieMaxAge: 365 * 24 * 60 * 60 * 1000,
  loadPath: '/config/locale/{{lng}}.yml',
  init: {
    fallbackLng: 'en-US',
  },
};
