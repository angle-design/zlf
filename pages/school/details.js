// pages/school/details.js
const promisify = require('../../utils/promisify.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoflag:true,
    host:app.globalData.host,
    txtHidden: true,
    teamHidden:true,
    id:null,
    imgpath:null,
    infodata:null,
    iscollect:0,
    swiperCurrent:0,
    videopath:null,
    height:'220rpx',
    shareImgSrc:app.globalData.shareimg,
    shareerweima:app.globalData.shareerweima,
    sharelogo:null,
    sharename:null,
    sharecontent:null,
    canvasHidden:false,
    cw:0,
    ch:0,
    ctop:0,
    cleft:0
  },
  // 院校展开收起
  txtToggle: function() {
    　　　　let that = this;
    　　　　that.setData({
    　　　　　　txtHidden: !that.data.txtHidden
    　　　　})
    　　},
    // 项目展开收起
    teamToggle: function() {
      　　　　let that = this;
      　　　　that.setData({
      　　　　　　teamHidden: !that.data.teamHidden
      　　　　})
      　　},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      id:options.id,
      imgpath:app.globalData.Imgpath,
      videopath:app.globalData.videopath
    })
    if(!this.data.id){
      wx.navigateTo({
        url:"/pages/school/index"
      })
    }
    this.getinfo();
    /////////////////////////
    wx.getSystemInfo({
      success: res => {
        //初始化画布的宽高 lef top 

        this.setData({
          cw: 750,//res.screenWidth,
          ch:1334,//res.screenWidth/0.56,
          ctop:0,
          cleft:0
        })
      }
    })
    // this.share();
  },
  // 点击播放按钮视频播放
  playvideo(){
    this.setData({
      videoflag:false
    })
  },
  //轮播切换
  swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
      videoflag:true
    })
  },
  getinfo:function(){
    app.post(app.globalData.Apipath+'/lxb-api/minapp/institution/details/',{
      "areaId": "",
      "content": "",
      "countryId": "",
      "current": 0,
      "id":this.data.id,
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
        sharelogo:this.data.imgpath+res.logo,
        sharename:res.name,
        sharecontent:res.information
      })
    })
  },
  collect:function(e){
    var id = e.currentTarget.dataset.id;
    var type= 0;
    if(this.data.iscollect>0){
      type =1;
    }
    app.post(app.globalData.Apipath+'/lxb-api/minapp/collect/add',{
      "id": id,
      "status":type,
      "type": 3
    },{
      'content-type': 'application/json',
      'token':app.globalData.openid
    })
    .then((res)=>{
      if(this.data.iscollect<1){
        this.setData({
          iscollect:1
        })
      }else{
        this.setData({
          iscollect:0
        })
      }
      
    })
    
  },
  gotoask:function(evnet){
    var id = evnet.currentTarget.dataset.id
    var url = "/pages/school/contact?id="+id;
    app.checklogin(url,2);
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
  /**
   * 分享图片
   */
  share:function(){
    // var context = wx.createCanvasContext('share')

    // context.setStrokeStyle("#00ff00")
    // context.setLineWidth(5)
    // context.rect(0, 0, 200, 200)
    // context.stroke()
    // context.setStrokeStyle("#ff0000")
    // context.setLineWidth(0.1)
    // context.moveTo(160, 100)
    // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    // context.moveTo(140, 100)
    // context.arc(100, 100, 40, 0, Math.PI, false)
    // context.moveTo(85, 80)
    // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // context.moveTo(125, 80)
    // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    // context.stroke()
    // context.draw()
    // return false;
    wx.showLoading({
      title: '正在生成图片...',
      mask: true,
    });
    var that = this;
    const ctx = wx.createCanvasContext('share');//绘制画布
    var bgImgPath = that.data.shareImgSrc;//背景图
    //获取logo图片
    const wxGetImageInfo = promisify(wx.getImageInfo);
    Promise.all([
      wxGetImageInfo({
          src: that.data.sharelogo
      }),
      wxGetImageInfo({
          src: that.data.shareerweima
      })
    ]).then(res => {
      ctx.drawImage(bgImgPath, 0, 0,that.data.cw, that.data.ch);//绘制背景图    
      ctx.beginPath();
      //(圆心)X轴,Y轴,半径,起始,结束
      var r = that.data.cw*0.105;
      var dx = that.data.cw*0.07;
      var dy = that.data.ch*0.11;
      
      
      //绘制学校名字
      var nx = that.data.cw*0.31;
      var ny = that.data.ch*0.18;
      // console.log(nx,ny);
      ctx.setFillStyle('#ffffff');  // 文字颜色：白色
      ctx.setLineWidth(1)
      ctx.setFontSize(40);       // 文字字号：20px
      ctx.fillText(that.data.sharename, nx, ny);
      ctx.stroke();
      //绘制院校简介
      that.drawText(ctx,that.data.sharecontent,that.data.cw*0.13,that.data.ch*0.38,that.data.ch*0.67,that.data.cw*0.7)
      ctx.stroke();
      //绘制logo
      ctx.setStrokeStyle("#ffffff")
      ctx.setLineWidth(0.0001)
      ctx.arc((r+dx), (r+dy), r, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(res[0].path, 30,12,131,131,dx, dy, r*2, r*2);
      ctx.stroke();

      ctx.draw(false,function() {
        // 3. canvas画布转成图片
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: that.data.cw,
          height: that.data.cy,
          canvasId: 'share',
          success: function (res) {
            
            that.setData({
              shareImgSrc: res.tempFilePath
            })
            wx.hideLoading();
          },
          fail: function (res) {
            console.log(res)
          }
        })
      })
    }).then((err)=>{
      console.log(err)
    })
  },
  saveImageToPhotosAlbum:function(){
    var that =this;
    //当用户点击分享到朋友圈时，将图片保存到相册
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareImgSrc,
      success(res) {
        console.log(res);
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
            that.setData({
              canvasHidden: true
            })
          }
        })
      }
    })
  },
  drawText: function (ctx, str, leftWidth, initHeight,contentheight, canvasWidth) {
    str = str.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"\'").replace(/&quot;/g,"\"").replace(/<\/?.+?>/g,"")
    str = str.slice(0,200);
    ctx.setFillStyle('#333333');  // 文字颜色：黑色
    ctx.setFontSize(28);  
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    var islastlin = false;
    for (let i = 0; i < str.length; i++) {

      lineWidth += ctx.measureText(str[i]).width;//每一个字的宽度相加

      if (lineWidth > canvasWidth) {//大于宽度开始渲染
        if(!islastlin){
          ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
          initHeight += 42; //32为字体的高度
          lineWidth = 0;
          lastSubStrIndex = i;    
          if((initHeight+42)>(contentheight)){
            islastlin = true;
          }
        }else{ //最后一行替换... 然后退出
          var laststr = str.substring(lastSubStrIndex, i-4);
          laststr = laststr + '...';
          ctx.fillText(laststr, leftWidth, initHeight); //绘制截取部分
          return false;
        }
      }
    }
  },
})