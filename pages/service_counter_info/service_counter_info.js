// pages/my_submit_info/my_submit_info.js
import { $wuxDialog } from '../../wux/index'
import { $wuxToptips } from '../../wux/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value : "",
    options: [{
      title: '马凯凯----开发部----工程师',
      value: '1',
    }, {
        title: '牛凯凯----开发部----高级工程师',
      value: '2',
    }, {
        title: '驴凯凯----开发部----实习生',
      value: '3',
    }, {
        title: '骡凯凯----财务部----会计',
      value: '4',
    }, {
        title: '猴凯凯----市场部----职员',
      value: '5',
    }, {
        title: '毛凯凯----后勤部----门卫',
      value: '6',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  // onclickbutt: function () {
  //   var that = this
  //   $wuxDialog().confirm({
  //     resetOnClose: true,
  //     closeable: true,
  //     title: '提醒',
  //     content: '确定分配服务人员？',
  //     onConfirm(e) {
  //       wx.navigateTo({
  //         url: '../../pages/allocation/allocation',
  //       })
  //     },
  //     onCancel(e) {
  //       console.log('谢谢你不吃之恩！')
  //     },
  //   })


  // },


  setValue(values, key) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
    })
  },
  onConfirm(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
    
    var that = this
    $wuxDialog().confirm({
      resetOnClose: true,
      closeable: true,
      title: '提醒',
      content: '确定将该任务分配给' + e.detail.label + "?",
      onConfirm(e) {
        $wuxToptips().success({
          hidden: false,
          text: '分配成功',
          duration: 1000,
          success() {
            // wx.navigateTo({
            //   url: '../../pages/my_task_info_end/my_task_info_end',
            // })
            // wx.navigateBack({
            // })

          },
        })
      },
      onCancel(e) {
        console.log('谢谢你不吃之恩！')
      },
    })


  },
  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },
  onVisibleChange(e) {
    this.setData({ visible: e.detail.visible })
  },
  onclickbutt() {
    this.setData({ visible: true })
  },
})