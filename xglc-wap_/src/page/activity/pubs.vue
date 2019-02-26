<!--
    creata:luofeifei 2018/11/27
    desc:三周年宣传页面
-->
<template>
  <div class="main">
    <div class="banner">
      <img v-show="showShare" @click="alertAppShare()" src="./images/pubs/icon_share.png" alt>
    </div>
    <div class="t1">
      <div class="send_con">
        <div class="title">总裁寄语: 做看得懂的事，打造好的平台</div>
        <div class="content">
          <span>P2P行业聚合的是自下而上的需求力量，这种力量像野草一样，具有顽强的生命力，我们小鸽理财是要在越来越规范的市场上打造一个'好'的平台，传达人文的温度，创造真正的价值。
            <br>
            <br>三年来，小鸽理财走得不快，但是每一步都是铿锵有力。作为十几年的银行从业者，我深知互联网金融并不是靠着一腔热忱就能剩到最
          </span>
          <span
            class="more_txt"
            v-show="isMore"
          >后，互金的社会价值和正向意义，必须建立在风险管控的基础之上，唯有怀抱初心，踏实做事，敬畏风险的互金从业者，才能昂首阔步。感谢监管的及时整治，感谢行业的去伪存真，感谢小鸽用户的支持信赖，让我们有底气有信心应对一切挑战，也让我们在三年之际收获颇丰，房信贷领域先行者、合规平台前十强、最具潜力互金平台、小而美平台代表等等都是你们给予小鸽理财的荣光。
            <br>
            <br>今天中国的经济体量和百姓的财富体量在快速增长，而我们的传统金融机构却没有及时跟上百姓的财富管理需求，不管是惠及更多资产规模小的客户还是提供更多元化定制化的产品角度看，传统金融做的都还远远不够。互联网+金融+科技，新的手段，新的科技必然会带来新的创造，我们看好互金发展也坚信：坚持做看得懂且能把握住风险的行业，互金未来必有小鸽理财的一番天地。
          </span>
        </div>
        <div class="more" @click="check_more">
          <span>{{ isMore == true?'点击收起':'查看更多' }}</span>
          <img v-if="!isMore" src="./images/pubs/icon_arrows.png" alt>
          <img v-else src="./images/pubs/icon_arrowscopy.png" alt>
        </div>
      </div>
    </div>
    <div class="t2">
      <div class="title">点滴坚持 积小成大</div>
      <div class="video">
        <!-- <iframe style="width: 6.78rem;height: 3.24rem;" frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=r0805x8kgu4" allowFullScreen="true"></iframe> -->
        <iframe
          style="width: 6.78rem;height: 3.24rem;"
          src="//player.bilibili.com/player.html?aid=37016836&cid=65040570&page=1"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
        ></iframe>
      </div>
    </div>
    <div class="t3">
      <div class="title">三年历程 合规为先稳中求进</div>
      <div class="imgList guide-swiper">
        <div v-swiper:swiper="swiperOption">
          <ul class="swiper-wrapper">
            <li class="swiper-slide">
              <span class="year">2018</span>
              <div class="list">
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/13.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2018年12月12日</p>
                    <p class="p2">小鸽理财三周年庆典</p>
                  </div>
                </div>
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/11.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2018年10月10日</p>
                    <p class="p2">向深圳金融办正式提交自查报告</p>
                  </div>
                </div>
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/10.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2018年9月28日</p>
                    <p class="p2">信息披露全面改版上线</p>
                  </div>
                </div>
              </div>
            </li>
            <li class="swiper-slide">
              <span class="year">2018</span>
              <div class="list">
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/9.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2018年8月23日</p>
                    <p class="p2">跻身星评社《全国 P2P 网贷合规榜》前10 强</p>
                  </div>
                </div>
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/8.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2018年7月28日</p>
                    <p class="p2">首个用户开放日在深圳圆满举办</p>
                  </div>
                </div>
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/7.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2018年6月1日</p>
                    <p class="p2">加入中国电子商务协会互联网金融研究院且获评AAA 级信用企业</p>
                  </div>
                </div>
              </div>
            </li>
            <li class="swiper-slide aItem">
              <span class="year">2018</span>
              <div class="aImg">
                <img src="./images/pubs/6.png" alt>
              </div>
              <p class="p1">2018年1月20日</p>
              <p class="p2">荣膺“2018胡润新金融最具潜力企业</p>
            </li>
            <li class="swiper-slide">
              <span class="year">2017</span>
              <div class="list">
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/5.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2017年12月1日</p>
                    <p class="p2">获“国家信息安全等级保护三级”认证</p>
                  </div>
                </div>
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/4.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2017年9月19日</p>
                    <p class="p2">上线上海银行资金存管系统</p>
                  </div>
                </div>
                <div class="item clearfloat">
                  <div class="item_l">
                    <img src="./images/pubs/3.png" alt>
                  </div>
                  <div class="item_r">
                    <p class="p1">2017年9月18日</p>
                    <p class="p2">上线 e 签宝电子签章</p>
                  </div>
                </div>
              </div>
            </li>
            <li class="swiper-slide aItem">
              <span class="year">2016</span>
              <div class="aImg">
                <img src="./images/pubs/2.png" alt>
              </div>
              <p class="p1">2016年6月15日</p>
              <p class="p2">全新品牌小鸽理财正式亮相</p>
            </li>
            <li class="swiper-slide aItem">
              <span class="year">2015</span>
              <div class="aImg">
                <img src="./images/pubs/1.png" alt>
              </div>
              <p class="p1">2015年12月12日</p>
              <p class="p2">小鸽理财前身小牛装修理财网上线</p>
            </li>
          </ul>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="t4">
      <div class="title">周年大回馈 好礼享不停</div>
      <div class="bg_img"></div>
      <div class="btn" @click="participate()">立即参与活动</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr"; //图片轮播组件
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      showShare: false,
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      isMore: false
    };
  },
  created() {
    // this.shareLinks();
    this.checkApp();
  },
  methods: {
    check_more() {
      this.isMore = !this.isMore;
    },
    checkApp() {
      if (base.isAndroid || base.isiOS) {
        this.showShare = true;
      } else {
        this.wechatReadyShare();
      }
    },
    wechatReadyShare() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.regUrl();
      }
    },
    /* getAppToken() {
      //先找app要token
      let _this = this;
      _this.$withApp("getTokenFromApp", "").then(data => {
        if (data == "wap") {
          //wap直接从localStorage拿到token去请求
        } else {
          data = JSON.parse(data);
          //从app拿到token
          if (dataRes.transferData.token == "null") {
            return _this.$withApp("takeAppOpen", {
              status: 0,
              result: {
                transferName: "goToAppLogin",
                transferData: {
                  url: location.href
                }
              },
              msg: "success"
            });
          } else {
          }
        }
      });
    }, */
    regUrl: function() {
      let thatData = this;
      let data = {
        url: encodeURIComponent(location.href.split("#")[0])
      };

      this.$http
        .post("/api/user/wxSign", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            base.wxShare(
              wx,
              {
                title: "小鸽理财三周年“积小成大 鸽声正好”大幕开启！",
                desc: "小鸽理财三周年玩这么大？风雨同舟三年，小鸽感恩一路有你",
                link: location.origin + "/activity/pubs",
                imgUrl: location.origin + "/static/img/share_logo_3rd.png"
              },
              {
                debug: false,
                appId: resData.result.appId,
                timestamp: resData.result.timestamp,
                nonceStr: resData.result.noncestr,
                signature: resData.result.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
              }
            );
          } else {
            mui.alert(resData.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    alertAppShare() {
      let thatData = this;

      this.$withApp("postApp", {
        status: 0,
        result: {
          transferName: "jumpToSharing",
          transferData: {
            title: "小鸽理财三周年“积小成大 鸽声正好”大幕开启！", //分享的标题
            content: "小鸽理财三周年玩这么大？风雨同舟三年，小鸽感恩一路有你", //分享的内容，对应iOS的descr字段，
            url: location.origin + "/activity/pubs", //分享链接
            icon: location.origin + "/static/img/share_logo_3rd.png", //分享图标链接
            shareType: "sort", //all全平台,wx微信平台,custom自定义,sort自定义排序
            //微信 朋友圈 QQ 微博 QQ空间
            shareSort: "wechat,circle,copylink", //按照指定的顺序排序显示 仅限使用 sort自定义排序 时
            copylink: location.origin + "/activity/pubs"
          }
        },
        msg: "success"
      });
    },
    participate() {
      let _this = this;
      _this
        .$withApp("postApp", {
          status: 0,
          result: {
            transferName: "getTokenFromApp",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            _this.$router.push({ path: "/third_annual_m" });
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            if (dataRes.transferData.token == "null") {
              localStorage.removeItem("token");
              return _this.$withApp("takeAppOpen", {
                status: 0,
                result: {
                  transferName: "goToAppLogin",
                  transferData: {
                    url: location.href
                  }
                },
                msg: "success"
              });
            } else {
              base.data.token = dataRes.transferData.token;
              localStorage.setItem("token", dataRes.transferData.token);
              _this.$router.push({ path: "/third_annual_m" });
            }
          }
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.main {
  background: #fff;
  .banner {
    background: url("./images/pubs/bg_banner.png") no-repeat;
    background-size: 100% 100%;
    height: 4.2rem;
    width: 100%;
    img {
      width: 1.4rem;
      height: 0.54rem;
      position: fixed;
      top: 0.2rem;
      right: 0;
      z-index: 999;
    }
  }
  .t1 {
    width: 6.7rem;
    margin: -0.6rem auto 0;
    background: #fff;
    .send_con {
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
      padding: 0.6rem 0.17rem 0.3rem;
    }
    .title {
      background: url(./images/pubs/title1.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.3rem;
      font-weight: 600;
      color: rgba(17, 17, 17, 1);
      letter-spacing: 1px;
      width: 6.36rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
    }
    .content {
      font-size: 0.26rem;
      color: rgba(45, 45, 45, 1);
      letter-spacing: 2px;
      margin: 0.4rem 0.17rem 0;
      text-align: justify;
    }
    .more {
      font-size: 0.24rem;
      font-weight: 500;
      color: rgba(155, 155, 155, 1);
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.24rem;
        height: 0.24rem;
        margin-left: 0.1rem;
      }
    }
  }
  .t2 {
    height: 4.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.2rem;
    background: url(./images/pubs/bg2.png) no-repeat center;
    background-size: cover;
    .title {
      background: url(./images/pubs/title.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.3rem;
      font-weight: 600;
      color: rgba(17, 17, 17, 1);
      letter-spacing: 1px;
      width: 3.44rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      margin-top: 0.4rem;
    }
    .video {
      padding-top: 0.4rem;
    }
  }
  .t3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.2rem;
    position: relative;
    .title {
      background: url(./images/pubs/title2.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.3rem;
      font-weight: 600;
      color: rgba(17, 17, 17, 1);
      letter-spacing: 1px;
      width: 4.82rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      margin-top: 0.4rem;
    }
    .imgList {
      width: 6.7rem;
      height: 8.8rem;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
      margin-top: 0.4rem;
      ul {
        li {
          text-align: center;
          padding-top: 0.4rem;
          &.aItem {
            .p1 {
              font-size: 0.3rem;
              font-weight: 600;
              line-height: 0.42rem;
              margin-top: 0.6rem;
              color: rgba(17, 17, 17, 1);
            }
            .p2 {
              font-size: 0.26rem;
              color: rgba(155, 155, 155, 1);
              line-height: 0.37rem;
              margin-top: 0.2rem;
            }
          }
          .year {
            font-size: 0.32rem;
            font-weight: 600;
            width: 1.8rem;
            color: rgba(81, 47, 254, 1);
            letter-spacing: 3px;
            background: #ecedff;
            padding: 0.15rem 0.47rem;
            border-radius: 0.45rem;
          }
          .list {
            padding: 0.6rem 0;
            .item {
              display: flex;
              //justify-content: center;
              &:nth-child(n + 2) {
                margin-top: 0.4rem;
              }
              .item_l {
                margin-left: 0.3rem;
                img {
                  width: 3rem;
                  height: 2rem;
                  border-radius: 0.08rem;
                }
              }
              .item_r {
                margin-left: 0.3rem;
                text-align: left;
                .p1 {
                  font-size: 0.3rem;
                  font-weight: 600;
                  color: rgba(17, 17, 17, 1);
                  padding-top: 0.2rem;
                }
                .p2 {
                  font-size: 0.26rem;
                  color: rgba(155, 155, 155, 1);
                  max-width: 2.8rem;
                  margin-top: 0.3rem;
                }
              }
            }
          }
          .aImg {
            padding-top: 0.8rem;
            img {
              width: 6.1rem;
              height: 3.8rem;
            }
          }
        }
      }
    }
    /deep/ .swiper-pagination {
      width: 91%;
      .swiper-pagination-bullet {
        margin: 0 4px;
      }
    }
  }
  .t4 {
    background: url(./images/pubs/bg4.png) no-repeat;
    background-size: 100% 100%;
    height: 5.41rem;
    margin-top: 1.7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      background: url(./images/pubs/titlecopy2.png) no-repeat;
      background-size: 100% 100%;
      font-size: 0.3rem;
      font-weight: 600;
      color: rgba(17, 17, 17, 1);
      letter-spacing: 1px;
      width: 4.16rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      margin-top: 0.4rem;
    }
    .bg_img {
      width: 5.6rem;
      height: 2.2rem;
      background: url(./images/pubs/bg_banner1.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 0.4rem;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    }
    .btn {
      background: linear-gradient(180deg, #0ad2fe, #3c7dfe);
      box-shadow: 0px 2px 10px rgba(58, 130, 254, 0.4);
      border-radius: 0.45rem;
      font-size: 0.3rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      padding: 0.21rem 2rem;
      margin-top: 0.8rem;
    }
  }
}
/*清除浮动代码*/
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
</style>
