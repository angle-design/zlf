// pages/school/details.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoflag:true,
    host:app.globalData.host,
    txtHidden: true,
    teamHidden:true
  },
  // 院校展开收起
  txtToggle: function() {
    　　　　let that = this;
    　　　　that.setData({
    　　　　　　txtHidden: !that.data.txtHidden
    　　　　})
    　　},
    // 项目展开收起
    teamToggle: function() {
      　　　　let that = this;
      　　　　that.setData({
      　　　　　　teamHidden: !that.data.teamHidden
      　　　　})
      　　},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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