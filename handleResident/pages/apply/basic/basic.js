// pages/apply/basic/basic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    username:"",
    phone:"",
    radio:"",
    columns: [
      { text: '杭州', disabled: true },
      { text: '宁波' },
      { text: '温州' }
    ],
    nation:"",
    birth:"",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },

  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  ChoiceNation(e){

  }
})