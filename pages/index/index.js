//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // 轮播图列表
    "bnrUrl": [],
    // 左右滑动导航列表
    navData:[],
  // 分类
  list:[
    {img:'lei_01.png',name:'中心介绍',url:'/pages/aboutcenter/index',islog:false},
    {img:'lei_02.png',name:'项目介绍',url:'/pages/project/index',islog:false},
    {img:'lei_03.png',name:'留学国别',url:'/pages/project/countries',islog:false},
    {img:'lei_04.png',name:'项目层次',url:'/pages/arrangement/index',islog:false},
    {img:'lei_05.png',name:'项目资讯',url:'/pages/news/index',islog:true},
    {img:'lei_06.png',name:'学生案例',url:'/pages/studentcases/index',islog:true},
    {img:'lei_07.png',name:'咨询留服',url:'/pages/my/question',islog:true},
    {img:'lei_08.png',name:'浏览记录',url:'/pages/my/browse',islog:true}
  ],
  swiperCurrent:0,//轮播图选中索引
  currentTab: 0,
  currentId:0,
  navScrollLeft: 0,
  page:1,
  host:app.globalData.host,
  islogin:false,
  imgpath:null,
  showgetuser:true,
  isIphoneX:false,
  },

  swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
 onLoad: function () {
// 适配底部
  let modelmes = wx.getStorageSync('modelmes');
  let isIphoneX = app.globalData.isIphoneX;
  this.setData({
    isIphoneX: isIphoneX
  })
  wx.getSystemInfo({
      success: (res) => {
          this.setData({
              windowHeight: res.windowHeight,
              windowWidth: res.windowWidth
          })
      },
  })
  this.getarealist();  
  this.gettbannerlist();
  if (!app.globalData.uinfo || !wx.getStorageSync('uinfo')) {
      this.setData({
        islogin:false
      })   
  }else{
      this.setData({
        islogin:true
      })
  }
  this.setData({
    imgpath:app.globalData.Imgpath
  })
},
gotopage(event){
  var islogin_ = event.target.dataset.islog;
  var url = event.target.dataset.url;
  if(islogin_){
    var isshow = app.checklogin(url,2);
    if(isshow){
      wx.getSetting({
        success: res => {
           // 已经授权
           if (res.authSetting['scope.userInfo']) {
              app.login();
           }else{
              this.setData({
                showgetuser:false
              })
           }
        }
     })
    }
  }else{
    //跳转
    wx.navigateTo({
      url: url
    })
  }
},
showempower(){
  this.setData({
    showgetuser:false
  })
},
hideempower(){
  this.setData({
    showgetuser:true
  })
},
gotoschool(){
  var id = evnet.currentTarget.dataset.id
  wx.switchTab({
    url: '/pages/school/index?id='+id
  })
},
getarealist(){//获取首页院校地区
  app.get(app.globalData.Apipath+'/lxb-api/area/list')
  .then((res)=>{
    this.setData({
      navData:res,
      currentId:res[0].id
    })
    this.getinstitutionlist()
  })       
},
gotoallschool(){
  wx.switchTab({
    url: '/pages/school/index'
  })
},
gettbannerlist(){//获取首页轮播图
  app.post(app.globalData.Apipath+'/lxb-api/tbanner/list',{
    place:1
  })
  .then((res)=>{
    this.setData({
      bnrUrl:res
    })
  })
},
gotodetail:function(evnet){
  var id = evnet.currentTarget.dataset.id
  wx.navigateTo({
    url:"/pages/school/details?id="+id
  })
},
getinstitutionlist(){
  app.post(app.globalData.Apipath+'/lxb-api/institution/list',{
    areaId: this.data.currentId,
	  content: "",
	  countryId: "",
	  current:this.data.page,
	  pageSize: 100,
	  schoolLevelId: ""
  })
  .then((res)=>{
    console.log(res);
    this.setData({
      page:this.data.page+1,
      schoollist:res
    })
  })
},
switchNav(event){
  var cur = event.currentTarget.dataset.current; 
  var currentId = event.currentTarget.dataset.id;
  //每个tab选项宽度占1/5
  var singleNavWidth = this.data.windowWidth / 5;
  //tab选项居中                            
  this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth,
      currentId:currentId,
      page:1
  })      
  if (this.data.currentTab == cur) {
      return false;
      } else {
      this.setData({
          currentTab: cur
      })
    }
  this.getinstitutionlist();
},
bindSolarChange:function(e){
    this.setData({
      datepicker:e.detail.value
    })
},
getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
},
switchTab(event){
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
      this.setData({
        currentTab: cur,
        navScrollLeft: (cur - 2) * singleNavWidth
    })
},
onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        currentTab: 0
      })
    }
},
onShareAppMessage: function () {

}
})