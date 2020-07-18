import tabbarList from 'router.js'
const app=getApp();
// components/tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIdx: {
      type: Number,
      value: 0
    },
    auth: {
      type: Number,
      value: 0,
      observer: 'onAuthChanged'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarList: tabbarList,
    _auth: 0,
    host:app.globalData.host,
    showdiandian:false
  },
  pageLifetimes: {
      show: function() {
        console.log(app.globalData.openid)
        console.log("sss")
        if(app.globalData.openid){
          app.post(app.globalData.Apipath+'/lxb-api/read/status',{
  
          },{
            'content-type': 'application/json',
            'token':app.globalData.openid
          })
          .then((res)=>{
             
          })
          .catch((err)=>{
            if(err.status>0){
              this.setData({
                showdiandian:true
              })
            }else{
              this.setData({
                showdiandian:false
              })
            }
            
          })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      const {
        idx,
        path
      } = e.currentTarget.dataset

      if (idx === this.data.activeIdx) {
        this.trigger('refresh')
        return
      }

      wx.switchTab({
        url: `/${path}`,
       
      })
    }
  }
})