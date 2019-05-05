<template>
  <div class="signup-page">
    <div class="signup-tabs">
      <router-link to="/login/" class="tabs-login">登录</router-link>
      <!-- insert separator -->
      <span class="tabs-separator">|</span>
      <span class="tabs-signup">注册</span>
    </div>
    <div class="signup-container">
      <form :model="signupForm" ref="signupForm" label-position="left" label-width="0px" class="signup-form">
        <div class="signup-form-item" prop="email">
          <input type="text" v-validate ="'required|email'" name="email" v-model="signupForm.email" auto-complete="off" placeholder="邮箱" class="item-input">
          <span v-show="errors.has('email')" class="item-error" v-cloak> {{ errors.first('email') }} </span>
          <i class="icon iconfont iconyouxiang"></i>
        </div>
        <div class="signup-form-item" prop="name">
          <input type="text" v-validate ="'required|name'" name="name" v-model="signupForm.name" auto-complete="off" placeholder="昵称" class="item-input">
          <span v-show="errors.has('name')" class="item-error" v-cloak> {{ errors.first('name') }} </span>
          <i class="icon iconfont iconren"></i>
        </div>
        <div class="signup-form-item" prop="password">
          <input type="password" v-validate ="'required|password'" name="password" v-model="signupForm.password" auto-complete="off" placeholder="密码" class="item-input">
          <span v-show="errors.has('password')" class="item-error" v-cloak> {{ errors.first('password') }} </span>
          <i class="icon iconfont iconpassword"></i>
        </div>
        <div class="signup-form-item" style="width:100%;">
          <button type="button" style="width:100%;" @click="handleSubmit('signupForm')" :loading="loading" class="item-button">注册</button>
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
import { signup } from 'api/user'
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
      signupForm: {
        email: '',
        name: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit (formName) {
      /* eslint-disable */
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.showLoadingValue = true;
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
            this.$router.push({path: return_to || '/'})
          }).catch(err => {
            if (err.data.infocode="400") {
              this.showLoadingValue = false;
              this.showToastValue = true;
              this.toastText = "邮箱或用户名已被占用";
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
  .signup-form-item {
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
