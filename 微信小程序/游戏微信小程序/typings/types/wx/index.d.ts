declare namespace wx {
  function login(options: {
    timeout?: number;
    success?: (res: { code: string; errMsg: string }) => void;
    fail?: (res: { errMsg: string }) => void;
    complete?: (res: { errMsg: string }) => void;
  }): void;

  function getUserInfo(options: {
    withCredentials?: boolean;
    lang?: string;
    success?: (res: {
      userInfo: WechatMiniprogram.UserInfo;
      rawData: string;
      signature: string;
      encryptedData: string;
      iv: string;
      cloudID?: string;
    }) => void;
    fail?: (res: { errMsg: string }) => void;
    complete?: (res: { errMsg: string }) => void;
  }): void;

  function getStorageSync(key: string): any;
  function setStorageSync(key: string, data: any): void;
  
  function navigateTo(options: {
    url: string;
    success?: (res: { errMsg: string }) => void;
    fail?: (res: { errMsg: string }) => void;
    complete?: (res: { errMsg: string }) => void;
  }): void;
  
  function showToast(options: {
    title: string;
    icon?: 'success' | 'loading' | 'none' | 'error';
    image?: string;
    duration?: number;
    mask?: boolean;
    success?: (res: { errMsg: string }) => void;
    fail?: (res: { errMsg: string }) => void;
    complete?: (res: { errMsg: string }) => void;
  }): void;
} 