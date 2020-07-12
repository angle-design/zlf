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
    islogin:app.globalData.openid,
    showgetuser:true,
    isIphoneX:false
  },
  gotocollect:function(){
    var url = "/pages/my/collect";
    if(!this.checklogin(url)){
      return false;
    }
    wx.navigateTo({
      url:url
    })
  },
  gotobrowse:function(){
    var url = "/pages/my/browse";
    if(!this.checklogin(url)){
      return false;
    }
    wx.navigateTo({
      url:url
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
      if(res.length>0){
       
        let utype = app.globalData.uinfo.identity;

        for(let i=0;i<res.length;i++){
          let showh = 0;
          if(res[i].chatStatus<1){
            if(utype==1 && res[i].msgType<1){
              showh =1;
            }else if(utype<1 && res[i].userIdentity>0){
              showh =1;
            }
            
          }
          res[i]['showh'] = showh;
          
        }
       console.log(res)
       this.setData({
        messagelist:res
      })
      }
      
      
    })
    .catch((err)=>{

    })
    
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
    ///lxb-api/minapp/user
    if(app.globalData.openid){
      this.setData({
        nickname:app.globalData.uinfo.nickname,
        logo:app.globalData.uinfo.headimg,
        islogin:app.globalData.openid
      })
      this.getmesslist();
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        currentTab: 2 
      })
    }
    // this.login();
    
    if(app.globalData.openid){
      this.setData({
        nickname:app.globalData.uinfo.nickname,
        logo:app.globalData.uinfo.headimg,
        islogin:app.globalData.openid
      })
      this.getmesslist();
    }
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

  },
  checklogin:function(url){
    if(!url){
      var isshow= app.checklogin("/pages/my/index",1)
    }else{
      var isshow = app.checklogin(url,2);
    }
    if(isshow){
      wx.getSetting({
        success: res => {
           // 已经授权
           if (res.authSetting['scope.userInfo']) {
              app.login();
              
           }else{
              this.setData({
                showgetuser:false
              })
           }
        }
     })
     return false;
    }
  },
  login:function(){
    var this_ = this;
    app.checklogin("/pages/my/index",3)
    wx.getSetting({
      success: res => {
         // 已经授权
         if (res.authSetting['scope.userInfo']) {
            app.login(this_);
            // this.onShow();
         }else{
          this.setData({
            showgetuser:false
          })
        }
      }
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
})