<template>
  <div class="otaku">
    <scroll :data="otaku_data">
      <div>
        <div class="cards">
          <div class="card-wrapper" v-for="(card,key) in otaku_data" :key='key'>
            <card :data='card'></card>
          </div>
        </div>
        <vfooter></vfooter>
      </div>
    </scroll>
  </div>
</template>

<script>

import Card from './card'
import otaku_data from '../../../../mock/otaku.json'
import Scroll from '@/components/scroll'
import vfooter from '@/components/footer'
import getOtaku from '@/apis/otaku'
import md5 from 'md5'

export default {
  name: 'otaku',
  data() {
    return {
      otaku_data: otaku_data
    }
  },
  components: {
    Card,
    Scroll,
    vfooter
  },
  mounted() {
    // this._initData()
  },
  methods: {
    _initData() {
      const url = '/toutiao'

      const _honey = this.getHoney()
      console.log(_honey)
      const params = {
        page_type: 1,
        max_behot_time:0,
        uid: "61703921384",
        count: 20,
        as: _honey.as,
        cp: _honey.cp
      }
      // getOtaku(url,params,{param:'callback',prefix:'jsonp'}).then(data=>{
      //   console.log(data)
      //   this.otaku_data = data
      // })

      this.$http.get(url,{params:params}).then(data=>{
        console.log(data.data)
      })
    },
    getHoney(){
      var t = Math.floor((new Date).getTime() / 1e3),
          e = t.toString(16).toUpperCase(),
          i = md5(t).toString().toUpperCase();

      if (8 != e.length) {
        return {
          as: "479BB4B7254C150",
          cp: "7E0AC8874BB0985"
        }
      }
      for (var a = i.slice(0, 5), n = i.slice(-5), o = "", l = 0; 5 > l; l++) {
        o += a[l] + e[l]
      }
      for (var r = "", s = 0; 5 > s; s++){ 
        r += e[s + 3] + n[s]
      }
      return {
        as: "A1" + o + e.slice(-3),
        cp: e.slice(0, 3) + r + "E1"
      }
    }
  }
}
</script>

<style scoped>
.otaku {
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