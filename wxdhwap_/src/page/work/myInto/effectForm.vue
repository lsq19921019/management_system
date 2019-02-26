<template>
        <div class="detail-info-con">
        <el-row class="info-box-style detail-title">
                    <el-col :span="20"><p>(30日内)</p></el-col>
                    <el-col :span="4">
                        <el-button v-if="btnStatus" type="primary" :size="sizeForm" @click="submitForm('1')">编辑</el-button>
                        <div v-else>
                            <el-button type="warning" :size="sizeForm" @click="submitForm('2')">取消</el-button>
                            <el-button type="success" :size="sizeForm" @click="submitForm('3')">保存</el-button>
                        </div>
                    </el-col>
        </el-row>
        
        <div class="info-box publish-info">
            <el-form :model="effectForm" 
                     ref="effectForm"
                     :rules="rules">
                <el-row class="info-box-style">
                    <el-col :span="5">
                        <el-form-item 
                            label="累计投资" 
                            prop="cumulativeinvestment"
                        >
                            <el-input 
                                :size="sizeForm"
                                :style="inputWidth"
                                v-model.number="effectForm.cumulativeinvestment"
                                :disabled="detailDisabled">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item 
                            label="待收金额"
                            prop="amountreceived"
                        >
                            <el-input 
                                :size="sizeForm"
                                :style="inputWidth"
                                v-model.number="effectForm.amountreceived"
                                :disabled="detailDisabled">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item 
                            label="投资人数"
                            prop="investmentnumber"
                        >
                            <el-input 
                                :size="sizeForm"
                                :style="inputWidth"
                                v-model.number="effectForm.investmentnumber"
                                :disabled="detailDisabled">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="info-box-style">
                    <el-col :span="5">
                        <el-form-item
                            label="投资ROI"
                        >
                            <el-input
                                size="mini"
                                :style="inputWidth"
                                v-model="investmentroi"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item
                            label="待收ROI"
                        >
                            <el-input
                                :style="inputWidth"
                                size="mini"
                                v-model="amountreceivedroi"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item
                            label="投资成本"
                        >
                            <el-input
                                :style="inputWidth"
                                size="mini"
                                v-model="investmentcost"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item
                            label="人均投资"
                        >
                            <el-input
                                :style="inputWidth"
                                size="mini"
                                v-model="averageinvestment"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>  
                    <el-col :span="4">
                        <el-form-item
                            label="千读价"
                        >
                            <el-input
                                :style="inputWidth"
                                size="mini"
                                v-model="readingprice"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>    
                </el-row>
                <el-row class="info-box-style">
                    <el-col :span="16">
                        <el-form-item
                            label="备注"
                            label-width="65px"
                        >
                            <el-input
                                size="mini"
                                type="textarea"
                                autosize
                                v-model="effectForm.effectremarks"
                                :disabled="detailDisabled">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import {
  leftOutNull,
  mergePrivateKey,
  valFixedTel,
  valMoveTel
} from "@/config/mUtils";
import { saveWechatDeliveryEffect, checkRights } from "@/service/getData";
import {roleCheckRights} from '@/utils/index.js';
export default {
  props: ["effectData"],
  data() {
    var validateCumulativeinvestment = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var validateAmountreceived = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var validateContractnumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var validateInvestmentnumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      sizeForm: "mini",
      detailDisabled: true,
      btnStatus: true,
      inputWidth: {
        width: "85px"
      },
      dsoptions: [
        { value: 1, label: "硬广" },
        { value: 2, label: "软广" },
        { value: 3, label: "贴图" },
        { value: 4, label: "其他" }
      ],
      rules: {
        cumulativeinvestment: [
          { validator: validateCumulativeinvestment, trigger: "blur" }
        ],
        amountreceived: [
          { validator: validateAmountreceived, trigger: "blur" }
        ],
        contractnumber: [
          { validator: validateContractnumber, trigger: "blur" }
        ],
        investmentnumber: [
          { validator: validateInvestmentnumber, trigger: "blur" }
        ]
      },
      effectForm: {
        amountreceived: "", //待收金额
        cumulativeinvestment: "", //累计投资
        effectremarks: "", //	投放效果备注
        id: "", //投放记录id
        investmentnumber: "", //投资人数
        wechatId: ""
      },
      investmentroi: "",
      amountreceivedroi: "",
      investmentcost: "",
      readingprice: "",
      averageinvestment: "",
      readingprice: "",
      saveData: "",
      checkRights: {
            effect:{
                url: '/delivery/saveWechatDeliveryEffect',
                state: true
            }
        }
    };
  },
  watch: {
    effectData() {
      this.investmentroi = this.effectData.investmentroi;
      this.amountreceivedroi = this.effectData.amountreceivedroi;
      this.investmentcost = this.effectData.investmentcost;
      this.averageinvestment = this.effectData.averageinvestment;
      this.readingprice = this.effectData.readingprice;
      leftOutNull(this.effectData);
      mergePrivateKey(this.effectForm, this.effectData);
      this.effectForm.wechatId = this.effectData.wechatids;
      this.saveData = Object.assign({}, this.effectForm);
    }
  },
  mounted() {
    this.effectForm.id = this.$route.query.wid;
    this.saveData = Object.assign({}, this.effectForm);
    roleCheckRights(this.checkRights);
  },
  methods: {
    //查询权限
    async checkRights(url) {
      let result = await checkRights({ roleMenu: url });
      return result.success;
    },
    async submitForm(num) {
      let vm = this;
      if (num == 1) {
        if (! vm.checkRights.effect.state) {
          vm.$message({
            message: "抱歉，你当前身份暂无权限",
            type: "error"
          });
        } else {
          // 点击编辑
          this.btnStatus = false;
          this.detailDisabled = false;
        }
      } else if (num == 2) {
        // 点击取消
        this.btnStatus = true;
        this.detailDisabled = true;
        //清除校验状态
        this.$refs["effectForm"].clearValidate();
        // 还原数据
        // 必须用浅复制，还原effectForm原始数据，否则saveData会关联effectForm
        this.effectForm = Object.assign({}, this.saveData);
      } else {
        // 点击保存
        // 请求修改接口
        this.$refs["effectForm"].validate(async valid => {
          if (valid) {
            let result = await saveWechatDeliveryEffect(this.effectForm);

            if (result.data == "-3") {
              //登陆态失效
              this.$message.error(result.message);
              setTimeout(function() {
                window.location.href = "./login";
              }, 1000);
            }
            if (result.resultCode == "600001") {
              vm.dialogBaseInfoVisible = false;
              vm.$message({
                message: result.msg,
                type: "success"
              });
              setTimeout(function() {
                window.location.reload();
              }, 1000);
            } else {
              vm.$message({
                message: result.msg,
                type: "error"
              });
            }
          } else {
            vm.$message({
              message: "再检测一下填写的信息",
              type: "error"
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-info-con {
  width: 970px;
  margin-left: 30px;
}
.detail-title {
  font-weight: bold;
  font-size: 15px;
  color: #5a5e66;
  padding: 20px 0;
}
.info-box {
  border: 1px solid #ccc;
  border-radius: 3px;
}
.info-box-style {
  color: #5a5e66;
  padding: 10px 0 10px 30px;
  font-size: 14px;
}
</style>

