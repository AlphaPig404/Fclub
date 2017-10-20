<template>
  <div class="comment-buttons">
    <div class="button" @click="tapLike">
      <i class="iconfont icon-zan"></i>
      <span class="text">赞</span>
    </div>
    <div class="button" @click="tapComment">
      <i class="iconfont icon-pinglun"></i>
      <span class="text">评论</span>
    </div>
    <div class="button" @click="tapRepost">
      <i class="iconfont icon-zhuanfa1"></i>
      <span class="text">转发</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comment-buttons',
    data() {
      return {
       
      }
    },
    methods:{
      tapLike(){
        this.$emit('tapLike')
      },
      tapComment(){
        this.$emit('tapComment')
      },
      tapRepost(){
        this.$emit('tapRepost')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .comment-buttons
    display flex
    height 46px
    align-items center
    border-top 1px solid #f4f4f4
    .button 
     flex 1
     &+.button 
      border-left 1px solid #ccc
</style>