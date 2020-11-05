/**
 * @fileOverview worker入口文件
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const validator = require('./lib/validator');

module.exports = app => {
  validator(app);
};
