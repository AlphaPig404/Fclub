<template>
  <div class="group-bar">
    <p>
      <i class="iconfont" :class="'icon-'+formatIcon(init)"></i>
      <span>{{init.season||init.title}}</span>
    </p>
    <router-link tag='div' :to='init.season||init.path' class="show-more">
      <span>{{init.more||'更多'}}</span>
      <i class="iconfont icon-return"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'group-bar',
  props:{
    init: {
      type: Object,
      default: {}
    }
  },
  methods:{
    formatIcon(item){
      const icon_map = {
        '01': 'xuehua',
        '04': 'hua',
        '07': 'lotus',
        '10': 'icon9'
      }
      const season = item.season
      if(season){
        const type = season.slice(4)
        return icon_map[type]
      }else{
        return item.icon || ''
      }
    }
  }
}
</script>

<style scoped>
  .group-bar{
    display: flex;
    height: 36px;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }
  .group-bar .show-more{
    color: #f25d8e;
  }
  .icon-xuehua{
    color: #b1b1b1;
    font-size: 20px !important;
  }
  .icon-hua{
    color: #f25d8e;
    font-size: 18px !important;
  }
  .icon-lotus{
    color: #f93578;
    font-size: 18px !important;
  }
  .icon-icon9{
    color: #ff9400;
    font-size: 20px !important;
  }
</style>