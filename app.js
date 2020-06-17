//app.js
App({
  onLaunch: function () {
    wx.hideTabBar()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  /** 
    * 自定义post函数，返回Promise
    * +-------------------
    * +-------------------
    * @param {String}      url 接口网址
    * @param {arrayObject} data 要传的数组对象 例如: {name: 'sxx', age: 32}
    * +-------------------
    * @return {Promise}    promise 返回promise供后续操作
    */
   post : function(url, data){
    var promise = new Promise((resolve, reject) => {
       //init
       var that = this;
       var postData = data;
       /*
       //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
       postData.signature = that.makeSign(postData);
       */
       //网络请求
       wx.request({
          url: url,
          data: postData,
          method: 'POST',
          header: { 'content-type': 'application/json' },
          success: function (res) {//服务器返回数据
             if (res.data.code == 10000) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件
                resolve( res.data.data );
             } else {//返回错误提示信息
                reject( res.data );
             }
          },
          error: function (e) {
             reject('网络出错');
          }
       })
    });
    return promise;
 },
 get : function(url){
  var promise = new Promise((resolve, reject) => {
     //init
     var that = this; 
     //网络请求
     wx.request({
        url: url,
        data: null,
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success: function (res) {//服务器返回数据
           if (res.data.code == 10000) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件
              resolve( res.data.data );
           } else {//返回错误提示信息
              reject( res.data );
           }
        },
        error: function (e) {
           reject('网络出错');
        }
     })
  });
  return promise;
},
  globalData: {
    userInfo: null,
    list:[],
    host:'http://59.110.242.178/lxb-image/',
    Apipath:'http://59.110.242.178/'
  }
})