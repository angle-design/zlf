// pages/news/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newlist:[
    ],
    newtoplist:[],
    imgpath:null,
    page:1,
    loading:false,
    noMore:false,
    host:app.globalData.host,
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
    this.getlist();
    this.setData({
      imgpath:app.globalData.Imgpath
    })

  },
  getlist:function(){
    this.setData({
      loading: false
    })
    app.post(app.globalData.Apipath+'/lxb-api/minapp/information/list',{
      "current": this.data.page,
      "pageSize": 4
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      if(this.data.page==1){
        this.setData({
          newtoplist:res[0],
          newlist :res.slice(1)
        })
      }else{
        //追加
        this.setData({
          newlist :this.data.newlist.concat(res)
        })
      }
      if (res.length == 0) {
        this.setData({
          noMore: true
        })
      }
    })
  },
  scrollToLower: function (e) {
    if (!this.data.loading && !this.data.noMore){
      alert(1)
      this.setData({
        loading: true,
        page: this.data.page + 1
      })
      this.getlist();
    }
  },
  gotodetail:function(evnet){
    var id = evnet.currentTarget.dataset.id
    wx.navigateTo({
      url:"/pages/news/details?id="+id
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