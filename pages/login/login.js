// pages/login/login.js

import { $wuxDialog } from '../../wux/index'
import { $wuxToptips } from '../../wux/index'

const app = getApp()

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
    console.log("hehehe")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("hehehe")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("hehehe")
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

  onLoginEvent: function(event){
    console.log(event)
    const userInfo = event.detail.userInfo
    if(!userInfo){
      // wx.showModal({
      //   title: '注意',
      //   content: '您拒绝了授权，后续功能将无法使用',
      // })

      $wuxDialog().confirm({
        resetOnClose: true,
        closeable: true,
        title: '注意',
        content: '您拒绝了授权，后续功能将无法使用',
        onConfirm(e) {
        },
        onCancel(e) {
        },
      })

      return;
    }else{
      app.globalData.userInfo = userInfo
      wx.showLoading({
        title: '登陆中...',
      })
      wx.login({
        success: function(res) {
          console.log(res)
          const code = res.code;
          wx.request({
            url: 'http://127.0.0.1:5000/passport/login',
            data: {
              code: code
            },
            header: {},
            method: 'POST',
            success: function(res) {
              console.log(res)
              if (res.data.errno === 1){
                  wx.navigateTo({
                    url: '../../pages/bind/bind?openid=' + res.data.data.openid,
                  })
              }else{
                const token = res.data.data.token;
                console.log(token)
                wx.setStorageSync("token", token);
                app.globalData.token = token
                
                wx.hideLoading()
                wx.navigateBack({})
                console.log("登陆成功")
                console.log(app.globalData.token)
                console.log(app.globalData.userInfo)
              }

            },
            fail: function(res) {
              wx.hideLoading()
              wx.navigateTo({
                url: '../../pages/loginerr/loginerr'
              })
            },
            complete: function(res) {},
          })

        },
        fail: function(res) {
          wx.hideLoading()
          wx.navigateTo({
            url: '../../pages/loginerr/loginerr'
          })
        },
        complete: function(res) {},
      })
    }

    
  },
  returnindex: function () {
    wx.navigateBack({})
  }

})