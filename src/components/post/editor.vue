<template>
	<transition name="vslide">
  <div class="editor" v-if="showFlag">
  	<div class="header">
  		<span @click="onCancel">取消</span>
  		<span class="title">{{my_title}}</span>
  		<span @click="onConfirm" class="confirm" :class="{check:content}">确定</span>
  	</div>
  	<div class="content-wrapper">
  		<textarea :placeholder="formatPH(msg)" v-model.lazy="content" ref="$textarea" v-focus></textarea>
  		<div class="words" :class="{overflow:words_count<0}">{{words_count}}</div>
  	</div>
		<form action="" class="upload_imgs" v-if="type==='post'">
			<div class="block" v-for="(file,index) in pre_imgs" :key="index">
				<div class="preview_img img-wrapper">
					<div class="img" :style="{backgroundImage: 'url(' + flie2url(file)+ ')'}"></div>
					<div class="delete" @click="deleteImg(index)">
						<i class="iconfont icon-guanbi"></i>
					</div>
				</div>	
			</div>
			<div class="block" v-show="pre_imgs.length<9">
				<label for="loadPostImg" class="img-wrapper">
					<img src="../../assets/imgs/upload.png" class="img" alt="">
					<input type="file" 
								id="loadPostImg"
								hidden multiple
								@change="upLoadImg"
								accept="image/gif,image/jpeg,image/jpg,image/png"/>
				</label>
			</div>
			
		</form>
  </div>
  </transition>
</template>

<script>

import md5 from 'md5'
import qs from 'qs'
const QN = '//oxi280pze.bkt.clouddn.com/'
const MAX_COUNT = 100

import {mapGetters} from 'vuex'

import {file2base64,compress,base2blob} from '../../assets/js/compressImg'

