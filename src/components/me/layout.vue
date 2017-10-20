<template>
  <div class="me_wrapper">
    <div v-show="$global.isLogin">
      <div class="fixed-wrapper" v-show='show_fixed_tabs'>
        <div class="tabs">
          <router-link class="tab" tag="div"
                       v-for="(nav,key) in navs"
                       :key="key"
                       :to="nav.to"
                       @click.native="checkNav">
                       <span>{{nav.text}}</span>
          </router-link>
        </div>
      </div>
      <scroll :data="refresh_arr" :onscroll='true' @scroll="getPos">
        <div class="me">
          <div class="user">
            <div class="bg">
              <img :src="info.bg" width="100%" height="100%">
            </div>
            <div class="msg">
              <div class="avatar">
                <img :src="info.avatar" alt="" width="70" height="70">
              </div>
              <div class="name">{{info.name}}<i class="iconfont" :class="info.sex==='M'?'icon-nanxing':'icon-icon-yxj-female'"></i></div>
              <div class="desc">{{info.desc}}</div>
              <div class="edit" @click="editUserMsg">
                <i class="iconfont icon-bianji"></i>
                <span class="text">编辑</span>
              </div>
            </div>
          </div>
          <div class="tabs" ref="tabs">
           <router-link class="tab" tag="div"
                       v-for="(nav,key) in navs"
                       :key="key"
                       :to="nav.to"
                       @click.native="checkNav">
                       <span>{{nav.text}}</span>
          </router-link>
          </div>
          <router-view></router-view>
        </div>
      </scroll>
    </div>
    <div v-show="!$global.isLogin" class="unlogin">
      <img src="../../assets/imgs/nodata.png" alt="">
      <p>要先登录哦 (´・ω・`)</p>
      <router-link class="login-button" tag="div" to="/user/signin">登录</router-link>
    </div>
  </div>
</template>

<script>

  // import user_info from '@mock/user'
  import Scroll from '../scroll'
  import localStore from '@/assets/js/localStore'
  import mixin from '@/assets/js/mixin'

  export default {
    name: "post",
    mixins: [mixin],
    data() {
      return {
        info: {},
        tabs_top: '',
        show_fixed_tabs: false,
        refresh_arr:[],
        navs:[{
          text: '追番',
          to: '/me/favor'
        },
        {
          text: '动态',
          to: '/me/myposts'
        },{
          text: '关于我',
          to: '/me/about'
        }]
      }
    },
    components:{
      Scroll
    },
    created(){
      this.getUserMsg()
    },
    mounted(){
      this.tabs_top = this.getDivTop(this.$refs.tabs)
      this.bus.$on('refresh',from=>{
        if(from==='me'){
          this.refresh_arr = this.refresh_arr.concat([])
        }
      })
    },
    methods:{
      checkNav(){
        this.show_fixed_tabs = false
        this.refresh_arr = this.refresh_arr.concat([])
      },
      getScrollTop(e){
        if(e.target.scrollTop>=this.tabs_top){
          if(!this.show_fixed_tabs){
            this.show_fixed_tabs = true
          }
        }else{
          if(this.show_fixed_tabs){
            this.show_fixed_tabs = false
          }
        }
      },
      getDivTop(dom){
        // 获取元素上边距
        return dom.getBoundingClientRect().top - 40
      },
      getPos(pos){
        // console.log(pos)
        if(-pos.y>=this.tabs_top){
          if(!this.show_fixed_tabs){
            this.show_fixed_tabs = true
          }
        }else{
          if(this.show_fixed_tabs){
            this.show_fixed_tabs = false
          }
        }
      },
      getUserMsg(){
        // 获取用户信息
        this.$http.get('/user_info').then(res=>{
          const data = res.data
          if(!data.result){
            this.info = data.data
            // this.login = true
            localStore.set('user_info',data.data)
          }else{
            // 未登录
            // this.login = false
          }
          
        }).catch(err=>{

        })
      },
      editUserMsg(){
        this.$router.push({path:'/user/info'})
      }
    },
  }
</script>

<style scoped>
  .scroll-wrapper{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  .user{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 60%;
    overflow: hidden;
  }
  .user .bg,.user .msg{
    position: absolute;
    width:100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .user .msg{
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
  }
  .user .bg img{
    width:100%;
    height: 100%;
  }
  .user .msg .name{
    font-size: 16px;
    margin: 10px 0;
    font-weight: bold;
  }

  .user .msg .name .icon-icon-yxj-male{
    color: #1296db;
  }

  .user .msg .name .icon-icon-yxj-female{
    color: #f25d8e;
  }

  .user .msg .edit{
    width: 50px;
    margin: 10px auto;
    border: 1px solid #fff;
    padding: 4px 6px;
    border-radius: 4px;
  }

  .user .avatar img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .tabs{
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #f4f4f4;
  }
  .fixed-wrapper{
    position: fixed;
    left: 0;
    top: 40px;
    right: 0;
    z-index: 1;
  }
  .tabs .tab{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
 .tabs .tab.router-link-active{
    color: #f25d8e
 }
 .tabs .tab>span{
   display: inline-block;
   height: 100%;
 }
 .tabs .tab.router-link-active>span{
   border-bottom: 1px solid #f25d8e
 }
 .unlogin p{
   font-size: 16px;
   margin: 10px auto;
 }
 .unlogin .login-button{
   display: inline-block;
   width: 80px;
   height: 36px;
   line-height: 36px;
   margin: 20px 0;
   font-size: 16px;
   border-radius: 4px;
   background-color: #f25d8e;
   color: #fff;
 }
</style>