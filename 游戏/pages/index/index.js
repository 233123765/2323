const { SnakeGame } = require('../../utils/game');

Page({
  data: {
    score: 0,
    bestScore: 0,
    isGameOver: false,
    isPaused: false,
    canvasWidth: 0,
    canvasHeight: 0
  },

  onLoad: function() {
    // 获取最高分
    const bestScore = wx.getStorageSync('snake_best_score') || 0;
    this.setData({ bestScore });
    
    // 获取系统信息
    const sysInfo = wx.getSystemInfoSync();
    
    // 计算画布大小（使用屏幕宽度的90%，确保是15的倍数以便网格对齐）
    const canvasWidth = Math.floor(sysInfo.windowWidth * 0.9 / 15) * 15;
    const canvasHeight = canvasWidth; // 保持正方形
    
    this.setData({
      canvasWidth,
      canvasHeight
    });
    
    // 初始化游戏
    this.initGame();
  },
  
  onReady: function() {
    // 创建画布上下文
    const query = wx.createSelectorQuery();
    query.select('#gameCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 设置canvas的宽高
        canvas.width = this.data.canvasWidth;
        canvas.height = this.data.canvasHeight;
        
        this.canvas = canvas;
        this.ctx = ctx;
        
        // 创建游戏实例
        this.game = new SnakeGame({
          width: this.data.canvasWidth,
          height: this.data.canvasHeight,
          gridSize: 15,
          ctx: ctx,
          speed: 200
        });
        
        // 设置游戏结束回调
        this.game.onGameOver = (score) => {
          this.gameOver(score);
        };
        
        // 初始绘制
        this.game.draw();
      });
  },
  
  // 初始化游戏
  initGame: function() {
    this.setData({
      score: 0,
      isGameOver: false,
      isPaused: false
    });
    
    if (this.game) {
      this.game.start();
    }
  },
  
  // 处理方向按钮点击
  onDirectionBtnTap: function(e) {
    if (!this.game || this.data.isGameOver || this.data.isPaused) return;
    
    const direction = e.currentTarget.dataset.direction;
    this.game.changeDirection(direction);
  },
  
  // 处理开始/重新开始按钮点击
  onStartBtnTap: function() {
    if (this.data.isGameOver) {
      this.initGame();
    } else if (this.data.isPaused) {
      this.setData({ isPaused: false });
      this.game.start();
    }
  },
  
  // 处理暂停按钮点击
  onPauseBtnTap: function() {
    if (!this.game || this.data.isGameOver) return;
    
    if (this.data.isPaused) {
      this.setData({ isPaused: false });
      this.game.start();
    } else {
      this.setData({ isPaused: true });
      this.game.pause();
    }
  },
  
  // 游戏结束处理
  gameOver: function(score) {
    this.setData({
      isGameOver: true,
      score: score
    });
    
    // 更新最高分
    if (score > this.data.bestScore) {
      this.setData({ bestScore: score });
      wx.setStorageSync('snake_best_score', score);
    }
  },
  
  // 处理触摸开始事件
  onTouchStart: function(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  },
  
  // 处理触摸结束事件
  onTouchEnd: function(e) {
    if (!this.game || this.data.isGameOver || this.data.isPaused) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const dx = touchEndX - this.touchStartX;
    const dy = touchEndY - this.touchStartY;
    
    // 判断滑动方向
    if (Math.abs(dx) > Math.abs(dy)) {
      // 水平滑动
      if (dx > 0) {
        this.game.changeDirection('right');
      } else {
        this.game.changeDirection('left');
      }
    } else {
      // 垂直滑动
      if (dy > 0) {
        this.game.changeDirection('down');
      } else {
        this.game.changeDirection('up');
      }
    }
  },
  
  // 页面展示时
  onShow: function() {
    if (this.game && !this.data.isGameOver && !this.data.isPaused) {
      this.game.start();
    }
  },
  
  // 页面隐藏时
  onHide: function() {
    if (this.game) {
      this.game.pause();
    }
  },
  
  // 页面卸载时
  onUnload: function() {
    if (this.game) {
      this.game.pause();
    }
  },
  
  // 用于更新分数显示
  updateScore: function() {
    if (!this.game) return;
    
    const score = this.game.getScore();
    this.setData({ score });
  }
}); 