// pages/index/index.ts
interface ICategory {
  id: string;
  name: string;
  active: boolean;
}

interface IGame {
  id: string;
  name: string;
  cover: string;
  description: string;
  rating: number;
  type: string;
}

Page({
  data: {
    categories: [
      { id: 'all', name: '全部', active: true },
      { id: 'action', name: '动作', active: false },
      { id: 'rpg', name: 'RPG', active: false },
      { id: 'strategy', name: '策略', active: false },
      { id: 'shooting', name: '射击', active: false },
      { id: 'moba', name: 'MOBA', active: false }
    ],
    games: [
      {
        id: 'game1',
        name: '原神',
        cover: '/images/game/game1.jpg',
        description: '开放世界ARPG，探索提瓦特大陆的奇幻冒险',
        rating: 4,
        type: 'rpg'
      },
      {
        id: 'game2',
        name: '王者荣耀',
        cover: '/images/game/game2.jpg',
        description: '5v5多人在线竞技游戏，西施新皮肤上线',
        rating: 4,
        type: 'moba'
      },
      {
        id: 'game3',
        name: '和平精英',
        cover: '/images/game/game3.jpg',
        description: '多人射击生存游戏，在战场上生存到最后',
        rating: 3,
        type: 'shooting'
      },
      {
        id: 'game4',
        name: '阴阳师',
        cover: '/images/game/game4.jpg',
        description: '回合制RPG，收集式卡牌游戏',
        rating: 4,
        type: 'rpg'
      },
      {
        id: 'game5',
        name: '第五人格',
        cover: '/images/game/game5.jpg',
        description: '非对称对抗竞技游戏，1v4躲猫猫',
        rating: 4,
        type: 'action'
      },
      {
        id: 'game6',
        name: '明日方舟',
        cover: '/images/game/game6.jpg',
        description: '塔防策略RPG，组建干员小队对抗灾害',
        rating: 4,
        type: 'strategy'
      }
    ],
    currentGames: [] as IGame[],
    searchKeyword: ''
  },

  onLoad() {
    // 初始化显示所有游戏
    this.setData({
      currentGames: this.data.games
    })
  },

  // 切换分类
  switchCategory(e: any) {
    const id = e.currentTarget.dataset.id
    const categories = this.data.categories.map((item: ICategory) => {
      return {
        ...item,
        active: item.id === id
      }
    })

    let currentGames = this.data.games
    if (id !== 'all') {
      currentGames = this.data.games.filter((game: IGame) => game.type === id)
    }

    this.setData({
      categories,
      currentGames
    })
  },

  // 跳转到游戏详情页
  goToDetail(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  // 搜索功能
  onSearch(e: any) {
    const keyword = e.detail.value.toLowerCase()
    this.setData({
      searchKeyword: keyword
    })
    
    // 根据关键词搜索游戏
    const filteredGames = this.data.games.filter((game: IGame) => {
      return game.name.toLowerCase().includes(keyword) || 
             game.description.toLowerCase().includes(keyword)
    })
    
    this.setData({
      currentGames: filteredGames
    })
  },

  // 清除搜索
  clearSearch() {
    this.setData({
      searchKeyword: '',
      currentGames: this.data.games
    })
  },

  // 图片加载失败处理
  onImageError(e: any) {
    const id = e.currentTarget.dataset.id
    const defaultCover = '/images/game/default.jpg'
    
    // 更新对应游戏的封面为默认图片
    const games = this.data.games.map((game: IGame) => {
      if (game.id === id) {
        return {
          ...game,
          cover: defaultCover
        }
      }
      return game
    })
    
    this.setData({
      games,
      currentGames: this.data.currentGames.map((game: IGame) => {
        if (game.id === id) {
          return {
            ...game,
            cover: defaultCover
          }
        }
        return game
      })
    })
  }
}) 