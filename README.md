# egg-validate #
基于[eggjs](https://eggjs.org/zh-cn/index.html)的json-schema数据格式验证插件。该插件是对[json-schema](http://json-schema.org/)的一个三方库的封装。使用[ajv](https://ajv.js.org/)以及其[ajv-merge-patch](https://github.com/ajv-validator/ajv-merge-patch)插件。

## 安装 ##
```bash
npm install git+ssh://git@github.com:kiba-zhao/egg-validate.git --save
```

## 启用 ##
设置启用plugin: `config/plugin.js`
```javascript
exports.validate = {
  enable:true,
  package:'egg-validate'
};
```

## 配置 ##
配置JSON Schema处理以及加载规则: `config/config.default.js`
```javascript
exports.validator = {
    opts: { removeAdditional: true },  // ajv构建参数(处理规则)
    schemaOpts: { directory: path.join(app.baseDir, 'app/schemas'), match: '**/*.schema.json' }    //   egg.FileLoader构建参数(加载规则)
};
```

## 验证示例 ##
```javascript
//demo Schema文件代码
{
  "$schema": "http://json-schema.org/schema#",
  "$id":"demo",
  "title": "demo schema",
  "type":"object"
  "properties": {
    "simple":{
        "type":"string"
    }
  }
}


// Controller文件代码
const Controller = require('egg').Controller;

class DemoController extends Controller {
    async post(){
        const {ctx} = this;
        await ctx.validate('demo',ctx.request.body);
        
        // 业务代码
    }
    
    async search(){
        const {ctx} = this;
        await ctx.validate('demo',ctx.query);
        
        // 业务代码
    }
}
```

## 验证示例（直接使用ajv实例） ##
```javascript
//demo Schema文件代码
{
  "$schema": "http://json-schema.org/schema#",
  "$id":"demo",
  "title": "demo schema",
  "type":"object"
  "properties": {
    "simple":{
        "type":"string"
    }
  }
}


// Controller文件代码
const Controller = require('egg').Controller;

class DemoController extends Controller {
    async post(){
        const {ctx,app} = this;
        
        const valid = await app.validator.validate('demo',ctx.request.body);
        if(valid === false)
          throw app.validator.errors;
        
        // 业务代码
    }
    
    async search(){
        const {ctx} = this;
        const valid = await app.validator.validate('demo',ctx.query);
        if(valid === false)
          throw app.validator.errors;
          
        // 业务代码
    }
}
```
