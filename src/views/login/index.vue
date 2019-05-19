<template>
  <div class="login-page">
    <div class="login-tabs">
      <span class="tabs-login">登录</span>
      <!-- insert separator -->
      <span class="tabs-separator">|</span>
      <router-link to="/signup/" class="tabs-signup">注册</router-link>
    </div>
    <div class="login-container">
      <form :model="loginForm" ref="loginForm" label-position="left" label-width="0px" class="login-form">
        <div class="login-form-item" prop="email">
          <input type="text" v-validate ="'required|email'" name="email" v-model="loginForm.email" auto-complete="off" placeholder="邮箱" class="item-input">
          <span v-show="errors.has('email')" class="item-error" v-cloak> {{ errors.first('email') }} </span>
          <i class="icon iconfont iconyouxiang"></i>
        </div>
        <div class="login-form-item" prop="password">
          <input type="password" v-validate ="'required|password'" name="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" class="item-input">
          <span v-show="errors.has('password')" class="item-error" v-cloak> {{ errors.first('password') }} </span>
          <i class="icon iconfont iconpassword"></i>
        </div>
        <div class="login-form-item" style="width:100%;">
          <button type="button" style="width:100%;" @click="onSubmit('loginForm')" :loading="loading" class="item-button">登录</button>
        </div>
      </form>
    </div>
    <div class="login-toast">
      <loading class="loading-toast" v-model="showLoadingValue" type="text" :time="2000" is-show-mask :text="lodingText" position="middle"></loading>
      <toast class="err-toast" v-model="showToastValue" type="text" :time="2000" is-show-mask :text="toastText" position="middle" width="400px"></toast>
    </div>
  </div>
</template>

<script>
import { login } from 'api/user'
import { getAccess } from 'api/auth'
import { Toast, Loading } from 'vux'

export default {
  name: 'login-form',
  components: {
    Toast,
    Loading
  },
  data () {
    return {
      showToastValue: false,
      toastText: '',
      showLoadingValue: false,
      lodingText: '',
      loading: false,
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    const clientId = this.$route.query.client_id || 'wuan'
    const idToken = this.$cookie.get(`${clientId}-id-token`)
    // 登录后链接到签到界面
    if (idToken !== null && idToken !== '') {
      this.$router.push({ path: '/signin' })
    }
  },
  methods: {
    onSubmit (formName) {
      /* eslint-disable */
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.showLoadingValue = true;
          this.loadingText = "正在登录";
          const { client_id, return_to } = this.$route.query
          this.loading = true
          login({
            email: this.loginForm.email,
            password: this.loginForm.password,
            client_id: client_id || 'wuan'
          }).then(res => {
            this.$cookie.set(`${client_id || 'wuan'}-id-token`, res["ID-Token"], 7);
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
            if (err.data.infoCode="400") {
              this.showLoadingValue = false;
              this.showToastValue = true;
              this.toastText = "邮箱或密码错误";
              return;
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
::-webkit-input-placeholder {
    color: #bebdbd;
}
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
  .login-form-item {
    position: relative;
    margin-bottom: 80px;
    .item-input {
      width: 100%;
      font-size: 32px;
      background: #f6f6f6;
      height: 72px;
      border: 1px solid #dcdfe6;
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
    .item-error {
      color: #ff0000;
      font-size: 24px;
      padding-left: 33px;
    }
    .icon {
      position: absolute;
      color: #5677fc;
      font-size: 36px;
      top: 15px;
      right: 50px;
    }
    .item-button {
      color: #fefefe;
      font-size: 32px;
      background: #5677fc;
      height: 72px;
      border: 1px solid #dcdfe6;
      border-radius: 36px;
      border-color: #c9c9c9;
      margin-top: 70px;
    }
  }
}
</style>