export default {
  name: 'editor',
	directives:{
		focus:{
			inserted(el) {
        // 聚焦元素
        el.focus()
				// v-if可以，v-show不行
      }
		}
	},
  data(){
		return{
			content: '',
			pre_imgs: [],
			img_urls: [], // 上传图片生成的url
			qiniu_token:'',
			count: '' // 已返回url数量，保证url顺序与img一致
		}
  },
  computed:{
  	my_title(){
  		return this.title || '标题'
  	},
  	words_count(){
  		return MAX_COUNT - this.content.length
  	},
		...mapGetters({
			showFlag: 'getEditorShowState',
			title: 'getEditorTitle',
			msg: 'getEditorMsg',
			type: 'getEditorType',
		})
  },
  methods:{
		formatPH(msg){
			return msg&&msg.from?`回复${msg.from.name}:`:`请输入回复内容`
		},
  	onCancel(){
			this.content = ''
			this.pre_imgs = []
			this.img_urls = []
			this.$store.dispatch('cancelEditor')
  	},
  	onConfirm(){
  		if((this.content&&(this.words_count>0))||this.img_urls.length){
				if(this.type==='post'){
					this.postMsg()
				}
				if(this.type==='comment'){
					const params = {
						post_id: this.msg._id,
						to: this.msg.user._id,
						cid: this.msg.cid,
						content: this.content,
						createdAt: Date.now()
					}
					this.postComment(params)
				}
				if(this.type==='reply'){
					const cid = this.msg.cid || this.msg._id
					const params = {
						post_id: this.msg.post_id,
						to: this.msg.from._id,
						cid: cid,
						content: this.content,
						createdAt: Date.now()
					}
					this.postComment(params)
				}
			}
  	},
		upLoadImg(e){
			// 选中图片即上传
			const files = e.target.files

			Object.keys(files).forEach((key,index)=>{
				const count = this.count

				index += count

				if(this.pre_imgs.length>=9){return}
				// 图片文件加入预览
				const file = files[key]
				this.pre_imgs.push(file)
				// 转化成base64
				file2base64(file).then(result=>{
					compress(result).then(baseStr=>{
						const blob = base2blob(baseStr,file.type)
						if(this.qiniu_token){
							this.postImgs(this.qiniu_token,blob,index,this.pre_imgs.length)
						}else{
							this.getQiniuToken().then(token=>{
								this.postImgs(token,blob,index,this.pre_imgs.length)
							})
						}
					})
				})
			})
		},
		flie2url(file){
			return window.URL.createObjectURL(file)
		},
		deleteImg(index){
			// 删除图片
			this.pre_imgs.splice(index,1)
			this.img_urls.splice(index,1)
			// 删除七牛图片接口
		},
		getQiniuToken(){
			// 获取七牛token
			return new Promise((resolve,reject)=>{
				this.$http.get('/qiniu_token').then(res=>{
					const _data = res.data
					const token = _data.data.token
						if(!_data.result){
							this.qiniu_token = token
							resolve(token)
						}
					}).catch(e=>{
					console.log(e)
				})
			})
		},
		postImgs(token,file,index,total){
				const params = new FormData()
				const filename = md5(Date.now())

				params.append('token',token)
				params.append('file',file,filename)
			
				const opts = {
					headers:{'Content-Type':'multipart/form-data'}
				}
				const now = Date.now()
				this.$http.post('https://upload-z2.qiniup.com',params,opts).then(res=>{
					const url = QN + res.data.key
					this.img_urls[index] = url
					this.count++
					
					if(this.count>=total){
						// alert(Date.now()-now)
						// console.log(this.img_urls)
					}
				}).catch(err=>{
					console.log(err)
				})
		},
		postMsg(){
			// 提交帖子 req_no: 106
			const params = {
				content: this.content,
				imgs: this.img_urls,
				createdAt: Date.now()
			}
			this.$http.post('/post',qs.stringify(params)).then(res=>{
				const data = res.data
				if(!data.result){
					this.onCancel()
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		postComment(params){
			// 提交评论, 108		
			this.$http.post('/comment',qs.stringify(params)).then(res=>{
				const data = res.data
				if(!data.result){
					this.onCancel()
				}
			}).catch(err=>{
				console.log(err)
			})
		}
  }
}
</script>

<style scoped>
	.editor{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 2000;
		font-size: 16px;
	}
	.editor .header{
		display: flex;
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
		background-color: #fb80a8;
		text-align: center;
		color: #fff;
	}
	.editor .header .title{
		padding: 0 20px;
		flex: 1;
		font-size: 18px;
		font-weight: bold;

		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.editor .header .confirm{
		color: #ddd;
	}
	.editor .header .confirm.check{
		color: #fff;
		font-weight: bold;
	}
	.editor .content-wrapper{
		position: relative;
		padding: 20px;
		box-sizing: border-box;
	}
	.editor .content-wrapper .words{
		position: absolute;
		right: 30px;
		bottom: 30px;
	}
	.editor .content-wrapper .words.overflow{
		color: red;
	}
	.editor textarea{
		width: 100%;
		height: 120px;
		font-size: 14px;
		box-sizing: border-box;
		
		word-break: break-all;
		border: none;
		border-bottom: 1px solid #f4f4f4;
		outline: none;
		-webkit-appearance:none;
	}
	.editor .upload_imgs{
		padding: 0 20px;
		text-align: left;
		font-size: 0;
	}
	.editor .upload_imgs .block{
		display: inline-block;
		width: 30%;
		margin-bottom: 10px;
		vertical-align: top;
	}
	.editor .upload_imgs .block:nth-child(3n+2){
		margin: 0 5%;
	}
	.editor .img-wrapper{
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		overflow: hidden;
	}
	.editor .img-wrapper .delete{
		position: absolute;
		top: 0;
		right: 0;
		width: 18px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		background-color: rgba(7,17,27,.7);
		color: #fff;
		border-radius: 2px;
	}
	.editor .img-wrapper .delete .iconfont{
		font-size: 10px !important;
	}
	.editor .img-wrapper .img{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
	}
	.vslide-leave-active{
		transition: transform 0.3s;
	}

	.vslide-leave-active{
		transform: translateY(100%);
	}
</style>