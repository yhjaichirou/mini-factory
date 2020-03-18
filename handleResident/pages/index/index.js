//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js");
const api = require("../../utils/api.js");
const emo = require("../../utils/emojiUtil.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onLoad: function () {
    console.log()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function(e) {
    var d = e.detail;
    wx.login({
      success: res => {
        util.request(api.AuthLoginByWeixin, { code: res.code, userInfo: d }).then(function(res){
          console.log(res);
          app.globalData.userInfo = res.data.data.userInfo;
          console.log(app.globalData.userInfo);
          wx.setStorageSync('userInfo', res.data.data.userInfo);
        });
       
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  gotoMycard:function(e){
    let that = this;
    // if (!this.isLogin()){
    //   getUserInfo();
    // }else{
    //   util.request(api.getMyCard, { "id":app.globalData.userInfo.id}).then(function(res){
    //     console.log(res);
    //     if (res.code==200 && res.data!=null){
    //       wx.navigateTo({
    //         url: '../mycard/mycard',
    //       })
    //     }
    //   });
     
    // }
    wx.navigateTo({
            url: '../mycard/mycard',
          })
  },
  gotoApplycard: function (e){
    let that = this;
    if (!this.isLogin()) {
      getUserInfo();
    } else {
      wx.navigateTo({
        url: '../apply/apply',
      })
    }
    
  },
  /**
   * 是否登录
   */
  isLogin : ()=>{
    return app.globalData.userInfo == null ? false : true;
  }
})
