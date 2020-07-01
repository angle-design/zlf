import tabbarList from 'router.js'
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
    _auth: 0
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