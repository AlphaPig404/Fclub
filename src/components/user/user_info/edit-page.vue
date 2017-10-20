<template>
  <transition name="vslide">
    <div class="edit-page" v-show="showFlag">
      <div class="top">
        <span @click="onCancel">取消</span>
        <p class="title">{{data.title}}</p>
        <span @click="onConfirm">确定</span>
      </div>
      <div class="input">
        <i class="iconfont icon-denglu"></i>
        <input type="text" autofocus :placeholder="data.content" v-model="content">
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'edit-page',
    props:{
      showFlag:{
        default: false,
        type: Boolean
      },
      data:{
        default: {},
        type: Object
      }
    },
    data() {
      return {
        content: ''
      }
    },
    methods:{
      onCancel(){
        this.$emit('cancel')
        this.content = ''
      },
      onConfirm(){
        this.$emit('confirm',this.data.type,this.content)
        this.content = ''
      }
    }
  }
</script>

<style scoped>
  .edit-page{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f4f4f4;
  }
  .edit-page .top{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fb80a8;
    color: #fff;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .edit-page .top .title{
    flex: 1;
    font-weight: bold;
    font-size: 18px;
  }
  .edit-page .input{
    display: flex;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    background-color: #fff;
    font-size: 16px;
  }
  .edit-page .input>input{
    flex: 1;
  }
  .edit-page .input>i{
    flex: 0 0 60px;
    font-size: 18px !important;
  }
  .vslide-enter-active, .vslide-leave-active {
    transition: all .3s
  }
  .vslide-enter, .vslide-leave-to{
    transform: translateY(100%)
  }
</style>