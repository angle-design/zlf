Page({
  data: {
    currentTab: 0,//默认首页为选中页面
    "backgroundColor": "#b5b6b8",
    "selectedColor": "#4189f4",
    items: [
      {
        "pagePath": "/pages/index/index", 
        "iconPath": "/image/home.png",
        "selectedIconPath": "/image/homecur.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/school/index",
        "iconPath": "/image/bo.png",
        "selectedIconPath": "/image/bocur.png",
        "text": "院校"
      },
      {
        "pagePath": "/pages/my/index",
        "iconPath": "/image/my.png",
        "selectedIconPath": "/image/mycur.png",
        "text": "我的"
      }
    ]
  },
  
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({    
        currentTab: e.target.dataset.current
      })
      let url = e.currentTarget.dataset.url;  // 点击tabbar时，跳转对应的页面
      wx.switchTab({
        url: url,
      })
    }
  },
  
})