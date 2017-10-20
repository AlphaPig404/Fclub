<template>
  <div class="card" @click="toToutiao(data)">
    <div class="text">
      <h3 class="title">{{data.title}}</h3>
      <div class="desc">
        <div>{{data.video_duration_str?"播放"+data.go_detail_count+"次":"阅读"+data.go_detail_count}}</div>
        <div>{{data.datetime}}</div>
      </div>
    </div>
    <div class="image">
      <img width="112" height="70" :src="data.image_url||data.image_list[0].url" alt="">
      <div class="video-duration">{{data.video_duration_str}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props:{
    data:{
      type: Object,
      default: {}
    }
  },
  methods:{
    toToutiao(card){
      let src
      if(card.tag==='video_comic'){
        src = 'https://m.365yg.com/i' + card.str_item_id
      }else if(card.tag==='news_comic'){
        src = 'https://m.toutiao.com/i'+ card.str_item_id
      }
  
      this.$router.push({path:'/index/video',query:{src:src}}) 
    }
  }
}
</script>

<style scoped>
  .card{
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    text-align: left;
    margin-bottom: 6px;
    border-radius: 4px;
    background-color: #fff;
  }
  .card .image{
    width: 112px;
    height: 70px;
  }
  .card .image img{
    border-radius: 4px;
  }
  .card .text{
    display: flex;
    flex-direction: column;
    margin-right: 12px;
    justify-content: space-between;
    flex: 1;
  }
  .card .text .title{
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
  }
  .card .desc{
    display: flex;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    justify-content: space-between;
    color: #999;
  }

  .card .image{
    position: relative;
  }
  .card .image .video-duration{
    position: absolute;
    right: 2px;
    bottom: 4px;
    color: #fff;
    background-color: rgba(7,17,27,.7);
    font-size: 12px;
    padding: 2px;
    border-radius: 2px;
  }
</style>