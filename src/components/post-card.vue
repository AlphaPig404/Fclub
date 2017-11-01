<template>
  <div class="post-card">
    <div class="user">
      <div class="avatar">
        <img :src="data.user.avatar" width="40px" height="40" alt="">
      </div>
      <div class="detail">
        <div class="name">{{data.user.name}}</div>
        <div class="time">{{formatDate(data.createdAt)}}</div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="card-content">
        <p class="text">{{data.content}}</p>
        <div class="imgs">
          <div v-for="(img,key) in data.imgs" 
               :key="key"
               :class="[{'img-item':data.imgs.length>1},'img-item'+data.imgs.length]"
               @click.stop="preImg(data.imgs,key)">
            <img :src="img" alt="" @load="loadImg" class="img" :class="'img'+data.imgs.length">
          </div>
        </div>
      </div>
      <div class="footer" v-if="from!=='item'">
        <div class="zan" @click.stop="tapLike(data)">
          <i class="iconfont icon-zan"></i>
          <span class="count">{{data.likes.length}}</span>
        </div>
        <div class="comment">
          <i class="iconfont icon-pinglun"></i>
          <span class="count">{{data.comment_counts}}</span>
        </div>
        <div class="read">
          <i class="iconfont icon-zhuanfa1"></i>
          <span class="count">{{data.zhuanfa||0}}</span>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>

import {timeAgo} from '@/assets/js/timeAgo'

export default {
  name: 'card',
  props: {
    data: {
      type: Object,
      default: {}
    },
    from:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show_pre: false
    }
  },
  methods:{
    loadImg(e){
      this.bus.$emit('refresh',this.from)
    },
    formatDate(createAt){
      return timeAgo(createAt)
    },
    preImg(imgs,index){
      // 图片预览
      this.$store.dispatch('selectImg',{
        flag: true,
        imgs,
        page_index: index
      })
      this.$store.dispatch('setBackGroundColor',{backgroundColor:'#333'})
    },
    tapLike(data){
      // 点赞
      this.$store.dispatch('toggleLike',{data,type: 'post'})
    }
  }
}
</script>

<style scoped>
.post-card {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px 10px 0 10px;
  text-align: left;
  font-size: 14px;
}
.post-card:last-child{
  margin-bottom: 0;
}

.user {
  display: flex;
}

.user .avatar {
  flex: 0 0 40px;
}
.user .detail{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10px;
}
.user .detail .name{
  font-weight: bold;
}
.user .avatar img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.content-wrapper{
  padding: 4px 0 4px 50px;
}
.card-content{
  padding: 4px 0;
}
.card-content .text{
  line-height: 1.4;
  padding: 4px 0;
}

.card-content .imgs{
  font-size: 0;
}
.card-content .imgs .img-item{
  display: inline-block;
  width: 90px;
  height: 90px;
  margin: 5px 5px 0 0;
}

.card-content .imgs .img{
  width: 100%;
  height: 100%;
  object-fit: cover    
}
.card-content .imgs .img1{
  width: auto;
  max-width: 80%;
  max-height: 200px;
}
.card-content .imgs .img-single{
  max-width: 200px;
  max-height: 200px;
}

.card-content .imgs .img-wrapper{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
}
.card-content .imgs .img-item4{
  width: 32%;
}

.footer {
  display: flex;
  height: 30px;
  line-height: 30px;
  margin-top: 4px;
}
.footer .zan,.footer .comment,.footer .read{
  flex: 1;
}
.footer .count{
  vertical-align: top
}
</style>