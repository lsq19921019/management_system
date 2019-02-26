<template>
  <div>
    <!-- <div class="info">
      <ul>
        <li>
          <strong>用户昵称:</strong>
          {{nickName}}
        </li>
        <li>
          <strong>navigator.userAgent:</strong>
          {{userAgent}}
        </li>
        <li>
          <strong>app版本号:</strong>
          {{version}}
        </li>
        <li>
          <strong>token:</strong>
          {{token}}
        </li>
        <li>
          <strong>app msg:</strong>
          {{msg}}
        </li>
      </ul>
    </div>-->
    <div class="btns">
      <div>
        <a href="javascript:;" @click="login">调取app登录</a>
        <p>
          <i>如果是app，调取app原生登录；如果是wap，跳转wap登录页面。</i>
        </p>
        <hr>
      </div>
      <!-- <div>              
                <a href="javascript:;" @click="getToken">获取token</a>
                <p><i>如果token值为空调取app登录/wap直接跳转登录页面；如果有token则通过token获取用户信息。</i></p>
                <hr>
      </div>-->
      <div>
        <a href="javascript:;">传递地址给app</a>
        <p>
          <i>把wap当前页面地址给app，方便app登陆后跳转。</i>
        </p>
        <hr>
      </div>
      <div>
        <a href="javascript:;" @click="share">弹出app分享弹窗</a>
        <p>
          <i>如果是app，弹出app分享弹窗；</i>
        </p>
        <hr>
      </div>
      <div>
        <a href="javascript:;" @click="goToHomePage(1)">跳到app首页</a>
        <a href="javascript:;" @click="goToHomePage(2)">跳到app产品</a>
        <a href="javascript:;" @click="goToHomePage(3)">跳到app资产</a>
        <a href="javascript:;" @click="goToHomePage(4)">跳到app我的</a>
        <p>
          <i>四个主页面；</i>
        </p>
        <hr>
      </div>
      <div>当前窗口高度{{height}}</div>
      <div>
        <button @click="href">开通权益标</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickName: "测试",
      token: "测试",
      version: "测试",
      msg: "测试",
      userAgent: "测试",
      value: "",
      height: ""
    };
  },
  beforeMount() {
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
          _this.getUserInfo();
        } else {
          data = JSON.parse(data);
          console.log(data);
          let dataRes = data.result;
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
            _this.token = dataRes.transferData.token;
            base.data.token = dataRes.transferData.token;
            _this.getUserInfo();
          }
        }
      })
  },
  mounted() {
    /* $("input").on("click", function() {
      setTimeout(() => {
        $("#app").css("height", document.documentElement.clientHeight);
        //this.scrollIntoView(true)
        alert(document.documentElement.clientHeight);
      }, 2000);
    }); */
    this.height = document.documentElement.clientHeight;
  },
  methods: {
    href() {
      location.href = "/mine_open_jump/userVip1";
    },
    goToHomePage(n) {
      let thatData = this;
      thatData
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToHomePage",
            transferData: {
              pageIndex: n + "" //首页为1、产品列表为2、资产为3、我的为4
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            // wap就直接提示重新登录了
            localStorage.setItem("from", location.href);
            thatData.$router.push({ path: "/start_login" });
          } else {
          }
        });
    },
    share() {
      this.$withApp("postApp", {
        status: 0,
        result: {
          transferName: "jumpToSharing",
          transferData: {
            title: "看我大分享", //分享的标题
            content: "牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼", //分享的内容，对应iOS的descr字段，
            url: "https://wap.xiaogelicai.com", //分享链接
            icon: "https://wap.xiaogelicai.com", //分享图标链接
            shareType: "sort", //all全平台,wx微信平台,custom自定义,sort自定义排序
            //微信 朋友圈 QQ 微博 QQ空间
            shareSort:
              "wechat,circle,qq,weibo,qzone,copylink,friendimg,circleimg", //按照指定的顺序排序显示 仅限使用 sort自定义排序 时
            copylink: "https://wap.xiaogelicai.com",
            friendimg:
              "https://image.xiaogelicai.com/noaufile/operate_image/9c5e4852-80df-4827-afe0-71596b8314b6.png",
            circleimg:
              "https://image.xiaogelicai.com/noaufile/operate_image/9c5e4852-80df-4827-afe0-71596b8314b6.png"
          }
        },
        msg: "success"
      }).then(data => {
        /**
         * goToAppLogin 桥接方法处理完毕并返回data 往下执行
         * 如果没有后续处理逻辑，可省略调用 promise.prototype.then 方法
         */
      });
    },
    login() {
      this.$withApp("takeAppOpen", {
        status: 0,
        result: {
          transferName: "goToAppLogin",
          transferData: {
            url: location.href
          }
        },
        msg: "success"
      }).then(data => {
        /**
         * goToAppLogin 桥接方法处理完毕并返回data 往下执行
         * 如果没有后续处理逻辑，可省略调用 promise.prototype.then 方法
         */
      });
    },
    getUserInfo() {
      let _this = this;
      this.$http
        .post("/api/user/index", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(response) {
          let resData = response.data;
          if (resData.status == 0) {
            _this.nickName = resData.result.nickName;
          } else {
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
.info {
  height: 2rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #f2f2f2;
  overflow-y: scroll;
  ul {
    padding: 0 0.2rem;
    li {
      border-bottom: 1px solid #ddd;
      padding: 0.05rem;
      font-size: 0.14rem;
      color: #333;
      line-height: 1.5;
    }
  }
}
.btns {
  //margin-top: 2rem;
  font-size: 0.24rem;
  padding: 0.3rem;
  color: #666;
  line-height: 1.5;
  a {
    display: inline-block;
    padding: 0 0.3rem;
    background: #f63;
    text-align: center;
    color: #fff;
    border-radius: 0.25rem;
    line-height: 0.5rem;
    margin: 0.1rem 0;
  }
  i {
    color: #999;
  }
}
</style>