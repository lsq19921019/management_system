<template>
  <div>
    <div class="plat-details">
      <div class="top-info">
        <div class="plat-name">
          <p>{{platDetails.platformName}}</p>
        </div>
        <div class="plat-reason">
          <div class="mui-row">
            <div class="mui-col-xs-4 right-border">
              <p class="content">{{platDetails.address}}</p>
              <p class="title">所在地</p>
            </div>
            <div class="mui-col-xs-4 right-border">
              <p class="content">{{platDetails.problem}}</p>
              <p class="title" @click="infoFrom = !infoFrom">当前状态<img src="/static/img/platform_details_02.png"><span class="info-from" v-show="infoFrom">信息来源：{{platDetails.infoSource}}</span></p>
            </div>
            <div class="mui-col-xs-4">
              <p class="content">{{platDetails.time}}</p>
              <p class="title">曝光时间</p>
            </div>
          </div>
        </div>
      </div>
      <div class="way-safeguard">
        <div class="way_table mui-row">
            <div class="mui-col-xs-6">
                <p :class="{'active':tableNum == 0}" @click="tableNum = 0">平台动态</p>
            </div>
            <div class="mui-col-xs-6" @click="tableNum = 1">
                <p :class="{'active':tableNum == 1}">维权方式</p>
            </div>
        </div>
        <div class="way-content padding">
            <div class="left" v-show="tableNum == 0">
                <div class="left_content" v-if="dynamicList.length > 0" :style="{'min-height': height + 'px'}">
                    <router-link :to="'/new_detail/' + dynamic.detialUrl" class="dynamic" v-for="(dynamic,index) in dynamicList" :key="index">
                        <p class="dynamic_title">{{dynamic.title}}</p>
                        <p class="dynamic_time">{{dynamic.dateStr}}</p>
                    </router-link>
                </div>
                <div v-else class="left_empty">
                    <img src="/static/img/platform_details_04.png">
                </div>
            </div>
            <div class="rights" v-show="tableNum == 1">
                <div class="protection_title">
                    <p>如何维权</p>
                </div>
                <div class="terms">
                    <p class="terms-title">一、核实信息真实可靠程度</p>
                    <p class="terms-text">目前，P2P平台资讯出处来源越来越多，信息质量也开始鱼龙混杂。当投资人获得相关消息时，首先要尽可能的核实信息可靠程度。举例来说，如果在网上看到网友发布的帖子，或在一些非官方社交群中看到相关信息，可直接向平台客服进行核实了解，切忌盲目猜测。如果有加入一些官方客服群，或平时与平台高管有建立联系，也可向这些平台人员进行了解。若平台发布官方公告或帖子，则消息相对可靠。总之，尽可能的从多维度和信息来源判断消息真实性，不盲目跟风起哄的同时，理性判断。
                    </p>
                </div>
                <div class="terms">
                    <p class="terms-title">二、判断问题属性</p>
                    <p class="terms-text">如果平台出现问题的消息初步判断可靠，再分析平台出现的是哪种问题。一般问题分为两大类，一类是恶意的失联或跑路，另一类是良性的逾期清盘，偶尔极少情况出现其他非典型问题（如假清盘或恶意清盘等）。根据实际情况，若投资人有能力判断并认可平台能够根据良性逾期清盘方案执行，且投资人能够接受平台提供的方案，投资人可与平台保持高度联系（如加群、联系平台负责人或客服等），并观察平台执行情况。如果是其他不明或恶性情况，建议投资人一边报警报案并与警方建立联系，一边尝试与平台其他投资人取得联系，抱团维权。</p>
                </div>
                <div class="terms">
                    <p class="terms-title">三、准备材料</p>
                    <p class="terms-text">无论投资人投资的平台是否出现问题，日常注意保存投资资料，对维护投资人权益是有利无害的。若发现平台出现问题时尚未来得及收集资料，应第一时间将平台APP或PC网站上的个人充值投资流水记录、账户资产信息、持有标的和对应债权信息、平台信息进行第一时间截图或拍照保留，再将相关证据（如网站和APP截图、公司证照、虚假宣传截图、服务协议、出借协议、债权转让协议、电子合同等）进行下载保存，最后再将个人银行卡中的充值回款记录进行保存。最终，投资人应将个人信息（姓名、身份证号及扫描件、联系方式、平台账号）、注册时间、涉案总金额、涉案标的债权的投资时间和原计划回款时间、累计投资次数和金额等资料进行清晰整理，以便随时使用。</p>
                </div>
                <div class="terms">
                    <p class="terms-title">四、协商或报案</p>
                    <p class="terms-text">案件发生后，大多投资人都迫切急于收回资金，但投资人始终要记住的原则是理性维权，不要采取过激或影响社会稳定的行为，才能有助于案件顺利进展。如果不是诈骗，且抵押物充足，可联合投资人和警方，与平台协商将抵押物或平台资产变现从而补偿投资人。如果案件性质恶劣，最有效的方式是联合受害者，向平台所属地的公安机关提供证据（即上述第三点中的材料）并报警，与警方保持联系。如果投资人后续有新的线索更新，也可向警方提供。报案后，投资人要相信警方，给警方充足时间处理案件。</p>
                </div>
                <div class="terms">
                    <p class="terms-title">五、刑事诉讼</p>
                    <p class="terms-text">如果出现协商无果、刑事案件立案缓慢、案件进度缓慢等情况，投资人可以针对办案机关不作为情形提起行政诉讼（万不得已才选择）。投资人首先要寻找可靠的律师协助，以有相关P2P案件经验、常驻平台所在地的律师为佳；其次，向律师提供尽可能多的线索，由专业律师针对不同情形给出专业意见，进行案件处理跟进。另外，投资人还可以提起民事诉讼向当地法院申请相关财产保全措施，以查封平台相关财产。一般刑事诉讼分为三个阶段，第一阶段为侦查阶段，由相关部门判断是否犯罪，并收集相关证据；第二阶段为审查起诉阶段，由检察院进一步审查，对涉案行为给出量刑意见，第三阶段为审判阶段，法院将对案件进行定性、裁决并出具判决书。刑事诉讼虽然一般需要较长的时间（如半年到两年的时间），若案件复杂涉案人员较多则需要更长时间，投资人除了应采取尽可能采取的措施外，还应保持耐心，向办案机关提供尽可能多的帮助。</p>
                </div>
                <div class="terms">
                    <p class="terms-title">六、谨防二次伤害</p>
                    <p class="terms-text">在维权过程中，部分损失较大的投资人可能会失去理性并十分脆弱，盲目相信一些维权方法、人员、维权群等，从而在个人信息安全、资金安全方面再次受到伤害。此时投资人切忌病急乱投医，要保持头脑清醒，遇人多核实身份，注意保护个人隐私（如账号、密码、身份信息、联系凡事等资料）凡事多与其他投资人商量分析，实在把握不定时，向律师、警方多咨询。最后，若投资人感到心情极度郁闷、心理状态严重影响正常生活工作、出现极度焦虑等心理状态，投资人要懂得调节心态，一定要放宽心态，多与身边的人沟通倾诉，或寻找专业的心理辅导人员获得帮助，切忌不可采取过激的行为。要记住只要身体健康，钱可以再赚。人生没有过不去的坎，问题总有解决的办法，风雨和教训过后必将迎来阳光，不管发生什么，您的身永远都有爱你的人和你爱的人。</p>
                </div>
            </div>
        </div>
        <div class="footer-line padding" v-show="tableNum == 1">
          <p class="clear">
            <router-link to="/follow_us">获得更多维权方式<img src="/static/img/platform_details_01.png?v=1"></router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoFrom: false,
      tableNum: 0,
      platDetails: {},
      dynamicList: [],
      height: 0
    };
  },
  created() {
    this.getPlatDetails();
  },
  beforeDestroy() {
    $("#app").css({
      paddingBottom: "4.1rem"
    });
  },
  mounted() {
    $("#app").css({
      paddingBottom: "0"
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.autoHeight();
  },
  methods: {
    autoHeight() {
      this.height =
        $(window).height() -
        $(".way_table").offset().top -
        $(".way_table").height() -
        1;
    },
    postPlatDynamic() {
      let thatData = this;

      let data = {};
      this.$http
        .post(
          base.apiStr +
            "/platformDynamic/platform/" +
            thatData.platDetails.platformId +
            ".do",
          this.$qs.stringify(data),
          {
            headers: base.ajaxHeaderWithoutToken(data)
          }
        )
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.resultCode == 600001) {
            thatData.dynamicList = resData.resultData;
          } else {
            //mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getPlatDetails() {
      let thatData = this;
      thatData.platDetails = JSON.parse(localStorage.getItem("platDetails"));
      thatData.postPlatDynamic();
    }
  }
};
</script>
<style lang="css" scoped>
@import "../style/css/platform_details.css";
</style>
