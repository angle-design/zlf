// pages/my/browse.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new: {
      "id":1,
      "img":"../../../image/bg.png",
      "title":'2020年留学政策发布1',
      "text":"2020年留学2020年留学政策发布2020年留学政策发布2020年留学政策发布2020年留学政策发布政策发布2020年留学政策发布2020年留学政策发布2020年留学政策发布"
    },
    case:{
      "img":'http://59.110.242.178//lxb-api/file/showImg/M6kiQGsB_20200618.jpeg',
      "studentName":"莫小贝",
      "title":"睡觉啊开始啦卡爱卡啦啦啦",
      "name":"清华大学"
    },
    school:{
      "logo":'http://pkunews.pku.edu.cn/images/web-v-logo1.png',
      "name":'清华大学',
      "province":'北京'
    },
    browlist:null,
    page:1,
    loading:false,
    noMore:false,
    imgpath:app.globalData.Imgpath,
    host:app.globalData.host
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist();
  },
  getlist:function(){
    this.setData({
      loading: false
    })
    app.post(app.globalData.Apipath+'/lxb-api/minapp/browse/list',{
      "current": this.data.page,
      "pageSize": 8
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      if (res.length == 0) {
        this.setData({
          noMore: true
        })
        return false;
      }
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
      if(this.data.page==1){
        this.setData({
          browlist:res_,
        })
      }else{
        //追加
        this.setData({
          browlist :this.data.browlist.concat(res_)
        })
      }
      // console.log(this.data.browlist);
    })
    
  },
  scrollToLower: function (e) {
    console.log(1);
    if (!this.data.loading && !this.data.noMore){
      this.setData({
        loading: true,
        page: this.data.page + 1
      })

      this.getlist();
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})