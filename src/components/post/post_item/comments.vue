<template>
  <div class="comment" v-if="data.from">
    <div class="main" @click="replyComment(data)">
      <div class="avatar" v-if="!reply">
        <img :src="data.from.avatar" width="30" height="30" alt="">
      </div>
      <div class="detail">
        <h3>{{formatName(data.from)}}</h3>
        <p>{{data.content}}</p>
        <div class="bottom">
          <div class="time">{{formatTime(data.createdAt)}}</div>
          <div class="buttons">
            <span class="button" @click.stop="tapLike(data)">{{data.like_counts}}<i class="iconfont icon-zan"></i></span>
            <!-- <span class="button">1<i class="iconfont icon-pinglun"></i></span> -->
          </div>
        </div>
      </div>
    </div>
    <div class="replys">
       <comment v-for="(comment,key) in data.replys" :reply="true" :key="key" :data="comment" v-if="data.replys"></comment>
    </div>
  </div>
</template>

<script>

  import {timeAgo} from '@/assets/js/timeAgo'
  import mixin from '@/assets/js/mixin'
  
  export default {
    name: 'comment',
    mixins:[mixin],
    props: {
      data:{
        type: Object,
        default:{}
      },
      reply:{
        type: Boolean,
        default: false
      }
    },
    methods:{
      replyComment(data){
        this.$store.dispatch('showEditor',{
          title: '发表评论',
          msg: data,
          type: 'reply'
        })
      },
      tapLike(data){
        this.$store.dispatch('toggleLike',{data,type:'comment'})
      },
      formatTime(time){
        return timeAgo(time)
      },
      formatName(user){
        const user_id = this.user_info._id
        if(user_id == user._id){
          return `${user.name}(作者)`
        }else{
          return `${user.name}`
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .comment
    .main
      display: flex
      background-color #fff
      border-top 1px solid #f4f4f4
      padding 10px 0
      .avatar
        flex 0 0 50px
        box-sizing border-box
        img
          border-radius 50%
      .detail
        flex: 1
        text-align left
        h3 
          font-weight bold 
        p
          line-height 1.4 
          margin 4px 0 10px
        .bottom 
          display flex
          justify-content space-between 
          .buttons 
            .button 
              display inline-block
              width 40px
              .iconfont 
                vertical-align middle
                margin-left 6px
    .replys 
      margin-left: 50px
      
</style>