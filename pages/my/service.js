// pages/my/service.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxNumber:500,//可输入最大字数
    number: 0,//已输入字数
    leibieflag:false,
    servicebie:'国（境）外学历学位认证',
    serviceid:1,
    leibielist:[{name:'国（境）外学历学位认证',id:'1'},{name:'留学存档',id:'2'},{name:'就业报到',id:'3'},{name:'公派留学',id:'4'}],
    name:'',
    email:'',
    content:''
  },
// 判断剩余字数
  inputText: function (e) { //监听输入，实时改变已输入字数
    let value = e.detail.value;//获取textarea的内容，
    let len = value.length;//获取textarea的内容长度
    this.setData({
      'number': len,
        content:e.detail.value
    })
  },
  getname:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  getemail:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  toleibie(){
    this.setData({
      leibieflag:true
    })
  },
  toselect(e){
    this.setData({
      leibieflag:false,
      servicebie:e.currentTarget.dataset.name,
      serviceid:e.currentTarget.dataset.id
    })
  },
  advisory:function(){
    if(!this.data.name || !this.data.email || !this.data.content){
      return false;
    }
    app.post(app.globalData.Apipath+'/lxb-api/minapp/business/advisory',{
      "content": this.data.content,
      "createTime": "",
      "email": this.data.email,
      "id": "",
      "name": this.data.name,
      "type": this.data.serviceid,
      "userId": ""
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      wx.showToast({
        title: '提交成功',
          icon: "none"
      });
    })
    .catch(err=>{
      wx.showToast({
        title: err.msg,
          icon: "none"
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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