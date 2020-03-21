// pages/my_submit_info/my_submit_info.js
import { $wuxDialog } from '../../wux/index'
import { $wuxToptips } from '../../wux/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {

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


  onclickbutt: function () {
    var that = this
    $wuxDialog().confirm({
      resetOnClose: true,
      closeable: true,
      title: '提醒',
      content: '确定完成该任务？',
      onConfirm(e) {
        wx.navigateTo({
          url: '../../pages/grade/grade',
        })
      },
      onCancel(e) {
        console.log('谢谢你不吃之恩！')
      },
    })


  },
})