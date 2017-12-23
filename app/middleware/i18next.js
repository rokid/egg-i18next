'use strict';

module.exports = () => {
  return async function i18n(ctx, next) {
    const { app: { i18next } } = ctx;
    const i18n = i18next.cloneInstance({ initImmediate: false });
    ctx.i18next = i18n;

    const lng = ctx.locale;
    if (lng) {
      await new Promise(res => i18n.changeLanguage(lng, errors => {
        if (errors) {
          errors.forEach(it => {
            ctx.logger.debug('change language encountered unexpected error:', it);
          });
        }
        res();
      }));
    }

    function t(...args) {
      return i18n.t(...args);
    }
    ctx.__ = t;
    ctx.t = t;
    ctx.locals = { t, __: t };

    return next();
  };
};
