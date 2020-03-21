// pages/mine_approve_info/mine_approve_info.js

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
  aggre: function () {
    var that = this
    $wuxDialog().confirm({
      resetOnClose: true,
      closeable: true,
      title: '提醒',
      content: '确定同意该任务信息？',
      onConfirm(e) {
        $wuxToptips().success({
          hidden: false,
          text: '审批成功',
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

  refuse() {
    const alert = (content) => {
      $wuxDialog('#wux-dialog--alert').alert({
        resetOnClose: true,
        title: '提示',
        content: content,
      })
    }

    $wuxDialog().prompt({
      resetOnClose: true,
      title: '拒绝原因：',
      // content: '拒绝原因：',
      fieldtype: 'text',
      defaultText: '',
      placeholder: '请输入拒绝原因',
      maxlength: 140,
      onConfirm(e, response) {
        // const content = response.length === 8 ? `Wi-Fi密码到手了: ${response}` : `请输入正确的Wi-Fi密码`
        // alert(content)
        var result = response.trim()
        if (result.length > 0){
          $wuxToptips().success({
            hidden: false,
            text: '拒绝成功',
            duration: 500,
            success() {
              wx.navigateBack({
              })

            },
          })
        }else{
          alert("拒绝原因不能为空")
        }
        console.log(e)
        console.log(response)
      },
    })
  },
})