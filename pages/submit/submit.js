import { $wuxDialog } from '../../wux/index'
import { $wuxToptips } from '../../wux/index'

Page({
  data: {
    id: 999,
    title: "表单填写",
    price:0,
    options1: [{
      'label': '物资服务',
      'value': '1',
      'isLeaf': false,
    }, {
      'label': '行政服务',
      'value': '2',
        'isLeaf': false,
      'children': [{
        'label': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'value': '22',
      }],
    }, {
      'label': '建议投诉',
      'value': '3',
        'isLeaf': false,
      'children': [{
        'label': 'xxxxx',
        'value': '33',
      }],
    }, {
      'label': '后勤维修',
      'value': '4',
      'isLeaf': false,
      'children': [{
        'label': 'xxxxx',
        'value': '44',
      }],
    }],
    value1: [],
    displayValue1: '请选择项目',


    value2: [],
    displayValue2: '请选择物品类型',
    options2: [{
      value: 'xsq',
      
      title: '显示器',
    }, {
      value: 'zj',
      
        title: '主机',
    }, {
      value: 'yx',
     
      disabled: true,
        title: '音响',
    }, {
      value: 'jp',
    
        title: '键盘',
    }, {
      value: 'sb',
      
        title: '鼠标',
    }, {
      value: 'ej',
      
        title: '耳机',
      }, {
        value: 'ej1',

        title: '耳机',
      }, {
        value: 'ej2',

        title: '耳机',
      }, {
        value: 'ej3',

        title: '耳机',
      }, {
        value: 'ej4',

        title: '耳机',
      }, {
        value: 'ej5',

        title: '耳机',
      }],
    options2_price:{
      "xsq":100,
      "zj":500,
      "yx":1000,
      "jp":60,
      "sb":80,
      "ej":130,
      "ej1": 130,
      "ej2": 130,
      "ej3":130,
      "ej4": 130,
      "ej5": 130
    },
    options2_name: {
      "xsq": "显示器",
      "zj": "主机",
      "yx": "音响",
      "jp": "键盘",
      "sb": "鼠标",
      "ej": "耳机"
    },
    options2_info: [],
    value2_name:[],


    displayValue3: '请选择紧急度',
    value3: '',
    options3: [{
      title: '非常高',
      value: '1',
    }, {
      title: '高',
      value: '2',
    }, {
      title: '中',
      value: '3',
    }, {
      title: '低',
      value: '4',
    }],
    displayValue4: '请选择影响范围',
    value4: '',
    options4: [{
      title: '个人',
      value: '1',
    }, {
      title: '部门',
      value: '2',
    }, {
      title: '公司',
      value: '3',
    }],

    value5: "",

    displayValue6: '请选择父级服务单',
    value6: '',
    options6: [{
      title: 'aaaaaaaaaaaa',
      value: '1',
    }, {
      title: 'bbbbbbbbbbbb',
      value: '2',
    }, {
      title: 'ccccccccccccc',
      value: '3',
    }, {
      title: 'ddddddddddddddddddddddd',
      value: '4',
    }],

    fileList: [],
    image_id: []
  },

  onOpen1() {
    this.setData({ visible1: true })
  },
  onClose1() {
    this.setData({ visible1: false })
  },
  onChange1(e) {
    console.log('onChange1', e.detail)
    this.setData({ value1: e.detail.value, displayValue1: e.detail.done && e.detail.options.map((n) => n.label).join('/') })
  },
  onLoadOptions1(e) {
    console.log('onLoadOptions', e.detail)
    const { value } = e.detail
    const options1 = [...this.data.options1]

    wx.showLoading({ mask: true })

    setTimeout(() => {
      if (value[value.length - 1] === '1') {
        options1.forEach((n) => {
          if (n.value === '1') {
            n.children = [
              {
                'label': '笔记本借用申请',
                'value': '11',
              }, {
                'label': 'U盘/硬盘借用申请',
                'value': '12',
              }, {
                'label': '宣传品印刷申请',
                'value': '13',
              }, {
                'label': '餐票申请',
                'value': '14',
              }, {
                'label': '酒水使用申请',
                'value': '15',
              }, {
                'label': '劳保用品申请',
                'value': '16',
              }
            ]
          }
        })
      } 

      wx.hideLoading()

      this.setData({ value1: value, options1 })
    }, 1000)
  },


  setValue(values, key) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
    })
  },
  onConfirm(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    if(index === "2"){
      console.log("value2_name success")
      
      var price = 0
      var value_item = e.detail.value
      
      var options2_info = this.data.options2_info
      var new_options2_info = []
      if (options2_info.length > 0){
        var name_list = []
        for (var i = 0; i < options2_info.length; i++){
          name_list.push(options2_info[i]["name"])
        }

        for (var i = 0; i < value_item.length; i++){
          if (name_list.includes(value_item[i])){
            new_options2_info.push(options2_info[name_list.indexOf(value_item[i])])
          }else{
            new_options2_info.push({
              "name": value_item[i],
              // "label": e.detail.displayValue[i],
              "label": this.data.options2_name[value_item[i]],
              "count": 1
            })
          }
        }
        
        for (var i = 0; i < new_options2_info.length; i++) {
          price += (this.data.options2_price[new_options2_info[i]["name"]] * new_options2_info[i]["count"])
        }

        options2_info = new_options2_info

      }else{
        for (var i = 0; i < value_item.length; i++) {
          var this_dict = {
            "name": value_item[i],
            // "label": e.detail.displayValue[i],
            "label": this.data.options2_name[value_item[i]],
            "count": 1
          }
          options2_info.push(this_dict)
        }
        for (var i = 0; i < options2_info.length; i++) {
          price += (this.data.options2_price[options2_info[i]["name"]] * options2_info[i]["count"])
        }
      }
      this.setData({ 
        value2_name: e.detail.displayValue,
        price: price,
        options2_info: options2_info
       })
      console.log(options2_info)


    }
    console.log(`onConfirm${index}`, e.detail)
  },
  numchange: function(e) {
    console.log(e)
    var item_index = e.currentTarget.dataset.index
    var item_num = e.detail.value
    var options2_info = this.data.options2_info
    options2_info[item_index]["count"] = item_num
    // options2_num.splice(item_index, 1, item_num)
    var price = 0
    for (var i = 0; i < options2_info.length; i++){
      price += (options2_info[i]["count"] * this.data.options2_price[options2_info[i]["name"]])
    }
    this.setData({
      options2_info: options2_info,
      price: price
    })
    console.log(price)
  },


  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },
  onVisibleChange(e) {
    this.setData({ visible2: e.detail.visible })
  },
  onClick() {
    this.setData({ visible2: true })
  },

  remark: function(e){
    console.log(e)
    this.setData({value5: e.detail.value})
  },


  reset: function(){
    var that = this
    $wuxDialog().confirm({
      resetOnClose: true,
      closeable: true,
      title: '提醒',
      content: '是否确定重置表单信息？',
      onConfirm(e) {
        that.setData({
          price: 0,
          value1: [],
          displayValue1: '请选择项目',
          value2: [],
          displayValue2: '请选择物品类型',
          options2_info: [],
          displayValue3: '请选择紧急度',
          value3: '',
          displayValue4: '请选择影响范围',
          value4: '',
          value5: '',
          displayValue6: '请选择父级服务单',
          value6: ''
        })
      },
      onCancel(e) {
        console.log('谢谢你不吃之恩！')
      },
    })

  
  },


  open() {
    this.setData({
      visible3: true,
    })
  },

  close() {
    this.setData({
      visible3: false,
    })
  },

  verify: function () {
    console.log(this.data.fileList)
    var that = this
    var content = ""
    var flag = true
    if (this.data.value1.length === 0){
      content = "请选择项目后提交"
      flag = false
    } else if (this.data.options2_info.length === 0) {
      content = "请选择物品后提交"
      flag = false
    } else if (this.data.value3.length === 0){
      content = "请选择紧急度后提交"
      flag = false
    } else if (this.data.value4.length === 0){
      content = "请选择影响范围后提交"
      flag = false
    } else if (this.data.fileList.length === 0) {
      content = "请选择附件后提交"
      flag = false
    }
    if (!flag){
      $wuxDialog().confirm({
        resetOnClose: true,
        closeable: true,
        title: '提醒',
        content: content,
        onConfirm(e) {
        },
        onCancel(e) {
        },
      })
    }else{
      this.open()
    }
  },


  Upload: function () {
    wx.showLoading({
      title: '提交中...',
    })
    this.oneUpload(0)

  },

  oneUpload: function (currentIndx) {

    var t = this

    console.log('正在上传第' + (currentIndx + 1) + '张图片')

    wx.uploadFile({
      url: 'http://127.0.0.1:5000/form/image',
      filePath: t.data.fileList[currentIndx].url,
      name: 'image',
      formData: {
        'name': t.data.displayValue1
      },

      success: function (res) {

        console.log(JSON.parse(res.data))
        const data = JSON.parse(res.data)

        //!!!
        if (data.status === 0){
          wx.hideLoading()
          console.log('第' + (currentIndx + 1) + '张图片上传失败')
          t.setData({
            image_id: []
          })
          $wuxToptips().error({
            hidden: false,
            text: '图片上传失败',
            duration: 1000,
          })
          return false;
        }
        console.log('第' + (currentIndx + 1) + '张图片上传成功')
        var image_id = t.data.image_id
        image_id.push(data.id)

        t.setData({
          image_id: image_id
        })

        // 判断是否还有需要上传的图片

        if (currentIndx + 1 < t.data.fileList.length) {

          // 继续上传下一张图片

          t.oneUpload(currentIndx + 1)

        } else {
          
          console.log('image_id', t.data.image_id)
          console.log('所有图片上传成功')

          t.submit()

        }

      },

      fail: function (res) {
        wx.hideLoading()
        console.log('第' + (currentIndx + 1) + '张图片上传失败')
        t.setData({
          image_id: []
        })
        $wuxToptips().error({
          hidden: false,
          text: '图片上传失败',
          duration: 1000,
        })
        
      }

    })

  },



  submit() {

    var that = this

    wx.request({
      url: 'http://127.0.0.1:5000/form/submit',
      data: {
        parents: that.data.value6,
        source: that.data.id,
        service: that.data.value1,
        descript: that.data.value5,
        scope: that.data.value4,
        urgency: that.data.value3,
        goods: that.data.options2_info,
        price: that.data.price,
        image_id: that.data.image_id
      },
      header: {},
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        const data = res.data
        if (data.status === 0){

          console.log("表单提交失败")
          that.setData({
            image_id: []
          })
          $wuxToptips().error({
            hidden: false,
            text: '表单提交失败',
            duration: 1000,
          })
          return false;
        }
         
        $wuxToptips().success({
          hidden: false,
          text: '表单提交成功',
          duration: 1000,
          success() {
            wx.redirectTo({
              url: '../../pages/my_submit/my_submit',
            })
          },
        })
      },
      fail: function (res) {
        wx.hideLoading() 
        that.setData({
          image_id: []
        })
        $wuxToptips().error({
          hidden: false,
          text: '表单提交失败',
          duration: 1000,
        })

      },
      complete: function (res) { },
    })

  },




  upbefore(e){
    console.log(e)
    var url = e.detail.tempFilePaths[0]
    var fileList = this.data.fileList
    fileList.push({"url":url})
    this.setData({ 
      fileList: fileList,
      // imageUrl: url
    })
  },





  onChange(e) {
    console.log('onChange', e)
    const { file, fileList } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      // wx.showLoading()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      var id = options.id
      var title = ""
      if(id === 0){
        title = "后勤服务表单填写："
      }else{
        title = "IT服务表单填写："
      }
      this.setData({
        id: id,
        title: title
      })
      console.log("id",id)

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

  }

})