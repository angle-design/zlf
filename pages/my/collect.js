// pages/my/collect.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:null,
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
    app.post(app.globalData.Apipath+'/lxb-api/minapp/collect/list',{
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
          res_[index]={
            'name':item.institutionName,
            'id':item.modelId,
            'logo':item.logo,
            'province':item.province
          }
         
      });
      if(this.data.page==1){
        this.setData({
          school:res_,
        })
      }else{
        //追加
        this.setData({
          school :this.data.school.concat(res_)
        })
      }
      
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