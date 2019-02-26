<template>
  <div>
    <div class="account">
      <loan-header ref="header"></loan-header>
      <div class="center">
        <div class="inner">
          <div class="top-data clear">
            <div class="top-data-left" v-if="loanLoginData.userType == 1">
              <div class="data-line">
                <span class="data-title">注册手机号：</span>
                <span class="data-padding">{{borrowerInfo.mobilephone}}</span>
                <span
                  class="href"
                  style="margin-right:16px;"
                  @click="changePassword = !changePassword"
                >修改登录密码</span>
                <span
                  class="href"
                  style="margin-left:16px;display:none;"
                  @click="checkTransac"
                >修改交易密码</span>
              </div>
              <div class="data-line">
                <span class="data-title">客户姓名：</span>
                <span class="data-padding">{{borrowerInfo.username}}</span>
              </div>
              <div class="data-line">
                <span class="data-title">客户身份证号：</span>
                <span class="data-padding">{{borrowerInfo.idNo}}</span>
              </div>
              <div class="data-line" style="display:none;">
                <span class="data-title">还款授权：</span>
                <span class="data-padding" v-show="cgtStatus * 1 == 1">--</span>
                <span
                  class="data-padding"
                  v-show="borrowerInfo.repayAuthStatus == 0 && cgtStatus * 1 != 1"
                >已开启</span>
                <span
                  class="data-padding"
                  v-show="borrowerInfo.repayAuthStatus == 1 && cgtStatus * 1 != 1"
                >未开启</span>
                <span class="href" @click="checkOpenAutoAuth('03')">修改</span>
              </div>
              <div class="data-line" style="display:none;">
                <span class="data-title">缴费授权：</span>
                <span class="data-padding" v-show="cgtStatus * 1 == 1">--</span>
                <span
                  class="data-padding"
                  v-show="borrowerInfo.payAuthStatus == 0 && cgtStatus * 1 != 1"
                >已开启</span>
                <span
                  class="data-padding"
                  v-show="borrowerInfo.payAuthStatus == 1 && cgtStatus * 1 != 1"
                >未开启</span>
                <span class="href" @click="checkOpenAutoAuth('02')">修改</span>
              </div>
            </div>
            <div class="top-data-left" v-else-if="loanLoginData.userType == 2">
              <div class="data-line">
                <span class="data-title">注册手机号：</span>
                <span class="data-padding">{{cgtInfo.contactphone}}</span>
                <span class="href" @click="changePassword = !changePassword">修改登录密码</span>
                <span class="href" style="margin-left:16px;display:none;" @click="checkTransac">修改交易密码</span>
              </div>
              <div class="data-line">
                <span class="data-title">公司名称：</span>
                <span class="data-padding">{{cgtInfo.name}}</span>
              </div>
              <div class="data-line">
                <span class="data-title">统一社会信用代码：</span>
                <span class="data-padding">{{cgtInfo.unifiedcode}}</span>
              </div>
              <div class="data-line" style="display:none;">
                <span class="data-title">还款授权：</span>
                <span class="data-padding" v-show="cgtStatus * 1 == 1">--</span>
                <span
                  class="data-padding"
                  v-show="cgtInfo.repayAuthStatus == 0 && cgtStatus * 1 != 1"
                >已开启</span>
                <span
                  class="data-padding"
                  v-show="cgtInfo.repayAuthStatus == 1 && cgtStatus * 1 != 1"
                >未开启</span>
                <span class="href" @click="checkOpenAutoAuth('03')">修改</span>
              </div>
              <div class="data-line" style="display:none;">
                <span class="data-title">缴费授权：</span>
                <span class="data-padding" v-show="cgtStatus * 1 == 1">--</span>
                <span
                  class="data-padding"
                  v-show="cgtInfo.payAuthStatus == 0 && cgtStatus * 1 != 1"
                >已开启</span>
                <span
                  class="data-padding"
                  v-show="cgtInfo.payAuthStatus == 1 && cgtStatus * 1 != 1"
                >未开启</span>
                <span class="href" @click="checkOpenAutoAuth('02')">修改</span>
              </div>
            </div>
            <div class="top-data-right">
              <p class="title">
                可用余额（元）
                <span class="balances" style="display:none;" @click="checkAccountInfo">查询存管账户信息</span>
              </p>
              <p class="money" v-if="loanLoginData.userType == 1">{{borrowerInfo.usablesum}}</p>
              <p class="money" v-if="loanLoginData.userType == 2">{{cgtInfo.avaAmount}}</p>
              <div class="btn_ch">
                <el-button @click="goRechange">充值</el-button>
              </div>
              <div class="btn_withd" style="display:none;">
                <el-button @click="alertWithdraw = !alertWithdraw">提现</el-button>
              </div>
            </div>
          </div>
          <div class="down-data">
            <div class="header-tab">
              <ul class="clear">
                <li :class="{'active':tableActive == '1'}" @click="changeTable('1')">我的借款</li>
                <li :class="{'active':tableActive == '2'}" @click="changeTable('2')">还款计划</li>
                <li :class="{'active':tableActive == '3'}" @click="changeTable('3')">资金记录</li>
                <li :class="{'active':tableActive == '4'}" @click="changeTable('4')">消息通知</li>
              </ul>
            </div>
            <div class="center-list">
              <div class="l-1" v-show="tableActive == '1'">
                <el-table :data="myBorrowerInfoList" style="width: 100%">
                  <el-table-column prop="borrowtitle" label="借款项目标题" width="134" align="center"></el-table-column>
                  <el-table-column prop="paymentmode" label="还款方式" width="128" align="center"></el-table-column>
                  <el-table-column prop="borrowamount" label="借款金额（元）" width="133" align="center"></el-table-column>
                  <el-table-column prop="deadline" label="借款期限" width="100" align="center"></el-table-column>
                  <el-table-column prop="annualrate" label="借款利率" width="100" align="center"></el-table-column>
                  <el-table-column prop="trialTime" label="放款日期" width="110" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="到期日期" width="116" align="center"></el-table-column>
                  <el-table-column prop="borrowstatus" label="项目状态" width="100" align="center"></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span
                        @click="goPDF(scope.row.id)"
                        class="table-link"
                        v-show="scope.row.borrowstatus == '还款中' || scope.row.borrowstatus == '已还完'"
                      >《小鸽理财借款协议》</span>
                      <br>
                      <span
                        @click="goPDF2('0')"
                        class="table-link"
                        v-show="scope.row.borrowstatus == '还款中' || scope.row.borrowstatus == '已还完'"
                      >《借款人授权委托书》</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="page-line">
                  <el-pagination
                    layout="prev, pager, next, jumper"
                    :page-count="mBILTotalPage"
                    @current-change="postMyBorrowerInfoList"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                  ></el-pagination>
                </div>
              </div>
              <div class="l-2" v-show="tableActive == '2'">
                <el-table :data="myRepayList" style="width: 100%">
                  <el-table-column prop="borrowtitle" label="借款项目标题" width="134" align="center"></el-table-column>
                  <el-table-column prop="stillPrincipal" label="本期应还本金" width="110" align="center"></el-table-column>
                  <el-table-column prop="stillInterest" label="本期应还利息" width="108" align="center"></el-table-column>
                  <el-table-column prop="repayPeriod" label="期数" width="99" align="center"></el-table-column>
                  <el-table-column prop="repayDate" label="应还款日期" width="107" align="center"></el-table-column>
                  <el-table-column prop="realRepayDate" label="实际还款日期" width="113" align="center"></el-table-column>
                  <el-table-column prop="lateDay" label="逾期天数" width="93" align="center"></el-table-column>
                  <el-table-column
                    prop="dealyStillPrincipal"
                    label="逾期罚息金额"
                    width="114"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="repayStatus" label="还款状态" width="106" align="center"></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span
                        @click="checkRepaying(scope.row.repayDate,scope.row.stillPrincipal,scope.row.stillInterest,scope.row.isLate,scope.row.lateDay,scope.row.dealyStillPrincipal,scope.row.borrowPayId)"
                        v-show="scope.row.repayStatus == '待还款' || scope.row.repayStatus == '已逾期'"
                        class="table-link"
                      >还款</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="page-line">
                  <el-pagination
                    layout="prev, pager, next, jumper"
                    :page-count="mRLTotalPage"
                    @current-change="postMyRepayList"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                  ></el-pagination>
                </div>
              </div>
              <div class="l-3" v-show="tableActive == '3'">
                <el-table :data="transactionList" style="width: 100%">
                  <el-table-column prop="type" label="交易类型" width="181" align="center"></el-table-column>
                  <el-table-column prop="time" label="交易时间" width="177" align="center"></el-table-column>
                  <el-table-column prop="amount" label="交易金额" width="184" align="center"></el-table-column>
                  <el-table-column label="账户余额" width="176" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.balance.replace(/余额：/,'')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
                </el-table>
                <div class="page-line">
                  <el-pagination
                    layout="prev, pager, next, jumper"
                    :page-count="tLTotalPage"
                    @current-change="postTransactionList"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                  ></el-pagination>
                </div>
              </div>
              <!-- 消息通知-->
              <div class="l-4" v-show="tableActive == '4'">
                <el-table :data="newsList" style="width: 100%">
                  <el-table-column prop="title" label="消息标题" width="180" align></el-table-column>
                  <el-table-column prop="content" label="内容" width align></el-table-column>
                  <el-table-column prop="time" label="发布时间" width="200" align></el-table-column>
                </el-table>
                <div class="page-line">
                  <el-pagination
                    layout="prev, pager, next, jumper"
                    :page-count="newsTotalPage"
                    @current-change="postNewsList"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                  ></el-pagination>
                </div>
              </div>
              <!-- 消息通知结束-->
            </div>
          </div>
        </div>
      </div>
      <loan-footer></loan-footer>
      <el-dialog
        class="withdraw_window"
        title="申请提现"
        :visible.sync="alertWithdraw"
        width="380px"
        :before-close="clearNum"
      >
        <span class="withdraw_title">提现金额</span>
        <el-input class="withdraw_num" v-model="withdrawNumber" type="number"></el-input>
        <div class="footer_btn">
          <el-button @click="postWithdraw">提现</el-button>
        </div>
      </el-dialog>
      <transition name="changePassword">
        <div class="change-password" v-show="changePassword">
          <div class="block"></div>
          <div class="window">
            <div class="title">
              <p>修改登录密码</p>
            </div>
            <div class="input-line" :class="{'warning':warningClass == 1}">
              <input type="password" placeholder="请输入原密码" v-model="oldPass">
            </div>
            <div class="input-line b-1" :class="{'warning':warningClass == 2}">
              <input type="password" placeholder="请输入6-20字母，数字组合的新密码" v-model="newPass">
            </div>
            <div class="input-line b-2" :class="{'warning':warningClass == 3}">
              <input type="password" placeholder="请再次输入新密码确认" v-model="newPassAgain">
            </div>
            <div class="tips" v-show="tips">
              <p>{{tips}}</p>
            </div>
            <div class="btn">
              <el-button @click="check()">确定</el-button>
            </div>
            <div class="close">
              <img
                src="/static/img/loan_alert_close.png"
                @click="changePassword = !changePassword,oldPass = '',newPass = '',newPassAgain = '',warningClass = '',tips = ''"
              >
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import loanHeader from "./loan_header.vue";
import loanFooter from "./loan_footer.vue";
export default {
  data() {
    return {
      tableActive: "1",
      changePassword: false,
      cgtStatus: "",
      borrowerInfo: {},
      cgtInfo: {},
      myBorrowerInfoList: [],
      mBILTotalPage: 1,
      myRepayList: [],
      mRLTotalPage: 1,
      transactionList: [],
      tLTotalPage: 1,
      loanLoginData: {},
      oldPass: "",
      newPass: "",
      newPassAgain: "",
      tips: "",
      warningClass: "",
      newsList: [], //消息通知
      newsTotalPage: 1,
      alertWithdraw: false,
      withdrawNumber: ""
    };
  },
  components: {
    loanHeader,
    loanFooter
  },
  watch: {
    withdrawNumber: function(val) {
      let thatData = this;
      if (val != "" && val.length < 13 && val * 1 >= 0) {
        thatData.withdrawNumber = val.replace(
          /^(\-)*(\d+)\.(\d\d).*$/,
          "$1$2.$3"
        );
      } else if (val != "" && val.length >= 13 && val * 1 >= 0) {
        thatData.withdrawNumber = Math.floor(val.slice(0, 11) * 100) / 100;
      } else if (val * 1 <= 0 || val == "-") {
        thatData.withdrawNumber = "";
      }
    }
  },
  created() {
    this.findTable();
    this.getLoginData();
    this.postMyBorrowerInfoList("1");
    this.postMyRepayList("1");
    this.postTransactionList("1");
    this.postNewsList("1"); //消息通知
  },
  mounted() {
    this.$refs.header.setHeaderTitle("我的账户");
  },
  methods: {
    clearNum() {
      this.withdrawNumber = "";
      this.alertWithdraw = false;
    },
    withdrawCheck() {
      let thatData = this;
      if (thatData.cgtStatus * 1 == 1) {
        thatData.$message({
          showClose: true,
          message: "您未开通存管账户",
          type: "error"
        });
      } else if (thatData.cgtStatus * 1 == 3 || thatData.cgtStatus * 1 == 4) {
        thatData.$message({
          showClose: true,
          message: "请绑定银行卡",
          type: "error"
        });
      } else {
        alertWithdraw = true;
      }
    },
    findTable() {
      if (localStorage.getItem("tablePage")) {
        this.tableActive = localStorage.getItem("tablePage");
      }
    },
    changeTable(table) {
      this.tableActive = table;
      localStorage.setItem("tablePage", table);
    },
    goPDF(id) {
      window.open("/pdf/" + id, "_blank");
    },
    goPDF2(id) {
      window.open("/pdf2/" + id, "_blank");
    },
    checkRepaying(
      repayDate,
      stillPrincipal,
      stillInterest,
      isLate,
      lateDay,
      dealyStillPrincipal,
      borrowPayId
    ) {
      //应还款日期，应还本金，应还利息，是否逾期，逾期天数，罚息金额，id
      let thatData = this;
      let repayDa = repayDate.replace(/-/g, "/");
      let nowDa = new Date();
      repayDa = new Date(Date.parse(repayDa));
      if (repayDa > nowDa) {
        thatData.$alert("当前还未到应还款日，无法还款", "提示", {
          confirmButtonText: "关闭"
        });
      } else {
        let stillMoney = stillPrincipal * 1 + stillInterest * 1;
        let alertStr;
        if (isLate) {
          stillMoney = stillMoney + dealyStillPrincipal * 1;
          alertStr =
            "您本期应还款本金：" +
            stillPrincipal +
            "元，应还利息" +
            stillInterest +
            "元，逾期" +
            lateDay +
            "天需罚息" +
            dealyStillPrincipal +
            "元，总计需" +
            stillMoney +
            "元。";
        } else {
          alertStr =
            "您本期应还款本金：" +
            stillPrincipal +
            "元，应还利息" +
            stillInterest +
            "元，总计需" +
            stillMoney +
            "元。";
        }
        if (thatData.loanLoginData.userType == 1) {
          if (stillMoney > thatData.borrowerInfo.usablesum) {
            thatData
              .$confirm("当前账户余额不足还款，请先充值！", "提示", {
                confirmButtonText: "去充值",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                thatData.$router.push({ path: "/recharge" });
              })
              .catch(() => {});
          } else {
            thatData
              .$confirm(alertStr, "确定还款", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                thatData.postBorrowRecharge(borrowPayId);
                //还款
              })
              .catch(() => {});
          }
        } else if (thatData.loanLoginData.userType == 2) {
          if (stillMoney > thatData.cgtInfo.avaAmount) {
            thatData
              .$confirm("当前账户余额不足还款，请先充值！", "提示", {
                confirmButtonText: "去充值",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                thatData.$router.push({ path: "/recharge" });
              })
              .catch(() => {});
          } else {
            thatData
              .$confirm(alertStr, "确定还款", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                thatData.postBorrowRecharge(borrowPayId);
                //还款
              })
              .catch(() => {});
          }
        }
      }
    },
    goRechange() {
      this.$router.push({ path: "/recharge" });
    },
    getLoginData() {
      let thatData = this;
      thatData.loanLoginData = JSON.parse(
        localStorage.getItem("loanLoginData")
      );
      if (thatData.loanLoginData.userType == 1) {
        thatData.postBorrowerInfo();
      } else if (thatData.loanLoginData.userType == 2) {
        thatData.postCgtInfo();
      }
    },
    postBorrowerInfo() {
      //用户信息-个人
      var thatData = this;
      var data = {};

      this.$http
        .post("/api/cgt/queryBorrowerInfo", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.borrowerInfo = resData.result;
            thatData.cgtStatus = resData.cgtStatus;
          } else if (resData.status == "-3") {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
            thatData.$router.push({ path: "/login" });
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postWithdraw() {
      //提交提现
      var thatData = this;
      var data = {
        amount: thatData.withdrawNumber
      };

      this.$http
        .post("/api/assets/withdraw", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            window.open(resData.result.cgtData, "_blank", "");
            thatData.alertWithdraw = false;
            thatData.withdrawNumber = "";
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postCgtInfo() {
      //用户信息-企业
      var thatData = this;
      var data = {};

      this.$http
        .post("/api/enterprise/cgtInfo", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.cgtInfo = resData.result;
            thatData.cgtStatus = resData.cgtStatus;
          } else if (resData.status == "-3") {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
            thatData.$router.push({ path: "/login" });
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postMyBorrowerInfoList(page) {
      //我的借款
      var thatData = this;
      var data = {
        pageNum: page
      };

      this.$http
        .post("/api/cgt/queryMyBorrowerInfoList", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.myBorrowerInfoList = resData.result.myBorrowInfoResults;
            thatData.mBILTotalPage = parseInt(
              resData.result.pageEntity.totalPage
            );
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postMyRepayList(page) {
      //还款计划
      var thatData = this;
      var data = {
        pageNum: page
      };

      this.$http
        .post("/api/cgt/queryMyRepayList", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.myRepayList = resData.result.repayResults;
            thatData.mRLTotalPage = parseInt(
              resData.result.pageEntity.totalPage
            );
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postTransactionList(page) {
      //资金记录
      var thatData = this;
      var data = {
        functionMode: "全部",
        pageNum: page,
        pageSize: 10
      };

      this.$http
        .post("/api/assets/transactionList", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.transactionList = resData.result.list;
            thatData.tLTotalPage = parseInt(
              resData.result.pageEntity.totalPage
            );
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //  <----------消息通知ajax--------->
    postNewsList(page) {
      var that = this;
      var data = {
        pageNum: page
      };
      this.$http
        .post("/api/index/mailList", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(res) {
          let resData = res.data;
          if (resData.status == 0) {
            //console.log(res);
            that.newsList = resData.result.mailListEntities;
            that.newsTotalPage = parseInt(resData.result.pageEntity.totalPage);
          } else {
            that.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //<---------------------------->
    postBorrowRecharge(borrowPayId) {
      var thatData = this;
      var data = {
        borrowPayId: borrowPayId
      };

      this.$http
        .post("/api/borrow/borrowRecharge", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.$alert("还款操作成功！", "提示", {
              confirmButtonText: "关闭",
              callback: action => {
                location.reload();
              }
            });
          } else if (resData.status * 1 == 1000961) {
            thatData
              .$confirm("您未开启还款授权，需要开启后才能还款", "提示", {
                confirmButtonText: "去开启",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                thatData.postOpenAutoAuth("03");
                //开启还款授权
              })
              .catch(() => {});
          } else if (resData.status * 1 == 1000966) {
            thatData
              .$confirm("您未开启缴费授权，需要开启后才能还款", "提示", {
                confirmButtonText: "去开启",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                thatData.postOpenAutoAuth("02");
                //开启缴费授权
              })
              .catch(() => {});
          } else if (resData.status * 1 == 1000969) {
            thatData
              .$confirm(
                "还款授权金额低于还款金额，请修改还款授权金额",
                "提示",
                {
                  confirmButtonText: "去修改",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
              .then(() => {
                thatData.postOpenAutoAuth("03");
                //修改授权金额
              })
              .catch(() => {});
          } else {
            thatData.$alert(resData.msg, "提示", {
              confirmButtonText: "关闭"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkPwordOld(pw) {
      let thatData = this;
      if (!/^[A-Za-z0-9]{6,20}$/.test(pw) && pw != "") {
        thatData.warningClass = 1;
        thatData.tips = "原登录密码为6-20位字母和数字组合，请校验";
        return false;
      } else if (pw == "") {
        thatData.warningClass = 1;
        thatData.tips = "请输入原登录密码";
        return false;
      } else {
        return true;
      }
    },
    checkPwordNew(pw) {
      let thatData = this;
      if (!/^[A-Za-z0-9]{6,20}$/.test(pw) && pw != "") {
        thatData.warningClass = 2;
        thatData.tips = "密码长度为6-20个字符，且仅能包含数字和英文大小写!";
        return false;
      } else if (pw == "") {
        thatData.warningClass = 2;
        thatData.tips = "请输入新登录密码";
        return false;
      } else {
        return true;
      }
    },
    checkPwordNewAgain(pw) {
      let thatData = this;
      if (!/^[A-Za-z0-9]{6,20}$/.test(pw) && pw != "") {
        thatData.warningClass = 3;
        thatData.tips = "密码长度为6-20个字符，且仅能包含数字和英文大小写!";
        return false;
      } else if (pw == "") {
        thatData.warningClass = 3;
        thatData.tips = "请输入新登录密码";
        return false;
      } else {
        return true;
      }
    },
    check() {
      let thatData = this;
      if (
        thatData.checkPwordOld(thatData.oldPass) &&
        thatData.checkPwordNew(thatData.newPass) &&
        thatData.checkPwordNewAgain(thatData.newPassAgain)
      ) {
        if (thatData.newPass != thatData.newPassAgain) {
          thatData.warningClass = 3;
          thatData.tips = "请确认新密码";
        } else {
          thatData.warningClass = "";
          thatData.tips = "";
          thatData.postLoginPassword();
        }
      }
    },
    postLoginPassword(borrowPayId) {
      //修改登录密码
      var thatData = this;
      var data = {
        newPassword: DES3.encrypt(base.desKey, thatData.newPass),
        oldPassword: DES3.encrypt(base.desKey, thatData.oldPass)
      };

      this.$http
        .post("/api/user/modifyLoginPassword", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.$message({
              message: "密码修改成功",
              type: "success"
            });
            localStorage.removeItem("loanLoginData");
            localStorage.removeItem("token");
            localStorage.removeItem("tablePage");
            base.data.token = "";
            thatData.$router.push({ path: "/login" });
          } else {
            thatData.tips = resData.msg;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkAccountInfo() {
      if (this.cgtStatus * 1 == 1) {
        this.$message({
          message: "您未开通存管账户",
          type: "error"
        });
      } else {
        this.postAccountInfo();
      }
    },
    postAccountInfo() {
      //查询存管账户信息
      var thatData = this;
      var data = {};

      this.$http
        .post("/api/user/bankAccountInfo", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            window.open(resData.result.htmlData, "_blank", "");
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkTransac() {
      if (this.cgtStatus * 1 == 1) {
        this.$message({
          message: "您未开通存管账户",
          type: "error"
        });
      } else {
        this.postTransacPass();
      }
    },
    postTransacPass() {
      //修改交易密码
      var thatData = this;
      var data = {};

      this.$http
        .post("/api/cgt/modifyPassword", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            window.open(resData.result.htmlData, "_blank", "");
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkOpenAutoAuth(authType) {
      if (this.cgtStatus * 1 == 1) {
        this.$message({
          message: "您未开通存管账户",
          type: "error"
        });
      } else {
        this.postOpenAutoAuth(authType);
      }
    },
    postOpenAutoAuth(authType) {
      //开通或关闭自动授权 02缴费 03还款
      var thatData = this;
      var data = {
        authType: authType
      };

      this.$http
        .post("/api/cgt/autoAuth", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        }) //axios进行ajax请求
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            window.open(resData.result.htmlData, "_blank", "");
          } else {
            thatData.$message({
              showClose: true,
              message: resData.msg,
              type: "error"
            });
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
@import "../style/css/loan_account.css";
</style>
<style>
.account .center .down-data .center-list .el-table th {
  font-size: 14px;
  color: #333;
  background: #f5f5f5;
  font-weight: normal;
  padding: 14px 0;
}

.account .center .down-data .center-list .el-table td {
  font-size: 14px;
  color: #666;
  padding: 14px 0;
}

.account .center .down-data .center-list .btn-prev,
.account .center .down-data .center-list .btn-next {
  width: 65px;
}

.account .withdraw_window .withdraw_num input {
  height: 50px;
}

.account .withdraw_window .el-dialog__title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
}

.account .withdraw_window .footer_btn {
  padding-top: 60px;
}

.account .withdraw_window .footer_btn button {
  font-size: 14px;
  color: #fff;
  background: #f07935;
  border: 1px solid #f07935;
  height: 50px;
  width: 100%;
}
</style>
