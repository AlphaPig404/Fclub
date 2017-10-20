<template>
  <div class="year">
    <scroll>
      <div class="groups">
        <div class="group" v-for="(item,key) in seasons_data" :key="key">
          <group-bar :init="item"></group-bar>
          <card-list :init="item.lists"></card-list>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>

import seasons_data from '@mock/seasons.json'
import Scroll from '@/components/scroll'
import GroupBar from '@/components/group-bar'
import CardList from '@/components/card-list'

export default {
  name: 'year',
  data() {
    return {
      seasons_data: seasons_data
    }
  },
  components: {
    // Card,
    Scroll,
    GroupBar,
    CardList
  },
  mounted() {
    // this.getData()
  },
  methods: {
    getData() {
      
    }
  }
}
</script>

<style scoped>
.year {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #f4f4f4;
  overflow: hidden;
}

.groups{
  padding-bottom: 10px;
}
.group{
  padding: 0 5%;
  background-color: #fff;
  margin-top: 10px;
}
.group-wrapper{
  margin-top: 10px;
}
.scroll-wrapper{
	position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width:100%;
  z-index: 2;
  overflow: hidden;
}
</style>