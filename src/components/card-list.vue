<template>
  <div class="card-list">
    <div v-if="!init.length">
      <div class="item" v-for="(item,key) in 6" :key="key">
        <div class="image">
          <img src="" alt="">
        </div>
      </div>
    </div>
    <div v-else>
      <div class="item" v-for="(item,key) in init" :key="key" @click="gotoOtherSite(item)">
        <div class="image">
           <img :src="item.cover" alt="">
           <div class="mask">
            <span class="favorites" v-if="item.favorites">{{formatNumb(item.favorites)}}在追</span>
           </div>
        </div>
        <span class="title">{{item.title}}</span>
        <div class="total" v-if="item.pub_index">更新至{{item.pub_index}}</div>
        <div class="total" v-if="item.source">传送门:{{item.source}}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'card-list',
  props: {
    init: {
      type: Array,
      default: []
    }
  },
  mounted(){
    
  },
  methods:{
    gotoOtherSite(item){
      let src = item.link ? item.link : 'https://bangumi.bilibili.com/anime/'+item.season_id
      this.$router.push({path:'/index/third',query:{src:src}})
    },
    formatNumb(numb){
      const _numb =( numb /1000)>>0
      return `${_numb}万`
    }
  }
}
</script>

<style scoped>
  .item {
    display: inline-block;
    font-size: 13px;
    line-height: 16px;
    vertical-align: top;
    text-align: left;
    margin-bottom: 6px;
    width: 30%;
  }

  .item:nth-child(3n+2) {
    margin: 0 5%;
  }
  .item .image{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 135%;
    margin-bottom: 6px;
  }
  .item .image img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #f4f4f4;
  }
  .item .image .mask{
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 30px;
    background: linear-gradient(rgba(7,17,27,0), rgba(7,17,27,.9))
  }
  .item .image .favorites{
    position: absolute;
    left: 4px;
    bottom: 4px;
    color: #fff;
    font-size: 12px;
  }
  .item .total {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #999;
  }
</style>