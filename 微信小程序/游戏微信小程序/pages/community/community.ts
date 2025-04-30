// pages/community/community.ts
interface IPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  time: string;
  likes: number;
  comments: number;
  collects: number;
  game?: {
    id: string;
    name: string;
  };
}

Page({
  data: {
    currentTab: 0,
    tabs: ['热门', '关注', '攻略', '讨论', '问答'],
    posts: [
      {
        id: 'post1',
        title: '《原神》4.0版本最新攻略分享',
        content: '本期为大家带来枫丹新地图的探索要点，包括各个区域的解密技巧和隐藏任务的完成方法。新增的角色培养建议和最优配队推荐...',
        author: {
          id: 'user1',
          name: '游戏达人',
          avatar: '/images/avatars/user1.jpg'
        },
        time: '2小时前',
        likes: 128,
        comments: 32,
        collects: 15,
        game: {
          id: 'game1',
          name: '原神'
        }
      },
      {
        id: 'post2',
        title: '《崩坏: 星穹铁道》银河竞技场打法详解',
        content: '本攻略主要介绍银河竞技场的阵容搭配思路，包括输出、生存、控制等各个方面的考量，帮助大家轻松通关高难度内容...',
        author: {
          id: 'user2',
          name: '策略专家',
          avatar: '/images/avatars/user2.jpg'
        },
        time: '3小时前',
        likes: 256,
        comments: 48,
        collects: 23,
        game: {
          id: 'game5',
          name: '崩坏: 星穹铁道'
        }
      },
      {
        id: 'post3',
        title: '《王者荣耀》S32赛季最强英雄推荐',
        content: '新赛季版本更新后，英雄平衡性发生重大调整。本文将为大家详细分析各位置最具竞争力的英雄，以及相应的出装思路...',
        author: {
          id: 'user3',
          name: '游戏研究员',
          avatar: '/images/avatars/user3.jpg'
        },
        time: '5小时前',
        likes: 312,
        comments: 89,
        collects: 45,
        game: {
          id: 'game2',
          name: '王者荣耀'
        }
      }
    ] as IPost[],
    // 添加其他标签的数据
    hotPosts: [] as IPost[],
    followPosts: [] as IPost[],
    guidePosts: [] as IPost[],
    discussPosts: [] as IPost[],
    qaPosts: [] as IPost[]
  },

  onLoad() {
    // 初始化数据
    this.initPosts()
  },

  // 初始化各标签数据
  initPosts() {
    // 热门帖子
    this.setData({
      hotPosts: this.data.posts
    })

    // 关注帖子
    const followPosts = [
      {
        id: 'post4',
        title: '《原神》新角色"那维莱特"技能解析',
        content: '新角色那维莱特即将上线，本文详细解析其技能机制和配队思路...',
        author: {
          id: 'user4',
          name: '原神攻略组',
          avatar: '/images/avatars/user4.jpg'
        },
        time: '1小时前',
        likes: 89,
        comments: 23,
        collects: 12,
        game: {
          id: 'game1',
          name: '原神'
        }
      }
    ]
    this.setData({ followPosts })

    // 攻略帖子
    const guidePosts = [
      {
        id: 'post5',
        title: '《明日方舟》新活动"危机合约"攻略',
        content: '本期危机合约难度较高，本文提供详细的通关思路和阵容推荐...',
        author: {
          id: 'user5',
          name: '方舟攻略组',
          avatar: '/images/avatars/user5.jpg'
        },
        time: '4小时前',
        likes: 156,
        comments: 45,
        collects: 28,
        game: {
          id: 'game6',
          name: '明日方舟'
        }
      }
    ]
    this.setData({ guidePosts })

    // 讨论帖子
    const discussPosts = [
      {
        id: 'post6',
        title: '大家觉得《王者荣耀》新英雄强度如何？',
        content: '新英雄上线后，大家觉得强度如何？欢迎讨论...',
        author: {
          id: 'user6',
          name: '游戏玩家',
          avatar: '/images/avatars/user6.jpg'
        },
        time: '6小时前',
        likes: 78,
        comments: 112,
        collects: 5
      }
    ]
    this.setData({ discussPosts })

    // 问答帖子
    const qaPosts = [
      {
        id: 'post7',
        title: '《原神》如何快速提升角色等级？',
        content: '新手玩家求问，如何快速提升角色等级？有什么技巧吗？',
        author: {
          id: 'user7',
          name: '新手玩家',
          avatar: '/images/avatars/user7.jpg'
        },
        time: '8小时前',
        likes: 45,
        comments: 67,
        collects: 8,
        game: {
          id: 'game1',
          name: '原神'
        }
      }
    ]
    this.setData({ qaPosts })
  },

  // 切换标签
  switchTab(e: any) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentTab: index
    })
  },

  // 点赞
  likePost(e: any) {
    const id = e.currentTarget.dataset.id
    const posts = this.data.posts.map((post: IPost) => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.likes + 1
        }
      }
      return post
    })
    
    this.setData({
      posts
    })
  },

  // 进入详情页
  goToDetail(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&type=post`
    })
  }
}) 