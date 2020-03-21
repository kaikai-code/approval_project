// pages/mine_task_info/mine_task_info.js

import { $wuxDialog } from '../../wux/index'
import { $wuxActionSheet } from '../../wux/index'
import { $wuxToptips } from '../../wux/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: "等待材料中"
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
  check_status() {
    var that = this
    $wuxActionSheet().showSheet({
      theme: 'wx',
      titleText: '请选择状态',
      buttons: [{
        text: '未开始'
      },
      {
        text: '等待材料中'
      },
      {
        text: '已完成'
      }
      ],
      buttonClicked(index, item) {
        
        console.log(index, item)
        $wuxDialog().confirm({
          resetOnClose: true,
          closable: true,
          title: "提醒",
          content: '你确定要将状态更改为' + item.text + "么?",
          onConfirm(e) {
            that.setData({
              status: item.text
            })
            $wuxToptips().success({
              hidden: false,
              text: '修改成功',
              duration: 500,
              success() {
                if (index === 2 ){
                  wx.navigateTo({
                    url: '../../pages/my_task_info_end/my_task_info_end',
                  })
                }
                
               },
            })
          },
          onCancel(e) {
            console.log('谢谢你不吃之恩！')
          },
        })

        return true
      },
    })

  },
})