'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/i18n.test.js', () => {

  describe('ctx.__(key, value)', () => {
    let app;
    before(done => {
      app = mock.app({
        baseDir: 'apps/i18next-test',
        plugin: 'i18next',
      });
      app.ready(done);
    });
    after(() => app.close());

    it('should return locale de', done => {
      app.httpRequest()
        .get('/?locale=de')
        .expect(200)
        .expect('Set-Cookie', /locale=de; path=\/; expires=[^;]+ GMT/)
        .expect({
          message: 'Hallo リンク',
          empty: '',
          not_exists_key: 'not_exists_key',
          empty_string: '',
          no_interpolation: 'Deutsche foobar ',
          interpolation: 'Deutsche foobar interpolation',
        }, done);
    });

    it('should fallback to default locale en-US', function(done) {
      app.httpRequest()
        .get('/?locale=zh')
        .expect(200)
        .expect('Set-Cookie', /locale=zh; path=\/; expires=[^;]+ GMT/)
        .expect({
          message: 'Hello リンク',
          empty: '',
          not_exists_key: 'not_exists_key',
          empty_string: '',
          no_interpolation: 'foobar ',
          interpolation: 'foobar interpolation',
        }, done);
    });

    it('should return default locale en-US', function(done) {
      app.httpRequest()
        .get('/?locale=')
        .expect(200)
        .expect({
          message: 'Hello リンク',
          empty: '',
          not_exists_key: 'not_exists_key',
          empty_string: '',
          no_interpolation: 'foobar ',
          interpolation: 'foobar interpolation',
        }, done);
    });
  });

  describe('ctx.locale', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/i18next-test',
        plugin: 'i18next',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should get request default locale', () => {
      const ctx = app.mockContext();
      assert(ctx.locale == null);
    });

    it('should get request locale from query', () => {
      const ctx = app.mockContext({
        query: { locale: 'zh-Cn' },
      });
      assert(ctx.locale === 'zh-CN');
    });

    it('should get request locale from cookie', () => {
      const ctx = app.mockContext({
        headers: {
          Cookie: 'locale=zh-Cn',
        },
      });
      assert(ctx.locale === 'zh-CN');
    });
  });
});
