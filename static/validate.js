import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' //引入中文文件

// 配置中文
Validator.localize('zh_CN', zh_CN);

const config = {
  locale: 'zh_CN'
};

Vue.use(VeeValidate,config);

// 自定义validate 
const dictionary = {
   zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式',
        required: ( field )=> "请输入" + field
      },
      attributes:{
        email:'邮箱',
        password:'密码',
        name: '昵称',
      }
  }
};

Validator.extend('password', {
  messages: {
    zh_CN:field => '请填写6-20位密码',
  },
  validate: value => {
    return /^[\w_-]{6,20}$/.test(value)
  }
});

Validator.extend('name', {
  messages: {
    zh_CN:field => '请输入6-18位字符作为昵称！',
  },
  validate: value => {
    return /^[\d\w\u4e00-\u9fa5,\.;\:"'?!\-]{3,15}$/.test(value)
  }
});

Validator.updateDictionary(dictionary);