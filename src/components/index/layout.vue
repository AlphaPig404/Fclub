<template>
  <div class="index">
    <scroll :data='refresh_arr'>
      <div class="index">
        <slider></slider>
        <group-new class="group-wrapper" :cards="new_data"></group-new>
        <group-year class="group-wrapper" :cards="year_data"></group-year>
        <group-news class="group-wrapper"></group-news>
        <group-manhua class="group-wrapper"></group-manhua>
        <v-footer></v-footer>
      </div>
    </scroll>
    <transition :name="transition_name">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
  
</template>

<script>

import Slider from './slider'
import GroupNew from './group-new'
import GroupYear from './group-year'
import GroupOtaku from './group-otaku'
import GroupNews from './group-news'
import GroupManhua from './group-Manhua'
import VFooter from '@/components/footer'
import card_data from '@mock/card'
import year_data from '@mock/year'
import Scroll from '../scroll'
import MyIframe from './my-iframe'
import TransRouter from '@/components/trans-router'

export default {
  name: 'index',
  data () {
    return {
      card_data: card_data,
      year_data: year_data,
      new_data : [],
      baseimg:'',
      refresh_arr: [],
      show_iframe: false,
      iframe_src: '',
      transition_name: '',
    }
  },
  components:{
    Slider,
    GroupNew,
    GroupYear,
    GroupOtaku,
    VFooter,
    Scroll,
    MyIframe,
    GroupNews,
    GroupManhua,
    TransRouter
  },
  created(){
    this._initNew()
    this.bus.$on('gotoOtherSite',src=>{
      this.show_iframe = true
      this.iframe_src = src
    })
  },
  beforeRouteUpdate (to, from, next) {
  // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
    let isBack = this.$router.isBack
    if (isBack) {
    this.transition_name = 'slide-right'
    } else {
    this.transition_name = 'slide-left'
    }
    // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
    this.$router.isBack = false
    next()
  },
  methods:{
    _initNew(){
      this.$http.get('/bilibili',{params:{from:'index'}}).then(res=>{
        this.new_data = res.data.data
        this.refresh_arr = this.refresh_arr.concat(this.new_data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll-wrapper{
		position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width:100%;
    z-index: 2;
    overflow: hidden;
	}
  .group-wrapper{
    margin-top: 10px;
  }

  .child-view {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  
  .slide-left-enter, .slide-right-leave-active {
    transform: translate3D(100%, 0,0);
  }
 
</style>
