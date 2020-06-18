//app.js
App({
  onLaunch: function () {
   
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
   post : function(url, data,header){
     header = header?header:"{ 'content-type': 'application/json' }";
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
          header: header,
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
    Apipath:'http://59.110.242.178/',
    Imgpath:'http://59.110.242.178//lxb-api/file/showImg/'
  }
})