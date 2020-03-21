// pages/mine_approve_info/mine_approve_info.js

import { $wuxDialog } from '../../wux/index'
import { $wuxToptips } from '../../wux/index'

const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vcode_input: null,
    tel:null,
    vcode: null,
    tel_vcode: null,
    button: false,
    button_value: "获取验证码"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = options.openid
    this.setData({openid:openid})
    console.log("openid", this.data.openid)
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
  submit: function () {
    var that = this

    if (that.data.tel == null){
      $wuxDialog().alert({
        resetOnClose: true,
        closeable: true,
        title: '注意',
        content: '请输入手机号后提交',
      })
      return
    }
    if (that.data.tel_vcode.length == null){
      $wuxDialog().alert({
        resetOnClose: true,
        closeable: true,
        title: '注意',
        content: '请输入手机验证码后提交',
      })
      return
    }

    $wuxDialog().confirm({
      resetOnClose: true,
      closeable: true,
      title: '提醒',
      content: '确定提交并绑定手机号？',
      onConfirm(e) {

        wx.request({
          url: 'http://127.0.0.1:5000/passport/register',
          data: {
            mobile: that.data.tel,
            smscode: that.data.tel_vcode,
            openid: that.data.openid
          },
          header: {},
          method: 'POST',
          success: function (res) {
            console.log(res)
      
            wx.hideLoading()
            if (res.data.errno === "0"){

              wx.login({
                success: function (res) {
                  console.log(res)
                  const code = res.code;
                  wx.request({
                    url: 'http://127.0.0.1:5000/passport/login',
                    data: {
                      code: code
                    },
                    header: {},
                    method: 'POST',
                    success: function (res) {
                      console.log(res)
                      // if (res.data.errno === 1) {
                      //   wx.navigateTo({
                      //     url: '../../pages/bind/bind',
                      //   })
                      // } else {
                      const token = res.data.data.token;
                      console.log(token)
                      wx.setStorageSync("token", token);
                      app.globalData.token = token
                      // app.globalData.userInfo = userInfo
                      
                      console.log("登陆成功")
                      console.log(app.globalData.token)
                      console.log(app.globalData.userInfo)
                      wx.switchTab({
                        url: '../../pages/index/index',
                      })
                      // }

                    },
                    fail: function (res) {
                  
                      wx.navigateTo({
                        url: '../../pages/loginerr/loginerr'
                      })
                    },
                    complete: function (res) { },
                  })

                },
                fail: function (res) {
        
                  wx.navigateTo({
                    url: '../../pages/loginerr/loginerr'
                  })
                },
                complete: function (res) { },
              })



              
            }else{
              $wuxDialog().alert({
                resetOnClose: true,
                closeable: true,
                title: '注意',
                content: '短信验证码输入有误，请重新输入',
              })
            }
          },
          fail: function (res) {
            wx.hideLoading()

          },
          complete: function (res) { },
        })



        $wuxToptips().success({
          hidden: false,
          text: '提交成功',
          duration: 500,
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
        if (result.length > 0) {
          $wuxToptips().success({
            hidden: false,
            text: '拒绝成功',
            duration: 500,
            success() {
              wx.navigateBack({
              })

            },
          })
        } else {
          alert("拒绝原因不能为空")
        }
        console.log(e)
        console.log(response)
      },
    })
  },




  onBlur(e) {
    this.setData({
      error: isTel(e.detail.value),
      tel: e.detail.value
    })
    console.log('onBlur', e)
  },
  onConfirm(e) {
    console.log('onConfirm', e)
  },

  onError() {
    $wuxDialog().alert({
      resetOnClose: true,
      closeable: true,
      title: '注意',
      content: '手机号码格式不正确',
    })
  },

  onBlur_vcode(e) {
    // var status = false
    // if (e.detail.value === this.data.vcode){
    //   status = true
    // }
    // console.log(status)
  this.setData({
    // error_vcode: status,
    vcode_input: e.detail.value
  })
  console.log('onBlur', e)
},

// onError_vcode() {
//   console.log('onError_vcode')
//   $wuxDialog().alert({
//     resetOnClose: true,
//     closeable: true,
//     title: '注意',
//     content: '验证码不正确',
//   })
// },

  onChange(e) {
    console.log(`验证码：${e.detail.value}`)
    this.setData({
      vcode: e.detail.value
    })
  },


  onBlur_tel_vcode(e) {
    // var status = false
    // if (e.detail.value === this.data.vcode){
    //   status = true
    // }
    // console.log(status)
    this.setData({
      // error_vcode: status,
      tel_vcode: e.detail.value
    })
    console.log('onBlur_tel_vcode', e)
  },

  send: function(){
    var that = this
    if (this.data.vcode_input !== this.data.vcode){
      $wuxDialog().alert({
        resetOnClose: true,
        closeable: true,
        title: '注意',
        content: '图片验证码输入有误，请重新输入',
      })
    }else{
      that.setData({ button: true})
      console.log("验证码正确")
      // 倒计时60秒，60秒后允许用户再次点击发送短信验证码的按钮
      var num = 60;
      // 设置一个计时器
      var t = setInterval(function () {
        if (num == 1) {
          // 如果计时器到最后, 清除计时器对象
          clearInterval(t);
          // 将点击获取验证码的按钮展示的文本回复成原始文本
          that.setData({
            button_value: "获取验证码",
            button: false
          })
        } else {
          num -= 1;
          // 展示倒计时信息
          that.setData({
            button_value: num + "秒"
          })
        }
      }, 1000)

      wx.request({
        url: 'http://127.0.0.1:5000/passport/sms_code',
        data: {
          mobile: that.data.tel
        },
        header: {},
        method: 'POST',
        success: function (res) {
          console.log(res)
  
          wx.hideLoading()
          
        },
        fail: function (res) {
          wx.hideLoading()
          
        },
        complete: function (res) { },
      })

    }

  }
})