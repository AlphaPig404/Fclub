<template>
  <div class="news">
    <scroll :data="news_data">
      <div>
        <div class="cards">
          <div class="card-wrapper" v-for="(card,key) in news_data" :key='key'>
            <card :data='card' @selectItem="toOtherSite"></card>
          </div>
        </div>
        <vfooter></vfooter>
      </div>
    </scroll>
  </div>
</template>

<script>

import Card from './card'
import Scroll from '@/components/scroll'
import vfooter from '@/components/footer'
import qs from 'qs'

export default {
  name: 'news',
  data() {
    return {
      news_data: []
    }
  },
  components: {
    Card,
    Scroll,
    vfooter
  },
  mounted() {
    this._initData()
  },
  methods: {
    _initData() {
      const url = '/news',
            params = {
              ntype:2,
              page:1,
              page_size:20
            }
      this.$http.post(url,qs.stringify(params)).then(res=>{
        this.news_data = res.data.data.info[0].Datas
      }).catch(err=>{
        console.log(err)
      })
    
    },
    toOtherSite(item){
      const src = 'https://m.missevan.com/news/article/'+item.id
      this.$router.push({path:'/index/third',query:{src:src}})
    }
  }
}
</script>

<style scoped>
.news {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #f4f4f4;
  overflow: hidden;
}

.cards{
  padding-top: 10px;
}
.card-wrapper {
  margin-bottom: 10px;
  padding: 0 10px;
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