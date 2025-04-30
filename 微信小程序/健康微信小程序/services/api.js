/**
 * API接口定义
 */
const { get, post, put, del, uploadFile } = require('./request')

/**
 * 用户相关接口
 */
const userApi = {
  // 登录
  login: (data) => post('/api/user/login', data),
  
  // 注册
  register: (data) => post('/api/user/register', data),
  
  // 获取用户信息
  getUserInfo: () => get('/api/user/info'),
  
  // 更新用户信息
  updateUserInfo: (data) => put('/api/user/info', data),
  
  // 上传头像
  uploadAvatar: (filePath) => uploadFile('/api/user/avatar', filePath),
  
  // 获取收藏列表
  getCollections: (params) => get('/api/user/collections', params),
  
  // 添加收藏
  addCollection: (data) => post('/api/user/collections', data),
  
  // 删除收藏
  removeCollection: (id) => del(`/api/user/collections/${id}`),
  
  // 获取浏览历史
  getHistory: (params) => get('/api/user/history', params)
}

/**
 * 文章相关接口
 */
const articleApi = {
  // 获取文章列表
  getArticles: (params) => get('/api/articles', params),
  
  // 获取文章详情
  getArticleDetail: (id) => get(`/api/articles/${id}`),
  
  // 获取文章分类
  getCategories: () => get('/api/articles/categories'),
  
  // 搜索文章
  searchArticles: (keyword) => get('/api/articles/search', { keyword })
}

/**
 * 食谱相关接口
 */
const recipeApi = {
  // 获取食谱列表
  getRecipes: (params) => get('/api/recipes', params),
  
  // 获取食谱详情
  getRecipeDetail: (id) => get(`/api/recipes/${id}`),
  
  // 创建食谱
  createRecipe: (data) => post('/api/recipes', data),
  
  // 更新食谱
  updateRecipe: (id, data) => put(`/api/recipes/${id}`, data),
  
  // 删除食谱
  deleteRecipe: (id) => del(`/api/recipes/${id}`),
  
  // 上传食谱图片
  uploadRecipeImage: (filePath) => uploadFile('/api/recipes/image', filePath),
  
  // 获取我的食谱
  getMyRecipes: () => get('/api/recipes/my')
}

/**
 * 健康数据相关接口
 */
const healthApi = {
  // 获取健康数据
  getHealthData: () => get('/api/health/data'),
  
  // 更新健康数据
  updateHealthData: (data) => put('/api/health/data', data),
  
  // 获取饮食计划
  getDietPlans: () => get('/api/health/diet-plans'),
  
  // 创建饮食计划
  createDietPlan: (data) => post('/api/health/diet-plans', data),
  
  // 更新饮食计划
  updateDietPlan: (id, data) => put(`/api/health/diet-plans/${id}`, data),
  
  // 删除饮食计划
  deleteDietPlan: (id) => del(`/api/health/diet-plans/${id}`),
  
  // 获取营养分析
  getNutritionAnalysis: (params) => get('/api/health/nutrition-analysis', params)
}

module.exports = {
  userApi,
  articleApi,
  recipeApi,
  healthApi
} 