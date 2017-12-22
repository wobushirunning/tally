import { addNewRecord } from '../../services/tallyService.js'

Component({
  properties: {
    money: {
      type: String,
      value: ''
    },
    detail: {
      type: String,
      value: ''
    },
    canSave: {
      type: Boolean,
      value: false
    },
    data: {},
    
    // 生命周期函数，可以为函数，或在一个methods段中定义的方法名
    attached: function(){},
    moved: function(){},
    detached: function(){},

    methods: {
      onMoneyBlured: function (e) {
        console.log('eee', e)
        let val = Number(e.detail.value)
        let money = null
        if (!isNaN(val)) {
          money = val.toFixed(2) + ''
        }
        this.setData({money})
      },
      onMoneyChanged: function(e) {
        // this.data.money = e.detail.value
        this.setData({
          money: e.detail.value
        })
        this.updateSaveButtonState()
      },
      onDetailChanged: function(e) {
        // this.data.detail = e.detail.value
        this.setData({
          detail: e.detail.value
        })
        this.updateSaveButtonState()
      },
      updateSaveButtonState: function() {
        this.setData({
          canSave: this.data.money && this.data.detail
        })
        console.log(this.data)
      },
      onSaveRecord() {
        let record = {
          money: this.data.money,
          detail: this.data.detail
        }
        addNewRecord(record, (res) => {
          console.log(res)
          wx.navigateBack({})
        })
      }
    }
  }
})