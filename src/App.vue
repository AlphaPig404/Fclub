<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="content">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="bar-wrapper">
      <bottom-bar></bottom-bar>
    </div>
    <pre-imgs></pre-imgs>
  </div>
</template>

<script>

import './assets/fonts/iconfont.css'
import BottomBar from '@/components/bottom-bar'
import scroll from '@/components/scroll'
import TopBar from '@/components/top-bar'
import PreImgs from '@/components/pre-imgs'

export default {
  name: 'app',
  components:{
    BottomBar,
    scroll,
    TopBar,
    PreImgs
  },
  data() {
    return {
      transition_name:'',
    }
  },
  created(){
    // 检查登录状态
    this.$http.get('/check_login').then(res=>{
      const data = res.data
      if(!data.result){
        this.$global.isLogin = true
      }else{
        this.$global.isLogin = false
      }
    }).catch(err=>{

    })
  }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  background-color: #fb80a8;
}
#app {
  position: relative;
  font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
  line-height: 1.2;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  user-select: none;
  touch-action: manipulation;
  font-size: 13px;
  background-color: #f4f4f4;
  height: 100%;    
}
.content{
  position: absolute;
  top: 40px;
  width: 100%;
  bottom: 46px;
  
  /* 设置overflow:scroll fixed失效 */
  /* -webkit-overflow-scrolling: touch; */
}
.bar-wrapper{
  position: absolute;
  width: 100%;
  bottom: 0;
}

</style>
