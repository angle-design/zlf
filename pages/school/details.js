// pages/school/details.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoflag:true,
    host:app.globalData.host,
    txtHidden: true,
    teamHidden:true,
    id:null,
    imgpath:null,
    infodata:null,
    iscollect:0,
    swiperCurrent:0,
    videopath:null,
    height:'220rpx'
  },
  // 院校展开收起
  txtToggle: function() {
    　　　　let that = this;
    　　　　that.setData({
    　　　　　　txtHidden: !that.data.txtHidden
    　　　　})
    　　},
    // 项目展开收起
    teamToggle: function() {
      　　　　let that = this;
      　　　　that.setData({
      　　　　　　teamHidden: !that.data.teamHidden
      　　　　})
      　　},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      id:options.id,
      imgpath:app.globalData.Imgpath,
      videopath:app.globalData.videopath
    })
    if(!this.data.id){
      wx.navigateTo({
        url:"/pages/school/index"
      })
    }
    this.getinfo();
  },
  // 点击播放按钮视频播放
  playvideo(){
    this.setData({
      videoflag:false
    })
  },
  //轮播切换
  swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
      videoflag:true
    })
  },
  getinfo:function(){
    app.post(app.globalData.Apipath+'/lxb-api/minapp/institution/details/',{
      "areaId": "",
      "content": "",
      "countryId": "",
      "current": 0,
      "id":this.data.id,
      "pageSize": 0,
      "schoolLevelId": ""
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      this.setData({
        infodata:res,
        iscollect:res.ifCollect
      })
      
      console.log(res)
    })
  },
  collect:function(e){
    var id = e.currentTarget.dataset.id;
    var type= 0;
    if(this.data.iscollect>0){
      type =1;
    }
    app.post(app.globalData.Apipath+'/lxb-api/minapp/collect/add',{
      "id": id,
      "status":type,
      "type": 3
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      if(this.data.iscollect<1){
        this.setData({
          iscollect:1
        })
      }else{
        this.setData({
          iscollect:0
        })
      }
      
    })
    
  },
  gotoask:function(evnet){
    var id = evnet.currentTarget.dataset.id
    var url = "/pages/school/contact?id="+id;
    app.checklogin(url,2);
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