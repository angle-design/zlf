const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerTitle: {
      type: String,
      value: '头部标题'
    },
    isShowBack: {
      type: String,
      value: "true"
    },
    topbackground:{
      type: String,
      value: "背景颜色"
    },
    toptextcolor:{
      type: String,
      value: "文字颜色"
    },
    imgsrc:{
      type: String,
      value: "返回"
    },
    fontsize:{
      type:String,
      value:"32rpx",
      
    },
    bwidth:{
      type:String,
      value:"116px",
      
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {
      statusBarHeight: app.globalData.statusBarHeight,
      titleBarHeight: app.globalData.titleBarHeight
    }
  },
  methods: {
    // 这里是一个自定义方法
    goback: function () {
      wx.navigateBack({
        delta: 1,
      })
     }
  }
})