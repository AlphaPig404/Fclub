<template>
  <div class="timeline">
    <scroll :scrollX="true" :data="new_data">
      <div class="time-wrapper">
        <div class="item-wrapper" v-for="(item,key) in new_data" :key="key">
          <div class="item" :class="{'checked-item': item.is_today}" @click="chooseDay(key)">
            <div class="day">{{item.date}}</div>
            <div class="week" :class="{checked: key==check_index}">
              <span>{{week[item.day_of_week]}}</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <scroll :data="new_data.length?new_data[check_index].seasons:[]" :scrollBack="check_index">
      <div class="colums-wrapper">
      <div class="colums" v-if="new_data.length">
        <div class="row" 
            v-for="(item,key) in new_data[check_index].seasons" 
            :key="key" @click="goto(item)">
          <div class="time">{{item.pub_time}}</div>
          <div class="img">
            <img :src="item.square_cover" alt="" width="60" height="60">
          </div>
          <div class="text">
            <div class="name">{{item.title}}</div>
            <div class="hua">{{item.pub_index}}</div>
          </div>
        </div>
        <img src="../../../assets/imgs/bgm-nodata.png" width="80%" v-if="!new_data[check_index].seasons.length">
      </div>
      </div>
    </scroll>
  </div>
</template>

<script>

import card_data from '../../../../mock/card.json'
import Scroll from '@/components/scroll'
import GroupNew from '@/components/index/group-new'

export default {
  name: 'timeline',
  data() {
    return {
      new_data: [],
      week: {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七'
      },
      check_index: 6
    }
  },
  components: {
    // Card,
    Scroll,
    GroupNew
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http.get('/bilibili', { params: { from: 'timeline' } }).then(res => {
        this.new_data = res.data.data
      })
    },
    chooseDay(index){
      this.check_index = index
    },
    goto(item){
      const src = "https://bangumi.bilibili.com/mobile/anime/6332/play/"+item.season_id
      this.$router.push({path:'/index/third',query:{src:src}})
    }
  }
}
</script>

<style scoped>
.timeline {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #f4f4f4;
  overflow: hidden;
}

.scroll-wrapper:first-child {
  background-color: #fb80a8;
}
.scroll-wrapper:nth-child(2){
  position: absolute;
  top: 46px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.time-wrapper {
  white-space: nowrap;
  width: auto;
  display: inline-block;
  color: #fff;
  height: 46px;
}

.timeline .item-wrapper{
  display: inline-block;
  width: 46px;
  height: 46px;
  font-size: 12px;
}

.timeline .item{
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
}

.timeline .checked-item::before{
  position: absolute;
  content: ' ';
  top: 3px;
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #fff;
}

.timeline .item .day {
  margin: 8px 0 3px 0;
}

.timeline .item .week {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 auto;
  border-radius: 50%;
}

.timeline .item .checked {
  background-color: #fff;
  color: #ff82ab
}
.timeline .colums-wrapper{
  padding-bottom: 10px;
  box-sizing: border-box;
}
.timeline .colums .row{
  display: flex;
  padding: 10px 10px 0 10px;
}
.timeline .colums .row .time{
  font-size: 12px;
}
.timeline .row .img{
  margin: 0 10px;
}
.timeline .row img{
  border-radius: 4px;
}
.timeline .row .text .hua{
  text-align: left;
  margin-top: 10px;
  font-size: 12px;
  color: #ff82ab;
}
.timeline .colums>img{
  width: 80%;
  margin: 80px auto;
}
</style>