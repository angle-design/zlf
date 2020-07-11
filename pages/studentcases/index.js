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
    arry:[],
    damoHeight:0,
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
      var _this=this;
      if(res){
           // ========图片懒加载开始========
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
        // 获取每个的高度
   var query = wx.createSelectorQuery();
       query.select('.cases').boundingClientRect(function (rect) {
          _this.setData({
             damoHeight: rect.height/2
         })
        let num = Math.ceil(wx.getSystemInfoSync().windowHeight / (_this.data.damoHeight*2));
        for (let i = 0; i < num; i++) {
          _this.data.arry[i] = true;
        };
        _this.setData({
          arry: _this.data.arry
        })
       }).exec();
   
    // ========图片懒加载结束============
    }else{
      this.setData({
        loadStatus: 2
      })
    }
    })
  },
  // 翻页图片懒加载
    onPageScroll: function (res) {
    var _this = this;
    var str = parseInt(res.scrollTop /(_this.data.damoHeight*2));
    _this.data.arry[str] = true;
    _this.setData({
      arry: _this.data.arry
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