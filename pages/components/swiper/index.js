//index.js

Component({ 
  options: { 
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  }, 
  /** 
   * 组件的属性列表 
   * 用于组件自定义设置 
  */ 
  properties: {
    // 弹窗标题 
    navData: { // 属性名 
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null
    }
  }, 
  /** 
   * 私有数据,组件的初始数据 
   * 可用于模版渲染 
   */ 
  data: { // 弹窗显示控制 
    currentTab: 0,
    navScrollLeft: 0
  }, 
  /**
   * 组件的方法列表 
   * 更新属性和数据的方法与更新页面数据的方法类似 
  */ 
 onReady(){
  wx.createSelectorQuery().select('.scroll-view').boundingClientRect((rect)=>{
    this.data.scrollViewWidth = Math.round(rect.width)
  }).exec()
},
methods:{
  switchNav(e){
    let offsetLeft = e.currentTarget.offsetLeft
    this.setData({
      navScrollLeft: offsetLeft - this.data.scrollViewWidth/2
    })
  }
}

})

