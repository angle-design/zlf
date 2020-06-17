//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // 轮播图列表
    "bnrUrl": [
      //   {
      //   "url": "/image/bg.png"
      // }, {
      //   "url": "/image/bg.png"
      // }, {
      //   "url": "/image/bg.png"
      // }, {
      //   "url": "/image/bg.png"
      // }
    ],
    // 学校列表
    schoollist:[
      // {
      //   name:"北京大学1",
      //   img:'/image/logo.png',
      //   place:"北京"
      // },
      // {
      //   name:"北京大学2",
      //   img:'/image/logo.png',
      //   place:"北京"
      // },
      // {
      //   name:"北京大学3",
      //   img:'/image/logo.png',
      //   place:"北京"
      // },
      // {
      //   name:"北京大学4",
      //   img:'/image/logo.png',
      //   place:"北京"
      // }
    ],
    // 左右滑动导航列表
    navData:[
      // {text: '首页'},
      // {text: '健康'},
      // {text: '情感'},
      // {text: '职场'},
      // {text: '育儿'},
      // {text: '纠纷'},
      // {text: '青葱'},
      // {text: '上课'},
      // {text: '下课'}
  ],
  // 分类
  list:[
    {img:'lei_01.png',name:'中心介绍'},
    {img:'lei_02.png',name:'项目介绍'},
    {img:'lei_03.png',name:'留学国别'},
    {img:'lei_04.png',name:'项目层次'},
    {img:'lei_05.png',name:'项目资讯'},
    {img:'lei_06.png',name:'学生案例'},
    {img:'lei_07.png',name:'咨询留服'},
    {img:'lei_08.png',name:'浏览记录'}
  ],
  swiperCurrent:0,//轮播图选中索引
  currentTab: 0,
  currentId:0,
  navScrollLeft: 0,
  page:1,
  host:app.globalData.host
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
getinstitutionlist(){
  app.post(app.globalData.Apipath+'/lxb-api/institution/list',{
    areaId: this.data.currentId,
	  content: "",
	  countryId: "",
	  current:this.data.page,
	  pageSize: 10,
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
})