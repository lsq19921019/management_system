<template>
  <div>
    <div class="agree">
      <img src="/static/img/ban.png" class="ban-img">
      <div class="main-box">
        <p>协议编号：
          <span>{{debtProtocolNumber}}</span>
        </p>
        <p>本《小鸽理财债权转让协议》（以下简称“本协议”）由以下三方签署：</p>
        <table class="tab-color">
          <thead>
            <tr>
              <th>甲方：（转让人/原债权人）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>小鸽理财网用户名：
                <span id="jiausername">{{jiaUserName}}</span>
              </td>
            </tr>
            <tr>
              <td>真实姓名：
                <span id="jiarealname">{{jiaRealName}}</span>
              </td>
            </tr>
            <tr>
              <td>身份证号码：
                <span id="jiaidno">{{jiaIdNo}}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="tab-color">
          <thead>
            <tr>
              <th>乙方：（受让人/新债权人）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>小鸽理财网用户名：
                <span id="yiusername">{{yiUserName}}</span>
              </td>
            </tr>
            <tr>
              <td>真实姓名：
                <span id="yirealname">{{yiRealName}}</span>
              </td>
            </tr>
            <tr>
              <td>身份证号码：
                <span id="yiidno">{{yiIdNo}}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="relative">
          <table class="tab-color">
            <thead>
              <tr>
                <th>丙方：深圳市温馨港湾网络技术有限公司</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>地址：
                  <span id="guarantoraddress">{{guarantorAddress}}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="clear"></div>
        </div>
        <h2>鉴于：</h2>
        <p>
          <span class="p-span"></span>1、甲方有债权转让需求，乙方同意受让该债权，双方有意达成债权转让；
          <br>
          <span class="p-span"></span>2、乙方承诺对本协议涉及的受让债权的资金具有完全的支配能力，是其自有闲散资金，为其合法所得；并承诺其为履行本协议而提供给丙方的信息是真实有效的；
          <br>
          <span class="p-span"></span>3、丙方是一家在深圳市合法成立并有效存续的有限责任公司，运营小鸽理财网(“小鸽理财网”系指“小鸽理财”网站（域名为：www.xiaogelicai.com）、“小鸽理财”注册微信服务号（微信号：xiaogelicai）、“小鸽理财”APP软件)，提供网络借贷信息中介服务，为本次债权转让交易提供居间服务； 协议各方经友好协商，本着平等自愿、诚实信用的原则，达成如下协议：
          <br>
        </p>
        <h2>第一条 债权基本信息</h2>
        <p>各方经协商一致，于 签订如下协议，共同遵照履行：
          <br>
          <br>
        </p>
        <table class="tab-box">
          <tr>
            <td style="width:140px;">初始借款协议编号</td>
            <td>
              <span id="xieyiid">{{agreementNo}}</span>
            </td>
          </tr>
          <tr>
            <td>初始借款金额</td>
            <td>
              <span id="borrowamount">{{borrowAmount}}</span>
            </td>
          </tr>
          <tr>
            <td>初始借款期限</td>
            <td>
              <span id="deadline">{{deadline}}</span>
            </td>
          </tr>
          <tr>
            <td>剩余待收本息</td>
            <td>
              <span id="debtSum">{{debtSum}}</span>
            </td>
          </tr>
          <tr>
            <td>债权转让价格</td>
            <td>
              <span id="auctionhighprice">{{auctionhighprice}}</span>
            </td>
          </tr>
          <tr>
            <td>申请债权转让日期</td>
            <td>
              <span id="auctionhighprice">{{applyTime}}</span>
            </td>
          </tr>
          <tr>
            <td>剩余还款期限</td>
            <td>
              <span id="repayPeriod">{{repayPeriod}}</span>
            </td>
          </tr>
          <tr>
            <td>还款起始日期</td>
            <td>
              <span id="audittime">{{auditTime}}</span>
            </td>
          </tr>
          <tr>
            <td>还款日</td>
            <td>
              <span id="deadtime">{{repayDay}}</span>
            </td>
          </tr>
        </table>
        <h2>第二条 债权转让价格的定价规则</h2>
        <p class="p2">
          <span class="p-span"></span>2.1 债权转让价格规则为：债权转让价格=申请债权转让日该笔债权剩余未还本金金额*折价率（折价率依据小鸽理财平台相关规则予以确定）+转让日该笔债权的应得利息；
          <br>
          <span class="p-span"></span>2.2 应得利息由乙方在债权转让时向甲方垫付，在下一个还款日当期利息全部归于乙方。即：应的利息=[(申请转让日-上期还款日）/360]*借款项目利率*剩余待收本金。
          <br>
          <span class="p-span"></span>2.3债权转让中，丙方收取相应的服务费用，收费规则为：甲方债权转让价格*
          <span>【{{manageUnit}}】</span>%。
          <br>
        </p>
        <h2>第三条 各方权利和义务</h2>
        <p class="p2">
          <span class="p-span"></span>
          <b>3.1甲方权利和义务</b>
          <br>
          <span class="p-span2"></span>3.1.1 甲方保证本债权转让协议下转让给乙方的债权为甲方合法拥有。甲方保证其所转让的债权免遭任何第三人的追索。否则，甲方承担由此而引起的所有经济和法律责任。
          <br>
          <span class="p-span2"></span>3.1.2甲方需向丙方支付债权转让服务费用。 债权转让服务费=债权转让价格金额*
          <span>【{{manageUnit}}】</span>%。
          <br>
          <span class="p-span2"></span>3.1.3甲方应确保其提供的信息和资料的真实性，不得提供虚假信息或隐瞒重要事实。
          <br>
          <span class="p-span2"></span>3.1.4甲方有权通过丙方平台发布债权转让信息，且与乙方签订债权转让协议，将所持有的债权转让给乙方，若所转让的债权内附带担保的，该担保一并转让。
          <br>
          <span class="p-span2"></span>3.1.5甲方保证截至债权转让生效之前，原借款合同中所载的一切条款及条件均得到适当的遵守及履行。
          <br>
          <br>
        </p>
        <p class="p2">
          <span class="p-span"></span>
          <b>3.2乙方权利和义务</b>
          <br>
          <span class="p-span2"></span>3.2.1乙方保证其受让标的债权的资金来源合法，乙方是该资金的合法所有人，如果第三人对资金归属、合法性问题发生争议，由乙方负责解决。如乙方未能解决，则放弃享有其作为债权人所获得的利息收益，由此引发的任何第三方的损失，由乙方自行承担，若乙方构成违约的，则应当承担违约责任。
          <br>
          <span class="p-span2"></span>3.2.2乙方享有标的债权所带来的利息收益。
          <br>
          <span class="p-span2"></span>3.2.3乙方应主动缴纳因利息收益产生的可能的税费。
          <br>
          <span class="p-span2"></span>3.2.4乙方按照小鸽理财网的规则，在小鸽理财平台债权转让板块下对甲方的债权（"标的债权"）转让需求点击“立即购买”按钮后，本协议即成立。本协议成立的同时，乙方授权丙方委托存管银行从乙方存管账户划转等同于本协议第一条“债权转让价格”的相应资金，债权转让款项划转至甲方存管账户后即视为甲方已收到相应款项，丙方有权委托存管银行从甲方存管账户划扣债权转让服务费用（如有）。债权转让款项划转完毕则本协议生效且债权转让成功。
          <br>
          <span class="p-span2"></span>3.2.5自标的债权转让成功之日起，乙方成为标的债权的债权人，承继甲方与标的债权借款人签订的相应《小鸽理财借款协议》项下出借人的权利并承担出借人的义务。如相应《借款协议》中约定了由第三方承担债权回购责任的，乙方有权要求第三方根据相应《借款协议》的约定继续对乙方承担债权回购责任。
          <br>
          <span class="p-span2"></span>3.2.6乙方保证具有独立的风险承受能力，对本次债权转让结果和可能存在的风险已经理解并表示认可。
        </p>
        <br>
        <p>
          <span class="p-span"></span>
          <b>3.3丙方权利和义务</b>
          <br>
          <span class="p-span2"></span>3.3.1丙方负责《小鸽理财借款协议》标的债权项下的居间服务工作，并有权收取本协议约定的相关费用。
          <br>
          <span class="p-span2"></span>3.3.2丙方有权了解甲乙双方的信息和债权转让进展情况。在债权转让成功后,丙方系统对标的债权所涉及的《小鸽理财借款协议》进行债权转让记录。
          <br>
          <span class="p-span2"></span>3.3.3丙方不得将本协议项下的任何权利义务转让给任何其他方。
          <br>
          <span class="p-span2"></span>3.3.4在甲方所持债权符合小鸽理财平台上关于债权转让的规定时，丙方必须受理甲方在小鸽理财平台的债权转让委托申请。
          <br>
          <span class="p-span2"></span>3.3.5如因乙方资金来源合法性问题而致该债权转让被取消的，丙方自行承担该笔债权转让所产生的债权转让服务费。
          <br>
        </p>
        <br>
        <h2>第四条 风险及权利转移</h2>
        <p>
          <span class="p-span2"></span>4.1自受让人按照本协议约定支付完毕标的债权转让价款之日起，标的债权归属于乙方所有，受让人继受转让人就标的债权对借款人所享有的一切权利，并承担与标的债权相关的一切风险。
          <br>
          <span class="p-span2"></span>4.2债权转让协议签署后，债权受让人在此无条件且不可撤销的授权债权转让人：原债权若附有抵押权、质押权、 保证担保中一种或多种担保权利的，则该担保权利随本次债权转让一并转让至债权受让人， 若出现需要行使上述担保权的情形，则债权转让人应当配合债权受让人通过申请强制执行、诉讼等方式实现担保权利。
          <br>
          <span class="p-span2"></span>4.3受让人在此知悉并确认：债权转让协议签署后，转让人对借款人不承担任何保证责任，若出现借款人未能按期还款的，应当由受让人依照《小鸽理财借款协议》的约定向借款人进行追讨或者由第三方机构进行债权回购。
          <br>
        </p>
        <h2>第五条 违约责任</h2>
        <p
          class="p2"
        >本合同双方均应履行本合同所约定的义务。任何一方不履行或不完全履行本合同所约定义务的，违约方应承担违约责任并赔偿对方因此而产生的费用和损失，包括但不限于直接损失、间接损失、实现债权费用、诉讼费、律师费等。</p>
        <h2>第六条 附则</h2>
        <p class="p2">
          <span class="p-span"></span>6.1 本协议以电子文本形式生成。本协议系与《小鸽理财借款协议》、《G自动服务服务协议》为不可分割部分，具有同等之法律效力。本协议终止并不免除用户根据本协议或者其他规则、约定应承担义务与责任。
          <br>
          <span class="p-span"></span>6.2 小鸽理财有权对本协议的任何修改、补充，修改、补充一经作出即发生法律效力，且均须以小鸽理财网平台电子文本形式作出。
          <br>
          <span class="p-span"></span>6.3本协议的全部事项，包括但不限于本协议的效力、解释、履行以及争议的解决均适用中华人民共和国法律；本协议项下任一条款与中国法律的强制性规定相抵触，应在该强制性规范所不禁止的最大限度范围内解释和执行，且任何该等与强制性规范相抵触的约定不应影响本协议其他条款的效力。
          <br>
          <span class="p-span"></span>6.4 如果各方在本协议履行过程中发生任何争议，
          <span style="font-weight: bold;">应友好协商解决；如协商不成，则须提交本协议签署地人民法院进行诉讼。</span>
          <br>
          <span class="p-span"></span>6.5 各方委托小鸽理财网保管所有与本协议有关的书面文件或电子信息。
          <br>
          <span class="p-span"></span>以下无正文
          <br>
        </p>
        <br>
        <br>
        <p class="relative">甲方（转让人/原债权人）：
          <span></span>
          <img class="seal-p" :src="jiaImage">
        </p>
        <br>
        <br>
        <p class="relative">乙方（受让人/新债权人）：
          <span></span>
          <img class="seal-p" :src="yiImage">
        </p>
        <br>
        <br>
        <p class="relative">丙方（服务方）：
          <span></span>
          <span class="seal"></span>
        </p>
        <br>
        <br>
        <br>
        <p class="p2">
          <span>签署日期：【{{curYear}}】年【{{curMonth}}】月【{{curDay}}】日</span>
        </p>
        <p class="p2">
          <span>签署地点：【深圳】市【南山】区</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jiaUserName: "xxxxxx", //甲方用户名
      jiaRealName: "xxxx", //甲方姓名
      jiaIdNo: "xxxxxxxxxxxxxxxxxx", //甲方身份证
      yiUserName: "xxxxxx", //乙方用户名
      yiRealName: "xxxx", //乙方姓名
      yiIdNo: "xxxxxxxxxxxxxxxxxx", //乙方身份证
      guarantorAddress: "深圳市南山区高新九道北理工创新大厦12楼", //丙方担保人地址
      agreementNo: "xxxxxxxxxxx", //初始协议id
      debtProtocolNumber: "xxxxxxxxxxx", //债权协议id
      repayDay: "xx", //还款日
      auditTime: "xxxx-xx-xx", //还款起始日期
      deadline: "xx", //初始借款期限
      borrowAmount: "xxxxxxx", //借款本金数额
      debtSum: "xxxxxxx", //剩余代收本息
      auctionhighprice: "xxxxxxx", //债权转让价格
      repayPeriod: "xx", //剩余还款期限
      applyTime: "xxxxxxxx", //申请债权转让日期
      jiaImage: "", //甲方印章
      yiImage: "", //乙方印章
      curYear: "xxxx", //年
      curMonth: "xx", //月
      curDay: "xx", //日
      manageUnit: "xx", //费率
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
            }
          });
      }
    },
    postData: function() {
      var thatData = this;

      var data = {
        investId: thatData.$route.query.investId,
        investType: "3",
        borrowId: thatData.$route.query.borrowId,
        debtId: thatData.$route.query.debtId
      };

      this.$http
        .post("/api/assets/investDebtProtocol", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.msg == "操作成功!") {
            thatData.jiaUserName = resData.result.jiaUserName;
            thatData.jiaRealName = resData.result.jiaRealName;
            thatData.jiaIdNo = resData.result.jiaIdNo;
            thatData.yiUserName = resData.result.yiUserName;
            thatData.yiRealName = resData.result.yiRealName;
            thatData.yiIdNo = resData.result.yiIdNo;
            thatData.guarantorAddress = resData.result.guarantorAddress;
            thatData.debtProtocolNumber = resData.result.debtProtocolNumber;
            thatData.agreementNo = resData.result.agreementNo;
            thatData.repayDay = resData.result.repayDay;
            thatData.auditTime = resData.result.auditTime;
            thatData.deadline = resData.result.deadline;
            thatData.borrowAmount = resData.result.borrowAmount;
            thatData.debtSum = resData.result.debtSum;
            thatData.auctionhighprice = resData.result.auctionhighprice;
            thatData.repayPeriod = resData.result.repayPeriod;
            thatData.curYear = resData.result.curYear;
            thatData.curMonth = resData.result.curMonth;
            thatData.curDay = resData.result.curDay;
            thatData.manageUnit = resData.result.manageUnit;
            thatData.applyTime = resData.result.applyTime;
            thatData.jiaImage =
              "data:image/png;base64," + resData.result.jiaImage;
            thatData.yiImage =
              "data:image/png;base64," + resData.result.yiImage;
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
@import "../../../style/css/mobile_assignment_clause.css";
</style>
