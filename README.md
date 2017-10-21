# Flcub

> 个人开发的用于学习交流的全栈项目

## 项目说明  
最近刚完成一个基于Vue全家桶开发的公司项目，暂时又没有新的项目可做，就想着全栈开发一个个人项目，用于系统的学习前后端的开发和实践各种新技术。  
最开始的想法是做一个基于饿了么的聚合点餐的小程序，用户可以在各自的手机上点餐后生成统一订单，完成下单和计算价格的功能。这里面有个很关键的点是，需要在小程序中嵌入饿了么，调用饿了么OpenAPI的数据接口完成功能。而饿了么的接口需要拿到官方授权，发了请求授权的邮件后一直未收到回复。。于是就只能gg了  
然后就问了同事(死宅)的需求来开发一个追番的网站。  
因为是用于移动端，自然就选择了Vue全家桶。配合官方脚手架能够快速的完成前端部分的开发。后台部分使用的nodejs(koa),mongodb(mongoose)，算是比较经典的组合。对于在做前端想了解学习后台开发的童鞋再合适不过了。  

__注：此项目只用于学习交流，正常使用还请到各相关网站。__

## 部分效果演示  

### 添加到主屏
<img src="https://github.com/AlphaPig404/Fclub/gifs/GIF2.gif" width="250"/>

### 浏览
<img src="https://github.com/AlphaPig404/Fclub/gifs/GIF3.gif" width="250"/>

### 发帖
<img src="https://github.com/AlphaPig404/Fclub/gifs/GIF8.gif" width="250"/>

### 评论

<img src="https://github.com/AlphaPig404/Fclub/gifs/GIF9.gif" width="250"/>  

### 上传头像
<img src="https://github.com/AlphaPig404/Fclub/gifs/GIF10.gif" width="250"/>


## 技术栈
> 前端：vue2 + vue-router + vuex + vuecli(全家桶) + webpack + axios + stylus + better-scroll等

>后台：Koa + mongoose + pm2 + nginx

## 关于数据接口
轮播图和每日放送部分用的是借用bilibili的接口   
资讯部分用的是借用MissEVAN的接口  
漫画频道用的是借用新浪漫画的接口  
年度新番是按照番剧表从爱奇艺的搜索(全网)爬取的

## 使用说明

``` bash
# 下载项目
git clone https://github.com/AlphaPig404/Fclub.git

# 安装依赖
npm install

# 本地开发环境localhost:8080
npm run dev

# 接口配置 
需要将项目中的接口代理到线上，或者使用本地的mock数据
 proxyTable:{
  '/news': {
    target: 'http://wap.fulun.club',
      pathRewrite: {
      '^/news': '/news'
    }
  },
  ...
 }

```
## 效果演示
[查看demo请戳这里](http://wap.fulun.club/)（请用chrome手机模式预览）
### 移动端扫描下方二维码
<img src="http://ofwmbpctf.bkt.clouddn.com/1508476681.png" width="250" height="250"/>

## 目标功能

### 数据展示
- [x] 首页推荐
- [x] 每日放送
- [x] 年度新番
- [x] 最新资讯
- [x] 漫画频道

### 微帖
- [x] 发帖功能
- [x] 图片压缩上传功能
- [x] 图片预览功能
- [x] 评论功能
- [x] 点赞功能 
- [x] 下拉刷新功能
- [x] 上拉加载功能


### 用户中心
- [x] 用户注册
- [x] 用户登录
- [x] 修改密码
- [x] 修改个人信息(包括上传头像，背景图)
- [x] 个人动态

### 消息
- [ ] 回复我的
- [ ] 赞 
- [ ] 提到我的   
>这部分主要是后台相关接口的开发，会留着后面完成

## 小结
最近公司有新的开发项目需要启动，目前这个项目并没有完全开发完，后续会抽时间继续完成开发。等到后台开发完成后也会将后台代码开放出来，有兴趣的童鞋可以持续关注一下。项目中还有很多需要改进的地方，欢迎交流~~~
