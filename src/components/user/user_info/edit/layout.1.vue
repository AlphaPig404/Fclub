<template>
  <div class="info">
    <form class="rows">
      <div class="avatar">
        <label for="load_avatar" class="row">
          <div class="name">头像</div>
          <div class="value">
            <img :src="user_info.avatar" alt="" height="100%">
            <i class="iconfont icon-return"></i>
          </div>
        </label>
        <input type="file" name="load_avatar" id="load_avatar" hidden @change="loadImg" accept="image/gif,image/jpeg,image/jpg,image/png">
      </div>
      <div class="bg">
        <label for="load_bg" class="row">
          <div class="name">个人主页背景</div>
          <div class="value">
            <img :src="user_info.bg" alt="" accept="image/gif,image/jpeg,image/jpg,image/png">
            <i class="iconfont icon-return"></i>
          </div>
        </label>
        <input type="file" id="load_bg" hidden @change="loadImg">
      </div>
      <div class="row">
        <div class="name">昵称</div>
        <div class="value">
          <span>{{info.name}}</span>
          <i class="iconfont icon-return"></i>
        </div>
      </div>
      <div class="row">
        <div class="name">性别</div>
        <div class="value">
          <span>{{user_info.sex}}</span>
          <i class="iconfont icon-return"></i>
        </div>
      </div>
      <div class="row">
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
    
  </div>
</template>

<script>

  import mixin from '@/assets/js/mixin'

  import VueCropper from 'vue-cropper'

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
        }
      }
    },
    components:{
      VueCropper
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
        this.$refs.cropper.getCropData((data) => {
          // do something
          if(this.loading==='avatar'){
            this.preview_avatar = data
          }else{
            this.preview_bg = data
          }
        })
        this.show_cropper = false
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