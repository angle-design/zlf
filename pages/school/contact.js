// pages/contact/contact.js
import websocket from '../../utils/wechat-websocket.js'
const app = getApp();
var inputValue = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var socketOpen = false;
var wxss = app.globalData.wsspath;
var SocketTask;
var count = 0;//记录加载的次数来判定开始的条数 msglist.length+1-count


/**
 * 初始化数据
 */
function initData(that) {
  inputValue = '';
  //聊天记录
  msgList = [
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
    serverimg:null,
    username:null,
    userimg:null,
    websocket:websocket,
    ScrollLoading:0,
    scrollAnimation:true,
    bottomid:0,
    scrollfalg:true,
    ////////////
    wxcoder:null,
    wxPhone:null,
    conname:null,
    conphone:null,
    concontent:null,
    msgflag:true
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
    this.getusername();
    this.getservername();
    this.setData({
      imgpath:app.globalData.Imgpath
    })
    initData(this);
    // this.getservername();
    // this.bottom();
    count =0;
    // wx.setTimeout(,500);
    // this.gethistory();
    this.getschoolinfo();
  },
  getschoolinfo:function(){
    app.post(app.globalData.Apipath+'/lxb-api/minapp/institution/details/',{
      "areaId": "",
      "content": "",
      "countryId": "",
      "current": 0,
      "id":this.options.id,
      "pageSize": 0,
      "schoolLevelId": ""
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      this.setData({
        infodata:res,
        iscollect:res.ifCollect,
        wxPhone:res.contactPhone
      });
     if(res.wxcoder){
      this.setData({
        wxcoder:this.data.imgpath+res.wxcoder
      })
     }
    })
  },
  bottom: function() {
    this.setData({
      toView: 'msg-' + this.data.bottomid
    })
    console.log(this.data.bottomid)
  },
  dosubmit:function(){
    if(!this.data.conname || !this.data.conphone || !this.data.concontent){
      this.setData({
        msgflag:false
      })
      return false;
    }
    app.post(app.globalData.Apipath+'/lxb-api/minapp/contact/advisory',{
      "content": this.data.concontent,
      "createTime": "",
      "delFlag": 0,
      "id": 0,
      "institutionId": this.options.id,
      "institutionName": "",
      "phone": "",
      "updateBy": 0,
      "updateTime": "",
      "userId": "",
      "userName": this.data.conname,
      "userPhone": this.data.conphone,
      "wxName": ""
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      this.setData({
        zixunflag:false
      })
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
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    // 程序从后台到前台的操作--建立连接
    if(this.websocket){
      this.linkWebsocket();
    }
    
  },
  // 页面加载完成
  onReady: function () {
    let _this = this;
    // 创建websocket对象
    this.websocket = new websocket({
      // true代表启用心跳检测和断线重连
      heartCheck: true,
      isReconnection: true
    });
    // 建立连接
    this.websocket.initWebSocket({
      url: _this.data.url,
      success(res) { console.log(res) },
      fail(err) { console.log(err) }
    })
    // 监听websocket状态
    this.websocket.onSocketClosed({
      url: this.data.url,
      success(res) { console.log(res) },
      fail(err) { console.log(err) }
    })
    // 监听网络变化
    this.websocket.onNetworkChange({
      url: this.data.url,
      success(res) { console.log(res) },
      fail(err) { console.log(err) }
    })
    // 监听服务器返回
    this.websocket.onReceivedMsg(result => {
      console.log(result);
      if(result.data=='连接成功' || result.data=='pong'){
        return false;
      }
      console.log('rs==='+result);
      var onMessage_data = JSON.parse(result.data)
      if(onMessage_data.type==1){
        msgList.push({
          speaker: 'server',
          contentType: 'text',
          content: onMessage_data.content,
          uname:_this.data.servername,
          uimg:_this.data.serverimg,
          z:onMessage_data.mesId
        })
      }else{
        msgList.push({
          speaker: 'server',
          contentType: 'text',
          content: onMessage_data.content,
          uname:_this.data.username,
          uimg:_this.data.userimg,
          z:onMessage_data.mesId
        })
      }
      _this.setData({
          msgList:msgList,
          bottomid:onMessage_data.mesId
      },()=>{
        _this.bottom()
      })
     
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
        this.setData({
          servername:res.name,
          serverimg:app.globalData.Imgpath+res.logo
        },()=>{
          this.gethistory()
        })
        wx.setNavigationBarTitle({
          title: res.name    
        })
    })
  },
  //获取用户姓名
  getusername:function(){
    var sid = this.options.touid;
    if(!sid){
        this.setData({
          username:app.globalData.uinfo.username,
          userimg:app.globalData.uinfo.headimg
        })
        return false;
    }
    app.post(app.globalData.Apipath+'/lxb-api/minapp/getuser',{
      id:sid
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
     
        this.setData({
          username:res.name,
          userimg:res.logo
        })
      
    })
  },
  //获取聊天记录
  gethistory:function(){
    
    if(this.options.touid){
      var id = this.options.touid;
    }else{
      var id = this.options.id;
    }
    var _this = this;
    app.post(app.globalData.Apipath+'/lxb-api/minapp/chat/list',{
      "id": id,
	    "since": msgList.length-count,
	    "size": 11
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      if(res.length<1){
        msgList.push({
          speaker: 'server',
          contentType: 'text',
          content: '您好，请问有什么可以帮到您的？',
          uname:_this.data.servername,
          uimg:_this.data.serverimg,
          z:1
        })
        _this.setData({
          msgList:msgList
        })
        wx.hideLoading();
        _this.data.ScrollLoading=1;
        return false;
      }
      count++;//
      if(msgList.length<1){
        res.reverse();
        var isf = 1;//记录是否是第一次
      }else{
       var  isf =0;
      }
      //从首页进入
      //左侧是学校，右侧是用户
      if(!_this.options.touid ){
        var speaker =  'server';
        var speaker_ = 'customer';
      }else{
        var speaker =  'customer';
        var speaker_ = 'server';
      }
      const list = msgList;
      var lasttime;//记录最后一次时间
      var lastid=0;//记录最后一个id
      res.forEach(function(item,index) {
          if(!isf){
            if(!lastid){
              lastid = item.id;
            }
          }else{
            lastid = item.id;
          }
         
          if(item.userType>0){
            if(isf){
               //管理员消息
               list.push({
                speaker: speaker,
                contentType: 'text',
                content: item.content,
                uname:_this.data.servername,
                uimg:_this.data.serverimg,
                z:item.id
              })
            }else{
              list.unshift({
                speaker: speaker,
                contentType: 'text',
                content: item.content,
                uname:_this.data.servername,
                uimg:_this.data.serverimg,
                z:item.id
              })
            }
          }else{
            if(isf){
              //用户消息
              list.push({
                speaker: speaker_,
                contentType: 'text',
                content: item.content,
                uname:_this.data.username,
                uimg:_this.data.userimg,
                z:item.id
              })
            }else{
              //用户消息
              list.unshift({
                speaker: speaker_,
                contentType: 'text',
                content: item.content,
                uname:_this.data.username,
                uimg:_this.data.userimg,
                z:item.id
              })
            }

          }
          lasttime = item.chatTime;
          
      });
      
      list.unshift({
        speaker: 'time',
        contentType: 'text',
        content:lasttime,
        z:lastid+12222
      })
      _this.setData({
        msgList:list
      },()=>{
        if(isf){
          _this.setData({
            bottomid:lastid
          })
        }
        setTimeout(()=>{
          _this.setData({
            toView: 'msg-'  + (lastid),
          },()=>{
            _this.data.scrollAnimation =true;
            wx.hideLoading();
            _this.data.ScrollLoading  = 0;
           
          })
        },100)
      })
    })
  },
  scroll_scroll:function(e){
      var that = this
      if (that.data.ScrollLoading == 1){ //防止多次触发
        return false
      }
      wx.showLoading({
        title: '加载中',
      })
      that.data.ScrollLoading  = 1 
      console.log('触发顶部事件')
      that.data.scrollAnimation = false;
      that.gethistory();
  },
  onHide(){
    // 程序后台后的操作--关闭websocket连接
    this.websocket.closeWebSocket();
  },
  onUnload(){
    this.websocket.closeWebSocket();
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
  linkWebsocket() {
    // 建立连接
    var _this = this;
    this.websocket.initWebSocket({
      url: _this.data.url,
      success(res) { console.log(res) },
      fail(err) { console.log(err) }
    })
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
      toView: 'msg-'+this.data.bottomid,
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
      toView: 'msg-'+this.data.bottomid
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
    if(!that.data.inputValue){
      return false;
    }
   
    if(that.options.touid){
      var data = {
        fromuser:that.options.id,
        touser:that.options.touid,
        userId:app.globalData.uinfo.id,
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
      // 如果打开了socket就发送数据给服务器
      that.sendSocketMessage(data)
      if(that.options.touid){
        msgList.push({
          speaker: 'customer',
          contentType: 'text',
          content: that.data.inputValue,
          uname:that.data.servername,
          uimg:that.data.serverimg,
          z:msgList.length
        })
      }else{
        msgList.push({
          speaker: 'customer',
          contentType: 'text',
          content: that.data.inputValue,
          uname:that.data.username,
          uimg:that.data.userimg,
          z:msgList.length
        })
      }
      this.setData({
        bottomid:msgList.length-1
      })
      inputValue = '';
      this.setData({
        msgList,
        inputValue
      });
      that.bottom()
  },
  // 判断剩余字数
  inputText: function (e) { //监听输入，实时改变已输入字数
    let value = e.detail.value;//获取textarea的内容，
    let len = value.length;//获取textarea的内容长度
    this.setData({
      'number': len,
      concontent:e.detail.value
    })
  },
  saveImageToPhotosAlbum:function(){
    var that =this;
    //当用户点击分享到朋友圈时，将图片保存到相册
    wx.getImageInfo({
      src: that.data.wxcoder, //仅为示例，并非真实的资源
      success: function (res) {
      wx.saveImageToPhotosAlbum({
        filePath: res.path,
        success(res) {
          wx.showModal({
            title: '图片保存成功',
            content: '图片成功保存到相册了，去发圈噻~',
            showCancel: false,
            confirmText: '好哒',
            confirmColor: '#72B9C3',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
              app.post(app.globalData.Apipath+'/lxb-api/minapp/wx/save',{
                "id": that.options.id
              },{
                'content-type': 'application/json',
                'token':app.globalData.openid
              })
              .then((res)=>{
                  
              })
              
              that.setData({
                resetflag:false,
                canvasHidden: true
              })
            }
          })
      },
      fail(err){
        console.log(err)
      }
    })
    }
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
      phoneNumber: this.data.wxPhone,
      success:()=>{
        app.post(app.globalData.Apipath+'/lxb-api/minapp/contact/phone',{
          "id": this.options.id
        },{
          'content-type': 'application/json',
          'token':app.globalData.openid
        })
        .then((res)=>{
          
        })
      }
    })
  },
  sendSocketMessage:function (msg) {
    var that = this;
    console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
    that.websocket.sendWebSocketMsg({
      data: JSON.stringify(msg)
    }, function (res) {
      console.log('已发送', res)
    })
  },
  getname:function(e){
    this.setData({
      conname:e.detail.value
    })
  },
  getphone:function(e){
    this.setData({
      conphone:e.detail.value
    })
  },
  scrolltoa:function(flag){
  
      wx.pageScrollTo({
        duration:2000,
        selector: "#msg-6" , // #the-id节点的下边界坐标  
        success:function(res){
          console.log(res)
        }
      })
  }
})
