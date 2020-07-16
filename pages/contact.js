// pages/contact/contact.js
const app = getApp();
const webSocket = require('../../utils/webSocket.js'); 
var inputValue = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var socketOpen = false;
var wxss = app.globalData.wsspath;
var SocketTask;

/**
 * 初始化数据
 */
function initData(that) {
  inputValue = '';
  //聊天记录
  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '欢迎咨询'
    }
  ];
  that.setData({
    msgList,
    inputValue
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    host:app.globalData.host,
    maxNumber:500,//可输入最大字数
    number: 0,//已输入字数
    weiflag:false,//微信弹窗
    zixunflag:false,//咨询弹窗
    url:null,
    user_input_text: '',//用户输入文字
    imgpath:null,
    servername:null,
    serverimg:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(this.options.touid){
      //管理员进入
      this.setData({
        url : wxss+'INSTMIN_'+this.options.id+'_'+this.options.touid
      })
    }else{
      this.setData({
        url : wxss+'GENEMIN_'+app.globalData.uinfo.id+'_'+this.options.id
      })
    }
    
    this.setData({
      imgpath:app.globalData.Imgpath
    })
    initData(this);
    this.getservername();
    this.bottom();
    
  },
  bottom: function() {
    console.log(1)
    console.log(this.data.toView)
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    if (!socketOpen) {
      this.webSocket()
    }
  },
  // 页面加载完成
  onReady: function () {
    var that = this;
    
    SocketTask.onOpen(res => {
      socketOpen = true;
      console.log('监听 WebSocket 连接打开事件。', res)
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      socketOpen = false;
      this.webSocket()
    })
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })
    SocketTask.onMessage(onMessage => {
      console.log(onMessage);
      if(onMessage.data=='连接成功'){
        return false;
      }
      // console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
      var onMessage_data = JSON.parse(onMessage.data)
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: onMessage_data.content
      })
        this.setData({
          msgList
        })
        console.log(1)
        this.bottom()
      
    })
  },
  //获取学校姓名
  getservername:function(){
    var sid = this.options.id;
    app.post(app.globalData.Apipath+'/lxb-api/minapp/getinstitution',{
      id:sid
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      console.log(res);
    })
  },
  webSocket: function () {
    // 创建Socket
    SocketTask = wx.connectSocket({
      url: this.data.url,
      data: 'data',
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },
  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })

  },

  //发送点击监听
  submitTo: function (e) {
    let that = this;
    
    if(that.options.touid){
      var data = {
        fromuser:that.options.id,
        touser:that.options.touid,
        userId:'1111111',
        content: that.data.inputValue,
        type:1
      }
    }else{
      var data = {
        fromuser:app.globalData.uinfo.id,
        touser:that.options.id,
        content: that.data.inputValue,
        type:0
      }
    }
    console.log(socketOpen)
    if (socketOpen) {
      // 如果打开了socket就发送数据给服务器
      that.sendSocketMessage(data)
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: that.data.inputValue,
        uname:app.globalData.uinfo.username,
        uimg:app.globalData.uinfo.headimg
      })
      inputValue = '';
      this.setData({
        msgList,
        inputValue
      });
      
      that.bottom()
    }else{
      console.log('连接失败')
    }
  },
  // 判断剩余字数
  inputText: function (e) { //监听输入，实时改变已输入字数
    let value = e.detail.value;//获取textarea的内容，
    let len = value.length;//获取textarea的内容长度
    this.setData({
      'number': len
    })
  },
  towei(){
    this.setData({
      weiflag:true
    })
  },
  tozixun(){
    this.setData({
      zixunflag:true
    })
  },
  closewei(){
    this.setData({
      weiflag:false
    })
  },
  closezixun(){
    this.setData({
      zixunflag:false
    })
  },
  // 打电话功能
  freeTell: function(){
    wx.makePhoneCall({
      phoneNumber: '12989789098',
    })
  },
  sendSocketMessage:function (msg) {
    var that = this;
    console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
    SocketTask.send({
      data: JSON.stringify(msg)
    }, function (res) {
      console.log('已发送', res)
    })
  }

})
