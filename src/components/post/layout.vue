<template>
  <div class="post">
    <scroll :data="refresh_arr" 
            :onscroll='true' 
            :pullDownRefresh='true'
            :pullUpLoad='true'
            :pullUpDirty='pullUpDirty'
            :isLoading="is_loading"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp">
      <div class="card-wrapper">
        <post-card  v-for="(card,key) in posts" 
                    :key="key" 
                    :data="card" 
                    from="post"
                    @click.native="routeToItem(card)"></post-card>
      </div>
    </scroll>
    <div class="add-post" @click="showEditor">
      <i class="iconfont icon-ai-edit"></i>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <editor></editor>
  </div>
</template>

<script>
  
  import post_data from '@mock/post'
  import PostCard from '@/components/post-card'
  import Scroll from '@/components/scroll'
  import Editor from './editor'
  import TransRouter from '@/components/trans-router'

  export default {
    name: "post",
    data() {
      return {
        posts: [],
        show_editor: false,
        refresh_arr:[],
        is_loading: false,
        pullUpDirty: true
      }
    },
    components:{
      PostCard,
      Scroll,
      Editor,
      TransRouter
    },
    mounted(){
      this.getPosts(true)

      this.bus.$on('refresh',from=>{
        if(from==='post'){
          this.refresh_arr = this.refresh_arr.concat([])
        }
      })
    },
    methods:{
      routeToItem(card){
        this.$router.push({name:'post-item',params:card})
      },
      showEditor(){
        if(this.$global.isLogin){
          this.$store.dispatch('showEditor',{
            title: '发布微帖',
            type: 'post'
          })
        }else{
          this.$router.push({path: '/user/signin'})
        }
      },
      getPosts(flag,createdAt){
        // 查询微贴，No 107
        const query = {
          params:{
            createdAt:createdAt||null
          }
        }
        this.$http.get('/post',query).then(res=>{
          const _data = res.data
          this.is_loading = false
          if(!_data.result){
            if(flag){
              if(!_data.data.length){
                // 数据全部加载
                this.pullUpDirty = false
              }
              this.posts = this.posts.concat(_data.data)
            }else{
              this.posts = _data.data
              this.pullUpDirty = true
            }
            
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getScrollPos(pos){
        if(pos.y>40){
          this.down = true
        }else{
          this.down = false
        }
      },
      pullingDown(){
        this.is_loading = true
        setTimeout(()=>{
          this.getPosts(false)
        },500)
      },
      pullingUp(){
        if(!this.posts){return}
        const posts = this.posts
        const createdAt = posts[posts.length-1].createdAt
        this.getPosts(true,createdAt)
      }
    }
  }
</script>

<style scoped>
  .post{
    /* position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; */
  }
  .scroll-wrapper{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch; 
    /* 父元素设置上面的属性会影响到子元素的fixed??    */
  }

  .add-post{
    position: fixed;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    line-height: 48px;
    color: #fff;
    box-shadow: 3px 3px 2px #aaa;
    background-color: #f25d8e;
    right: 20px;
    bottom: 70px;
    z-index: 11;
  }
  .add-post .icon-ai-edit{
    font-size: 20px !important;
  }

  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter,.slide-leave-to{
    transform: translate(100%,0)
  }
</style>