//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    Loading: true
  },
  onLoad() {
    var api = getApp().globalData.api
    var that = this
    wx.request({
        url: api + '/GoldPrice/gold_price', //仅为示例，并非真实的接口地址
        success: function(res) {
          that.setData({
            price: res.data.data[0].price
          })
        }
      }),
      wx.request({
        url: api + '/Index/index_ajax',
        success(res) {
          console.log(res)
          that.setData({
            imgUrls: res.data.aa,
            Loading: false
          })
          wx.showTabBar({

          })
        }
      })
  },
  goPrice() {
    wx.switchTab({
      url: '../kind/kind',
    })
  },
})