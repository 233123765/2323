// utils/game.js
class SnakeGame {
  constructor(options) {
    // 游戏设置
    this.canvasWidth = options.width || 300;
    this.canvasHeight = options.height || 300;
    this.gridSize = options.gridSize || 15;
    this.ctx = options.ctx;
    this.gameSpeed = options.speed || 200; // 蛇移动的时间间隔（毫秒）
    
    // 计算网格数量
    this.gridWidth = Math.floor(this.canvasWidth / this.gridSize);
    this.gridHeight = Math.floor(this.canvasHeight / this.gridSize);
    
    // 初始化游戏状态
    this.isRunning = false;
    this.score = 0;
    this.gameLoopId = null;
    
    // 初始化蛇
    this.snake = [
      { x: Math.floor(this.gridWidth / 2), y: Math.floor(this.gridHeight / 2) }
    ];
    
    // 初始方向（右）
    this.direction = 'right';
    this.nextDirection = 'right';
    
    // 生成食物
    this.food = this.generateFood();
  }
  
  // 开始游戏
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.score = 0;
    this.snake = [
      { x: Math.floor(this.gridWidth / 2), y: Math.floor(this.gridHeight / 2) }
    ];
    this.direction = 'right';
    this.nextDirection = 'right';
    this.food = this.generateFood();
    
    this.gameLoop();
  }
  
  // 暂停游戏
  pause() {
    this.isRunning = false;
    if (this.gameLoopId) {
      clearTimeout(this.gameLoopId);
    }
  }
  
  // 游戏循环
  gameLoop() {
    if (!this.isRunning) return;
    
    this.update();
    this.draw();
    
    this.gameLoopId = setTimeout(() => {
      this.gameLoop();
    }, this.gameSpeed);
  }
  
  // 更新游戏状态
  update() {
    // 更新方向
    this.direction = this.nextDirection;
    
    // 获取蛇头位置
    const head = Object.assign({}, this.snake[0]);
    
    // 根据方向移动蛇头
    switch (this.direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }
    
    // 检查是否撞墙
    if (head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight) {
      this.gameOver();
      return;
    }
    
    // 检查是否撞到自己
    for (let i = 0; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.gameOver();
        return;
      }
    }
    
    // 将新头部添加到蛇身
    this.snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === this.food.x && head.y === this.food.y) {
      // 增加分数
      this.score += 10;
      
      // 生成新的食物
      this.food = this.generateFood();
      
      // 如果分数是50的倍数，加快游戏速度
      if (this.score % 50 === 0 && this.gameSpeed > 50) {
        this.gameSpeed -= 10;
      }
    } else {
      // 如果没有吃到食物，移除尾部
      this.snake.pop();
    }
  }
  
  // 绘制游戏
  draw() {
    if (!this.ctx) return;
    
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // 绘制蛇
    this.ctx.fillStyle = '#3cc51f';
    for (let i = 0; i < this.snake.length; i++) {
      this.ctx.fillRect(
        this.snake[i].x * this.gridSize,
        this.snake[i].y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
    }
    
    // 绘制蛇头（不同颜色）
    this.ctx.fillStyle = '#2aad0f';
    this.ctx.fillRect(
      this.snake[0].x * this.gridSize,
      this.snake[0].y * this.gridSize,
      this.gridSize,
      this.gridSize
    );
    
    // 绘制食物
    this.ctx.fillStyle = '#e74c3c';
    this.ctx.beginPath();
    this.ctx.arc(
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2,
      this.gridSize / 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }
  
  // 生成食物
  generateFood() {
    let food;
    let isOnSnake;
    
    // 确保食物不会出现在蛇身上
    do {
      food = {
        x: Math.floor(Math.random() * this.gridWidth),
        y: Math.floor(Math.random() * this.gridHeight)
      };
      
      isOnSnake = false;
      for (let i = 0; i < this.snake.length; i++) {
        if (food.x === this.snake[i].x && food.y === this.snake[i].y) {
          isOnSnake = true;
          break;
        }
      }
    } while (isOnSnake);
    
    return food;
  }
  
  // 改变方向
  changeDirection(newDirection) {
    // 防止反方向移动（例如向右移动时不能直接向左移动）
    if (
      (this.direction === 'up' && newDirection === 'down') ||
      (this.direction === 'down' && newDirection === 'up') ||
      (this.direction === 'left' && newDirection === 'right') ||
      (this.direction === 'right' && newDirection === 'left')
    ) {
      return;
    }
    
    this.nextDirection = newDirection;
  }
  
  // 游戏结束
  gameOver() {
    this.isRunning = false;
    if (this.gameLoopId) {
      clearTimeout(this.gameLoopId);
    }
    
    // 触发游戏结束回调（如果有）
    if (typeof this.onGameOver === 'function') {
      this.onGameOver(this.score);
    }
  }
  
  // 获取当前分数
  getScore() {
    return this.score;
  }
}

module.exports = {
  SnakeGame
}; 