<template>
  <div class="signin">
    <header class="header">午安果</header>
    <div class="content">
      <div>您当前拥有午安果</div>
      <div class="num">2500000</div>
      <div class="btn-box">
        <div class="btn">
          <i class="icon iconfont iconqiandao"></i>
          <div>签到</div>
        </div>
        <div class="remind">每日签到可以获取100~1001午安果</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.signin{
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
    width: 200px;
    height: 200px;
    line-height: 1.8;
    border-radius: 50%;
    background-color: #6c87f6;
    box-shadow:0 3px 6px #8a96d1;
    color: #ffffff;
    text-align: center;
    padding: 20px;
    position: absolute;
    top:-100px;
    left:50%;
    margin-left: -100px;
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
}
</style>
