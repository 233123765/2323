const app = getApp()

Page({
  data: {
    id: 0,
    type: '',
    detail: {},
    isCollected: false
  },

  onLoad: function(options) {
    const { id, type } = options
    
    this.setData({
      id: parseInt(id),
      type
    })
    
    this.loadDetailData()
  },

  // 加载详情数据
  loadDetailData: function() {
    const { id, type } = this.data
    let detail = {}
    
    if (type === 'article') {
      detail = app.globalData.articles.find(item => item.id === id) || {}
    } else if (type === 'recipe') {
      detail = app.globalData.recipes.find(item => item.id === id) || {}
      
      // 为食谱添加详细信息
      if (detail.id) {
        detail.ingredients = [
          { name: '主料', items: ['鸡胸肉 200g', '藜麦 100g', '西兰花 50g', '胡萝卜 30g'] },
          { name: '调料', items: ['橄榄油 15ml', '盐 3g', '黑胡椒 2g', '柠檬汁 10ml'] }
        ]
        detail.steps = [
          { step: 1, desc: '将鸡胸肉洗净，切成小块，用盐和黑胡椒腌制10分钟' },
          { step: 2, desc: '将藜麦淘洗干净，放入锅中加水煮沸，转小火煮15分钟至颗粒膨胀' },
          { step: 3, desc: '西兰花和胡萝卜洗净切小块，焯水后备用' },
          { step: 4, desc: '平底锅加热，倒入橄榄油，将腌制好的鸡胸肉煎至两面金黄' },
          { step: 5, desc: '将煮好的藜麦、焯水的蔬菜和煎好的鸡胸肉拌匀，撒上柠檬汁即可' }
        ]
        detail.nutrition = [
          { name: '热量', value: '350 kcal' },
          { name: '蛋白质', value: '25 g' },
          { name: '碳水化合物', value: '40 g' },
          { name: '脂肪', value: '10 g' },
          { name: '膳食纤维', value: '5 g' }
        ]
      }
    }
    
    this.setData({ detail })
  },

  // 收藏/取消收藏
  toggleCollect: function() {
    this.setData({
      isCollected: !this.data.isCollected
    })
    
    wx.showToast({
      title: this.data.isCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    })
  },

  // 分享
  onShareAppMessage: function() {
    const { detail, type } = this.data
    return {
      title: detail.title,
      path: `/pages/detail/detail?id=${detail.id}&type=${type}`
    }
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack()
  }
}) 