<template>
  <div>
    <!-- yea~ass~ -->
    <div class="risk">
      <div class="risk-title in-padding">
        <p>为了测评结果准确，请您准确真实的填写，谢谢配合!</p>
      </div>
      <div class="line">
        <span class="in-line" :class="{full:goFull}"></span>
      </div>
      <div class="test-num in-padding">
        <p>
          <span class="current-num">{{pageNum + 1}}</span>
          <span class="total-num">/10</span>
        </p>
      </div>
      <div class="test-topic in-padding">
        <p>{{topic[pageNum]}}</p>
      </div>
      <div class="test-option in-padding">
        <div class="test-list" v-for="(ans,index) in answer[pageNum]" :key="ans.id">
          <div
            class="test-radio"
            :class="{'checked':index == op[pageNum]}"
            @click="click(pageNum,index)"
          >
            <span class="answer-text">{{ans}}</span>
          </div>
        </div>
      </div>
      <div class="footer-back in-padding" v-show="pageNum > 0">
        <span @click="pageNum--">&lt;上一题</span>
      </div>
      <div class="in-padding" v-if="pageNum == 9">
        <button @click="submit" class="btn">确认无误，提交</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageNum: 0,
      time: true,
      goFull: false,
      canBack: false,
      chickAns: "",
      op: [],
      topic: [
        "您的年龄是？",
        "您的家庭总资产净值为？",
        "您可用于投资理财的比例为？",
        "以下哪项最能说明您的投资经验？",
        "您有多少年投资的经验？",
        "您对理财产品的看法？",
        "假设：投资A预期获得10%的收益，风险可能较小；投资B预期获得30%的收益，风险可能较大；您会怎么支配您的资金？",
        "您计划的投资期限是多久？",
        "您的投资目的是？",
        "您投资出现何种程度的波动时，您会呈现明显的焦虑？"
      ],
      answer: [
        ["A、18—25岁", "B、26—50岁", "C、51—64岁", "D、65岁以上"],
        [
          "A、30万元及以下",
          "B、31万元—60万元",
          "C、61万元—100万元",
          "D、100万元以上"
        ],
        ["A、小于30%", "B、30%-50%", "C、50%以上"],
        [
          "A、没有相关的知识，我几乎不投资其他金融产品",
          "B、只有初步的认识，大部分投资于存款、国债等",
          "C、有一定的理解，资产均衡地分布于存款、国债、股票、P2P平台等",
          "D、金融专业人士，大部分投资于股票、P2P平台等"
        ],
        ["A、没有经验", "B、少于2年", "C、2至5年", "D、5至8年", "E、8年以上"],
        [
          "A、理财产品无风险，类似存款",
          "B、理财产品应当保本，但收益不确定",
          "C、理财产品本金可能产生少量损失",
          "D、理财产品可能大幅亏损，应当仔细选择"
        ],
        [
          "A、全部投资于收益小且风险小的A",
          "B、大部分投资收益小且风险小的A，小部分投资B",
          "C、大部分投资收益大且风险大的B，小部分投资A",
          "D、全部投资于收益大且风险大的B"
        ],
        ["A、6个月以下", "B、6个月—1年", "C、1—3年", "D、3年以上"],
        ["A、资产保值", "B、资产稳健增长", "C、资产迅速增长"],
        [
          "A、本金无损失，但收益未达预期",
          "B、本金10%以内的损失",
          "C、本金10%—20%的损失",
          "D、本金20%—50%的损失",
          "E、本金50%以上损失"
        ]
      ],
      fraction: [
        [-2, 0, -4, -10],
        [2, 6, 8, 10],
        [4, 8, 10],
        [0, 2, 6, 10],
        [0, 2, 6, 8, 10],
        [0, 4, 8, 10],
        [0, 4, 8, 10],
        [4, 6, 8, 10],
        [2, 6, 10],
        [-5, 5, 10, 15, 20]
      ],
      fetchToken: ""
    };
  },
  beforeDestroy() {
    $("body").css("background", "#f2f2f2");
  },
  mounted() {
    $("body").css("background", "#fff");
    this.getAppToken();
  },
  methods: {
    click: function(an, ind) {
      if (this.time && this.pageNum >= 0 && this.pageNum < 9) {
        this.$set(this.op, an, ind);
        this.op.length = an + 1;
        this.goFull = true;
        this.time = false;
        let that = this;
        setTimeout(function() {
          that.doClick(ind);
        }, 300);
      } else if (this.pageNum == 9) {
        this.$set(this.op, an, ind);
        this.op.length = an + 1;
      }
    },
    doClick: function(ind) {
      this.pageNum++;
      this.time = true;
      this.goFull = false;
    },
    submit: function() {
      if (this.op.length == 10) {
        let num = 0;
        let level = 0;
        for (let i = 0; i < this.fraction.length; i++) {
          let fra = this.fraction[i];
          num = num + fra[this.op[i]];
        }
        if (num <= 20) {
          level = 1;
          this.postNum(level);
        } else if (num > 20 && num <= 45) {
          level = 2;
          this.postNum(level);
        } else if (num > 45 && num <= 70) {
          level = 3;
          this.postNum(level);
        } else if (num > 70 && num <= 85) {
          level = 4;
          this.postNum(level);
        } else if (num > 85 && num <= 100) {
          level = 5;
          this.postNum(level);
        }
      } else {
        mui.alert("还有选项没有点选哦~");
      }
    },
    getAppToken: function() {
      let thatData = this;
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
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            base.data.token = dataRes.transferData.token;
            localStorage.setItem("token", dataRes.transferData.token);
          }
        });
    },
    postNum: function(lev) {
      let thatData = this;
      var data = {
        pageNum: lev
      };

      this.$http
        .post("/api/user/riskLevelSubmit", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0) {
            thatData.$router.replace({ path: "/riskok/" + lev });
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
          } else {
            mui.alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/mobile_rish_ass.css";
</style>
