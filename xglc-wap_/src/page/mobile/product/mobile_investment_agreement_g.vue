<!--
    create:luofeifie
    desc:G自动服务协议
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
        <p>尊敬的客户：
          <br>深圳市温馨港湾网络技术有限公司（以下简称"小鸽理财"）G自动服务是小鸽理财推出的自动出借服务工具（以下称"G自动服务"），出借人基于期望出借的期限和往期年化收益率，选择加入不同期限的G自动服务，以实现快速出借。
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
        <h2>第一条、G自动服务意向</h2>
        <p class="p2">
          <span class="p-span"></span>1.1 乙方作为一家合法成立并有效存续的从事网络借贷信息中介服务的有限责任公司，拥有“小鸽理财”网站（域名为：www.xiaogelicai.com）以及对应的“小鸽理财”APP手机客户端、“小鸽理财”微信服务号（微信号：xiaogelicai)（以下统称“小鸽理财平台”）的经营权，为小鸽理财平台客户提供信息咨询和网络借贷信息中介服务。乙方现推出为甲方进行优先自动推荐借款项目的“G自动服务”，为加入的出借人提供更加贴心、便捷的服务。
          <br>
          <span class="p-span"></span>1.2 甲方同意加入本次G自动服务，并自愿遵守小鸽理财网的所有规则。
          <br>
        </p>
        <h2>第二条、加入金额</h2>
        <p class="p2">
          <span class="p-span"></span>2.1 甲方以自有合法资金加入本次G自动服务：申请加入时间：
          <span class="red-word">{{joinDate}}</span> ，加入金额（单位:元）：
          <span class="red-word">{{investAmount}}</span>
          <br>
          <span class="p-span"></span>2.2 甲方加入本次G自动服务后，即视为甲方不可撤销地授权乙方按照甲方首次加入G自动服务的时间先后顺序，将甲方加入本次G自动服务的金额在小鸽理财平台安排进入优先自动出借，选择借款项目以甲方使用该服务出借的真实借款项目为准。
          <br>
          <span class="p-span"></span>2.3 甲方本次G自动服务参考往期年化收益率：
          <span class="red-word">【
            <span>{{minRate}}</span>】%-【
            <span>{{maxRate}}</span>】%
          </span>，最终以实际出借借款项目确定的收益率为准。
          <br>
        </p>
        <h2>第三条、本次G自动服务的具体内容和要求</h2>
        <p class="p2">
          <span class="p-span"></span>3.1 名称：
          <span class="red-word">{{planTitle}}</span>（上下文均称"本次G自动服务"）。
          <br>
          <span class="p-span"></span>3.2 描述：甲方加入本次G自动服务后，G自动服务申请期内加入G自动服务的金额将被优先安排自动出借，并由甲方或甲方授权乙方代为完成出借。出借指甲方与小额借款客户签署借款协议，并将加入的资金一次性全额（或部分）直接出借给小额借款客户。加入本次G自动服务资金全额出借成功或解冻至甲方存管账户可用余额，视为甲方加入的本次G自动服务结束。
          <br>
          <span class="p-span"></span>3.3 优先自动出借范围：小鸽理财平台上开放的拥有第三方机构承诺代偿的借款项目。第三方机构（包括但不限于担保公司等）为出借人的借款提供第三方机构代偿的方式包括但不限于以保证方式提供担保、承诺进行代偿等方式。
          <br>
          <span class="p-span"></span>3.4 加入金额要求：最低加入金额为人民币【100.00】元， 并以人民币【100.00】元整数倍递增。
          <br>
          <span class="p-span"></span>3.5 申请期：
          <span class="red-word">{{joinDate}}</span>，期间内满标则申请期结束。
          <br>
          <span class="p-span"></span>3.6 自动出借期：自甲方加入G自动服务之时起T+20个自然日内，其加入G自动服务的资金将被冻结在甲方在小鸽理财平台开立的资金存管账户中，由乙方根据甲方加入G自动服务的期限和往期年化收益率进行优先自动出借。若该自动出借期限内乙方未能将该笔资金全部出借到对应借款项目中，剩余资金将解除冻结由甲方自行支配。
          <br>
          <span class="p-span"></span> 3.7 G自动服务期限：
          <span class="red-word">{{lockperiod}}</span>，自甲方申请加入G自动服务并与乙方签署自动服务协议时起，至甲方加入资金全部出借完成或未出借资金解冻至甲方在小鸽理财平台开立的资金存管账户之日止。甲方授权乙方就甲方加入本次G自动服务的加入金额进行出借的借款项目之期限不受G自动服务期限限制。
          <br>
          <span class="p-span"></span>3.8 服务结束：当甲方加入本次G自动服务资金全部成功出借，或者/以及对于甲方加入本次G自动服务且尚未进行出借的该部分资金，在自动出借期后解除冻结至甲方资金存管账户中，即为甲方加入的本次G自动服务结束。
          <br>
          <span class="p-span"></span>3.9 债权转让：甲方在成功出借的借款项目期限届满之前可申请将其持有本次G自动服务项下的债权进行转让，同时乙方有权向甲方收取债权转让手续费。各方明确，乙方不确保上述情况下债权转让的成功。若债权转让不成功的，甲方应继续持有G自动服务下的债权，也可再次申请债权转让；若债权转让成功的，则由甲方、债权受让方及乙方签署《债权转让协议》。具体的债权转让限制，以《债权转让协议》及乙方披露的信息为准。
          <br>
          <span class="p-span"></span>3.10 续投服务：甲方在授权本次G自动服务时，可自主选择“是否回款续投服务”选项，即出借的借款项目回款本金及/或利息将自动加入下一期G自动服务。为保障甲方的自主权利和资金流动性，乙方设置一段时间作为甲方冷静期，冷静期内甲方有权自主选择是否关闭续投服务。
          <br>
          <span class="p-span"></span>3.11 甲方收益及支付：甲方的收益将按本次G自动服务所投借款项目对应的《小鸽理财借款协议》确认。根据所出借的借款项目的还款周期，本次G自动服务所出借的借款项目之本金及/或利息收入将在借款人还款后自动转入甲方在小鸽理财平台开设的银行存管账户；若甲方在加入本次G自动服务时或加入本次G自动服务后选择续投服务，收回的本金及/或利息将自动加入下一期G自动服务；若甲方在加入本次G自动服务时或加入本次G自动服务后未选择续投服务或在冷静期内自主选择关闭续投服务，收回的本金及/或利息不再被安排优先自动出借。甲方将加入该G自动服务项下持有的债权申请转让并完成债权转让后，成功转让本次G自动服务下的债权的收益，也将划入至甲方在小鸽理财平台开设的银行存管账户，具体安排请以债权转让协议约定为准。
          <br>
          <span class="p-span"></span>3.12 相应费用：乙方对甲方与借款人达成交易之事宜将按照《小鸽理财借款协议》收取居间服务费；乙方对甲方将其持有本次G自动服务项下的债权进行转让之事宜收取债权转让手续费，具体收费标准请以债权转让协议约定为准。
          <br>
        </p>
        <h2>第四条、协议的成立与生效</h2>
        <p class="p2">
          <span class="p-span"></span>4.1 本协议经甲方通过小鸽理财平台以网络在线点击立即加入并以电子签名的方式与小鸽理财平台订立，即视为甲方已与小鸽理财达成本协议，并同意接受本协议全部约定以及小鸽理财平台其他与履行本协议有关的各项规则。
          <br>
          <span class="p-span"></span>4.2 乙方根据G自动服务下对应的《小鸽理财借款协议》在甲方加入本次G自动服务并冻结在甲方银行存管账户的全部金额通过存管银行划转至各借款项目中借款人的银行存管账户之日起，本协议立即生效。
          <br>
        </p>
        <h2>第五条 授权</h2>
        <p class="p2">
          <span class="p-span"></span>5.1 甲方在此无条件且不可撤销地同意并授权：自甲方签署本协议之日起，乙方即可在甲方加入本期G自动服务通过系统完成自动出借后，通过小鸽理财平台系统以甲方名义自动签署（且甲方特别同意乙方使用其电子证书以完成电子合同之签署）相应《借款协议》；乙方在甲方申请提前结束G自动服务时为甲方转让G自动服务下对应债权提供居间服务。该等自动签署的借款协议均视为甲方真实的意思表示，甲方对该等法律文件的效力均予以认可且无任何异议，并且甲方确认无条件接受该等自动签署的借款协议之约束力。
          <br>
          <span class="p-span"></span>5.2 甲方在此无条件且不可撤销地同意并授权：甲方通过G自动服务而签署相关协议并生效后，乙方或乙方委托的第三方存管机构即可根据该等协议的相关约定，对相关款项进行划扣、支付、冻结以及行使其他权利，甲方对此均予以接受和认可。
          <br>
          <span class="p-span"></span>5.3 甲方在此无条件且不可撤销地同意并授权：甲方同意乙方有权代甲方在必要时对借款人进行贷款的违约提醒及催收工作，包括但不限于电话通知、发律师函、对借款方提起诉讼等。甲方在此确认明确委托乙方为其进行以上工作，并授权乙方可以将此工作委托给其他方进行。
          <br>
        </p>
        <h2>第六条、G自动服务保障</h2>
        <p class="p2">
          <span class="p-span"></span>6.1 为降低甲方因出借过于集中所带来的信用违约风险，乙方将对甲方加入本次G自动服务的金额安排分散化的优先自动出借。甲方加入G自动服务的资金都会有具体的项目对接，且每个项目都有第三方机构以保证方式提供担保/承诺进行代偿/债权回购等形式为其本息提供保障。
          <br>
          <span class="p-span"></span>6.2 为保证本次G自动服务的及时性，在甲方加入本次G自动服务后，即刻开始为甲方加入G自动服务金额安排优先自动出借并协助甲方或接受甲方委托代为进行出借。
          <br>
          <span class="p-span"></span>6.3 G自动服务出借的优先性，乙方将为甲方加入的G自动服务金额安排优先自动出借，保障甲方加入G自动服务金额（尚未订立《借款协议》的部分）可以按加入G自动服务顺序优先进行自动出借。
          <br>
        </p>
        <h2>第七条、声明与承诺</h2>
        <p class="p2">
          <span class="p-span"></span>7.1 甲方确认，甲方系具有完全民事权利能力和完全民事行为能力的自然人、法人或其他组织，有权签订并履行本协议。
          <br>
          <span class="p-span"></span>7.2 甲方承诺对本协议涉及的出借资金具有完全的支配能力，是其自有闲散资金，为其合法所得；并承诺为履行本协议而向乙方提供的全部资料均是真实有效的。
          <br>
          <span class="p-span"></span>7.3 甲方承诺，甲方不会利用小鸽理财平台洗钱、非法集资或其他不正当交易行为，否则将依法独立承担法律责任。
          <br>
          <span class="p-span"></span>7.4 甲方承诺，甲方已认真阅读本协议有关条款，对有关条款不存在任何疑问或异议，并对协议双方的权利、义务、责任与风险有清楚和准确的理解。
          <br>
          <span class="p-span"></span>7.5 甲方承诺，甲方将自行依法承担并缴付其因加入G自动服务所获得的收益的应纳税额。
          <br>
        </p>
        <h2>第八条、其他</h2>
        <p class="p2">
          <span class="p-span"></span>8.1 本次G自动服务不提供纸质账单。甲方可以通过乙方小鸽理财APP或客服人员、网站平台查询等方式了解相关信息。如未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素影响使甲方无法及时了解相关信息，由此产生的责任和风险由甲方自行承担。
          <br>
          <span class="p-span"></span>8.2 本次G自动服务并非独立于甲方在注册、使用小鸽理财网站时需要遵守的相应规则和订立的相关协议。甲方必须遵守小鸽理财的相关规则和签署的相关协议，如有违背，将自行承担相应后果。
          <br>
          <span class="p-span"></span>8.3 意外事件：如因司法机关或行政机关对甲方采取强制措施导致其本次G自动[增加8.3条款]服务金额对应的资金被全部或部分扣划，视为甲方就全部本金进行了提前支取，本协议自动终止。本协议因此而自动终止的，甲方将不再享有相应收益。
          <br>
          <span class="p-span"></span>8.4 由于小鸽理财网站及相关第三方的设备、系统故障或缺陷、黑客攻击、计算机病毒侵入或发作、电力中断、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成交易中断、延误的，甲乙双方互不追究责任。但应在条件允许的情况下，采取一切必要的补救措施以减小不可抗力造成的损失。
          <br>
          <span class="p-span"></span>8.5 如本次G自动服务金额未达到服务规模要求，经乙方合理判断难以按照G自动服务协议约定向甲方提供相应服务的，乙方有权宣布G自动服务不成立。
          <br>
          <span class="p-span"></span>8.6 本次G自动服务期限内，如甲方追加G自动服务金额，则在甲方与乙方之间存在多份G自动服务协议的情况下，应以最后订立协议所约定的内容为准。其中，每一份协议均为甲方加入G自动服务金额所对应的甲乙双方权利义务的约定。
          <br>
          <span class="p-span"></span>8.7 本协议的签订、履行、终止、解释均适用中国法律。甲乙双方同意，因本协议所产生的或与本协议有关的一切争议，双方应协商解决；协商无法达成一致的，任何一方可向乙方住所地有管辖权的人民法院提起诉讼。
          <br>
          <span class="p-span"></span>8.8 本协议采用电子文本形式制成，并永久保存在乙方为此设立的专用服务器上备查，对各方均具有法律约束力。
          <br>
        </p>
        <br>
        <br>
        <span class="p2">甲方（签章）：
          <span class="red-word">{{realName}}</span>
          <img class="seal-p" :src="investImg">
        </span>
        <br>
        <!-- <span class="red-word">{{joinDateCN}}</span> -->
        <br>
        <br>
        <br>
        <span>乙方（签章）:
          <p class="p2">&nbsp;
            <span class="seal"></span>
          </p>
        </span>
        <!-- <span class="red-word">{{joinDateCN}}</span> -->
        <br>
        <br>
        <br>
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
