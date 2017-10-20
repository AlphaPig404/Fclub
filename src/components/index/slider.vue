<template>
  <div class="slider-wrapper">
    <div class="sliders">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide,key) in swiperSlides" :key="key">
          <div @click="toOtherSite(slide.link)">
            <img :src="slide.img" alt="" width="100%">
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sliders',
    data() {
      return {
        swiperSlides: [],
        swiperOption: {
          autoplay: 3500,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          loop: true
        },
      }
    },
    mounted() {
      this.fetchCarousel()
    },
    methods:{
      fetchCarousel(){
        this.$http.get('/carousel').then(res=>{
          const result = res.data.data.result
          this.swiperSlides = result
        }).catch(err=>{
          console.log(err)
        })
      },
      toOtherSite(src){
        this.$router.push({path:'/index/third',query:{src:src}}) 
      }
    }
  }
</script>

<style scoped>
  .slider-wrapper{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 48%;
  }
  .sliders{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>