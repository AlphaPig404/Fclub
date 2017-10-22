<template>
	<scroll>
		<div class="list-wrapper">
			<card-list :init="lists"></card-list>
		</div>
	</scroll>
</template>

<script>

import season_data from '@mock/year.json'
import CardList from '@/components/card-list'
import Scroll from '@/components/scroll'

export default {
  name: 'season',
  data(){
		return{
			lists: season_data
		}
  },
  components:{
  	CardList,
  	Scroll
  }
}

</script>

<style scoped>
	.scroll-wrapper{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10;
		background-color: #fff;
	}
	.list-wrapper{
		padding: 20px 5%;
		text-align: left;
	}
</style>