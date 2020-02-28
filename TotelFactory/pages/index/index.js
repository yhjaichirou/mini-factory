//index.js
//获取应用实例
const app = getApp()
var api = require('../../config/api.js');
var utils = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    isLogin: 0
  },
  onLoad: function (options) {

    // console.log(options);
    // if (options != {}) {
    //   this.setData({
    //     isLogin: options.isLogin
    //   })
    // }

  },
  onShow: function () {
    if (app.globalData.isLogin) {
      this.setData({
        isLogin: 1
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }


  },
  goSign: function () {

    wx.redirectTo({
      url: '/pages/first/first'
    })
    // 保存用户信息到服务端
    // utils.request(api.updateUserInfo,{
    //   userinfo: app.globalData.userInfo,
    //   openid: app.globalData.openid
    // }).then(function(res){
    //   if(res.code == 200){
    //     setTimeout(function () {
    //       wx.redirectTo({
    //         url: '/pages/first/first'
    //       }), 2000
    //     })
    //   }else{
    //     wx.showToast({
    //       image: '/image/info.png',
    //       title: '登陆失败！',
    //       duration: 2000
    //     })
    //     return;
    //   }
    // })
  },
getUserInfo: function (e) {
  wx.login({
    success: function (res) {
      if (res.code) {
        
        utils.request(api.auth, {
          code: res.code
        }).then(function (res) {
          console.log(res);
          if (res.code == 200) {
            app.globalData.openid = res.data.openid
            wx.setStorageSync('openid', res.data.openid);
            wx.getUserInfo({
              success: res => {
                wx.setStorageSync('userInfo', res.userInfo);
                app.globalData.userInfo = res.userInfo
                var strName = utils.utf16toEntities(res.userInfo.nickName);
                var tmp = res.userInfo;
                tmp.nickName = strName;
                // 保存用户信息到服务端
                utils.request(api.updateUserInfo, {
                  userinfo: JSON.stringify(tmp),
                  openid: app.globalData.openid
                }).then(function (res) {
                  if (res.code == 200) {
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '/pages/first/first'
                      }), 2000
                    })
                  } else {
                    wx.showToast({
                      image: '/image/info.png',
                      title: '登陆失败！',
                      duration: 2000
                    })
                    return;
                  }
                })
              }
            })
          }
        });
      } else {

      }
    }
  })

},
goToQuery: function () {
  wx.redirectTo({
    url: '../first/first',
  })
}

})