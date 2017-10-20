<template>
  <div class="group-new">
    <group-bar :init="init_bar"></group-bar>
    <card-list :init="cards"></card-list>
  </div>
</template>

<script>

import GroupBar from '@/components/group-bar'
import CardList from '@/components/card-list'
import mixin from '@/assets/js/mixin'

export default {
  name: 'group-new',
  mixins: [mixin],
  props: {
    cards:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      init_bar: {
        icon: 'erciyuan1',
        title: '每日放送',
        path: '/index/timeline',
        more: '时间表',
      }
    }
  },
  components: {
    GroupBar,
    CardList
  }
}
</script>

<style scoped>
.group-new {
  padding: 0 5%;
  background-color: #fff;
}

</style>