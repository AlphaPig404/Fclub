<template>
    <form id="login">
      <section class="logo">
        <div class="bg-img"></div>
      </section>
      <section class="inputs">
        <section class="input-wrapper border-1px">
          <label for="user_name" class="usr_icon">
            <i class="iconfont icon-denglu"></i>
          </label>
          <input type="tel" placeholder="请输入手机号码" id="user_name" v-model="name" @focus="onFocus" autocomplete="off">
      </section>
      <section class="input-wrapper">
        <label for="password" class="pw_icon">
          <i class="iconfont icon-mima"></i>
        </label>
        <input type="password" placeholder="请输入密码" id="password" v-model="password" @focus="onFocus" autocomplete="off">
        </section>
      </section>
      <div class="error">
        <p v-show="show_err">
          <span class="error_icon">i</span>
          <span class="error_text">{{error_text}}</span>
        </p>
      </div>
      <div class="log_link">
        <div class="login-btn" @click="onLogin">登录</div>
        <div class="log-link">
          <router-link tag="div" class="register" to="/user/signup">注册</router-link>
          <router-link tag="div" class="iforgot" to="/user/forgot">忘记密码?</router-link>
        </div>
      </div>
    </form>
</template>

<script>

import md5 from 'md5'
import qs from 'qs'

export default {
  name: 'login',
  data(){
    return{
      error_text:'',
      name:'',
      password:'',
      show_err: false,
      show_loading: false,
      loading_text: '加载中...'
    }
  },
  methods:{
    checkedTel(name){
  		let reg = /^1(3|4|5|7|8)\d{9}$/
  		return reg.test(name)
  	},
    onLogin: function(){
      // 点击登录按钮
      let name = this.name;
      let pwd = this.password;

      // 前端校验
      if (!this.checkedTel(name)) {
        return this.showErr('请输入正确的手机号')
      }
      if (!pwd) {
        return this.showErr('请输入密码')
      }
      // 密码MD5加密
      pwd = md5(pwd)
      
      this.showLoading('登录中...')
      this.postLogin(name,pwd)
      
    },
    showErr(text){
      this.error_text = text
      this.show_err = true
    },
    showLoading(text){
      this.loading_text = text || '加载中...'
      this.show_loading = true
    },
    postLogin(name,pwd){
      // 用户登录请求
      let url = '/signin'
      let params = {
        tel: name,
        pwd: pwd
      }
      this.$http.post(url,qs.stringify(params)).then(res => {
        // 响应成功
        let data = res.data
        if(!data.result){
          //登录成功，返回页面
          this.$global.isLogin = true
          this.$router.push({path:'/me'})
        }else{
          this.showErr(data.error)
        }
      }).catch(err => {
        this.show_loading = false
        this.showErr('登录失败，请重试')
      })
    },
    onFocus: function(){
      this.show_err = false
      this.error_text = ''
    },
    setLocalStore(name,value){
      // 设置本地存储
      value = JSON.stringify(value)
      localStorage.setItem(name,value) 
    }
  }
}
</script>

<style scoped>
#login{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: -1;
}
#login .logo{
  padding: 60px 0;
}
#login .logo .bg-img{
  width:150px;
  height: 100px;
  margin: 0 auto;

  background-image: url(../../../assets/imgs/slogan.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.input-wrapper{
  display: flex;
  background-color: #fff;
  height: 47px;
  border-bottom: 1px solid #f8f8f8;
}

.input-wrapper .usr_icon{
  width: 15px;
  height: 17px;
  margin: 15px 18px 0 28px;
}
.input-wrapper .pw_icon{
  width: 16px;
  height: 18px;
  margin: 15px 18px 0 28px;
}
.input-wrapper input{
  flex: 1;
}
#login .error{
  margin: 0 auto;
  max-width: 90%;
  text-align: center;
  height: 40px;
  font-size: 0;
  color: #ff9932;
}
#login .error p{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
#login .error .error_icon{
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  line-height: 14px;
  font-size: 14px;
  border: 1px solid #ff9932;
}
#login .error .error_text{
  font-size: 14px;
  margin-left: 8px;
  text-align: left;
}
.log_link{
  width: 90%;
  margin:0 auto;
}
.login-btn{
  display: block;
  width: 100%;
  height: 35px;
  background-color: #fb80a8;
  color: #fff;
  text-align: center;
  line-height: 35px;
  border-radius: 4px;
  text-indent: 20px;
  font-size: 14px;
  letter-spacing: 20px;
}
.log-link{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 10px;
  font-size: 14px;
}
.log-link .register{
  color: #fb80a8;
}

</style>