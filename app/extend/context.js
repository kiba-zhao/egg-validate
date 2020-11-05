/**
 * @fileOverview context扩展
 * @name context.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const ERROR_MESSAGE = 'Unprocessable Entity';
const ERROR_CODE = 'validation_failed';

function extractField(error) {
  const { dataPath, params } = error;
  let field = dataPath.length > 0 ? dataPath.substr(1) : dataPath;
  if (field.length <= 0)
    for (let key in params) {
      field = params[key];
      if (field.length > 0)
        break;
    }
  return field;
}

module.exports = {
  validate(schema, data) {
    const { app } = this;
    const res = app.validator.validate(schema, data);
    if (!res) {
      const errors = app.validator.errors;
      this.set({
        'Content-Type': 'application/json; charset=utf-8'
      });
      this.throw(422, ERROR_MESSAGE, {
        message: 'Validation Failed',
        errors: errors.map(_ => ({
          resource: `${this.host}${this.path}`,
          field: extractField(_),
          code: ERROR_CODE,
          message: _.message
        }))
      });
    }
    return res;
  }
};
