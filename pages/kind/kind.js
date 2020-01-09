//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    btns: ["在售商品", "预售商品", "爆款商品"],
     active: 0,
  },
  toggle(e) {
    this.setData({
     active: e.currentTarget.dataset.index
    })
  },
  onLoad() {
    this.data.currentTab = getApp().globalData.homeCurrentTab;
    this.setData({
      active: this.data.currentTab
    })
    var api = getApp().globalData.api
    var that = this
    wx.request({
      url: api + '/Kind/index_ajax', //仅为示例，并非真实的接口地址
      success: function (res) {
        that.setData({
          goodsList: res.data.goodslist,
          goodsYu: res.data.yugoodslist,
          htgoodslist: res.data.htgoodslist
        })
      }
    })
  }
})