'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      message: ctx.__('hello', { name: 'リンク' }),
      empty: ctx.__(),
      not_exists_key: ctx.__('not_exists_key'),
      empty_string: ctx.__(''),
      no_interpolation: ctx.__('interpolation'),
      interpolation: ctx.__('interpolation', { foobar: 'interpolation' }),
    };
  }
}

module.exports = HomeController;
