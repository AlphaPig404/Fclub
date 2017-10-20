<template>
  <div class="post-item">
    <scroll :data="comments" :pullDownRefresh="true" @pullingDown="pullingDown" :isLoading="is_loading">
      <post-card :data="card" from="item"></post-card>
      <div class="comments-wrapper">
        <div class="total">
          <div class="comment-counts">{{card.comment_counts}}条评论</div>
          <div class="zan-counts" v-if="card.likes">{{card.likes.length}}赞</div>
        </div>
        <comment v-for="(comment,key) in comments" :key="key" :data="comment"></comment>
      </div>
    </scroll>
    <div class="buttons-wrapper">
      <comment-buttons 
        @tapLike="tapLike"
        @tapComment="tapComment"
        @tapRepost="tapRepost"></comment-buttons>
    </div>
  </div>
</template>

<script>

  import PostCard from '@/components/post-card'

  import Comment from './comments'
  import CommentInput from './comment_input'
  import CommentButtons from './comment_buttons'

  import comments from '@mock/comments'
  import Scroll from '@/components/scroll'

  export default {
    name: 'post-item',
    data(){
      return{
        card: {},
        comments: [],
        is_loading: false
      }
    },
    components:{
      PostCard,
      Comment,
      CommentInput,
      Scroll,
      CommentButtons
    },
    created(){
      this.card = this.$route.params
      this.getComments()
    },
    methods:{
      tapLike(){
        this.$store.dispatch('toggleLike',{data:this.card,type:'post'})
      },
      tapComment(){
        this.$store.dispatch('showEditor',{
          title: '发表评论',
          msg: this.card,
          type: 'comment'
        })
      },
      tapRepost(){

      },
      getComments(cb){
        // 获取评论，109
        const query = {
          params:{
            post_id: this.card._id
          }
        }
        this.$http.get('/comment',query).then(res=>{
          const data = res.data 
          if(!data.result){
            this.comments = data.data
          }
          cb()
        }).catch(err=>{

        })
      },
      pullingDown(){
        this.is_loading = true
        this.getComments(_=>{
          setTimeout(_=>{
            this.is_loading = false
          },500)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .post-item
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1000
    background-color: #f4f4f4
    .scroll-wrapper 
      position absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      overflow hidden
      .comments-wrapper 
        background-color #fff
        .total 
          display flex
          height 40px
          line-height 40px
          padding: 0 10px;
          justify-content space-between
    .buttons-wrapper 
      position absolute
      left 0 
      width 100%
      bottom -46px
      background-color #fff
</style>