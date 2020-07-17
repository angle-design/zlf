// pages/aboutcenter/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
host:app.globalData.host
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

  },
  previewImage:function(){
    wx.previewImage({
      current: 'http://special.meirixue.com/exhibitionlian/images/ma11.png', // 当前显示图片的http链接
      urls: [
        "http://special.meirixue.com/exhibitionlian/images/ma11.png",
        "http://special.meirixue.com/exhibitionlian/images/ma22.png",
        "http://special.meirixue.com/exhibitionlian/images/ma33.png",
        "https://satc.cscse.edu.cn/lxb-api/file/showImg/jAiPAmQC_20200716.png"
      ] // 需要预览的图片http链接列表
    })
  }
})