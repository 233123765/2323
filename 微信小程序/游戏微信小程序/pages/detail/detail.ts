// pages/detail/detail.ts
interface IGameDetail {
  id: string;
  name: string;
  cover: string;
  description: string;
  rating: number;
  type: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  publishTime: string;
  views: number;
  likes: number;
  collections: number;
  comments: IComment[];
}

interface IComment {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  time: string;
  likes: number;
}

Page({
  data: {
    id: '',
    type: 'game', // game or post
    detail: null as IGameDetail | null,
    isCollected: false,
    isLiked: false,
    commentContent: '',
    showCommentInput: false
  },

  onLoad(options: any) {
    const { id, type } = options
    this.setData({
      id: id || '',
      type: type || 'game'
    })
    
    // 获取详情数据
    this.getDetail()
  },

  // 获取详情数据
  getDetail() {
    // 这里应该根据id和type从服务器获取数据
    // 这里使用模拟数据
    let mockDetail: IGameDetail;

    if (this.data && this.data.id === 'game6') {
      // 明日方舟详情
      mockDetail = {
        id: 'game6',
        name: '明日方舟',
        cover: '/images/game/game6.jpg',
        description: '塔防策略RPG，组建干员小队对抗灾害',
        rating: 4,
        type: 'strategy',
        content: `# 明日方舟策略指南：遗尘漫步活动全攻略

本攻略为大家带来遗尘漫步活动的关卡打法、干员推荐和奖励获取指南。

## 1. 新干员分析与培养建议

本次活动引入了强力新干员"焰影苇草"，作为6星术师干员，具有以下特点：

- 超大范围AOE伤害，可覆盖多条道路
- 独特的"灼烧"机制，持续对敌人造成伤害
- 技能3全场攻击，可应对高难关卡多路敌人

推荐培养优先级：
1. 焰影苇草 - 术师
2. 琳琅诗怀雅 - 近卫
3. 蚀刻推进英 - 先锋

## 2. 遗尘漫步活动关卡攻略

### 2.1 普通难度关卡要点

- DM-1至DM-4：以练级为主，推荐带上AOE伤害干员
- DM-5至DM-7：敌人开始携带护盾，需要破防或真实伤害
- DM-8：Boss关卡，注意避开红色区域伤害

### 2.2 突袭模式要点

突袭模式增加了以下限制：
- 部署费用提高25%
- 敌人攻击力提高15%
- 部分格子不可部署

推荐阵容：
- 德克萨斯 - 费用回复
- 推进之王 - 高费用输出
- 能天使 - 物理输出
- 艾雅法拉 - 法术输出
- 闪灵 - 治疗
- 焰影苇草 - AOE法术伤害

## 3. 活动奖励获取指南

完成所有关卡可获得：
- 源石×15
- 合成玉×3000
- 新干员"焰影苇草"的培养材料
- 限定家具套装"遗尘回廊"

额外挑战任务：
- 使用4名或以下干员通关DM-8：高级强化材料×5
- 不使用地面单位通关DM-6：源石×3
- 不漏怪通关所有关卡：稀有头像框

希望本攻略能帮助博士们顺利通关本次活动！罗德岛随时欢迎您的归来！`,
        author: {
          id: 'user4',
          name: '罗德岛资深干员',
          avatar: '/images/avatars/user4.jpg'
        },
        publishTime: '2023-10-12 16:45',
        views: 8942,
        likes: 1735,
        collections: 426,
        comments: [
          {
            id: 'comment3',
            content: '感谢攻略！终于知道怎么应对DM-8的boss了，那个红色区域真的很难躲',
            user: {
              id: 'user5',
              name: '新手博士',
              avatar: '/images/avatars/user5.jpg'
            },
            time: '5小时前',
            likes: 23
          },
          {
            id: 'comment4',
            content: '焰影苇草真的很强，不过我觉得突袭模式用银灰也是个不错的选择',
            user: {
              id: 'user6',
              name: '资深博士',
              avatar: '/images/avatars/user6.jpg'
            },
            time: '昨天',
            likes: 17
          }
        ]
      };
    } else {
      // 原神详情（默认）
      mockDetail = {
        id: this.data && this.data.id || '',
        name: '原神',
        cover: '/images/game/game1.jpg',
        description: '开放世界ARPG，探索提瓦特大陆的奇幻冒险',
        rating: 4,
        type: 'rpg',
        content: `# 原神4.0版本最新攻略分享

本期为大家带来枫丹新地图的探索要点，包括各个区域的解密技巧和隐藏任务的完成方法。

## 1. 枫丹新增角色培养建议

枫丹地区新增了水系、火系和草系角色，这些角色在不同的队伍中都有不同的表现。根据目前的测试结果，推荐优先培养以下角色：

- 林尼：火系弓箭手，输出能力突出
- 琳妮特：水系法师，辅助能力强大
- 芙宁娜：水系辅助，回复能力极强

## 2. 枫丹主线任务攻略

枫丹主线任务较长，主要分为三大章节，每个章节都有不同的解谜要素和战斗挑战。

### 2.1 解密技巧

在枫丹地区，新增了很多基于"泡泡"机制的解密，需要注意以下几点：
- 泡泡机关可以通过水系技能激活
- 部分机关需要特定角色的技能才能触发
- 解密顺序很重要，建议按照任务指引的顺序进行

### 2.2 隐藏任务

枫丹地区有多个隐藏任务，完成这些任务可以获得丰厚的奖励：
- 枫丹酒庄的秘密：位于城市北部，需要完成一系列对话选择
- 水中仙灵：在河流区域，需要在特定时间段前往
- 街头艺人的委托：在城市中心，需要收集特定道具

## 3. 最优配队推荐

在枫丹地区探索时，推荐以下阵容搭配：

1. 火水双C：林尼 + 宵宫 + 琳妮特 + 班尼特
2. 草元素队：纳西妲 + 艾尔海森 + 绮良良 + 芙宁娜
3. 永冻队：神里绫华 + 琳妮特 + 枫原万叶 + 迪奥娜

希望以上攻略对各位旅行者有所帮助！祝大家在枫丹地区的探索之旅愉快！
      `,
        author: {
          id: 'user1',
          name: '游戏达人',
          avatar: '/images/avatars/user1.jpg'
        },
        publishTime: '2023-08-25 10:23',
        views: 12356,
        likes: 2341,
        collections: 567,
        comments: [
          {
            id: 'comment1',
            content: '攻略写得真详细，谢谢分享！我按照这个攻略终于通关了困难的机关谜题',
            user: {
              id: 'user2',
              name: '原神玩家',
              avatar: '/images/avatars/user2.jpg'
            },
            time: '2小时前',
            likes: 15
          },
          {
            id: 'comment2',
            content: '我觉得枫丹地区的视觉设计真的很棒，特别是那些水元素效果，太震撼了',
            user: {
              id: 'user3',
              name: '设计爱好者',
              avatar: '/images/avatars/user3.jpg'
            },
            time: '昨天',
            likes: 8
          }
        ]
      };
    }
    
    this.setData({
      detail: mockDetail
    })
  },

  // 收藏
  toggleCollect() {
    if (this.data && this.data.detail) {
      const isCollected = !this.data.isCollected;
      const collections = isCollected ? this.data.detail.collections + 1 : this.data.detail.collections - 1;
      
      this.setData({
        isCollected: isCollected,
        'detail.collections': collections
      });
    }
    
    wx.showToast({
      title: this.data && this.data.isCollected ? '取消收藏' : '收藏成功',
      icon: 'success'
    })
  },

  // 点赞
  toggleLike() {
    if (this.data && this.data.detail) {
      const isLiked = !this.data.isLiked;
      const likes = isLiked ? this.data.detail.likes + 1 : this.data.detail.likes - 1;
      
      this.setData({
        isLiked: isLiked,
        'detail.likes': likes
      });
    }
  },

  // 显示评论输入框
  showComment() {
    this.setData({
      showCommentInput: true
    })
  },

  // 关闭评论输入框
  hideComment() {
    this.setData({
      showCommentInput: false,
      commentContent: ''
    })
  },
  
  // 停止事件冒泡
  stopPropagation() {
    // 阻止点击事件冒泡
  },

  // 输入评论内容
  inputComment(e: any) {
    this.setData({
      commentContent: e.detail.value
    })
  },

  // 提交评论
  submitComment() {
    if (this.data && this.data.commentContent && this.data.commentContent.trim() && this.data.detail) {
      // 这里应该将评论发送到服务器
      // 这里使用模拟数据
      const newComment: IComment = {
        id: 'comment' + Date.now(),
        content: this.data.commentContent,
        user: {
          id: 'user1',
          name: '当前用户',
          avatar: '/images/avatars/user1.jpg'
        },
        time: '刚刚',
        likes: 0
      };
      
      // 在本地添加评论
      const comments = [newComment, ...this.data.detail.comments];
      
      this.setData({
        commentContent: '',
        'detail.comments': comments,
        showCommentInput: false
      });
      
      wx.showToast({
        title: '评论成功',
        icon: 'success'
      });
    }
  },

  // 分享
  onShareAppMessage() {
    if (this.data && this.data.detail) {
      return {
        title: this.data.detail.name,
        path: `/pages/detail/detail?id=${this.data.detail.id}&type=${this.data.detail.type}`,
        imageUrl: this.data.detail.cover
      };
    }
    return {
      title: '游戏详情',
      path: '/pages/index/index'
    };
  }
}) 