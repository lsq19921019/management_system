<template>
  <div class="agreeList">
    <ul>
      <li @click="goProtocol()">
        <div class="li_item">
          <span>G自动服务协议</span>
          <img src="/static/img/wap_invest_index_01.png">
        </div>
      </li>
      <li @click="goProtocols()">
        <div class="li_item">
          <span>授权委托书</span>
          <img src="/static/img/wap_invest_index_01.png">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gDetails: {}
    };
  },
  created() {
    this.hiddenRightButton();
    this.postGDetails();
  },
  methods: {
    hiddenRightButton() {
      let _this = this;
      _this.$withApp("takeAppTable", {
        status: 0,
        result: {
          transferName: "hiddenRightBarButton",
          transferData: {}
        },
        msg: "success"
      });
    },
    // G自动服务协议跳转
    goProtocol() {
      location.href = this.gDetails.protocolLink;
    },
    //  授权委托书跳转
    goProtocols() {
      location.href = this.gDetails.proxyProtocolLink;
      //this.$router.push({path: '/mobile_investment_authorization_x',query:{ id:this.$route.params.id}});
    },
    // G自动服务协议接口
    postGDetails() {
      let thatData = this;
      let data = {
        investId: thatData.$route.params.id
      };
      this.$http
        .post("/api/assets/myInvestDcbDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          let resData = response.data;
          if (resData.status == 0) {
            console.log(response);
            thatData.gDetails = resData.result;
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scope>
.agreeList {
  ul {
    background: #fff;
  }
  ul li {
    font-size: 0.28rem;
    color: rgba(102, 102, 102, 1);
    position: relative;
    .li_item {
      padding: 0.33rem 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:before {
      content: "";
      position: absolute;
      width: 200%;
      height: 200%;
      border-bottom: 1px solid #dddddd;
      -webkit-transform-origin: 0 0;
      -moz-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      -o-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scale(0.5, 0.5);
      -ms-transform: scale(0.5, 0.5);
      -o-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    &:last-child {
      &::before {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
      }
    }
    img {
      width: 0.13rem;
      height: 0.24rem;
    }
  }
}
</style>
