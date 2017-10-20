<template>
  <div class="toast" v-show="flag">
  	<p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    time:{
      type: Number,
      default: 1000,
    },
    flag:{
      type: Boolean,
      default: false
    },
    text:{
      type: String,
      default: '系统错误,请重试'
    }
  },
  data(){
  	return{
  	}
  },
  watch:{
  	flag: function(val,oldVal){
  		if (val) {
  			setTimeout(()=>{
  				this.$emit('hide')
  			},this.time)
  		}
  	}
  }
}
</script>

<style scoped>
	.toast{
		position: absolute;
		top: 40%;
		left: 50%;
		padding: 10px;
		transform: translateX(-50%);
    line-height: 1.2;
    border-radius: 4px;
    max-width: 200px;
		background-color: rgba(0,0,0,.8);
		color: #fff;
	}
</style>