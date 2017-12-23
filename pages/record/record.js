import { addNewRecord } from '../../services/tallyService.js'
var app = getApp()

Page({
  /**
   * 保存记录
   */
  _saveRecord(data) {
    let record = data.detail
    addNewRecord(record, (res) => {
      console.log(res)
      wx.navigateBack({})
    })
  }
})