Page({
  data: {
    options1: [{
      'label': '物资服务',
      'value': '1',
      'children': [{
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
        }],
    }, {
      'label': '行政服务',
      'value': '2',
      'children': [{
        'label': 'xxxxx',
        'value': '22',
      }],
      }, {
        'label': '建议投诉',
        'value': '3',
        'children': [{
          'label': 'xxxxx',
          'value': '33',
        }],
      }, {
        'label': '后勤维修',
        'value': '4',
        'children': [{
          'label': 'xxxxx',
          'value': '44',
        }],
      }],
    value1: [],
    value3: [],
    displayValue3: '请选择物品类型',
    options: [{
      value: 'bj',
      label: '北京市',
    }, {
      value: 'zj',
      label: '浙江省',
    }, {
      value: 'gd',
      label: '广东省',
      disabled: true,
    }, {
      value: 'hn',
      label: '海南省',
    }, {
      value: 'cq',
      label: '重庆市',
    }, {
      value: 'sc',
      label: '四川省',
    }],

    displayValue4: '请选择紧急度',
    value4: '',
    options4: [{
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
    displayValue5: '请选择影响范围',
    value5: '',
    options5: [{
      title: '个人',
      value: '1',
    }, {
      title: '部门',
      value: '2',
    }, {
      title: '公司',
      value: '3',
    }],

    fileList:[]
  },
  onOpen1() {
    this.setData({ visible1: true })
  },
  onClose1() {
    this.setData({ visible1: false })
  },
  onChange1(e) {
    this.setData({ title1: e.detail.options.map((n) => n.label).join('/') })
    console.log('onChange1', e.detail)
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
    console.log(`onConfirm${index}`, e.detail)
  },
  onValueChange(e) {
    // const { index } = e.currentTarget.dataset
    // console.log(`onValueChange${index}`, e.detail)
    // if (index === '4') {
    //   this.setValue(e.detail, index)
    //   this.setData({ loading: true })

    //   setTimeout(() => {
    //     const val = e.detail.value
    //     const d = [...this.data.asyncOptions]
    //     const value4 = [...val]
    //     let colNum = 1

    //     if (val[0] === 'zj') {
    //       d.forEach((i) => {
    //         if (i.value === 'zj') {
    //           colNum = 2
    //           if (!i.children) {
    //             i.children = [{
    //               value: 'zj-nb',
    //               label: '宁波',
    //             }, {
    //               value: 'zj-hz',
    //               label: '杭州',
    //             }]
    //             value4.push('zj-nb')
    //           } else if (val[1] === 'zj-hz') {
    //             i.children.forEach((j) => {
    //               if (j.value === 'zj-hz') {
    //                 j.children = [{
    //                   value: 'zj-hz-xh',
    //                   label: '西湖区',
    //                 }]
    //                 value4.push('zj-hz-xh')
    //               }
    //             })
    //             colNum = 3
    //           }
    //         }
    //       })
    //     } else {
    //       colNum = 1
    //     }

    //     this.setData({ asyncOptions: d, asyncCols: colNum, value4, loading: false })
    //   }, 300)
    // }
  },
  onVisibleChange(e) {
    this.setData({ visible: e.detail.visible })
  },
  setValue4(values, key) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
    })
  },
  onConfirm4(e) {
    const { index } = e.currentTarget.dataset
    console.log(e)
    this.setValue4(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
  },
  onValueChange4(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },
  onVisibleChange4(e) {
    this.setData({ visible4: e.detail.visible })
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