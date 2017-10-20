<template>
  <div class="manhua">
      <div class="waterfall-wrapper">
        <waterfall :line-gap="width" :watch="manhua_data">
          <!-- each component is wrapped by a waterfall slot -->
          <waterfall-slot
            v-for="(item, index) in manhua_data"
            :width="width"
            :height="item.image_height/2"
            :order="index"
            :key="item.id" class="manhua_item">
              <img :src="item.image_url" alt="" width="100%" height="100%" @click="toOtherSite(item)">
              <div class="desc">
                <p>{{item.title}}</p>
                <p>{{item.chapter_num}}章</p>
              </div>
          </waterfall-slot>
        </waterfall>
        </div>
      </div>
  </div>
</template>

<script>

import Card from './card'
import Scroll from '@/components/scroll'
import vfooter from '@/components/footer'
import qs from 'qs'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

export default {
  name: 'manhua',
  data() {
    return {
      manhua_data: [],
      width:(_=>{
        return document.body.clientWidth/2
      })(),
      refresh_arr:[]
    }
  },
  components: {
    Card,
    Scroll,
    vfooter,
    Waterfall,
    WaterfallSlot
  },
  mounted() {
    this._initData()
  },
  methods: {
    _initData() {
      const url = '/manhua',
            params = {
              page:1
            }
      this.$http.post(url,qs.stringify(params)).then(res=>{
        this.manhua_data = res.data.data.data.data
      }).catch(err=>{
        console.log(err)
      })
    
    },
    toOtherSite(item){
      console.log(item)
      this.$router.push({path:'/index/third',query:{src:item.link_url}})
    }
  }
}
</script>

<style scoped>
.manhua {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #f4f4f4;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.manhua_item{
  border: 1px solid #f4f4f4;
}
.manhua_item img{
 border-radius: 4px;
}

.manhua_item .desc{
  display: flex;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  height: 34px;
  line-height: 34px;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-between;
  color: #fff;
  background-color: rgba(7,17,27,.6)
}

</style>