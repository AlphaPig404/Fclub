<template>
	<div class="sheets">
		<div class="mask"></div>
	  <ul>
			<li v-for="item in lists" :data-value="item.value">
				{{item.name}}
			</li>
	  	<li>取消</li>
	  </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
		return{
			msg: "组件",
			lists:[
				
			]
		}
  }
}
</script>

<style scoped>
	p{color:red}
</style>