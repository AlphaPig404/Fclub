<template>
	<transition name="fade">
  	<div class="mask" v-show="show"></div>
  </transition>
</template>

<script>
export default {
  name: 'mask',
 	props:{
 		show:{
 			type: Boolean,
 			default: false
 		}
 	}
}
</script>

<style scoped>
	.mask{
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.4);
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	  opacity: 0
	}
</style>