// pages/news/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    imgpath:null,
    infodata:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.openid){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
    this.setData({
      id:options.id,
      imgpath:app.globalData.Imgpath
    })
    this.getinfo();
  },
  getinfo:function(){
    app.post(app.globalData.Apipath+'/lxb-api/minapp/information/details/'+this.data.id,{
      
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      res.content = res.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      this.setData({
        infodata :res
      })
      
      console.log(res)
    })
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