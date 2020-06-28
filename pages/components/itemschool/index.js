const app = getApp();
Component({ 
  options: { 
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  }, 
  properties: {
    item: { 
      type: Object
    },
    btnflag:{
      type:Boolean
    },
    imgpath:{
      type:String
    }
  }, 
  methods:{
    gotodetail:function(evnet){
      var id = evnet.currentTarget.dataset.id
      wx.navigateTo({
        url:"/pages/school/details?id="+id
      })
    },
    gotoask:function(evnet){
      var id = evnet.currentTarget.dataset.id
      var url = "/pages/school/contact?id="+id;
      app.checklogin(url,2);
    }
  },
})

