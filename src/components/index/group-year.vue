<template>
  <div class="groups">
    <div class="group">
      <group-bar :init="init_bar"></group-bar>
      <card-list :init="sliceCards(cards,6)" ></card-list>
    </div>
  </div>
</template>

<script>

  import GroupBar from '@/components/group-bar'
  import CardList from '@/components/card-list'
  import mixin from '@/assets/js/mixin'

  export default {
    name:'group-new',
    mixins: [mixin],
    props:{
      cards:{
        type: Array,
        default: []
      }
    },
    data() {
      return {
        init_bar: {
          icon: 'erciyuan1',
          title: '年度新番',
          path: '/index/year',
          more: '分季列表'
        }
      }
    },
    components:{
      GroupBar,
      CardList
    }
  }
</script>

<style scoped>
  .group{
    padding: 0 5%;
    background-color: #fff;
  }
</style>