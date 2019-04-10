<template>
  <div class="login-page">
    <div class="login-tabs">
      <span class="tabs-login">登录</span>
      <!-- insert separator -->
      <span class="tabs-separator">|</span>
      <router-link to="/signup/" class="tabs-signup">注册</router-link>
    </div>
    <div class="login-container">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
        <el-form-item prop="email">
          <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="邮箱" suffix-icon="iconfont iconyouxiang" class="email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" suffix-icon="iconfont iconpassword" class="password"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="onSubmit('loginForm')" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from 'api/user'
import { getAccess } from 'api/auth'
import { Notification } from 'element-ui'

export default {
  name: 'Login',
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
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [{ validator: validateMail, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  mounted () {
    const clientId = this.$route.query.client_id || 'wuan'
    const idToken = this.$cookie.get(`${clientId}-id-token`)
    // 登录后链接到签到界面
    if (idToken !== null && idToken !== '') {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    onSubmit (formName) {
      /* eslint-disable */
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        const { client_id, return_to } = this.$route.query
        this.loading = true
        login({
          email: this.loginForm.email,
          password: this.loginForm.password,
          client_id: client_id || 'wuan'
        }).then(res => {
          this.$cookie.set(`${client_id || 'wuan'}-id-token`, res["ID-Token"], 7);
          Notification.success({
            message: "登录成功",
            offset: 60
          });
          const self = this;
          // 解析token中的基本用户信息，并存入vuex，localstorage
          self.$store.commit('SET_USER', {
            ...JSON.parse(atob(res['ID-Token'].split('.')[1]))
          })
        }).then(getAccess)
        .then((res) => {
          this.$cookie.set(`${client_id || 'wuan'}-access-token`, res["Access-Token"], 7);
          this.$router.push({ path: return_to || '/signin' });
          this.loading = false;
        })
        .catch(err => {
          Notification.error({
            message: err.data.error,
            offset: 60
          })
          this.loading = false;
        })
      })
    }
  }
}
</script>

<style lang="scss">
.login-tabs {
  margin-left: 70px;
  margin-top: 120px;
  font-size: 36px;
  height: 50px;
  .tabs-login {
    text-decoration: none;
    float: left;
    color: #666666;
    border-bottom: 2px solid #6c87f6;
    padding-bottom: 15px;
  }
  .tabs-signup {
    color: #d1d1d1;
    border: none;
    text-decoration: none;
    float: left;
  }
  .tabs-separator {
    color: #d1d1d1;
    float: left;
    padding: 0px 40px;
  }
}
.login-container {
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
