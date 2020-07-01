const app = getApp();
Component({ 
  options: { 
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  }, 
  properties: {
    host:{
      type:String
    },
    isshow:{
      type:String
    }
  },
  methods:{
    getUserInfo:function(e){
      this.triggerEvent('hideempower')
     app.wxgetuserinfo(e);
    },
    hide:function(){
      app.globalData.showlogin=false;
    },
    showempower_:function(){
      this.triggerEvent('hideempower')
    }
  }
  
})

