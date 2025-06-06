/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | null;
    hasLogin: boolean;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
} 