/**
 * @fileOverview 验证测试
 * @name validate.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const mm = require('egg-mock');
const assert = require('power-assert');

describe('test/validate.test.js', () => {

  describe('ctx.validate', () => {

    it('success', async () => {

      let app = mm.app({
        baseDir: 'testapp'
      });

      await app.ready();

      let ctx = app.mockContext();

      const data = { appId: '00000000-0000-0000-0000-000000000000', id: '5ec35e92ff9c2c003c797396', simple: 'this is simple' };
      const res_data = { ...data, test: 333333 };
      const res = await ctx.validate('simple', res_data);
      assert.equal(res, true);
      assert.deepEqual(res_data, data);

    });

    it('invalid', async () => {

      let app = mm.app({
        baseDir: 'testapp'
      });

      await app.ready();

      let ctx = app.mockContext();

      const data = { appId: '00000000-0000-0000-0000-000000000000as', id: '5ec35e92ff9c2c003c797396', simple: 'this is simple' };
      const res_data = { ...data, test: 333333 };
      try {
        await ctx.validate('simple', res_data);
      } catch (e) {
        assert.equal(e.status, 422);
        assert.equal(e.message, 'Validation Failed');
      }
    });

  });


  describe('app.validator.validate', () => {

    it('success', async () => {

      let app = mm.app({
        baseDir: 'testapp'
      });

      await app.ready();

      const data = { appId: '00000000-0000-0000-0000-000000000000', id: '5ec35e92ff9c2c003c797396' };
      const res = await app.validator.validate('simple', data);
      assert.equal(res, true);
    });

    it('failed', async () => {

      let app = mm.app({
        baseDir: 'testapp'
      });

      await app.ready();

      const data = { appId: '00000000-0000-0000-0000-00000000000asdas', id: '5ec35e92ff9c2c003c797396' };
      const res = await app.validator.validate('simple', data);
      assert.equal(res, false);

    });

    it('has simple', async () => {

      let app = mm.app({
        baseDir: 'testapp'
      });

      await app.ready();

      const data = { appId: '00000000-0000-0000-0000-000000000000', id: '5ec35e92ff9c2c003c797396', simple: 'this is simple' };
      const res = await app.validator.validate('simple', data);
      assert.equal(res, true);

    });

    it('more props', async () => {

      let app = mm.app({
        baseDir: 'testapp'
      });

      await app.ready();

      const data = { appId: '00000000-0000-0000-0000-000000000000', id: '5ec35e92ff9c2c003c797396', simple: 'this is simple', others: { name: 'name' } };
      const res_data = { ...data, test: 333333, others: { ...data.others, id: 123 } };
      const res = await app.validator.validate('simple', res_data);
      assert.equal(res, true);
      assert.deepEqual(res_data, data);
    });

  });


});
