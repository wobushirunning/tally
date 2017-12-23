import {
  loadAllRecord,
  delRecord
} from '../../services/tallyService.js'

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    list: [],
    totalMoney: 0,
    editIndex: 0,
    btnWidth: 130,
    preEditIndex: ''
  },
  customerData: {
    isFirstShow: true,
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShow() {
    this.fetchData()
  },
  fetchData() {
    if (this.customerData.isFirstShow) {
      wx.showLoading({
        title: '加载数据中...',
      })
    }
    
    var self = this
    loadAllRecord((list)=> {
      var totalMoney = 0
      list.forEach((item)=> {
        totalMoney += Number(item.money)
        console.log(item)
      }) 
      self.setData({list, totalMoney})

      if (self.customerData.isFirstShow) {
        self.customerData.isFirstShow = false
        setTimeout(() => {
          wx.hideLoading()
        }, 1000)
      }
    })
  },
  // 手指刚放到屏幕触发
  touchS: function (e) {
    // console.log('touchS', e)
    if (e.touches.length === 1) {
      var list = this.data.list
      for (var item of list) {
        item.txtStyle = 'left: 0px'
      }
      this.setData({
        startX: e.touches[0].clientX,
        list: list
      })
    }
  },
  touchM: function (e) {
    if (e.touches.length === 1) {
      var moveX = e.touches[0].clientX
      var disX = this.data.startX - moveX
      var btnWidth = this.data.btnWidth
      var txtStyle = ''
      if (disX <= 0) {
        txtStyle = 'left: 0px'
      } else if (disX > 0) {
        txtStyle = 'left: -' + disX + 'px'
        if (disX >= btnWidth) {
          txtStyle = 'left: -' + btnWidth + 'px'
        }
      }
      // currentTarget 事件绑定的当前组件
      var index = e.currentTarget.dataset.index
      // console.log(e.currentTarget)
      var list = this.data.list
      list[index].txtStyle = txtStyle
      this.setData({
        list: list
      })
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length === 1) {
      // console.log(e)
      var endX = e.changedTouches[0].clientX
      var disX = this.data.startX - endX
      var btnWidth = this.data.btnWidth
      var index = e.currentTarget.dataset.index
      var list = this.data.list
      var txtStyle = disX > btnWidth ? "left:-" + btnWidth + "px" : "left:0px"
      var index = e.currentTarget.dataset.index
      var list = this.data.list
      list[index].txtStyle = txtStyle
      this.setData({
        list: list
      })
    }
  },
  alterDetail: function (e) {
    // console.log(e.currentTarget.dataset.index)
    app.globalData.alterIndex = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../alter/alter',
    })
  },
  delDetail: function(e) {
    let delIndex = e.currentTarget.dataset.index
    delRecord(delIndex, (res) => {
      console.log(res)
      this.fetchData()
    })
  }
})
