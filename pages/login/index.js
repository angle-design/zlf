// pages/login/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_code:null,
    headimg:'https://xcx.static.tongbux.com/xcx/20190525/5ce90279bc37b.png'
  },
  onGotPhone: function(e){
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res
      }
    })
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
            this.setData({
             headimg:res.headimg
            })
            app.globalData.uinfo = res;
            wx.setStorageSync('uinfo',res);
            wx.navigateBack({
              delta: 1
            
            })
          })
        }
  },
  getUserInfo:function(e){
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(app.globalData.userInfo)
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