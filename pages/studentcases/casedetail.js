// pages/studentcases/casedetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    infodata:null,
    imgpath:null,
    host:app.globalData.host,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      id:options.id,
      imgpath:app.globalData.Imgpath
    })
    if(!this.data.id){
      wx.navigateTo({
        url:"/pages/studentcases/index"
      })
    }
    
    this.getinfo();
  },
  getinfo:function(){
    app.post(app.globalData.Apipath+'/lxb-api/minapp/studentcase/details/'+this.data.id,{
      
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
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