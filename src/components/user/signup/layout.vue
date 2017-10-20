<template>
  <div class="register">
  	<div class="inputs">
	  	<div class="row" :class="{checked:checkedName}">
	  		<label for="">昵称</label>
	  		<input type="text" placeholder="请输入昵称" v-model="name">
	  	</div>
	  	<div class="row">
        <div class="label">
          <label for="">手机号</label>
        </div>
        <div class="tel">
          <input type="tel" placeholder="请输入手机号" v-model="tel">
        </div>
	  		<div class="proof" :class="{checked_proof:checkedTel}" @click="onPostMsg" v-if="!posting_msg">获取验证码</div>
	  		<div class="proof" :class="{checked_proof:checkedTel}" v-else>{{countDownText}}</div>
	  	</div>
	  	<div class="row" :class="{checked:checkedValidCode}">
	  		<label for="">验证码</label>
	  		<input type="tel" placeholder="请输入短信验证码" v-model="valid_code">
	  	</div>
			<div class="row" :class="{checked:checkedPwd}">
	  		<label for="">登录密码</label>
	  		<input type="password" placeholder="请输入密码" v-model="pwd"  @focus="show_pwd_msg=true" @blur="show_pwd_msg=false">
	  	</div>
	  	<div class="row" :class="{checked:checkedConfirmPwd}">
	  		<label for="">确认密码</label>
	  		<input type="password" placeholder="请再次确认您的登录密码" v-model="confirm_pwd">
	  	</div>
  	</div>
  	<div class="notice">
  		<span>点击注册表示已阅读并同意<a href="javascript:;" @click="onShowDeal">注册协议</a></span>
  	</div>
  	<div class="btn" @click="onRegister">注册</div>
  </div>
</template>

<script>

import qs from 'qs'

import md5 from 'md5'


const COUNT = 90

export default {
  name: 'register',
  data(){
		return{
			name: '',
			pwd: '',
			confirm_pwd: '',
			tel:'',
			valid_code:'',

			show_add: false,
			count_down: COUNT,
			posting_msg: false,
			show_loading: false,
			show_toast: false,
      show_deal: false,
			toast_text: '系统错误，请重试',
      loading_text: '加载中...',
			show_pwd_msg: false
		}
  },
  computed:{
  	checkedName(){
  		// 两个以上汉字
  		let reg = /[\u4e00-\u9fa5]{2,}/
  		return reg.test(this.name)
  	},
  	checkedPwd(){
  		// 8-20位数字、字母和特殊字符(_!@#$*~)两个及以上组合
  		let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![_!@#$*~]+$)[\da-zA-Z_!@#$*~]{8,20}$/
  		return reg.test(this.pwd)
  	},
  	checkedConfirmPwd(){
  		if (this.pwd==='') {return}
  		return this.confirm_pwd === this.pwd
  	},
  	checkedTel(){
  		let reg = /^1(3|4|5|7|8)\d{9}$/
  		return reg.test(this.tel)
  	},
  	checkedValidCode(){
  		let reg = /^\d{6}$/
  		return reg.test(this.valid_code)
  	},
  	countDownText(){
  		return `${this.count_down}s后可重发`
  	}
  },
  methods:{
  	onPostMsg(){
  		if(!this.checkedTel){return}
      if(!this.checkedIdCard){return this.showToast('请输入身份证号码')}
  		this.posting_msg = true
  		this.postMsg()
  		this.countDown()
  	},
  	postMsg(){
  		// 短信下发接口

  		let url = '/msg_code'
  		let params = {
  			MBL_NO: this.tel,
  			CER_NO: this.id_card,
  		}
  		let opts = {
  			headers: {
  				responseType: 'json'
  			}
  		}
    
  		this.$http.post(url,qs.stringify(params),opts).then(suc=>{
  			let data = suc.data
  			if(data.RSP_MAP === 'SUC'){
  				// 发起短信请求成功
          this.showToast('短信发送成功')
  			}else{
          this.showToast(data.GWA.MSG_INF)
        }
  		}).catch(err=>{
        this.showToast()
  		})
  	},
  	countDown(){
  		// 倒计时
  		if(this.count_down<=0){
  			// 倒计时结束
  			this.count_down = COUNT
  			return this.posting_msg = false
  		}
  		this.count_down--
  		setTimeout(()=>{
  			this.countDown()
  		},1000)
  	},
    onShowDeal(){
      this.show_deal = true
    },
  	onRegister(){
  		//
  		this.validAll()
			console.log(1)
  	},
  	validAll(){
  		if(this.checkedTel&&this.checkedName&&this.checkedPwd&&this.checkedConfirmPwd&&this.checkedTel&&this.checkedValidCode){
  			// 全部验证通过,获取验证短信
  			this.postRegister()
  		}else{
        this.showToast('请按要求正确填写')
  		}
  	},
  	postRegister(){
  		// 提交注册，发起交易620001
  		const url = "/signup",
						params = {
							name: this.name,
							pwd: md5(this.pwd),
							tel: this.tel,
							sign: this.valid_code
						}
      this.showLoading('注册中...')
  		this.$http.post(url,qs.stringify(params)).then(res=>{
  			const data = res.data
				if(!data.result){
					//交易返回成功
					this.$router.push({path: '/user/signin'})
				}else{
					this.showToast(data.error)
				}
  		}).catch(err=>{
        this.show_loading = false
        this.show_toast = true
  		})
  	},
  	onHideToast(){
  		this.show_toast = false
  	},
    onHideDeal(){
      this.show_deal = false
    },
    showToast(text){
      text&&(this.toast_text = text)
      this.show_toast = true
    },
    showLoading(text){
      this.loading_text = text || '加载中...'
      this.show_loading = true
    }
  }
}
</script>

<style scoped>
	.register{
		padding-top: 10px;
		text-align: left;
	}
	.register .inputs{
		background-color: #fff;
		padding-left: 20px;
	}
	.register .row{
		display: flex;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #eee;
	}
	.register .row:last-child{
		border-bottom: none;
	}
	.register .row label{
    display: block;
		width: 80px;
	}
  .register .row .label{
    display: block;
    width: 80px;
  }
	.register .row input{
		flex: 1;
	}
	.register .row .analog_input{
		flex: 1;
		color: #999;
		
		max-width: 200px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
  .register .row .tel{
    flex: 1;
    overflow: hidden;
  }
	.register .row .checked_add{
		color: #333;
	}
	input::-webkit-input-placeholder{
		color: #999;
	}
	.register .proof{
		width: 90px;
		text-align: center;
		background-color: #f5f5f8;
		color: #999
	}
	.register .checked_proof{
		color: #fb80a8;
		font-weight: bold;
	}
	.register .notice{
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.register .notice a{
		color: #fb80a8;
	}
	.register .checked{
		position: relative;
	}
	.register .checked:after{
		display: block;
    position: absolute;
    right: 10px;
    bottom: 18px;
    width: 10px;
    height: 6px;
    transform: rotate(-45deg);
    border-left: 2px solid #fb80a8;
    border-bottom: 2px solid #fb80a8;
    content: ' ';
	}
	.register .btn{
		display: block;
	  width: 80%;
	  height: 35px;
	  margin: 0px auto 20px;
	  background-color: #fb80a8;
	  color: #fff;
	  text-align: center;
	  line-height: 35px;
	  border-radius: 4px;
	  text-indent: 20px;
	  font-size: 14px;
	  letter-spacing: 20px;
	}
  
</style>