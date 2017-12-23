var app = getApp()
var records = [
  {
    'id': 0,
    'money': '2000.00',
    'detail': '买书100、买电脑1900',
    'time': '2017/08/31 16:50:55'
  }
]
import {formatTime} from '../utils/util.js'

function addNewRecord({money, detail}, callback) {
  let id = records.length
  let time = formatTime(new Date())
  let record = {id, money, detail, time}
  records.push(record)

  if (typeof callback === 'function') {
    callback(true)
  }
}

function alterOldRecord({ money, detail }, callback) {
  let id = app.globalData.alterIndex
  let time = formatTime(new Date())
  let record = { id, money, detail, time }
  records.splice(id, 1, record)

  if (typeof callback === 'function') {
    callback(true)
  }
}

function delRecord(id, callback) {
  records.splice(id, 1)

  if (typeof callback === 'function') {
    callback(true)
  }
}

function loadAllRecord(callback) {
  if (typeof callback === 'function') {
    wx.setStorage({
      key: "bill",
      data: records
    })
    wx.getStorage({
      key: 'bill',
      success: function (res) {
        console.log(res.data)
        var data = res.data
        callback(data)
      }
    })
  }
}

module.exports = {
  addNewRecord,
  alterOldRecord,
  delRecord,
  loadAllRecord
}