//index.js
import { $wuxDialog } from '../../wux/index'

//获取应用实例
const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },

//   onShow: function(){
//     var token = wx.getStorageSync("token")
//     if (token) {

//     } else {
//       wx: wx.navigateTo({
//         url: 'pages/login/login',
//         success: function (res) { },
//         fail: function (res) { },
//         complete: function (res) { },
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
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
    var that = this
    console.log("onload")
    var token = wx.getStorageSync("token")
    if (token) {
      console.log(token)
      wx.request({
        url: 'http://127.0.0.1:5000/passport/check_login',
        data: {
          token: token
        },
        header: {},
        method: 'POST',
        success: function (res) {
          console.log(res)
          const status = res.data.errno
          console.log(status)
          if (status === 1) {
            console.log("success")
            app.globalData.token = token
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      console.log(res.userInfo)
                      // 可以将 res 发送给后台解码出 unionId
                      app.globalData.userInfo = res.userInfo

                    }
                  })
                }
              }
            })


          } else {
            console.log("failed")
            wx.showModal({
              title: '注意',
              content: '登录信息已过期，请重新登陆',
              showCancel: false,
              success(res){
                wx.navigateTo({
                  url: '../../pages/login/login',
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              }
            })
            
          }
        },
        fail: function (res) {
          console.log("failed")
          wx.navigateTo({
            url: '../../pages/login/login',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        complete: function (res) { },
      })

      // this.globalData.token = token
      // console.log(token)
    } else {
      wx.navigateTo({
        url: '../../pages/login/login',
        success: function (res) { console.log(res) },
        fail: function (res) { console.log(res) },
        complete: function (res) { },
      })
    }



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow")
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
  alert() {
    $wuxDialog().alert({
      resetOnClose: true,
      title: '注意',
      content: '此功能尚未上线，请关注后续版本',
      onConfirm(e) {
        console.log('此功能尚未上线，请关注后续版本')
      },
    })
  },

  logistics: function() {
    wx.navigateTo({
      url: '../../pages/submit/submit?id=0',
    })
  },
  it: function () {
    wx.navigateTo({
      url: '../../pages/submit/submit?id=1',
    })
  }
})