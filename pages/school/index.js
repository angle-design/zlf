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
    isIphoneX:false,
    loadStatus:1,//状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.clearStorage();
    // this.getlist();
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
    
    wx.getStorage({
      key: 'LIST',
      success:(res)=>{
        this.setData({
          schoollist:res.data
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    })
    wx.getStorage({
      key: 'PAGE',
      success:(res)=>{
        console.log(res)
        this.setData({
          page:res.data
        })
      },
      fail:(err)=>{
        console.log(err)
        this.setData({
          page:1
        })
      }
    })
    wx.getStorage({
      key: 'LOAD',
      success:(res)=>{
        this.setData({
          loadStatus:res.data
        })
      },
      fail:(err)=>{
        this.setData({
          loadStatus:1
        })
      }
    })
    this.setData({
      imgpath:app.globalData.Imgpath
    })
    this.getinstitutionlist();
    // this.onLoad();
  },
  getinstitutionlist(){
    app.post(app.globalData.Apipath+'/lxb-api/institution/list',{
      areaId: "",
      content: "",
      countryId: "",
      current:this.data.page,
      pageSize: 10,
      schoolLevelId: ""
    })
    .then((res)=>{
      if(res){
        if (this.data.page == 1) {
          if(res.length<8){
            this.setData({
              loadStatus:2
            })
          }
          this.setData({
            schoollist:res,
          })
        } else {
          this.setData({
            schoollist :this.data.schoollist.concat(res)
          })
          if(res.length==0){
            this.setData({
              loadStatus:2
            })
          }
        }
        if(res.length>0){
          wx.setStorage({
            key: 'LIST',
            data: this.data.schoollist,
          })
          wx.setStorage({
            key: 'PAGE',
            data: this.data.page,
          })
        }
        
        
      }else{
        this.setData({
          loadStatus:2
        })
      }
      wx.setStorage({
        key: 'LOAD',
        data: this.data.loadStatus,
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
    var that = this;
    (this.data.page)++;
    this.getinstitutionlist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})