Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#b6b6b8",
    selectedColor: "#428af4",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/image/home.png",
        selectedIconPath: "/image/homecur.png"
      },
      {
        pagePath: "/pages/logs/logs",
        text: "院校",
        iconPath: "/image/bo.png",
        selectedIconPath: "/image/bocur.png"
      }, 
      {
        pagePath: "/pages/logs/logs",
        text: "我的",
        iconPath: "/image/my.png",
        selectedIconPath: "/image/mycur.png"
      }
     
    ]
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})