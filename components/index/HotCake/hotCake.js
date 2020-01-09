// components/index/HotCake/hotCake.js
Component({
  lifetimes:{
    attached(){
      var api = getApp().globalData.api
      var that = this
      wx.request({
        url: api + '/Index/index_ajax',
        success(res) {
            that.setData({
            goldGoods: res.data.htgoodslist,
            goodsList: res.data.goodslist,
            goodsYu: res.data.yugoodslist
          })
        },
      })
    }
  },
  methods:{
    kind: function (e) {
      getApp().globalData.homeCurrentTab = e.currentTarget.dataset.id;
    }
  }
})