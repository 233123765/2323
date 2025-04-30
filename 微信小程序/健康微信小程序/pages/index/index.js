const app = getApp()

Page({
  data: {
    articles: [],
    searchValue: '',
    showSearchInput: false
  },

  onLoad: function() {
    this.setData({
      articles: app.globalData.articles
    })
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  // 点击搜索图标，显示搜索输入框
  toggleSearchInput: function() {
    this.setData({
      showSearchInput: !this.data.showSearchInput
    })
  },

  // 搜索框输入事件
  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  // 执行搜索
  onSearch: function() {
    const searchValue = this.data.searchValue.toLowerCase()
    
    if (searchValue === '') {
      this.setData({
        articles: app.globalData.articles
      })
      return
    }

    const filteredArticles = app.globalData.articles.filter(article => {
      return article.title.toLowerCase().includes(searchValue) || 
             article.desc.toLowerCase().includes(searchValue)
    })

    this.setData({
      articles: filteredArticles
    })
  },

  // 取消搜索
  onCancelSearch: function() {
    this.setData({
      searchValue: '',
      showSearchInput: false,
      articles: app.globalData.articles
    })
  },

  // 查看文章详情
  onArticleTap: function(e) {
    const articleId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${articleId}&type=article`
    })
  }
}) 