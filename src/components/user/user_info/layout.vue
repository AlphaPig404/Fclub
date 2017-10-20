<template>
  <div class="info">
    <form class="rows">
      <div class="avatar">
        <label for="load_avatar" class="row">
          <div class="name">头像</div>
          <div class="value">
            <img :src="preview_avatar||user_info.avatar" alt="" height="100%">
            <i class="iconfont icon-return"></i>
          </div>
        </label>
        <input type="file" name="load_avatar" id="load_avatar" hidden @change="loadImg" accept="image/gif,image/jpeg,image/jpg,image/png">
      </div>
      <div class="bg">
        <label for="load_bg" class="row">
          <div class="name">个人主页背景</div>
          <div class="value">
            <img :src="preview_bg||user_info.bg" alt="">
            <i class="iconfont icon-return"></i>
          </div>
        </label>
        <input type="file" id="load_bg" hidden @change="loadImg" accept="image/gif,image/jpeg,image/jpg,image/png">
      </div>
      <div class="row" @click="modifyName">
        <div class="name">昵称</div>
        <div class="value">
          <span>{{user_info.name}}</span>
          <i class="iconfont icon-return"></i>
        </div>
      </div>
      <div class="row" @click="modifySex">
        <div class="name">性别</div>
        <div class="value">
          <span>{{user_info.sex}}</span>
          <i class="iconfont icon-return"></i>
        </div>
      </div>
      <div class="row" @click="modifyDesc">
        <div class="name">简介</div>
        <div class="value">
          <span>{{user_info.desc}}</span>
          <i class="iconfont icon-return"></i>
        </div>
      </div>
    </form>
    <div class="cropper" v-show="show_cropper">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedBox="option.fixedBox"
      ></vueCropper>
      <div class="bar">
        <div @click="cancelCropper"><i class="iconfont icon-guanbi"></i>取消</div>
        <div @click="confirmCropper">确定</div>
      </div>
    </div>
    <edit-page @cancel="show_edit=false"
               @confirm="getEdit" 
               :showFlag="show_edit" 
               :data="init_edit"></edit-page>
  </div>
</template>

<script>

  import mixin from '@/assets/js/mixin'

  import VueCropper from 'vue-cropper'

  import EditPage from './edit-page'

  import qs from 'qs'

  export default {
    name: 'info',
    mixins: [mixin],
    data() {
      return {
        preview_avatar: '',
        preview_bg: '',
  
        show_cropper: false,
        loading: '',
        option:{
          img: '',
          size: 0.8,
          outputType: '',
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          fixedBox: true
        },

        show_edit: false,
        init_edit: {
          title: '',
          content: '',
          type:''
        }
      }
    },
    components:{
      VueCropper,
      EditPage
    },
    methods:{
      loadImg(e){
        const target = e.target
        const id = target.id
        const file = target.files[0]
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = e =>{
          if(id==='load_avatar'){
            this.option = {
              img: '',
              size: 0.8,
              outputType: '',
              autoCrop: true,
              autoCropWidth: 200,
              autoCropHeight: 200,
              fixedBox: true
            }
            this.loading = 'avatar'
          }else{
            this.option = {
              img: '',
              size: 0.8,
              outputType: '',
              autoCrop: true,
              autoCropWidth: this.clientWidth,
              autoCropHeight: 0.6*this.clientWidth,
              fixedBox: true
            }
            this.loading = 'bg'
          }
          this.show_cropper = true
          this.option.img = e.target.result
        }
      },
      cancelCropper(){
        this.show_cropper = false
      },
      confirmCropper(){
        this.$refs.cropper.getCropBlob((data) => {
          // do something  
          const  url = URL.createObjectURL(data)
          if(this.loading==='avatar'){
            this.preview_avatar = url
          }else{
            this.preview_bg = url
          }
          this.uploadImg(this.loading,data)
        })
        this.show_cropper = false
      },
      modifyName(){
        this.show_edit = true
        this.init_edit ={
          title: '修改昵称',
          content: this.user_info.name,
          type: 'name'
        }
      },
      modifySex(){
       
      },
      modifyDesc(){
        this.show_edit = true
        this.init_edit ={
          title: '修改简介',
          content: this.user_info.desc,
          type: 'desc'
        }
      },
      getEdit(type,content){
        this.show_edit = false
        if(!content)return
        this.$set(this.user_info,type,content)

        this.updateUserInfo({[type]: content},null,res=>{
          console.log(res)
        })
      },
      updateUserInfo(param,config,cb){
        // 发起请求，修改用户信息
        this.$http.post('/user_info',qs.stringify(param),config).then(res=>{
          cb(res.data)
        }).catch(err=>{
           console.log(err)
        })
      },
      uploadImg(type,file){
        const param = new FormData() //创建form对象
        param.append('type',type)//通过append向form对象添加数据
        param.append('upload',file)
        const config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        this.$http.post('/user_info',param,config)
          .then(res=>{
            console.log(res.data);
        })        
      }
    }
  }
</script>

<style scoped>
  .info{
    padding-top: 10px;
    font-size: 14px;
  }
  .rows{
    padding: 0 10px;
    background-color: #fff;
  }
  .row{
    display: flex;
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #f4f4f4;
    justify-content: space-between;
  }
  .avatar img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .bg img{
    width: 50px;
    height: 30px;
    vertical-align: middle;
  }
  .cropper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: #000;
    /* background-color: rgba(7,7,17,.7); */
  }
  .vue-cropper{
    /* background-image: none; */
  }
  .cropper .bar{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    color: #fff;
    font-size: 16px;
  }
  .cropper .bar .icon-guanbi{
    font-size: 14px !important;
  }
  .vue-cropper{
    background-image: none;
  }
  .cropper-box{
    overflow: hidden;
    background: rgba(7,17,27,.7);
  }
</style>