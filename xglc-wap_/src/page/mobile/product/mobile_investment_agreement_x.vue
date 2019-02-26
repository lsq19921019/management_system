<template>
  <div>
    <div class="agree">
      <img src="/static/img/ban.png" class="ban-img">
      <div class="main-box">
        <p>协议编号：
          <span class="red-word">{{protocolNumber}}</span>
        </p>
        <br>
        <p>尊敬的客户：
          <br>深圳市温馨港湾网络技术有限公司（以下简称"小鸽理财"）定存宝X自动出借服务（以下称"定存宝X"）面向小鸽理财平台的新老注册用户。定存宝X旨在为小鸽理财的出借人提供效率更高的自动出借服务，以便更好地服务投资出借人。
        </p>
        <table class="tab-color">
          <thead>
            <tr>
              <th>甲方：
                <span class="red-word">{{realName}}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>公民身份证号码：
                <span class="red-word">{{idNo}}</span>
              </td>
            </tr>
            <tr>
              <td>联系方式：
                <span class="red-word">{{phone}}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="relative">
          <table class="tab-color">
            <thead>
              <tr>
                <th>乙方：深圳市温馨港湾网络技术有限公司</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>地址：深圳市南山区粤海街道粤兴五道9号北理工创新大厦1202</td>
              </tr>
            </tbody>
          </table>
          <div class="clear"></div>
        </div>
        <p>甲乙双方经友好协商，本着平等自愿、诚实信用的原则，达成如下协议：
          <br>
        </p>
        <h2>第一条、定存宝X意向</h2>
        <p class="p2">
          <span class="p-span"></span>1.1在网络借贷模式下，乙方推出"出借人授权乙方在小鸽理财网(“小鸽理财网”系指“小鸽理财”网站（域名为：www.xiaogelicai.com）、“小鸽理财”注册微信服务号（微信号：xiaogelicai）、 “小鸽理财”APP 软件)为甲方进行优先自动匹配借款项目”的定存宝X，为加入定存宝X的出借人提供更加贴心、便捷的服务，并将尽最大努力维护出借人的合法利益。
          <br>
          <span class="p-span"></span>1.2甲方同意加入本次定存宝X，并自愿遵守小鸽理财网的所有规则。
          <br>
        </p>
        <h2>第二条、加入金额</h2>
        <p class="p2">
          <span class="p-span"></span>2.1 甲方以自有合法资金加入本次定存宝X：申请加入时间：
          <span class="red-word">{{joinDate}}</span> ，加入金额（单位:元）：
          <span class="red-word">{{investAmount}}</span>
          <br>
          <span class="p-span"></span>2.2 甲方加入本次定存宝X后，即视为甲方不可撤销地授权乙方按照甲方首次加入定存宝X的时间先后顺序，将甲方加入本次定存宝X的金额在小鸽理财平台安排进入优先自动出借。
          <br>
          <span class="p-span"></span>2.3 甲方本次定存宝X参考往期年化收益率：
          <span class="red-word">【
            <span>{{minRate}}</span>】%-【
            <span>{{maxRate}}</span>】%
          </span>，最终以实际出借借款项目确定的收益率为准。
          <br>
        </p>
        <h2>第三条、本次定存宝X的具体内容和要求</h2>
        <p class="p2">
          <span class="p-span"></span>3.1 名称：
          <span class="red-word">{{planTitle}}</span>（上下文均称"本次定存宝X"）。
          <br>
          <span class="p-span"></span>3.2 描述：甲方加入本次定存宝X后，定存宝X申请期内加入定存宝X的金额将被优先安排自动出借，并由甲方或甲方授权乙方代为完成出借。出借指甲方与小额借款客户签署借款协议，并将加入的资金一次性全额（或部分）直接出借给小额借款客户。本次定存宝X成功出借的借款项目还款以及未出借部分的资金解冻至甲方存管账户，视为甲方加入的本次定存宝X服务结束。
          <br>
          <span class="p-span"></span>3.3 优先自动出借范围：小鸽理财平台上开放的拥有第三方机构承诺代偿的借款项目。第三方机构（包括但不限于担保公司等）为出借人的借款提供第三方机构代偿的方式包括但不限于以保证方式提供担保、承诺进行代偿等方式。
          <br>
          <span class="p-span"></span>3.4 加入金额要求：最低加入金额为人民币【100.00】元， 并以人民币【100.00】元整数倍递增。
          <br>
          <span class="p-span"></span>3.5 申请期：
          <span class="red-word">{{joinDate}}</span>，期间内满标则申请期结束。
          <br>
          <span class="p-span"></span> 3.6 定存宝X期限：
          <span class="red-word">{{lockperiod}}</span>，自甲方首次出借借款项目并完成资金划付之日起至届满
          <span class="red-word">{{endTime}}</span>之日止，甲方授权乙方就甲方加入本次定存宝X的加入金额进行出借借款项目之期限则不受定存宝X期限限制。
          <br>
          <span class="p-span"></span>3.7 服务结束：当甲方加入本次定存宝X资金成功出借的全部借款项目结清还款，或者/以及对于甲方加入本次定存宝X且尚未进行出借的该部分资金，在加入本次定存宝X T+5个自然日起将适当被解冻退还，即为甲方加入的本次定存宝X服务结束。
          <br>
          <span class="p-span"></span>3.8 提前结束服务：甲方在定存宝X服务成功出借的借款项目期限届满之前可申请债权转让提前结束服务。甲方将其持有的定存宝X服务下全部债权进行转让，同时乙方有权向甲方收取债权转让手续费。各方明确，乙方不确保上述情况下债权转让的成功。若债权转让不成功的，甲方应继续持有定存宝X服务下的债权，也可再次申请债权转让；若债权转让成功的，则由甲方、债权受让方及乙方签署《债权转让协议》。具体的债权转让限制，以乙方披露的信息为准。
          <br>
          <span class="p-span"></span>3.9 甲方收益及支付：甲方的收益将按本次定存宝X所投借款项目对应的《小鸽理财借款协议》确认。根据所出借的借款项目的还款周期，本次定存宝X所出借的借款项目之本金及/或利息收入将在借款人还款后自动转入其小鸽理财平台开设的银行存管账户，且收回的本金及/或利息不再被安排优先自动出借。甲方要求提前结束定存宝X服务并完成债权转让后，成功转让本次定存宝X服务下的债权的收益，也将划入至甲方银行存管账户，具体安排请以债权转让协议约定为准。
          <br>
          <span class="p-span"></span>3.10 相应费用：乙方对甲方与借款人达成交易之事宜不收取平台服务费；乙方对甲方申请债权转让提前结束定存宝X服务之事宜收取债权转让手续费，具体收费标准请以债权转让协议约定为准。
          <br>
        </p>
        <h2>第四条、协议的成立与生效</h2>
        <p class="p2">
          <span class="p-span"></span>4.1 甲方按照小鸽理财网的规则，在定存宝X下点击“立即加入”确认后，则本协议成立，甲方确认并同意接受本协议的全部约定及接受小鸽理财网上与本协议相关各项规则的规定。
          <br>
          <span class="p-span"></span>4.2 乙方根据定存宝X下对应的《小鸽理财借款协议》在甲方加入本次定存宝X并冻结在甲方银行存管账户的全部金额通过存管银行划转至各借款项目中借款人的银行存管账户之日起，本协议立即生效。
          <br>
        </p>
        <h2>第五条、双方权利义务</h2>
        <p class="p2">5.1 甲方权利义务
          <br>
          <span class="p-span"></span>5.1.1 甲方承诺对本协议涉及的出借资金具有完全的支配能力，是其自有闲散资金，为其合法所得；并承诺为履行本协议而向乙方提供的全部资料均是真实有效的。
          <br>
          <span class="p-span"></span>5.1.2 甲方享有其所出借款项所带来的利息收益。
          <br>
          <span class="p-span"></span>5.1.3 甲方投入到定存宝X中的资金享有优先自动出借权。
          <br>
          <span class="p-span"></span>5.1.4 甲方应自行承担加入本定存宝X所获利息收益的应纳税额。
          <br>5.2 乙方权利义务
          <br>
          <span class="p-span"></span>5.2.1 甲方委托乙方，且乙方接受该等委托：乙方在甲方加入本期定存宝X通过系统完成自动出借后以甲方名义代为签署（且甲方特别同意乙方使用其电子证书以完成电子合同之签署）相应《借款协议》；乙方在甲方申请提前结束定存宝X服务时为甲方转让定存宝X服务下对应债权提供居间服务。
          <br>
          <span class="p-span"></span>5.2.2 甲方同意乙方有权代甲方在有必要时对借款人进行贷款的违约提醒及催收工作，包括但不限于电话通知、发律师函、对借款方提起诉讼等。甲方在此确认明确委托乙方为其进行以上工作，并授权乙方可以将此工作委托给其他方进行。
          <br>
          <span class="p-span"></span>5.2.3 乙方接受甲方的委托行为所产生的法律后果由相应委托方承担。如因甲方或其他方（包括但不限于技术问题）造成的延误或错误，乙方不承担任何责任。
          <br>
          <span class="p-span"></span>5.2.4 乙方应对甲方的信息及本协议内容保密；如任何一方违约，或因相关权力部门要求（包括但不限于法院、仲裁机构、金融监管机构等），乙方有权披露。
          <br>
        </p>
        <h2>第六条、定存宝X服务保障</h2>
        <p class="p2">
          <span class="p-span"></span>6.1 为降低甲方因出借过于集中所带来的信用违约风险，乙方将对甲方加入本次定存宝X的金额安排分散化的优先自动出借。甲方加入定存宝X的资金都会有具体的项目对接，且每个项目都有第三方机构以保证方式提供担保/承诺进行代偿/债权回购等形式为其本息提供保障。
          <br>
          <span class="p-span"></span>6.2 为保证本次定存宝X的及时性，在甲方加入本次定存宝X后，即刻开始为甲方加入定存宝X金额安排优先自动出借并协助甲方或接受甲方委托代为进行出借。
          <br>
          <span class="p-span"></span>6.3 定存宝X出借的优先性，乙方将为甲方加入的定存宝X金额安排优先自动出借，保障甲方加入定存宝X金额（尚未订立《借款协议》的部分）可以按加入定存宝X顺序优先进行自动出借。
          <br>
        </p>
        <h2>第七条、附则</h2>
        <p class="p2">
          <span class="p-span"></span>7.1 意外事件：如因司法机关或行政机关对甲方采取强制措施导致其本次定存宝X金额对应的资金被全部或部分扣划，视为甲方就全部本金进行了提前支取，本协议自动终止。本协议因此而自动终止的，甲方将不再享有相应收益。
          <br>
          <span class="p-span"></span>7.2 甲方声明和保证：在签署本协议书前，乙方已就本协议书及有关交易文件的全部条款和内容向甲方进行了详细的说明和解释，甲方已认真阅读本协议有关条款，对有关条款不存在任何疑问或异议，并对协议双方的权利、义务、责任与风险有清楚和准确的理解。
          <br>
        </p>
        <h2>第八条、其他</h2>
        <p class="p2">
          <span class="p-span"></span>8.1 本次定存宝X不提供纸质账单。甲方可以通过乙方小鸽理财APP或客服人员、网站平台查询等方式了解相关信息。如未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素影响使甲方无法及时了解相关信息，由此产生的责任和风险由甲方自行承担。
          <br>
          <span class="p-span"></span>8.2 本次定存宝X并非独立于甲方在注册、使用小鸽理财网站时需要遵守的相应规则和订立的相关协议。甲方必须遵守小鸽理财的相关规则和签署的相关协议，如有违背，将自行承担相应后果。
          <br>
          <span class="p-span"></span>8.3 由于小鸽理财网站及相关第三方的设备、系统故障或缺陷、黑客攻击、计算机病毒侵入或发作、电力中断、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成交易中断、延误的，甲乙双方互不追究责任。但应在条件允许的情况下，采取一切必要的补救措施以减小不可抗力造成的损失。
          <br>
          <span class="p-span"></span>8.4 如本次定存宝X金额未达到定存宝X规模要求，经乙方合理判断难以按照定存宝X协议约定向甲方提供相应服务的，乙方有权宣布定存宝X不成立。
          <br>
          <span class="p-span"></span>8.5 本次定存宝X期限内，如甲方追加定存宝X金额，则在甲方与乙方之间存在多份定存宝X协议的情况下，应以最后订立协议所约定的内容为准。其中，每一份协议均为甲方加入定存宝X金额所对应的甲乙双方权利义务的约定。
          <br>
          <span class="p-span"></span>8.6 本协议项下产生的纠纷，双方先行协商解决，协商不成的，任何一方可向乙方住所地有管辖权的人民法院提起诉讼。
          <br>
          <span class="p-span"></span>8.7 本协议采用电子文本形式制成，并永久保存在乙方为此设立的专用服务器上备查，对各方均具有法律约束力。
          <br>
          <br>
          <br>
        </p>
        <h2>附件一：授权委托书</h2>
        <br>
        <h2 style="text-align: center">授权委托书</h2>
        <p class="relative" style="padding-bottom: 80px;">
          <span>委托人：
            <span class="red-word">{{realName}}</span>
          </span>
          <br>
          <span>小鸽理财用户名：
            <span class="red-word">{{userName}}</span>
          </span>
          <br>
          <span>公民身份号码：
            <span class="red-word">{{idNo}}</span>
          </span>
          <br>
          <span>受托人：深圳市温馨港湾网络技术有限公司</span>
          <br>
          <span>地址：深圳市南山区粤海街道粤兴五道9号北理工创新大厦1202</span>
          <br>
          <br>
          <span>一、委托人合法持有电子签章【 】 。</span>
          <br>
          <span>二、委托授权的事项包括：根据匹配信息确定投标事宜，包括但不限于使用上述电子签章代为签署《借款协议》、发出资金划付指令并协助完成资金划付工作。</span>
          <br>
          <span>三、本委托书一式两份，委托人及受托人各执一份，双方签字后即刻生效。自本次定存宝项下委托人投资项目本金、利息、罚息等全部债权收回之日终止。</span>
          <br>
          <span
            style="font-weight: bold;text-decoration: underline;"
          >委托人声明与保证：本授权委托书及授权事项自双方签字之日起即发生效力，为不可撤销之授权，未经双方一致书面同意取消该授权，任何单方取消授权的行为无效。委托人对受托人在委托事项范围内进行的一切民事行为均予以认可，受托人无需先行通知委托人或征得委托人同意，受托人及其转委托人所产生的民事行为法律后果均由委托人承担。</span>
          <br>
          <br>
          <span class="p2">委托人（签字/捺印）：
            <span class="red-word">{{realName}}</span>
            <img class="seal-p" :src="investImg">
          </span>
          <br>
          <span class="red-word">{{joinDateCN}}</span>
          <br>
          <br>
          <br>
          <span>受托人（盖章）:
            <p class="p2">&nbsp;
              <span class="seal"></span>
            </p>
          </span>
          <span class="red-word">{{joinDateCN}}</span>
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
      lockperiod: "" //定存宝期限
    };
  },
  methods: {
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
