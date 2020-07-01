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
      var url = "/pages/school/details?id="+id;
      var isshow = app.checklogin(url,2);
      if(isshow){
        console.log(isshow)
        this.triggerEvent('showempower')
      }
    },
    gotoask:function(evnet){
      var id = evnet.currentTarget.dataset.id
      var url = "/pages/school/contact?id="+id;
      var isshow = app.checklogin(url,2);
      if(isshow){
        this.triggerEvent('showempower')
      }
    }
  },
})

