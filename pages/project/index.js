// pages/project/index.js=
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  host:app.globalData.host,
  tit:['项目背景','项目现状','项目性质','项目模式','项目意义'],
  curindex:0,
  title:'项目介绍'

  },
  togolle:function(e){
    this.setData({
      curindex:e.currentTarget.dataset.index
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

  },
  onPageScroll:function(e){
    let scroll = e.scrollTop; //当前的距离顶部的高度
    //是否超过开始隐藏的高度
    if (scroll > 30) {
        this.setData({
          title: ''
        })
      }else{
        this.setData({
          title: '项目介绍'
        })
      }
  },
})