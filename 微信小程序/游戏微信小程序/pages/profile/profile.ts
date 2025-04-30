// pages/profile/profile.ts
interface IUserInfo {
  id: string;
  name: string;
  avatar: string;
  collectCount: number;
  postCount: number;
  likeCount: number;
}

Page({
  data: {
    userInfo: {
      id: '2847392',
      name: '游戏达人007',
      avatar: '/images/avatars/user1.jpg',
      collectCount: 247,
      postCount: 36,
      likeCount: 1892
    } as IUserInfo,
    menuList: [
      {
        id: 'my-services',
        title: '我的服务',
        items: [
          { id: 'collect', icon: '/images/icons/collect.png', text: '我的收藏' },
          { id: 'history', icon: '/images/icons/history.png', text: '浏览历史' },
          { id: 'comment', icon: '/images/icons/comment.png', text: '我的评论' },
          { id: 'download', icon: '/images/icons/download.png', text: '离线下载' }
        ]
      },
      {
        id: 'content-manage',
        title: '内容管理',
        items: [
          { id: 'my-posts', icon: '/images/icons/edit.png', text: '我的攻略' },
          { id: 'drafts', icon: '/images/icons/draft.png', text: '草稿箱' },
          { id: 'creator', icon: '/images/icons/creator.png', text: '创作中心' }
        ]
      },
      {
        id: 'other-services',
        title: '其他服务',
        items: [
          { id: 'feedback', icon: '/images/icons/feedback.png', text: '意见反馈' },
          { id: 'about', icon: '/images/icons/about.png', text: '关于我们' },
          { id: 'settings', icon: '/images/icons/settings.png', text: '设置' }
        ]
      }
    ]
  },

  onLoad() {
    // 获取用户信息
    this.getUserInfo()
  },

  getUserInfo() {
    // 这里模拟获取用户信息，实际应用中应该调用微信API或自己的后端接口
    console.log('获取用户信息')
  },

  // 点击菜单项
  onMenuItemTap(e: any) {
    const id = e.currentTarget.dataset.id
    console.log('点击了菜单项:', id)
    
    // 根据不同菜单项进行不同跳转
    switch (id) {
      case 'my-posts':
        wx.navigateTo({ url: '/pages/my-posts/my-posts' })
        break
      case 'settings':
        wx.navigateTo({ url: '/pages/settings/settings' })
        break
      // 其他菜单项跳转...
      default:
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        })
    }
  },

  // 编辑用户资料
  editProfile() {
    wx.showToast({
      title: '编辑资料功能开发中',
      icon: 'none'
    })
  }
}) 