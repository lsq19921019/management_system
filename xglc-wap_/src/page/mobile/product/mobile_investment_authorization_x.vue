<!--
    create:luofeifie
    desc:授权委托书
-->
<template>
  <div>
    <div class="agree">
      <img src="/static/img/ban.png" class="ban-img">
      <div class="main-box">
        <p>协议编号：
          <span class="red-word">{{protocolNumber}}</span>
        </p>
        <br>
        <p class="relative" style="padding-bottom: 80px;">
          <span class="blod">甲方（委托人）：【
            <span class="red-word">{{realName}}</span>】
          </span>
          <br>
          <span>身份证号码：【
            <span class="red-word">{{idNo}}</span>】
          </span>
          <br>
          <br>
          <span class="blod">乙方（受托人）：深圳市温馨港湾网络技术有限公司</span>
          <br>
          <span>地址：深圳市南山区粤海街道粤兴五道9号北理工创新大厦1202</span>
          <br>
          <br>
          <span class="blod">甲方需特别关注和充分理解粗体字的内容。</span>
          <br>
          <br>
          <span
            class="blod"
          >甲方系通过小鸽理财平台提供出借款项的出借人，当甲方在本授权书上签字或者在乙方的网站等相关页面上点击“确认”、“完成”或 “确认并授权”等类似提示按钮，或者实际使用乙方提供的服务（以下简称“服务”），或者与乙方签订其他相关服务协议时，请甲方事先仔细阅读本授权书内容，甲方在本授权书上签字，或点击“确认”、“完成”或实际使用服务，或者签订相关服务协议即代表甲方接受本授权委托书的全部内容。</span>
          <br>
          <br>
          <span>甲方通过乙方研发并运营的网络借贷信息中介机构小鸽理财平台（包括但不限于平台域名为：www.xiaogelicai.com、手机App及微信公众号等渠道，以下统称为“小鸽理财平台”）进行投资，为了使小鸽理财平台更好地为出借人提供服务，出借人在此不可撤销地同意向小鸽理财平台做出如下授权委托(以下简称“授权委托”)：</span>
          <br>
          <span class="blod">一、授权委托范围</span>
          <br>
          <span>1、甲方授权委托乙方的借款项目期限为【1】-【24】个月或【20】-【360】天，具体以小鸽理财平台实际借款标情况及服务情况而定，出借资金投资于小额消费借款项目。</span>
          <br>
          <span>2、通过小鸽理财平台系统为出借人匹配符合上述条件的借款项目，具体资金出借期限与对应借款项目期限一致，并授权小鸽理财平台调用出借人的电子签名为出借人与所有借款人签署《小鸽理财借款协议》、签署其他服务协议（以上合称“产品协议”），出借人对于上述协议内容没有异议。</span>
          <br>
          <span>3、电子签名开户及签署之委托</span>
          <br>
          <span>（1）甲方授权乙方以甲方的名义在提供电子签章及存证服务的第三方进行注册开户，并生成授权数字证书。</span>
          <br>
          <span>（2）甲方授权乙方以甲方的名义采用电子签约的方式，通过合法的电子签名签署相关协议（包括但不限于小鸽理财借款协议等），甲方对本授权书及电子签名的效力均予确认。</span>
          <br>
          <span>（3）甲方授权并认可乙方采用自动签署的方式，通过系统自动完成相关协议（包括但不限于小鸽理财借款协议等）的电子签名签署行为，甲方对本授权书及电子签名的效力均予确认。</span>
          <br>
          <span class="blod">二、授权委托期限</span>
          <br>
          <span>本授权委托自出借人在小鸽理财平台点击“立即加入”按钮(具体以小鸽理财平台实际展示为准)时生效，除双方另行达成约定外，本授权委托之授权委托期限至出借人与小鸽理财平台签署的网络借贷相关协议全部履行完毕之日终止。</span>
          <br>
          <span>以下无正文</span>
          <br>
          <br>
          <br>
          <span class="p2">甲方（签章）：
            <span class="red-word">{{realName}}</span>
            <img class="seal-p" :src="investImg">
          </span>
          <br>
          <br>
          <br>
          <br>
          <span>乙方（签章）: 深圳市温馨港湾网络技术有限公司
            <p class="p2">&nbsp;
              <span class="seal"></span>
            </p>
          </span>
          <span class="red-word">签署日期：{{joinDateCN}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      protocolNumber: "xxxxxxxxxxxx", //协议编号
      realName: "xxxx", //真实姓名
      idNo: "xxxxxxxxxxxxxxxxxx", //身份证号
      phone: "xxxxxxxxxxxx", //联系方式
      joinDate: "xxxx-xx-xx", //加入时间
      investAmount: "xxxxxxx.xx", //加入金额
      minRate: "xx.xx", //最小年化
      maxRate: "xx.xx", //最大年化
      planTitle: "xxxxxxxxxx", //定存宝名称
      endTime: "xxxx-xx-xx", //退出时间
      userName: "xxxx", //用户名
      joinDateCN: "xxxx年xx月xx日", //加入日期中文
      investImg: "", //借款人签章图片
      fetchToken: "",
      lockperiod: "xxxx" //定存宝期限
    };
  },
  beforeDestroy() {
    this.hiddenRightApp();
  },
  methods: {
    // 隐藏右边按钮
    hiddenRightApp() {
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
    getAppToken: function() {
      let thatData = this;
      if (thatData.$route.query.id) {
        thatData
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
              thatData.postData();
            } else {
              data = JSON.parse(data);
              let dataRes = data.result;
              base.data.token = dataRes.transferData.token;
              localStorage.setItem("token", dataRes.transferData.token);
              thatData.postData();
              return thatData.$withApp("takeAppTable", {
                status: 0,
                result: {
                  transferName: "showDownLoadButton",
                  transferData: {
                    projectid: thatData.$route.query.investId,
                    protocolType: "2"
                  }
                },
                msg: "success"
              });
            }
          });
      }
    },
    postData: function() {
      var thatData = this;

      var data = {
        investType: thatData.$route.query.type,
        investId: thatData.$route.query.investId
      };

      this.$http
        .post("/api/assets/planProtocol", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.msg == "操作成功!") {
            thatData.protocolNumber = resData.result.protocolNumber;
            thatData.realName = resData.result.realName;
            thatData.idNo = resData.result.idNo;
            thatData.phone = resData.result.phone;
            thatData.joinDate = resData.result.joinDate;
            thatData.lockperiod = resData.result.lockperiod;
            thatData.investAmount = resData.result.investAmount;
            thatData.minRate = resData.result.minRate;
            thatData.maxRate = resData.result.maxRate;
            thatData.planTitle = resData.result.planTitle;
            thatData.endTime = resData.result.endTime;
            thatData.userName = resData.result.userName;
            thatData.joinDateCN = resData.result.joinDateCN;
            thatData.investImg =
              "data:image/png;base64," + resData.result.investImg;
          } else {
            mui.alert(resData.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.getAppToken();
  }
};
</script>
<style scoped>
@import "../../../style/css/mobile_agreement.css";
</style>
