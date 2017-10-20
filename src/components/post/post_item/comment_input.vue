<template>
  <div class="comment-input">
      <textarea type="text" placeholder="请输入评论" ref="textarea" rows="1"></textarea><span class="submit">发布</span>
  </div>
</template>

<script>
  import autoTextarea from '@/assets/js/autoTextarea'
  export default {
    name: 'comment-input',
    mounted(){
      autoTextarea(this.$refs.textarea)
    }
  }
</script>

<style scoped lang="stylus">
  .comment-input
    display flex
    background-color #fff
    align-items center
    border-top 1px solid #eee
    textarea
      flex 1
      height 24px
      font-size 16px
      line-height 1.5
      margin 6px 0 6px 10px
      background-color #eee
      border-radius 4px
      padding 5px
      outline none
      appearance none
      border none
    .submit 
      flex 0 0 70px
      color #999
      font-size 16px
</style>