<template>
  <div class="myposts">
    <div class="card-wrapper">
      <post-card :data="card"  v-for="(card,key) in data" :key="key" from='me'></post-card>
    </div>
    <div class="nodata" v-if="!data.length">
      <img src="../../../assets/imgs/nodata.png" alt="">
    </div>
  </div>
</template>

<script>

  import my_post_data from '@mock/my-post.json'
  import PostCard from '../../post-card'

  export default {
    name: 'myposts',
    data() {
      return {
        data: []
      }
    },
    components:{
      PostCard
    },
    mounted(){
      this.postCard()
    },
    methods:{
      postCard(){
        this.$http.get('/post',{params:{from:'me'}}).then(res=>{
          const _data = res.data
          if(!_data.result){
            this.data = _data.data 
          }
        }).catch(err=>{

        })
      }
    }
  }
</script>

<style scoped>

</style>