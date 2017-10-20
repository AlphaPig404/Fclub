<template>
  <transition name="fade">
    <div class="loading" v-show="showFlag">
      <div class="loading_square">
        <div class="load_wrapper">
          <img src="../assets/imgs/loading_icon.png" class="loading_icon" width="60" height="60">
          <img src="../assets/imgs/load_icon.png" class="load_icon" width="60" height="60">
        </div>
        <p>{{text}}</p>
      </div>
      <div class="mask"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  props:{
    showFlag:{
      default: false,
      type: Boolean
    },
    text:{
      type: String,
      default: '加载中...'
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .loading_square{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.7);
    border-radius: 7px 7px 7px 7px;
    max-width: 70%;
    padding: 18px 40px;
    z-index: 1001;
  }
  .loading_square p{
    margin-top: 10px;
    text-align: center;
    color: #fff;
  }
  .load_wrapper{
    position: relative;
    width: 60px;
    height: 60px;
  }
  .loading_icon{
    animation:rotate 1s linear infinite;
  }
  @keyframes rotate{
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
  .load_icon{
    position: absolute;
    top: 0;
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    z-index: 1000;
  }
  .fade-enter-active,.fade-leave{
    transition: opacity 0.3s 0.1s;
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
</style>
