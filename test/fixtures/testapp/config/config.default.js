/**
 * @fileOverview 默认配置
 * @name config.default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const path = require('path');

module.exports = app => {

  const exports = {};

  exports.validator = {
    opts: { removeAdditional: true },
    schemaOpts: { directory: path.join(app.baseDir, 'app/schemas'), match: '**/*.json' }
  };

  return exports;

};
