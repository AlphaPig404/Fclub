<template>
  <div class="card" @click="selectItem(data)">
    <div class="text">
      <h3 class="title">{{data.title}}</h3>
      <div class="desc">
        <div>{{data.cltimes+"次点击"}}</div>
        <div>{{data.ctime}}</div>
      </div>
    </div>
    <div class="image">
      <img width="80" height="80" :src="formatImg(data.maintagicon)" alt="">
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
    formatImg(imgUrl){
      const url = '//static.missevan.com/tags/'
      return url+imgUrl
    },
    selectItem(item){
      this.$emit('selectItem',item)
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
    width: 80px;
    height: 80px;
    border: 1px solid #f4f4f4;
    border-radius: 4px;
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