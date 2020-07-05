// pages/my/question.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
    onelist:[
      {
        xu:'Q1',
        text:'1国（境）外学历学位认证书有什么用途？',
        content:'1国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:true
      },
      {
        xu:'Q2',
        text:'2国（境）外学历学位认证书有什么用途？',
        content:'2国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
      {
        xu:'Q3',
        text:'3国（境）外学历学位认证书有什么用途？',
        content:'3国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
    ],
    
    twolist:[
      {
        xu:'Q1',
        text:'11国（境）外学历学位认证书有什么用途？',
        content:'11国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
      {
        xu:'Q2',
        text:'22国（境）外学历学位认证书有什么用途？',
        content:'22国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
      {
        xu:'Q3',
        text:'23国（境）外学历学位认证书有什么用途？',
        content:'23国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
    ],
    threelist:[
      {
        xu:'Q1',
        text:'31国（境）外学历学位认证书有什么用途？',
        content:'31国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
      {
        xu:'Q2',
        text:'32国（境）外学历学位认证书有什么用途？',
        content:'32国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
      {
        xu:'Q3',
        text:'33国（境）外学历学位认证书有什么用途？',
        content:'33国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
    ],
    fourlist:[
      {
        xu:'Q1',
        text:'1国（境）外学历学位认证书有什么用途？',
        content:'1国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
      {
        xu:'Q2',
        text:'42国（境）外学历学位认证书有什么用途？',
        content:'42国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
      {
        xu:'Q3',
        text:'43国（境）外学历学位认证书有什么用途？',
        content:'43国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:false
      },
    ],
  },
  
  toToggle:function(e){
    let a_index=e.currentTarget.dataset.index;
    let that=this;
    that.data.onelist[a_index].showflag=!that.data.onelist[a_index].showflag;
    this.setData({
      onelist:that.data.onelist
    })
  },
  toToggletwo:function(e){
    let a_index=e.currentTarget.dataset.index;
    let that=this;
    that.data.twolist[a_index].showflag=!that.data.twolist[a_index].showflag;
    this.setData({
      twolist:that.data.twolist
    })
  },
  toTogglethree:function(e){
    let a_index=e.currentTarget.dataset.index;
    let that=this;
    that.data.threelist[a_index].showflag=!that.data.threelist[a_index].showflag;
    this.setData({
      threelist:that.data.threelist
    })
  },
  toTogglefour:function(e){
    let a_index=e.currentTarget.dataset.index;
    let that=this;
    that.data.fourlist[a_index].showflag=!that.data.fourlist[a_index].showflag;
    this.setData({
      fourlist:that.data.fourlist
    })
  },
  toservice:function(){
    wx.navigateTo({
      url: '/pages/my/service',
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