<template>
  <div class="forgot">
  	<div class="inputs">
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
	  		<label for="">重置密码</label>
	  		<input type="password" placeholder="请重置密码" v-model="pwd" @focus="show_pwd_msg=true" @blur="show_pwd_msg=false">
	  	</div>
	  	<div class="row" :class="{checked:checkedConfirmPwd}">
	  		<label for="">确认密码</label>
	  		<input type="password" placeholder="请再次确认您的登录密码" v-model="confirm_pwd">
	  	</div>
  	</div>
  	<div class="btn" @click="onSubmit">确定</div>
  </div>
</template>

<script>

import md5 from 'md5'

import qs from 'qs'
const COUNT = 90

export default {
  name: 'forgot',
  data(){
		return{
			count_down: COUNT,
			posting_msg: '',
			tel: '',
			pwd: '',
			confirm_pwd: '',
			valid_code: '',

      show_toast: false,
      show_loading: false,
      toast_text: '',
      loading_text: '加载中...',
			show_pwd_msg: false
		}
  },
  computed:{
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
  	countDownText(){
  		return `${this.count_down}s后可重发`
  	},
    checkedValidCode(){
      let reg = /^\d{6}$/
      return reg.test(this.valid_code)
    },
  },
  methods:{
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
  	onPostMsg(){
  		if(!this.checkedTel){return}
      if(!this.checkedIdCard){return this.showToast('请输入身份证号码')}
  		this.posting_msg = true
      this.countDown()
  		this.postMsg()
  	},
  	postMsg(){
  		// 短信验证,620013
  		
  		let url = '/v4_qcorde.xhtml'
  		let params = {
  			MBL_NO: this.tel,
  			CER_NO: this.id_card,
  			BUS_TYP: 2 // 忘记密码
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

  		})
  	},
    onSubmit(){
      this.validAll()
    },
    validAll(){
      if(this.checkedPwd&&this.checkedIdCard&&this.checkedConfirmPwd&&this.checkedTel&&this.checkedValidCode){
        // 全部验证通过,发起请求
        this.postChangePwd()
      }else{
        this.showToast('请按要求正确填写')
      }
    },
  	postChangePwd(){
  		// 找回密码，交易码620012
  		let url = '/v4_retrypwd.xhtml'
  		let params = {
  			CER_NO: this.id_card,
  			MBL_NO: this.tel,
  			NEW_PWD: md5(this.pwd),
  			SIGN: this.valid_code
  		}
  		let opts = {
  			headers: {
  				responseType: 'json'
  			}
  		}
      this.showLoading('密码修改中...')
  		this.$http.post(url,qs.stringify(params),opts).then(suc=>{
  			let data = suc.data
  			if (data.GWA.MSG_CD && data.GWA.MSG_CD != null) {
          let MSG_CD = data.GWA.MSG_CD.substring(3, 8);
          if(MSG_CD != '00000'){
            this.show_loading = false
            this.showToast(data.GWA.MSG_INF)
          }else{
            // 回到登录页
            this.show_loading = false 
            this.showToast('密码修改成功')
            setTimeout(()=>{
              this.$router.push('/login')
            },1000)
          }
  			}
  		}).catch(err=>{
        this.show_loading = false
        this.show_toast()
  		})
  	},
    onHideToast(){
      this.show_toast = false
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
	.forgot{
		text-align: left;
		padding-top: 10px;
	}
	.forgot h2{
		padding:10px 0 10px 20px;
		height: 20px;
		line-height: 20px;
		color: #999;
	}
	.forgot .inputs{
		background-color: #fff;
		padding-left: 20px;
	}
	.forgot .row{
		display: flex;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #eee;
	}
	.forgot .row:last-child{
		border-bottom: none;
	}
	.forgot .row label{
    display: block;
		width: 80px;
	}
  .forgot .row .label{
    display: block;
    width: 80px;
  }
	.forgot .row input{
		flex: 1;
	}
  .forgot .row .tel{
    flex: 1;
    overflow: hidden;
  }
	.forgot .proof{
		width: 90px;
		text-align: center;
		background-color: #f5f5f8;
		color: #999
	}
	.forgot .checked_proof{
		color: #26a6ec;
		font-weight: bold;
	}
	.forgot .checked{
		position: relative;
	}
	.forgot .checked:after{
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
	.forgot .btn{
		display: block;
	  width: 80%;
	  height: 35px;
	  margin: 30px auto;
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