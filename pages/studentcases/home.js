// pages/studentcases/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caselist:[],
    imgpath:null,
    page:1,
    loading:false,
    noMore:false,
    host:app.globalData.host,
    loadStatus:1,//状态
    arry:[],
    damoHeight:0,
    num:0
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
getlist:function(){
  app.post(app.globalData.Apipath+'/lxb-api/minapp/institutioncase/list',{
    "current": this.data.page,
    "pageSize": 10
  },{
    'content-type': 'application/json',
    'token':app.globalData.openid
  })
  .then((res)=>{
    var _this=this;
    if(res){
      if(res.length<1){
        this.setData({
          loadStatus: 2
        })
        return false;
      }
         // ========图片懒加载开始========
      if(this.data.page==1){
        this.setData({
          caselist :res
        })
      }else{
        this.setData({
          caselist :this.data.caselist.concat(res)
        })
        if (res.length == 0) {
          this.setData({
            loadStatus: 2
          })
        }
      }
      // 获取每个的高度
     var query = wx.createSelectorQuery();
     query.select('.caseitem').boundingClientRect(function (rect) {
        _this.setData({
           damoHeight: rect.height+20
       })
      let num = Math.ceil(wx.getSystemInfoSync().windowHeight / (_this.data.damoHeight));
      _this.setData({
        num:num
      })
      let icount = (_this.data.page*10-_this.data.arry.length);
      for (let i = 0; i < icount; i++) {
        if(_this.data.arry.length>num){
          _this.data.arry.push(false);
        }else{
          _this.data.arry.push(true);
        } 
      };
      _this.setData({
        arry: _this.data.arry
      })
     }).exec();
 
  // ========图片懒加载结束============
  }else{
    this.setData({
      loadStatus: 2
    })
  }
  })
},
// 翻页图片懒加载
onPageScroll: function (res) {
  var _this = this;
  var str = parseInt(res.scrollTop /(_this.data.damoHeight));
  // console.log(str)
  let c =str+_this.data.num;
  for(let i=0 ;i<=c;i++){
    _this.data.arry[i] = true;
  }
  
  _this.setData({
    arry: _this.data.arry
  })
},
onReachBottom: function () {
  // console.log(this.data.loadStatus)
  if(this.data.loadStatus==1){
    var that = this;
    (this.data.page)++;
    this.getlist();
  }else{
    if(!this.data.arry[(this.data.arry.length-1)]){
      this.data.arry[(this.data.arry.length-1)]=true;
      this.setData({
        arry: this.data.arry
      })
    }
  }
  
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})