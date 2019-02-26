let htmlPath = "./src/pages/"; //除首页之外的页面路径
let jsPath = "./src/statics/js/";
module.exports = [
  //首页配置
  {
    template: "./src/index.html", //模板文件路径
    module: "index",
    entry: jsPath + "index" //页面js路径
  },
  //关于我们
  {
    template: htmlPath + "about/about_index.html",
    module: "about",
    entry: jsPath + "about/aboutIndex"
  }, //案例分享
  {
    template: htmlPath + "case/case_index.html",
    module: "case",
    entry: jsPath + "case/caseIndex"
  }, //服务-品牌服务
  {
    template: htmlPath + "service/brand_services.html",
    module: "service",
    entry: jsPath + "service/brandServices"
  },
  { //服务-整合营销
    template: htmlPath + "service/market_services.html",
    module: "market",
    entry: jsPath + "service/marketServices"
  },
  { //资源投放
    template: htmlPath + "service/resource_services.html",
    module: "resource",
    entry: jsPath + "service/resourceServices"    
  }
];
