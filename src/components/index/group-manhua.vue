<template>
  <div class="group">
    <group-bar :init="init_bar"></group-bar>
    <router-link class="items" :to="init_bar.path">
      <div class="item">
        <div class="image">
          <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507140299307&di=399276fc0f282cbbaa19d57c9605c0d0&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F38%2F89%2F19300001138148141457896188615.jpg" alt="">
        </div>
        <span class="name">新浪漫画</span>
        <div class="total">新浪微博官方漫画平台手机客户端,分享最热门原创漫画作品,为原创漫画作者提供施展才华的一站式服务,为千万动漫爱好者提供与作者的即时互动交流平台</div>
      </div>
    </router-link>
  </div>
</template>

<script>

import GroupBar from '@/components/group-bar'

export default {
  name: 'group-manhua',
  data() {
    return {
      init_bar: {
        icon: 'erciyuan1',
        title: '漫画频道',
        path: '/index/manhua',
        more: '更多'
      }
    }
  },
  components: {
    GroupBar
  }
}
</script>

<style scoped>
.group {
  padding: 0 5%;
  background-color: #fff;
}

.header {
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
}

.header .show-more {
  color: #f25d8e;
}

.items {}

.item {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  line-height: 16px;
  vertical-align: top;
  text-align: left;
  margin-bottom: 6px;
}

.item:nth-child(3n+2) {
  margin: 0 5%;
}

.item .image{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 60%;
  overflow: hidden;
}
.item .image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 4px;
}
.item .name{
  height: 20px;
  line-height: 20px;
}
.item .total {
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  color: #999;

  overflow: hidden;
}
</style>