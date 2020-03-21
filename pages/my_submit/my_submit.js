// pages/mine_task/mine_task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actions: [{
      text: '点击查看',
      type: 'primary',
    }],
    current: 1,
    items: [{
      type: 'radio',
      label: '状态',
      value: 'check',
      checked: true,
      children: [{
        label: '全部',
        value: 'all',
        checked: true, // 默认选中
      },
      {
        label: '未完成',
        value: 'open',
      },
      {
        label: '已完成',
        value: 'end',
      }
      ],
      groups: ['001'],
    },
    {
      type: 'radio',
      label: '紧急程度',
      value: 'grade',
      children: [{
        label: '所有',
        value: 'all2',
        checked: true, // 默认选中
      },
      {
        label: '非常高',
        value: '1',
      },
      {
        label: '高',
        value: '2',
      },
      {
        label: '低',
        value: '3',
      }
      ],
      groups: ['002'],
    },
    {
      type: 'sort',
      label: '提交时间',
      value: 'time',
      groups: ['003'],
    }],
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
  onAction(e) {
    console.log('onAction', e.detail)
    wx.navigateTo({
      url: '../../pages/my_submit_info/my_submit_info',
    })
  },
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      current: e.detail.current,
    })
  },

  onChange_filter(e) {
    console.log(e)
    const { checkedItems, items, checkedValues } = e.detail
    const params = {}

    console.log(checkedItems, items, checkedValues)

    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === 'check') {
          const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
          params.sort = n.value
          params.order = selected
        } else if (n.value === 'time') {
          params.sort = n.value
          // params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'grade') {
          const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
          params.sort = n.value
        }
      }
    })

    console.log('params', params)

    // this.getRepos(params)
  },
  onOpen(e) {
    this.setData({ opened: true })
  },
  onClose(e) {
    this.setData({ opened: false })
  },
})