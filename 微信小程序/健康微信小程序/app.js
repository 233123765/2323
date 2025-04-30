// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('登录成功', res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 生成临时图片资源（实际项目中应该使用真实的图片资源）
    this.generateTempImages()
  },

  // 生成临时图片资源，实际项目中应该使用真实的图片路径
  generateTempImages() {
    // 使用随机颜色作为占位图片
    const generateColorImage = (label, color) => {
      return `https://dummyimage.com/400x300/${color}/ffffff&text=${label}`
    }

    // 更新globalData中的图片路径
    this.globalData.articles.forEach((article, index) => {
      const colors = ['4CAF50', 'FF9800', '2196F3']
      article.imageUrl = generateColorImage(article.tag, colors[index % colors.length])
    })

    this.globalData.recipes.forEach((recipe, index) => {
      const colors = ['E91E63', '9C27B0']
      recipe.imageUrl = generateColorImage(recipe.title.slice(0, 4), colors[index % colors.length])
    })
  },

  globalData: {
    userInfo: null,
    hasLogin: false,
    articles: [
      {
        id: 1,
        title: '轻食沙拉的营养搭配指南',
        desc: '如何健康饮食又不必过于苦行？跟着这份搭配指南，让你的沙拉更美味又营养！',
        imageUrl: '',
        tag: '营养搭配',
        likes: 238,
        views: 1267
      },
      {
        id: 2,
        title: '零基础学做全麦面包',
        desc: '无添加剂，低糖低脂，在家就能做健康美味的全麦面包',
        imageUrl: '',
        tag: '达人推荐',
        likes: 186,
        views: 956
      },
      {
        id: 3,
        title: '秋季应季水果营养指南',
        desc: '秋季水果营养丰富，教你如何选择最应季的水果',
        imageUrl: '',
        tag: '专家推荐',
        likes: 142,
        views: 789
      }
    ],
    recipes: [
      {
        id: 1,
        title: '香煎三文鱼配藜麦',
        desc: '低脂高蛋白，营养美味',
        rating: 4.9,
        imageUrl: ''
      },
      {
        id: 2,
        title: '轻食沙拉套餐',
        desc: '健康低卡路里',
        rating: 4.8,
        imageUrl: ''
      }
    ]
  }
}) 