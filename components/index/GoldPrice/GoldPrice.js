Component({
  lifetimes: {
    attached() {
      var api = getApp().globalData.api
      var that = this
      wx.request({
          url: api + '/GoldPrice/agileGoldGoodsInfo',
          success(res) {
            for (var i = 0; i < res.data.period.length; i++) {
              if (res.data.period[i].is_default == 1) {
                that.setData({
                  cur: i,
                  rate: that.toPercent(res.data.period[i].fixed_income)
                })
              }
            }
            that.setData({
              goldGoods: res.data.list,
              zhouqi: res.data.period,
            })
          },
        }),
        wx.request({
          url: api + '/GoldPrice/gold_price', //仅为示例，并非真实的接口地址
          success: function(res) {
            that.setData({
              price: res.data.data[0].price
            })
          }
        })
    },
  },
  methods: {
    clickBtn(e) {
      var query = e.currentTarget.dataset['rate'];
      this.setData({
        cur: e.target.dataset.index,
        rate: this.toPercent(query)
      })
    },
    toPercent(point) {
      var str = Number(point * 100).toFixed(1);
      str += "%";
      return str;
    },
    nowBuy(){
      wx.navigateTo({
        url: '../../pages/goldPrice/goldPrice',
      })
    }
  }
})