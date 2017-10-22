<template>
  <transition :name="name">
    <slot></slot>
  </transition>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    name: 'trans-router',
    computed:{
      ...mapGetters({
        transition_name: 'getTransitionName'
      })
    },
    props:{
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
 
  .slide-left-enter-active,.slide-right-leave-active{
    transition: all .3s cubic-bezier(.55,0,.1,1)
  }

  .slide-left-enter, .slide-right-leave-active{
    transform: translate(100%, 0)
  }

  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s
  }

  .slide-enter,.slide-leave-to{
    transform: translate(100%,0)
  }

  .vslide-leave-active{
    transition: transform 0.3s;
  }

  .vslide-leave-active{
    transform: translateY(100%);
  }
</style>