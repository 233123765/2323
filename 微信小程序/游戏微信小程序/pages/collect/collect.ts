// pages/collect/collect.ts
interface ICollection {
  id: string;
  name: string;
  cover: string;
  description: string;
  type: string;
  collectTime: string;
}

Page({
  data: {
    collections: [] as ICollection[]
  },

  onLoad() {
    this.loadCollections()
  },

  onShow() {
    // 每次显示页面时重新加载收藏列表
    this.loadCollections()
  },

  // 加载收藏列表
  loadCollections() {
    const collections: ICollection[] = wx.getStorageSync('collections') || []
    
    // 按收藏时间倒序排序
    collections.sort((a, b) => {
      return new Date(b.collectTime).getTime() - new Date(a.collectTime).getTime()
    })
    
    this.setData({
      collections
    })
  },

  // 点击收藏项
  onItemTap(e: any) {
    const { id, type } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&type=${type}`
    })
  },

  // 点击删除按钮
  onDeleteTap(e: any) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          // 从本地存储中移除
          const collections: ICollection[] = wx.getStorageSync('collections') || []
          const index = collections.findIndex(item => item.id === id)
          if (index > -1) {
            collections.splice(index, 1)
            wx.setStorageSync('collections', collections)
            
            // 更新页面数据
            this.setData({
              collections
            })
            
            wx.showToast({
              title: '已取消收藏',
              icon: 'success'
            })
          }
        }
      }
    })
  }
}) 