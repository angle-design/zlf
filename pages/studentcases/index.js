// pages/studentcases/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caselist:[],
    imgpath:null,
    page:1,
    loading:false,
    noMore:false,
    host:app.globalData.host,
    loadStatus:1,//状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist();
    this.setData({
      imgpath:app.globalData.Imgpath
    })
  },
  getlist(){
    this.setData({
      loading: false
    })
    app.post(app.globalData.Apipath+'/lxb-api/minapp/studentcase/list',{
      "current": this.data.page,
      "pageSize": 10
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      console.log(res)
      if(res){
        if(this.data.page==1){
          this.setData({
            caselist :res
          })
        }else{
          this.setData({
            caselist :this.data.caselist.concat(res)
          })
          if (res.length == 0) {
            this.setData({
              loadStatus: 2
            })
          }
        }
    }else{
      this.setData({
        loadStatus: 2
      })
    }
    })
  },
  scrollToLower: function (e) {
    if (!this.data.loading && !this.data.noMore){
      this.setData({
        loading: true,
        page: this.data.page + 1
      })
      this.getlist();
    }
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
    var that = this;
    (this.data.page)++;
    this.getlist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})