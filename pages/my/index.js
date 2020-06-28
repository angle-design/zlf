// pages/my/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
    messagelist:[
      {
        "isnew":1,
        "school":'北京大学1',
        "time":'12:50',
        content:'我问我我哦我我我我我我觉得考试科目三顺利'
      },
      {
        "isnew":0,
        "school":'北京大学2',
        "time":'12:50',
        content:'我问我我哦我我我我我我觉得考试科目三顺利'
      },
      {
        "isnew":0,
        "school":'北京大学3',
        "time":'12:50',
        content:'我问我我哦我我我我我我觉得考试科目三顺利'
      }
    ]
  },
  gotocollect:function(){
    wx.navigateTo({
      url:"/pages/my/collect"
    })
  },
  gotobrowse:function(){
    wx.navigateTo({
      url:"/pages/my/browse"
    })
  },
  gotomess:function(){
    wx.navigateTo({
      url:"/pages/school/contact?id=tbufhgQv&touid=88bf6cf71f944133823397d7cfe7a4eb"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ///lxb-api/minapp/user
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        currentTab: 2 
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})