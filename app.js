'use strict';

const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const path = require('path');
const debug = require('debug')('egg:plugin:i18next');

module.exports = async app => {
  debug('app.config.i18next.loadPath:', app.config.i18next.loadPath);
  const loadPath = path.join(path.join(app.loader.getAppInfo().baseDir, app.config.i18next.loadPath));
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
        return app.logger.error('Initialize egg-i18n failed due to: ', it);
      }
    });
  }

  app.context.i18next = i18next;
  app.context.t = (...args) => i18next.t(...args);
  app.context.__ = app.context.t;

  // 自动加载 Middleware
  app.config.coreMiddleware.push('i18next');
};
