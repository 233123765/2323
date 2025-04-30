Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconClass: "icon-home",
        selectedIconClass: "icon-home-active"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        iconClass: "icon-profile",
        selectedIconClass: "icon-profile-active"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      
      wx.switchTab({
        url
      });
    }
  }
}); 