// pages/studentcases/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caselist:[
      {
        "images":'../../image/logo.png',
        'name':'莫小贝1',
        "text1":'卡卡摩卡吗啦啦啦留学项目',
        'text2':'留学项目',
        "school":'上海大学'
      },
      {
        "images":'../../image/logo.png',
        'name':'莫小贝2',
        "text1":'卡卡摩卡吗啦啦啦卡卡摩卡吗啦啦啦卡卡摩卡吗啦啦啦',
        'text2':'留学项目',
        "school":'上海大学'
      },
      {
        "images":'../../image/logo.png',
        'name':'莫小贝3',
        "text1":'卡卡摩卡吗啦啦啦卡卡摩卡吗啦啦啦',
        'text2':'留学项目',
        "school":'上海大学'
      },
      {
        "images":'../../image/logo.png',
        'name':'莫小贝4',
        "text1":'卡卡摩卡吗啦啦啦',
        'text2':'留学项目',
        "school":'上海大学'
      },
      {
        "images":'../../image/logo.png',
        'name':'莫小贝5',
        "text1":'卡卡摩卡吗啦啦啦',
        'text2':'留学项目',
        "school":'上海大学'
      },
      {
        "images":'../../image/logo.png',
        'name':'莫小贝6',
        "text1":'卡卡摩卡吗啦啦啦',
        'text2':'留学项目',
        "school":'上海大学'
      },
      {
        "images":'../../image/logo.png',
        'name':'莫小贝7',
        "text1":'卡卡摩卡吗啦啦啦',
        'text2':'留学项目',
        "school":'上海大学'
      },
      {
        "images":'../../image/logo.png',
        'name':'莫小贝8',
        "text1":'卡卡摩卡吗啦啦啦',
        'text2':'留学项目',
        "school":'上海大学'
      }
    ],
    imgpath:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist();
    this.setData({
      imgpath:app.globalData.Imgpath
    })
  },
  getlist(){
    app.post(app.globalData.Apipath+'/lxb-api/minapp/studentcase/list',{
      "current": 0,
      "pageSize": 10
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      this.setData({
        caselist :res
      })
      
      console.log(res)
    })
  },
  gotodetail:function(evnet){
    var id = evnet.currentTarget.dataset.id
    wx.navigateTo({
      url:"/pages/studentcases/casedetail?id="+id
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