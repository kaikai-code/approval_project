// pages/mine_task_info/mine_task_info.js

import { $wuxDialog } from '../../wux/index'
import { $wuxActionSheet } from '../../wux/index'
import { $wuxToptips } from '../../wux/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark_value: "",
    fileList: [],
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
  remark: function (e) {
    console.log(e)
    this.setData({ remark_value: e.detail.value })
  },

  reset: function () {
    var that = this
    $wuxDialog().confirm({
      resetOnClose: true,
      closeable: true,
      title: '提醒',
      content: '是否确定重置表单信息？',
      onConfirm(e) {
        that.setData({
          remark_value: "",
          fileList: []
        })
      },
      onCancel(e) {
        console.log('谢谢你不吃之恩！')
      },
    })
  },
  submit: function () {
    var that = this
    $wuxDialog().confirm({
      resetOnClose: true,
      closeable: true,
      title: '提醒',
      content: '确定提交表单信息？',
      onConfirm(e) {
        $wuxToptips().success({
          hidden: false,
          text: '提交成功',
          duration: 500,
          success() {
            // wx.navigateTo({
            //   url: '../../pages/my_task_info_end/my_task_info_end',
            // })
            wx.navigateBack({
            })

          },
        })
      },
      onCancel(e) {
        console.log('谢谢你不吃之恩！')
      },
    })


  },


  onChange(e) {
    console.log('onChange', e)
    const { file, fileList } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      this.setData({
        imageUrl: file.url,
      })
    }

    // Controlled state should set fileList
    this.setData({ fileList })
  },
  onSuccess(e) {
    console.log('onSuccess', e)
  },
  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
  },
})