<template>
  <div class="scroll-wrapper" ref="wrapper">
		<div :class="{'inner-wrapper':scrollX}">
			<loading :showFlag="isLoading" ></loading>
			<slot>
			</slot>
			<div class="pull-down-refresh" v-if="pullDownRefresh">
				<div class="drag">
					<div class="down" v-show="!is_pulling_down">
						<i class="iconfont icon-shang-copy"></i>
						<span>下拉刷新</span>
					</div>
					<div class="up" v-show="is_pulling_down">
						<i class="iconfont icon-shang"></i>
						<span>释放加载</span>
					</div>
				</div>
			</div>
			<div class="pull-up-load" v-if="pullUpLoad">
				<loading></loading>
			</div>
		</div>
  </div>
</template>

<script>

	import BScroll from 'better-scroll'
	import Loading from './loading'
	const BUFFER = 50

	export default {
	  name: 'scroll',
	  data(){
			return{
        is_pulling_down: false,
				is_loading: false,
				is_pulling_refreshing: false
			}
	  },
	  props:{
	  	click:{
	  		type: Boolean,
	  		default: true
	  	},
	  	probeType:{
	  		type: Number,
	  		default: 3
	  	},
	  	data:{
	  		type: Array,
	  		default: null
	  	},
			scrollX:{
	  		type: Boolean,
	  		default: false
	  	},
			onscroll:{
				type: Boolean,
	  		default: false
			},
			scrollBack:{
				type: Number,
				default: 1
			},
			switchScroll:{
				type: Boolean,
				default: true
			},
			pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
			isLoading: {
				type: Boolean,
				default: false
			}
	  },
	  watch:{
	  	data: function(){
	  		setTimeout(()=>{
					if(this.pullDownRefresh){
						this.fillChildHeight()
					}
	  			this.refresh()
	  		},100)
	  	},
			isLoading: function(newData){
				if(!newData){
					this.$nextTick(_=>{
						this.fillChildHeight()
					})
				}
			},
			scrollBack: function(){
	  		setTimeout(()=>{
	  			this.scrollBackTop()
	  		},20)
	  	},
			switchScroll: function(newData){
	  		setTimeout(()=>{
	  			newData ? this.enableScroll() : this.disableScroll()
	  		},20)
	  	}
	  },
		components:{
			Loading
		},
	  mounted(){
	  	this._initBscroll()
	  },
	  methods:{
	  	_initBscroll: function(){
	  		this.scroll = new BScroll(this.$refs.wrapper,{
	  			click: this.click,
	  			probeType: this.probeType,
					scrollX: this.scrollX
	  		})
		
				if(this.onscroll){
					this.onScroll()
				}

				if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }

        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }

	  	},
	  	refresh: function(){
	  		this.scroll && this.scroll.refresh()
	  		// this.$emit('scrollBar',this.scroll.hasVerticalScroll)
	  	},
	  	onScroll: function(){
	  		this.scroll.on('scroll',pos=>{
					this.$emit('scroll',pos)
		  	})
	  	},
			scrollBackTop(){
				this.scroll.scrollTo(0,0)
			},
			disableScroll(){
				this.scroll.disable()
			},
			enableScroll(){
				this.scroll.enable()
			},
			fillChildHeight(){
				// 子元素高度不够时仍可以滚动
				console.log('fill')
				const wrapper = this.$refs.wrapper
				const child = wrapper.children[0]
				const wHeight = wrapper.clientHeight
				const cHeight = child.clientHeight 
				console.log(wHeight,cHeight)
				if(cHeight < wHeight){
					child.style.height = wHeight +1 +'px'
				}else{
					child.style.height = ''
				}
				this.refresh()
			},
			_initPullDownRefresh() {
        this.scroll.on('scroll', pos=>{
					if(pos.y>BUFFER){
						this.is_pulling_down = true
						if(this.scroll.isInTransition&&!this.isLoading){
							this.$emit('pullingDown')
						}else if(!this.scroll.isInTransition){
						}
					}else{
						this.is_pulling_down = false
					}
        })
      },
			_initPullUpLoad(){

			}
	  }
	}
</script>

<style scoped>
	/* .scroll-wrapper{
		position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width:100%;
    z-index: 2;
    overflow: hidden;
	} */
	.scroll-wrapper .inner-wrapper{
		width: fit-content;
		/* amazing */
	}
	.scroll-wrapper .pull-down-refresh{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -30px;
  }
</style>