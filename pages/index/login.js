// pages/index/login.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
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
  onGotPhone: function(e){
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      
      app.post(app.globalData.Apipath+'/lxb-api/wx/authorize',{
        encryptedData:app.globalData.userInfo.encryptedData,
        iv:app.globalData.userInfo.iv,
        openid:app.globalData.openid,
        phoneEncryptedData: e.detail.encryptedData,
        phoneIv: e.detail.iv,
        rawData:app.globalData.userInfo.rawData,
        signature:app.globalData.userInfo.signature
      })
      .then((res)=>{
        app.getuserinfo();
        if(app.globalData.reutrn_type==1){
          wx.switchTab({
             url: app.globalData.return_url,
           })
       }else{
          wx.redirectTo({
             url: app.globalData.return_url,
          })
       }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})