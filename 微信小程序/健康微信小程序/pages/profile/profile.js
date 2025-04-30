const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: '/images/avatar.png',
      nickName: '美食探索家',
      signature: '分享美食，记录生活'
    },
    statistics: {
      collect: 238,
      follow: 86,
      fans: 125
    },
    recipes: []
  },

  onLoad: function() {
    this.setData({
      recipes: app.globalData.recipes
    })
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  // 获取用户信息
  getUserProfile: function() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        app.globalData.hasLogin = true
        this.setData({
          'userInfo.avatarUrl': res.userInfo.avatarUrl,
          'userInfo.nickName': res.userInfo.nickName
        })
      },
      fail: () => {
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        })
      }
    })
  },

  // 点击功能项
  onFeatureTap: function(e) {
    const feature = e.currentTarget.dataset.feature
    switch (feature) {
      case 'collect':
        wx.showToast({
          title: '查看我的收藏',
          icon: 'none'
        })
        break
      case 'history':
        wx.showToast({
          title: '查看浏览历史',
          icon: 'none'
        })
        break
      case 'recipe':
        wx.showToast({
          title: '管理我的食谱',
          icon: 'none'
        })
        break
      case 'shopping':
        wx.showToast({
          title: '查看购物清单',
          icon: 'none'
        })
        break
      case 'health':
        wx.showToast({
          title: '查看健康数据',
          icon: 'none'
        })
        break
      case 'plan':
        wx.showToast({
          title: '管理饮食计划',
          icon: 'none'
        })
        break
      case 'analysis':
        wx.showToast({
          title: '查看营养分析',
          icon: 'none'
        })
        break
      case 'community':
        wx.showToast({
          title: '进入社区交流',
          icon: 'none'
        })
        break
      default:
        break
    }
  },

  // 点击设置项
  onSettingTap: function(e) {
    const setting = e.currentTarget.dataset.setting
    switch (setting) {
      case 'account':
        wx.showToast({
          title: '进入账号设置',
          icon: 'none'
        })
        break
      case 'privacy':
        wx.showToast({
          title: '进入隐私设置',
          icon: 'none'
        })
        break
      case 'notification':
        wx.showToast({
          title: '进入消息通知',
          icon: 'none'
        })
        break
      case 'help':
        wx.showToast({
          title: '进入帮助中心',
          icon: 'none'
        })
        break
      default:
        break
    }
  },

  // 查看食谱详情
  onRecipeTap: function(e) {
    const recipeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${recipeId}&type=recipe`
    })
  }
}) 