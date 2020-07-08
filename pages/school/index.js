// pages/school/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoollist:[],
    page:1,
    islogin:false,
    imgpath:null,
    showgetuser:true,
    host:app.globalData.host,
    isIphoneX:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 适配底部
  let modelmes = wx.getStorageSync('modelmes');
  let isIphoneX = app.globalData.isIphoneX;
  this.setData({
    isIphoneX: isIphoneX
  })
    this.setData({
      imgpath:app.globalData.Imgpath
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
        currentTab: 1 
      })
    }
    this.setData({
      page:1,
      imgpath:app.globalData.Imgpath
    })
    this.getinstitutionlist();
    
  },
  getinstitutionlist(){
    app.post(app.globalData.Apipath+'/lxb-api/institution/list',{
      areaId: "",
      content: "",
      countryId: "",
      current:this.data.page,
      pageSize: 100,
      schoolLevelId: ""
    })
    .then((res)=>{
      console.log(res);
      this.setData({
        page:this.data.page+1,
        schoollist:res
      })
    })
  },
  showempower(){
    this.setData({
      showgetuser:false
    })
  },
  hideempower(){
    this.setData({
      showgetuser:true
    })
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