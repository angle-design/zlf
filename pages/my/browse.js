// pages/my/browse.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new: {},
    case:{},
    school:{},
    browlist:null,
    page:1,
    loading:false,
    noMore:false,
    imgpath:app.globalData.Imgpath,
    host:app.globalData.host,
    loadStatus:1,//状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist();
  },
  getlist:function(){
    app.post(app.globalData.Apipath+'/lxb-api/minapp/browse/list',{
      "current": this.data.page,
      "pageSize": 8
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      var res_ = [];
      res.forEach(function(item,index) {
        if(item.modelType==3){
          res_[index]={
            'name':item.institutionName,
            'id':item.modelId,
            'logo':item.logo,
            'province':item.province,
            'updateTime':item.updateTime,
            'modelType':item.modelType
          }
        }else{
          res_[index] = item;
        }
      });
      if(res){
        if (this.data.page == 1) {
          if(res.length<8){
            this.setData({
              loadStatus:2
            })
          }
          this.setData({
            browlist:res_,
          })
        } else {
          this.setData({
            browlist :this.data.browlist.concat(res_)
          })
          if(res.length==0||res.length<8){
            this.setData({
              loadStatus:2
            })
          }
        }
      }else{
        this.setData({
          loadStatus:2
        })
      }
    })
  },
 
  gotocase:function(event){
    var id =  event.currentTarget.dataset.id;
    wx.navigateTo({
      url:"/pages/studentcases/casedetail?id="+id
    })
  },
  gotonews:function(event){
    var id = event.currentTarget.dataset.id
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