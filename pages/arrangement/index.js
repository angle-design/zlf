// pages/aboutcenter/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
    imgpath:app.globalData.Imgpath,
    infolist:[]
  },
  // 进入层级结果
  toresult:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/arrangement/schoolresult?LevelId='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinfo();
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
  getinfo:function(){
    app.get(app.globalData.Apipath+'/lxb-api/school/list',{
      
    })
    .then((res)=>{
      console.log(res);
      this.setData({
        infolist:res
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})