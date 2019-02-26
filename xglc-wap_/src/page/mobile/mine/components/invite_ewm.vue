<!--
    组件-邀请好友二维码
-->
<template>
    <div class="component_ewm">
        <div class="ce_con">
            <div class="cec_ewm">
                <img :src="imgStr" alt="刷新重试">
            </div>
        </div>
        <a href="javascript:;" @click="childOffEwm"></a>
    </div>
</template>

<script>
export default {
  data() {
    return {
      imgStr: "",
    };
  },
  beforeMount() {
    //this.getCode();
  },
  methods: {
    //关闭弹窗
    childOffEwm() {
      this.$emit("parentOffEwm");
    },
    //获取分享二维码
    getCode: function() {
      let thatData = this;
      let data = {};
      this.$http
        .post("/api/user/inviteFriendCode", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(response) {
          let resData = response.data;
          if (resData.status == 0) {
            thatData.imgStr = "data:img/png;base64," + resData.result.base64Str;
            thatData.code = resData.result.code.replace(
              /^(\d{3})\d{4}(\d+)/,
              "$1****$2"
            );
            thatData.$parent.wechatReadyShare(resData.result.shareInviteFriendLink);
          } else {
            mui.alert(resData.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.component_ewm {
  height: 100%;
  width: 7.5rem;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  overflow: scroll;
  background: url(./images/invite_ewm_body_bg.jpg) top center repeat-y;
  background-size: 7.5rem 1px;
  .ce_con {
    background: url(./images/invite_ewm_bg.jpg) no-repeat;
    background-size: 7.5rem 6.97rem;
    padding-top: 3.95rem;
    .cec_ewm {
      background: url(./images/invite_ewm_con_bg.png) no-repeat;
      background-size: 5.52rem 6.53rem;
      width: 5.52rem;
      height: 6.53rem;
      margin: auto;
      position: relative;
      img {
        width: 3.8rem;
        height: 3.8rem;
        position: absolute;
        left: 50%;
        margin-left: -1.9rem;
        top: 1.1rem;
      }
    }
  }
  a {
    width: 0.61rem;
    height: 0.61rem;
    background: url(./images/invite_off_rule.png);
    background-size: 0.61rem 0.61rem;
    position: absolute;
    display: block;
    top: 0.2rem;
    margin-left: -0.3rem;
    right: 0.2rem;
  }
  @media screen and (max-width: 340px) {
    .ce_con {
      padding-top: 3.3rem;
    }
    a {
      top: 0.2rem;
    }
  }
}
</style>