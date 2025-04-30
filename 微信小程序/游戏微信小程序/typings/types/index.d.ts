/// <reference path="./wx/index.d.ts" />
/// <reference path="./wx/page.d.ts" />

declare namespace WechatMiniprogram {
  interface UserInfo {
    nickName: string;
    avatarUrl: string;
    gender: number;
    country: string;
    province: string;
    city: string;
    language: string;
  }

  interface GetUserInfoSuccessCallback {
    (res: {
      userInfo: UserInfo;
      rawData: string;
      signature: string;
      encryptedData: string;
      iv: string;
    }): void;
  }
} 