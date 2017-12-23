'use strict';

const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const path = require('path');
const debug = require('debug')('egg:plugin:i18next');

module.exports = app => {
  // 自动加载 Middleware
  app.config.coreMiddleware.push('i18next');
  app.beforeStart(async () => {
    debug('app.config.i18next.loadPath:', app.config.i18next.loadPath);
    const loadPath = path.join(app.loader.getAppInfo().baseDir, app.config.i18next.loadPath);
    try {
      await new Promise((resolve, reject) => {
        i18next
          .use(Backend)
          .init(Object.assign({
            backend: {
              loadPath,
            },
          }, app.config.i18next.init), err => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
      });
    } catch (errors) {
      errors.forEach(it => {
        if (it.code !== 'ENOENT') {
          app.logger.debug('Initialize egg-i18n encountered unexpected error:', it);
        }
      });
    }

    app.i18next = i18next;
  });
};
