<template>
  <div>
    <div class="agree">
      <img src="/static/img/ban.png" class="ban-img">
      <div class="main-box">
        <p>尊敬的客户：
          <br>深圳市温馨港湾网络技术有限公司 （以下称"小鸽理财"）定存宝理财项目（以下称"定存宝"）面向小鸽理财的注册用户现提供效率更高、退出更加灵活、资金利用率更高的理财计划，以便更好地服务理财投资人。
        </p>
        <table class="tab-color">
          <thead>
            <tr>
              <th>甲方：
                <span id="realname" class="red-word">{{realName}}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>身份证号码：
                <span id="idno" class="red-word">{{idNo}}</span>
              </td>
            </tr>
            <tr>
              <td>联系电话：
                <span id="cellphone" class="red-word">{{phone}}</span>
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
                <td>地址：深圳市南山区高新九道北理工创新大厦12楼</td>
              </tr>
              <tr>
                <td>邮编：518000</td>
              </tr>
              <tr>
                <td>咨询电话：400-7004-007</td>
              </tr>
            </tbody>
          </table>
          <div class="clear"></div>
          <div class="seal"></div>
        </div>
        <p>甲乙双方经友好协商，本着平等自愿、诚实信用的原则，达成如下协议：
          <br>
        </p>
        <h2>第一条、定存宝意向</h2>
        <p class="p2">
          <span class="p-span"></span>1.1乙方推出"出借人授权乙方在小鸽理财网(“小鸽理财网”系指“小鸽理财”网站（域名为：www.xiaogelicai.com）、“小鸽理财”注册微信服务号（微信号：xiaogelicai）、“小鸽理财”APP软件)为甲方进行优先自动投标及至定存宝期限届满按相关规则退出"的定存宝服务，为加入定存宝的出借人提供更加贴心、便捷的服务，并将尽最大努力维护出借人的合法利益。
          <br>
          <span class="p-span"></span>1.2甲方同意加入本次定存宝，并自愿遵守小鸽理财网的所有规则。
          <br>
        </p>
        <h2>第二条、定存宝投资数额与收益</h2>
        <p class="p2">
          <span class="p-span"></span>2.1甲方以自有合法资金加入本次定存宝：申请加入时间：
          <span class="red-word" id="inversttime">{{joinDate}}</span> ，加入金额（单位:元）：
          <span class="red-word" id="investamount">{{investAmount}}</span>
          <br>
          <span class="p-span"></span>2.2甲方加入本次定存宝后，即视为甲方不可撤销地授权乙方按照甲方首次加入定存宝的时间先后顺序，将甲方加入定存宝的金额在小鸽理财互联网金融服务平台安排进入优先自动投标。
          <br>
          <span class="p-span"></span>2.3 甲方本次定存宝预期年化收益：
          <span class="red-word" id="highest">【
            <span id="minrate">{{minRate}}</span>】%-【
            <span id="maxrate">{{maxRate}}</span>】%
          </span>
          <br>
        </p>
        <h2>第三条、本次定存宝的具体内容和要求</h2>
        <p class="p2">
          <span class="p-span"></span>3.1名称：
          <span class="red-word" id="title">{{planTitle}}</span>（上下文均称"本次定存宝"）。
          <br>
          <span class="p-span"></span>3.2 描述：甲方加入本次定存宝后，定存宝期限内加入定存宝的金额将被优先安排自动投标，投标指将加入的资金一次性全额（或部分）直接出借给小额借款客户或者受让其他出借人拟转让的债权，以及小额借款客户还款资金再出借或者再受让，因此本期定存宝中可能包含一个或多个借款项目。甲方未选择到期后自动续投的，定存宝期限届满之日，乙方协助甲方将所持全部债权完成债权转让，甲方整体退出本次定存宝。
          <br>
          <span class="p-span"></span>3.3优先自动投标范围：小鸽理财平台上开放的拥有第三方机构承诺代偿的借款项目。第三方机构（包括但不限于担保公司或小额贷款公司等）为出借人的借款提供第三方机构代偿的方式包括但不限于以保证方式提供担保、承诺进行代偿、债权回购等方式。
          <br>
          <span class="p-span"></span>3.4 加入金额要求：最低加入金额为人民币【100.00】元， 并以人民币【100.00】元整数倍递增。
          <br>
          <span class="p-span"></span>3.5申请期：自
          <span class="red-word" id="inversttime2">{{joinDate}}</span>至
          <span class="red-word" id="endtime">{{endTime}}</span>，期间内满标则申请期结束。
          <br>
          <span class="p-span"></span>3.6定存宝期限：自首次定存宝加入日期至
          <span class="red-word" id="endtime2">{{endTime}}</span>。
          <br>
          <span class="p-span"></span>3.7 退出情形：定存宝期限届满之日则甲方退出定存宝；退出后，甲方的本次定存宝金额将不再被安排优先自动投标。
          <br>
          <span class="p-span"></span>3.8到期退出：甲方未选择到期后自动续投的，在定存宝期限届满之日自动退出定存宝，乙方将安排以转让甲方定存宝下相对应债权的方式实现甲方退出。乙方对于定存宝到期退出时的债权转让，不收取债权转让服务费用。
          <br>
          <span class="p-span"></span>3.9 提前赎回：不可赎回。
          <br>
          <span class="p-span"></span>3.10 相应费用：乙方对于甲方定存宝金额不收取利息管理服务费用；乙方对于甲方定存宝到期退出或提前赎回的，不收取债权转让服务费用；甲方每月提取本次定存宝项下所投标的利息收入，如果选择提现至银行卡账户的，提现按照小鸽理财现有规则执行。乙方仅收取贷后还款管理费用，管理费用来源于甲方加入定存宝所对应的借款的利息等收益中超过定存宝预期年化收益以外的部分（本期定存宝预期年化收益请参加本协议第二条第3款）；管理费用在结算甲方利息收益时自动扣除，定存宝投资债权实际收益不及预期年化收益的，乙方不收取管理费用。
          <br>
        </p>
        <h2>第四条、 协议的成立与生效</h2>
        <p class="p2">
          <span class="p-span"></span>4.1 甲方按照小鸽理财网的规则，在定存宝下点击“立即投资”确认后，则本协议成立，甲方并同意接受本协议的全部约定及接受小鸽理财网上与本协议相关各项规则的规定。
          <br>
          <span class="p-span"></span>4.2 乙方根据定存宝下对应的《小鸽理财借款协议》和/或《债权转让协议》将本次定存宝的全部金额通过第三方支付机构划转至各借款项目中借款人和/或债权出让人（出借人）之日起，本协议立即生效。
          <br>
        </p>
        <h2>第五条、双方权利义务</h2>
        <p class="p2">5.1甲方权利义务
          <br>
          <span class="p-span"></span>5.1.1甲方承诺对本协议涉及的出借资金具有完全的支配能力，是其自有闲散资金，为其合法所得；并承诺为履行本协议而向乙方提供的全部资料均是真实有效的；
          <br>
          <span class="p-span"></span>5.1.2甲方享有其所出借款项所带来的利息收益；
          <br>
          <span class="p-span"></span>5.1.3甲方投入到定存宝中的资金享有优先自动匹配项目权；
          <br>
          <span class="p-span"></span>5.1.4甲方同意授权乙方为其投入到定存宝款项进行债权转让事宜；
          <br>
          <span class="p-span"></span>5.1.5甲方应自行承担本定存宝所获利息收益的应纳税额。
          <br>5.2乙方权利义务
          <br>
          <span class="p-span"></span>5.2.1甲方委托乙方，且乙方接受该等委托代甲方收取出借款项所对应的每期本息。代收的每期本金自动优先投标到定存宝中的借款项目，代收的每期利息按照甲方的选择进行处理。
          <br>
          <span class="p-span"></span>5.2.2甲方委托乙方，且乙方接受该等委托：乙方在本次定存宝满标审核通过系统完成自动投标后以甲方名义代为签署相应《小鸽理财借款协议》、《债权转让协议》；乙方在定存宝期限届满及甲方申请提前赎回时安排转让甲方定存宝下相对应债权后以甲方名义代为签署相应《债权转让协议》，乙方系统在相对应债权所涉及《小鸽理财借款协议》中进行相应债权转让的记录。
          <br>
          <span class="p-span"></span>5.2.3甲方同意乙方有权代甲方在有必要时对借款人进行贷款的违约提醒及催收工作，包括但不限于电话通知、发律师函、对借款方提起诉讼等。甲方在此确认明确委托乙方为其进行以上工作，并授权乙方可以将此工作委托给其他方进行。
          <br>
          <span class="p-span"></span>5.2.4乙方接受甲方的委托行为所产生的法律后果由相应委托方承担。如因甲方或其他方（包括但不限于技术问题）造成的延误或错误，乙方不承担任何责任。
          <br>
          <span class="p-span"></span>5.2.5乙方应对甲方的信息及本协议内容保密；如任何一方违约，或因相关权力部门要求（包括但不限于法院、仲裁机构、金融监管机构等），乙方有权披露。
          <br>
        </p>
        <h2>第六条、定存宝保障</h2>
        <p class="p2">
          <span class="p-span"></span>6.1为降低甲方因投资标的过于集中所带来的信用违约风险，乙方将对甲方加入本次定存宝金额安排分散化的优先自动投标。甲方加入定存宝的资金都会有具体的项目对接，且每个项目都有第三方机构以保证方式提供担保/承诺进行代偿/债权回购等形式为其本息提供保障。
          <br>
          <span class="p-span"></span>6.2为保证本次定存宝的及时性，在甲方加入本次定存宝时，一旦定存宝满标审核通过即刻开始为甲方加入定存宝金额安排优先投标。
          <br>
          <span class="p-span"></span>6.3定存宝投标的优先性，乙方将为甲方加入的定存宝金额安排优先自动投标，保障甲方加入定存宝金额（尚未订立《小鸽理财借款协议》、《债权转让协议》的部分）可以按加入定存宝顺序优先进行自动投标。
          <br>
        </p>
        <h2>第七条、承诺与保证</h2>
        <p class="p2">
          <span class="p-span"></span>7.1意外事件：如因司法机关或行政机关对甲方采取强制措施导致其本次定存宝金额对应的资金被全部或部分扣划，视为甲方就全部本金进行了提前支取，本协议自动终止。本协议因此而自动终止的，甲方将不再享有相应收益。
          <br>
          <span class="p-span"></span>7.2甲方声明和保证：在签署本协议书前，乙方已就本协议书及有关交易文件的全部条款和内容向甲方进行了详细的说明和解释，甲方已认真阅读本协议有关条款，对有关条款不存在任何疑问或异议，并对协议双方的权利、义务、责任与风险有清楚和准确的理解。
          <br>
        </p>
        <h2>第八条、其他</h2>
        <p class="p2">
          <span class="p-span"></span>8.1本次定存宝不提供纸质账单。甲方可以通过乙方小鸽理财网站或客服人员、网站平台查询等方式了解相关信息。如未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素影响使甲方无法及时了解相关信息，由此产生的责任和风险由甲方自行承担。
          <br>
          <span class="p-span"></span>8.2本次定存宝并非独立于甲方在注册、使用小鸽理财网站时需要遵守的相应规则和订立的相关协议。甲方必须遵守小鸽理财的相关规则和签署的相关协议，如有违背，将自行承担相应后果。
          <br>
          <span class="p-span"></span>8.3由于小鸽理财网站及相关第三方的设备、系统故障或缺陷、黑客攻击、计算机病毒侵入或发作、电力中断、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成交易中断、延误的，甲乙双方互不追究责任。但应在条件允许的情况下，采取一切必要的补救措施以减小不可抗力造成的损失。
          <br>
          <span class="p-span"></span>8.4如本次定存宝金额未达到定存宝规模要求，经乙方合理判断难以按照定存宝协议约定向甲方提供相应服务的，乙方有权宣布定存宝不成立。
          <br>
          <span class="p-span"></span>8.5本次定存宝期限内，如甲方追加定存宝金额，则在甲方与乙方之间存在多份定存宝协议的情况下，应以最后订立协议所约定的内容为准。其中，每一份协议均为甲方加入定存宝金额所对应的甲乙双方权利义务的约定。
          <br>
          <span class="p-span"></span>8.6本协议项下产生的纠纷，双方先行协商解决，协商不成的，任何一方可向乙方住所地有管辖权的人民法院提起诉讼。
          <br>
          <span class="p-span"></span>8.7本协议采用电子文本形式制成，并永久保存在乙方为此设立的专用服务器上备查，对各方均具有法律约束力。
          <br>
          <br>
          <br>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      realName: "xxxx", //甲方姓名
      idNo: "xxxxxxxxxxx", //甲方身份证号码
      phone: "xxxxxxxxxxx", //甲方手机号码
      planTitle: "xxxxxxxxx", //名称
      joinDate: "xxxx-xx-xx", //加入时间
      endTime: "xxxx-xx-xx", //退出时间
      investAmount: "xxxxx", //加入金额
      minRate: "xxxx", //利率(小)
      maxRate: "xxxx", //利率(大)
      fetchToken: ""
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
        investId: thatData.$route.query.investId,
        investType: "1"
      };

      this.$http
        .post("/api/assets/planProtocol", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.msg == "操作成功!") {
            thatData.realName = resData.result.realName;
            thatData.idNo = resData.result.idNo;
            thatData.phone = resData.result.phone;
            thatData.planTitle = resData.result.planTitle;
            thatData.joinDate = resData.result.joinDate;
            thatData.endTime = resData.result.endTime;
            thatData.investAmount = resData.result.investAmount;
            thatData.minRate = resData.result.minRate;
            thatData.maxRate = resData.result.maxRate;
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
<style>
@import "../../../style/css/mobile_investment_agreement.css";
</style>
