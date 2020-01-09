// pages/goldPrice/goldPrice.js
var replace = require("../../utils/util.js");
let wxparse = require("../../wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goldPrice: "",
    gong: "",
    guige: "",
    total: "",
    fenshu: "1",
    rate: "",
    zhouqi: "",
    qian: "",
    kezhong: "",
    mini:"",
    btns: ["产品规则", "产品优势"],
    tub:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var api = getApp().globalData.api
    var that = this;
    wx.request({
        url: api + '/GoldPrice/gold_price',
        success(res) {
          that.goldPrice = res.data.data[0].price;
          that.gong = res.data.data[0].work_fee;
          that.setData({
            price: that.goldPrice,
            gong: res.data.data[0].work_fee,
          })
        }
      }),
      wx.request({
        url: api + '/GoldPrice/agileGoldGoodsInfo',
        success(res) {
          console.log(res)
          var content =res.data.list[0].content
          wxparse.wxParse('newDetailsNodes', 'html', content, that, 5)
          var content2 = res.data.list[0].contentspec
          wxparse.wxParse('newDetailsNodes2', 'html', content2, that, 5)
          for (var i = 0; i < res.data.period.length; i++) {
            if (res.data.period[i].is_default == 1) {
              that.guige = res.data.list[0].guige[i]
              that.rate = res.data.period[i].fixed_income;
              that.zhouqi = res.data.period[i].period_num;
              that.mini = res.data.period[i].minimum_gram
              that.setData({
                cur: i,
                tur: i == 3 ? i = 2 : i = i,
                rate: replace.toPercent(that.rate),
              })
            }
          }
          that.setData({
            goldGoods: res.data.list,
            zhouqi: res.data.period,
          })
          if (that.goldPrice) {
            that.total = (that.goldPrice * that.guige) + (that.gong * that.guige)
            that.qian = that.total * that.zhouqi * that.rate / 360
            that.fenshu = "1";
            that.kezhong = that.fenshu * that.guige
            that.setData({
              total: that.total,
              qian: that.qian,
              kezhong: that.kezhong
            })
          } else {
            setTimeout(that.onLoad, 1000)
          }
        },
      })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  getFen(e) {
    this.fenshu = e.detail.value
    this.kezhong = this.fenshu * this.guige
    this.total = (this.goldPrice * this.kezhong) + (this.gong * this.kezhong)
    this.qian = this.total * this.zhouqi * this.rate / 360
    this.setData({
      total: replace.numFloor(this.total),
      qian: replace.numFloor(this.qian),
      kezhong: this.kezhong,
      mini:this.mini
    })
  },
  clickBtn(e) {
    this.rate = e.currentTarget.dataset['rate'];
    this.guige = e.currentTarget.dataset['ke'];
    this.mini = this.guige;
    this.kezhong = this.fenshu * this.guige
    this.zhouqi = e.currentTarget.dataset['day'];
    this.total = (this.goldPrice * this.kezhong) + (this.gong * this.kezhong)
    this.qian = this.total * this.zhouqi * this.rate / 360
    this.setData({
      cur: e.target.dataset.index,
      tur: e.target.dataset.index == 3 ? e.target.dataset.index = 2 : e.target.dataset.index,
      total: replace.numFloor(this.total),
      qian: replace.numFloor(this.qian),
      kezhong: this.kezhong,
      mini:this.mini
    })
  },
  clickBtn2(e) {
    this.guige = e.currentTarget.dataset['ke'];
    this.kezhong = this.fenshu * this.guige;
    this.total = (this.goldPrice * this.kezhong) + (this.gong * this.kezhong)
    this.qian = this.total * this.zhouqi * this.rate / 360
    this.setData({
      total: replace.numFloor(this.total),
      qian: replace.numFloor(this.qian),
      kezhong: this.kezhong,
      tur: e.target.dataset.index,
      mini:this.mini
    })
  },
  btns(e){
    this.setData({
      tub: e.target.dataset.index
    })
  }  
})