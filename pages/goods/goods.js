// pages/goods/goods.js
var replace = require("../../utils/util.js");
let wxparse = require("../../wxParse/wxParse.js");
Page({
  data: {
    showDialog: false,
  },
  openDialog: function () {
    this.setData({
      istrue: true
    })
  },
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },
  home() {
     wx.switchTab({
      url: '../index/index',
    })
  },
  onLoad: function(options) {
    var api = getApp().globalData.api
    var that = this;
    wx.request({
      url: api + '/Goods/index_ajax',
      data:{
        id: options.id,
        zhuang: options.zhuang
      } ,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(res) {
        console.log(res)
        that.setData({
          imgUrls:res.data.info.pic,
          goodsInfo:res.data.info,
          spec: res.data.info.spec
        })
        var content=replace.replaceSpecialChar(res.data.info.content)
        wxparse.wxParse('newDetailsNodes', 'html', content, that, 5)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})