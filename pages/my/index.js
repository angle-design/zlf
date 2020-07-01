// pages/my/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
    messagelist:null,
    nickname:null,
    logo:null,
    islogin:app.globalData.openid
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
  gotomess:function(e){
    var sid = e.currentTarget.dataset.id;
    var uuid = e.currentTarget.dataset.uuid;
    var type = e.currentTarget.dataset.type;
    if(type<1){
      wx.navigateTo({
        url:"/pages/school/contact?id="+sid+"&touid="+uuid
      })
    }else{
      wx.navigateTo({
        url:"/pages/school/contact?id="+sid
      })
    }
    
  },
  getmesslist:function(){
    app.post(app.globalData.Apipath+'/lxb-api/minapp/onlineadvisory/list',{
      "current": 1,
      "pageSize": 800
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      this.setData({
        messagelist:res
      })
    })
    .catch((err)=>{

    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ///lxb-api/minapp/user
    this.setData({
      nickname:app.globalData.uinfo.nickname,
      logo:app.globalData.uinfo.headimg
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        currentTab: 2 
      })
    }
    this.getmesslist();
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