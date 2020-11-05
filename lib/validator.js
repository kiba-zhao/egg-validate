/**
 * @fileOverview 验证方法库
 * @name validator.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { object: isObject } = require('is');
const Ajv = require('ajv');
const AjvMerge = require('ajv-merge-patch');

module.exports = app => {

  const config = app.config.validator;
  let ajv = new Ajv(config.opts);
  AjvMerge(ajv);


  const target = config.schemaOpts && config.schemaOpts.target ? config.schemaOpts.target : {};

  if (config.schemaOpts) {
    const loader = new app.loader.FileLoader({ ...config.schemaOpts, target });
    loader.load();
  }

  if (config.schemaModules) {
    for (let m of config.schemaModules) {
      let schemaKey = m.key;
      let _module = require(m.url);
      if (schemaKey) {
        ajv = ajv.addSchema(_module, schemaKey);
        continue;
      }

      for (let moduleKey in _module) {
        ajv = ajv.addSchema(_module[moduleKey], moduleKey);
      }
    }
  }

  for (let key in target) {
    let schema = target[key];
    ajv = ajv.addSchema(schema, key);
  }

  app.validator = ajv;

};
