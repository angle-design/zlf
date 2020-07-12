// pages/aboutcenter/index.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgpath:null,
    host:app.globalData.host,
    schoollist:[],
    LevelId:null,
    loadStatus:1,
    page:1,
    title:'本科'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      imgpath:app.globalData.Imgpath,
      LevelId:options.LevelId
    })
    if(options.LevelId=='bWuOyYnF'){
      this.setData({
        title:'本科'
      })
    }else{
      this.setData({
        title:'硕士'
      })
    }
  },
  getinstitutionlist(){
    app.post(app.globalData.Apipath+'/lxb-api/institution/list',{
      areaId: "",
      content: "",
      countryId: "",
      current:this.data.page,
      pageSize: 10,
      schoolLevelId: this.data.LevelId
    })
    .then((res)=>{
      if(res){
        if (this.data.page == 1) {
          if(res.length<10){
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
          if(res.length==0||res.length<10){
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getinstitutionlist()
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
    console.log(0)
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