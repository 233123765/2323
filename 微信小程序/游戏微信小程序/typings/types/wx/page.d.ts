declare function Page<T extends Record<string, any>>(options: {
  data?: T;
  onLoad?: (options: Record<string, string>) => void;
  onReady?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  onUnload?: () => void;
  onPullDownRefresh?: () => void;
  onReachBottom?: () => void;
  onShareAppMessage?: () => {
    title: string;
    path?: string;
    imageUrl?: string;
  };
  onPageScroll?: (options: { scrollTop: number }) => void;
  onTabItemTap?: (item: {
    index: number;
    pagePath: string;
    text: string;
  }) => void;
  [key: string]: any;
}): void; 