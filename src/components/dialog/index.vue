<template>
  <div class="dialog">
    <div class="dialog-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss"  scoped>
  .dialog{
    width:100%;
    height:100%;
    position:fixed;
    left:50%;
    top:50%;
    background-color:rgba(51, 51, 51, 0.5);
    z-index:9999;
    transform:translateX(-50%) translateY(-50%);

    box-sizing:border-box;
    display:flex;
    justify-content:center;
    align-items:center;

      .dialog-body{
        min-width: 520px;
        background-color:#fff;
        border-radius:10px;
        padding: 50px 50px;
      }
    }
</style>
