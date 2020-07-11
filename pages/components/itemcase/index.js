Component({ 
  options: { 
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  }, 
  properties: {
    item: { 
      type: Object
    },
    imgpath:{
      type:String
    },
    host:{
      type:String
    },
    arry: { 
      type:Array
    },
    index:{
      type:Number
    }
  }, 
  methods:{
    gotodetail:function(evnet){
      var id = evnet.currentTarget.dataset.id
      wx.navigateTo({
        url:"/pages/studentcases/casedetail?id="+id
      })
    },
  },
})

