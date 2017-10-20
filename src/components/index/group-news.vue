<template>
    <div class="group">
      <group-bar :init="init_bar"></group-bar>
      <router-link :to="init_bar.path">
        <div class="items">
          <div class="item">
            <div class="image">
              <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506487176256&di=aa9d17bffaab67f250c8f42a4e0864d7&imgtype=0&src=http%3A%2F%2Fm1.sinaimg.cn%2Fmaxwidth.640%2Fm1.sinaimg.cn%2F266c8132ee89e31ea5342b7e6f4e2244_540_324.jpg" alt="">
            </div>
            <span class="name">资讯频道</span>
            <div class="total">最新动漫资讯放送</div>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>

import GroupBar from '@/components/group-bar'

export default {
  name: 'group-news',
  data() {
    return {
      init_bar: {
        icon: 'erciyuan1',
        title: '最新资讯',
        path: '/index/news',
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
}
.item .image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
}
</style>