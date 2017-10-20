<template>
  <div class="message">
    <cell :data='cell1'></cell>
    <cell :data='cell2'></cell>
    <cell :data='cell3'></cell>
  </div>
</template>

<script>
  import cell from './cell'
  export default {
    name: 'message',
    data() {
      return {
        cell1: {
          icon: 'youjian',
          text:'提到我的',
          more:function(){

          }
        },
        cell2: {
          icon: 'communicate',
          text:'回复我的',
          more:function(){

          }
        },
        cell3: {
          icon: 'zan1',
          text:'赞',
          more:function(){

          }
        }
      }
    },
    components:{
      cell
    }
  }
</script>

<style scoped>

</style>