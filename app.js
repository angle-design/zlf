//app.js
App({
  onLaunch: function () {
   wx.hideTabBar()
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
checklogin:function(url,type){
   if(this.globalData.openid){
      this.getuserinfo();
      if(type==1){
         wx.switchTab({
            url: url,
          })
      }else{
         wx.navigateTo({
            url: url,
         })
      }
     return false;
    }else{
       this.globalData.return_url = url;
      this.globalData.reutrn_type = type;
      return true;
      
    }
},
wxgetuserinfo:function(e){
   
      if (!e.detail.userInfo) {
          wx.showToast({
            title: '拒绝授权后无法使用小程序',
              icon: "none"
          });
      } else {
         
          this.login()
      }
},
login:function(obj){
   //授权登录
   wx.login({
      complete: (res) => {
        //请求登录接口
        this.post(this.globalData.Apipath+'/lxb-api/wx/login',{
          js_code: res.code
        })
        .then((result)=>{            
          this.globalData.openid = result.token;
            if(result.authorize==1){
               wx.getUserInfo({
                  success: res => {
                    this.globalData.userInfo = res
                  }
                })
              //需要授权手机号
              wx.navigateTo({
                url: '/pages/index/login'
              })
            }else{
              //不需要授权手机号
              this.getuserinfo();
              this.post(this.globalData.Apipath+'lxb-api/minapp/user',{
      
               },{
               'content-type': 'application/json',
               'token':this.globalData.openid
               })
               .then((res)=>{
                  this.globalData.uinfo = res;
                  if(this.globalData.reutrn_type==1){
                     wx.switchTab({
                        url: this.globalData.return_url,
                      })
                  }else if(this.globalData.reutrn_type==3){
                     wx.switchTab({
                        url: this.globalData.return_url,
                        success:function(e){
                           var page = getCurrentPages().pop(); 
                           page.onLoad();
                         }
                      })
                    
                  }else{
                     wx.navigateTo({
                        url: this.globalData.return_url,
                     })
                  }
               })
            }
        })
      },
    })
},
getuserinfo:function(){
   if(!this.globalData.openid){
      return false;
   }
   this.post(this.globalData.Apipath+'lxb-api/minapp/user',{
      
    },{
      'content-type': 'application/json',
      'token':this.globalData.openid
    })
    .then((res)=>{
      this.globalData.uinfo = res;
    })
},
globalData: {
    userInfo: null,
    uinfo:null,
    list:[],
    host:'http://59.110.242.178/lxb-image/',
    Apipath:'http://59.110.242.178/',
    Imgpath:'http://59.110.242.178//lxb-api/file/showImg/',
    videopath:'http://59.110.242.178/lxb-api/file/ios/video/',
    wsspath:'ws://59.110.242.178/lxb-api/imserver/',
    return_url:null,
    reutrn_type:1,
    showlogin:true
  }
})