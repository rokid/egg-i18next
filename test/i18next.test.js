'use strict';

const mock = require('egg-mock');

describe('test/i18next.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/i18next-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, i18next')
      .expect(200);
  });
});
