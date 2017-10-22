<template>
  <transition name="vslide">
    <div class="user">
      <transition :name="transition_name">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
       transition_name: 'slide-left'
      }
    },
    beforeRouteUpdate(to,from,next){
      const isBack = this.$router.isBack
      if(isBack){
        this.transition_name = 'slide-right'
      }else{
        this.transition_name = 'slide-left'
      }
      this.$router.isBack = false
      next()
    }
  }
</script>

<style scoped>
  .user{
    position: fixed;
    top: 40px;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f8f8f8;
    z-index: 10;
  }

  .vslide-enter-active, .vslide-leave-active {
    transition: all .3s
  }
  .vslide-enter, .vslide-leave-to{
    transform: translateY(100%)
  }
  
  .slide-left-enter-active, .slide-right-leave-active {
    transition: all .3s
  }
  .slide-left-enter, .slide-right-leave-to{
    transform: translateX(100%);
    opacity: 0;
  }
</style>