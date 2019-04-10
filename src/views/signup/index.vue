<template>
  <div class="signup-page">
    <div class="signup-tabs">
      <router-link to="/login/" class="tabs-login">登录</router-link>
      <!-- insert separator -->
      <span class="tabs-separator">|</span>
      <span class="tabs-signup">注册</span>
    </div>
    <div class="signup-container">
      <el-form :model="signupForm" :rules="signupRules" ref="signupForm" label-position="left" label-width="0px" class="signup-item">
        <el-form-item prop="email">
          <el-input type="text" v-model="signupForm.email" auto-complete="off" placeholder="邮箱" suffix-icon="iconfont iconyouxiang" class="email"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input type="text" v-model="signupForm.name" auto-complete="off" placeholder="昵称" suffix-icon="iconfont iconren" class="name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="signupForm.password" auto-complete="off" placeholder="密码" suffix-icon="iconfont iconpassword" class="password"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="handleSubmit('signupForm')" :loading="loading">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { signup } from 'api/user'
import { Notification } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  data () {
    var validateMail = (rule, value, callback) => {
      var myreg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!myreg.test(value)) {
        callback(new Error('请填写正确的邮箱格式！'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      var myregName = /^[0-9a-zA-Z\u4E00-\u9FA5_]*$/
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('请输入6-18位字符作为昵称！'))
      } else if (!myregName.test(value)) {
        callback(new Error('只允许中文、数字、字母和下划线！'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('请填写6-20位密码'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      signupForm: {
        email: '',
        name: '',
        password: ''
      },
      signupRules: {
        email: [{ validator: validateMail, trigger: 'blur' }],
        name: [{ validator: validateName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    handleSubmit (formName) {
      /* eslint-disable */
      this.$refs[formName].validate((valid) => {
      if (valid) {
      const self = this
      const { client_id, return_to } = this.$route.query
      this.loading = true
      signup({
        name: this.signupForm.name,
        email: this.signupForm.email,
        password: this.signupForm.password,
        client_id: client_id || 'wuan'
      }).then(res => {
        this.$cookie.set(`${client_id}-id-token`, res['ID-Token'], 7)
        Notification.success({
          message: '注册成功',
          offset: 60
        })
        this.$router.push({path: return_to || '/'})
      }).catch(err => {
         Notification.error({
         message: err.data.error,
         offset: 60
        })
        this.loading = false
      })
     } else {
       return false
     }
    }
   )
  }
 }
}
</script>

<style lang="scss">
.signup-tabs {
  margin-left: 70px;
  margin-top: 120px;
  font-size: 36px;
  height: 50px;
  .tabs-login {
    color: #d1d1d1;
    border: none;
    text-decoration: none;
    float: left;
  }
  .tabs-signup {
    color: #666666;
    text-decoration: none;
    float: left;
    border-bottom: 2px solid #6c87f6;
    padding-bottom: 15px;
  }
  .tabs-separator {
    color: #d1d1d1;
    float: left;
    position: relative;
    padding: 0px 40px;
  }
}
.signup-container {
  margin: 180px 70px auto 70px;
  .el-form-item {
    margin-bottom: 80px;
    .el-input__inner {
      font-size: 32px;
      background: #f6f6f6;
      height: 72px;
      border-radius: 36px;
      padding: 33px;
      border-color: #c9c9c9;
      &:focus {
        border: none;
        border-radius: 0px;
        border-bottom: 1px solid #c9c9c9;
        background: none;
      }
    }
    .el-input__icon {
      color: #5677fc;
      font-size: 36px;
      padding: 15px 48px;
    }
    .el-form-item__error {
      font-size: 24px;
      padding-left: 33px;
      padding-top: 10px;
    }
    .el-button--primary {
      font-size: 32px;
      background: #5677fc;
      height: 72px;
      border-radius: 36px;
      border-color: #c9c9c9;
      margin-top: 70px;
    }
  }
}
</style>
