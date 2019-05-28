
<template>
  <div class="checkin">
    <header class="header">午安果</header>
    <div class="content">
      <div>您当前拥有午安果</div>
      <div class="num">{{ userInfo.totalFruit }}</div>
      <div class="btn-box">
        <button v-if="issignBtn" disabled type="buttom" class="btn checkin-btn">
          <i class="icon iconfont iconyiqiandao"></i>
          <div>已签到</div>
        </button>
        <button v-else type="buttom" class="btn checkin-btn" @click="signFruit">
          <i class="icon iconfont iconqiandao"></i>
          <div>签到</div>
        </button>

        <div class="remind">每日签到可以获取{{ fruit.min }} ~ {{ fruit.max }}午安果</div>
      </div>
    </div>

    <!-- 签到弹窗 -->
    <Dialog v-show="showDialog">
      <div class="modal-content">
        <p>
          获得了<span class="num">{{ userInfo.singleFruit }}</span>午安果
        </p>
        <button class="btn dia-btn" type="button" @click="HideD">我知道了</button>
      </div>
    </Dialog>

    <div class="checkin-toast">
      <loading class="loading-toast" v-model="showLoadingValue" type="text" :time="2000" is-show-mask :text="lodingText" position="middle"></loading>
      <toast class="err-toast" v-model="showToastValue" type="text" :time="2000" is-show-mask :text="toastText" position="middle" width="400px"></toast>
    </div>
  </div>
</template>

<script>
// import { getAccess } from 'api/auth'
// import { getToken } from 'api/qiniu'
import { totalFruit, signFruitInfo, signFruit } from 'api/user'
import Dialog from '@/components/dialog'
import { Toast, Loading } from 'vux'

export default {
  name: 'Checkin',
  components: {
    Dialog,
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
      showDialog: false,
      issignBtn: true,
      userInfo: {
        totalFruit: 0,
        singleFruit: 0
      },
      fruit: {
        max: 0,
        min: 0,
        issign: 1
      }
    }
  },
  mounted () {
    // 未登录时自动跳转回登录页
    const clientId = this.$route.query.client_id || 'wuan'
    const idToken = this.$cookie.get(`${clientId}-id-token`)
    // 登录后链接到签到界面
    if (!idToken) {
      this.showLoadingValue = false
      this.showToastValue = true
      this.toastText = '抱歉，你尚未登录'
      this.$router.push({ path: '/login' })
    } else {
      this.signFruitInfo()
      this.totalFruit()
    }
  },
  methods: {
    // 出现弹窗
    showD () {
      let that = this
      that.showDialog = true
    },
    HideD () {
      let that = this
      that.showDialog = false
      this.signFruitInfo()
      this.totalFruit()
    },
    // 获取午安果数量
    totalFruit () {
      let that = this
      totalFruit({
        user_id: that.$store.getters.user.uid,
        value: that.$store.getters.profile.total_fruit
      }).then(res => {
        that.userInfo.totalFruit = res.value
        var profile = {
          total_fruit: that.userInfo.totalFruit
        }
        this.$store.commit('SET_PROFILE', profile)
      }).catch(err => {
        this.showLoadingValue = false
        this.showToastValue = true
        this.toastText = err.data.infoCode
      })
    },
    // 获取签到规则及当日签到状态
    signFruitInfo () {
      let that = this
      signFruitInfo({
        id: that.$store.getters.user.uid,
        range_min: that.$store.getters.profile.min,
        range_max: that.$store.getters.profile.max,
        is_sign: that.$store.getters.profile.is_sign
      }).then(res => {
        that.fruit.min = res.range_min
        that.fruit.max = res.range_max
        that.fruit.issign = res.is_sign
        var profile = {
          min: that.fruit.min,
          max: that.fruit.max,
          is_sign: that.fruit.issign
        }
        this.$store.commit('SET_PROFILE', profile)

        if (that.fruit.issign === 1) {
          that.issignBtn = true
        } else {
          that.issignBtn = false
        }
      }).catch(err => {
        this.showLoadingValue = false
        this.showToastValue = true
        this.toastText = err.data.infoCode
      })
    },
    // 签到
    signFruit () {
      let that = this
      if (that.$store.getters.profile.is_sign !== 1) {
        that.showD()
        signFruit({
          user_id: that.$store.getters.user.uid,
          value: that.$store.getters.profile.single_fruit
        }).then(res => {
          that.userInfo.singleFruit = res.value
          var profile = {
            single_fruit: that.userInfo.singleFruit
          }
          this.$store.commit('SET_PROFILE', profile)
        }).catch(err => {
          this.showLoadingValue = false
          this.showToastValue = true
          this.toastText = err.data.infoCode
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkin{
  .header{
    height:90px;
    line-height:90px;
    font-size: 36px;
    color: #ffffff;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #5677fc;
    width: 100%;
    position: fixed;
    top:0;
  }

  .content{
    height: 100%;
    overflow: scroll;
    text-align: center;
    padding:340px 34px 0;
  }

  .btn-box{
    border-radius: 10px;
    box-shadow: 0px 0px 8px #cbc5c5;
    position: relative;
    height: 400px;
    padding-top: 260px;
    margin-bottom: 20px;
  }

  .btn{
    background-color: #6c87f6;
    color: #ffffff;
    text-align: center;
    border: none;
  }
  .btn.dia-btn{
    width: 100%;
    height: 110px;
    line-height: 1;
    border-radius: 90px;
    font-size:46px;
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .btn.checkin-btn{
    width: 200px;
    height: 200px;
    line-height: 1.8;
    border-radius: 50%;
    box-shadow:0 3px 6px #8a96d1;
    padding: 20px;
    position: absolute;
    top:-100px;
    left:50%;
    margin-left: -100px;
  }

  .btn.checkin-btn[disabled]{
    background-color: #bbc9fe;
  }

  .icon{
    display: block;
    font-size: 54px;
  }

  .remind{
    color: #999999;
  }

  .num{
    font-size: 84px;
    color:#f6b37f;
    margin-top: 80px;
    margin-bottom: 240px;
  }

  .modal-content{
    text-align: center;

    p{
      line-height: 1;
    }
    .num{
      vertical-align: middle;
      margin: 0 20px;
    }

  }
}
</style>
