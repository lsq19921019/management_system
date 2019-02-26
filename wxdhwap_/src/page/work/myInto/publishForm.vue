<template>
        <div class="detail-info-con">
        <el-row class="info-box-style detail-title">
                    <el-col :span="20"><p>投放信息&效果信息</p></el-col>
                    <el-col :span="4">
                        <el-button v-if="btnStatus" type="primary" :size="sizeForm" @click="submitForm('1')">编辑</el-button>
                        <div v-else>
                            <el-button type="warning" :size="sizeForm" @click="submitForm('2')">取消</el-button>
                            <el-button type="success" :size="sizeForm" @click="submitForm('3')">保存</el-button>
                        </div>
                    </el-col>
        </el-row>
        
        <div class="info-box publish-info">
            <el-form ref="publishFormRef"  
                     :model="publishForm" 
                     :rules="rules">
                <el-row class="info-box-style">
                    <el-col :span="11">
                        <el-form-item 
                            label="价格" 
                            label-width="105px"
                            prop="price"
                        >
                            <el-input 
                                :size="sizeForm"
                                :style="inputWidth"
                                v-model.number="publishForm.price"
                                :disabled="detailDisabled">
                            </el-input>
                        <el-checkbox v-model="formatTax"
                                    :disabled="detailDisabled">含税</el-checkbox>
                        </el-form-item>
                        <!-- (含税) -->
                    </el-col>
                    <el-col :span="6">
                        <el-form-item 
                            label="投放形式" 
                            prop="deliveryform"
                        >
                            <el-select :style="inputWidth" 
                                        v-model="formatDeliveryform" 
                                        placeholder="请选择"
                                        :size="sizeForm"
                                        :disabled="detailDisabled">
                                <el-option
                                    v-for="item in dsoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="info-box-style">
                    <el-col :span="11">
                        <el-form-item
                            label="所发文章标题"
                            prop="articletitle"
                        >
                            <el-input
                                style="width:250px;"
                                size="mini"
                                v-model="publishForm.articletitle"
                                :disabled="detailDisabled">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="合同编号"
                            prop="contractnumber"
                        >
                            <el-input
                                :style="inputWidth"
                                size="mini"
                                v-model="publishForm.contractnumber"
                                :disabled="detailDisabled">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item
                            label="所用H5链接"
                            prop="useurl"
                        >
                            <el-input
                                :style="inputWidth"
                                size="mini"
                                v-model="publishForm.useurl"
                                :disabled="detailDisabled">
                            </el-input>
                        </el-form-item>
                    </el-col>  
                </el-row>
                <el-row class="info-box-style">
                    <el-col :span="16">
                        <el-form-item
                            label="备注"
                            label-width="105px"
                            prop="remarks"
                        >
                            <el-input
                               
                                size="mini"
                                type="textarea"
                                autosize
                                v-model="publishForm.remarks"
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
import { editDelivery, checkRights } from "@/service/getData";
import {roleCheckRights} from '@/utils/index.js';
export default {
  props: ["publishData"],
  data() {
    var validatePrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      } else if (!Number.isInteger(value)) {
        // console.log(typeof value);
        // console.log(value,Number.isInteger(value))
        // console.log(!Number.isInteger(value));
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var validateTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("标题不能为空"));
      } else {
        callback();
      }
    };
    var validateContractnumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("合同编号不能为空"));
      } else {
        callback();
      }
    };
    var validateUseurl = (rule, value, callback) => {
      let reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
      if (!value) {
        return callback(new Error("链接不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("链接不正确"));
      } else {
        callback();
      }
    };
    var validateDeliveryform = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("投放形式不能为空"));
      } else {
        callback();
      }
    };
    return {
      sizeForm: "mini",
      detailDisabled: true,
      btnStatus: true,
      inputWidth: {
        width: "50%"
      },
      dsoptions: [
        { value: 1, label: "硬广" },
        { value: 2, label: "软广" },
        { value: 3, label: "贴图" },
        { value: 4, label: "其他" }
      ],
      formatDeliveryform: "", //投放方式--中转
      rules: {
        price: [{ validator: validatePrice, trigger: "blur" }],
        articletitle: [{ validator: validateTitle, trigger: "blur" }],
        contractnumber: [
          { validator: validateContractnumber, trigger: "blur" }
        ],
        useurl: [{ validator: validateUseurl, trigger: "blur" }],
        deliveryform: [{ validator: validateDeliveryform, trigger: "blur" }]
      },
      publishForm: {
        id: "",
        price: "", //价格
        deliveryform: "", //投放形式
        tax: "", //
        remarks: "", //备注
        contractnumber: "", //合同编号
        useurl: "", //所用H5链接
        articletitle: "123", //标题
        articleid: "", //标题id
        wechatId: ""
      },
      formatTax: false, //
      saveData: "",
      checkRights: {
            publish:{
                url: '/delivery/findWechatDeliveryList',
                state: true
            }
        }
    };
  },
  watch: {
    wid() {
      this.publishForm.id = this.$route.query.wid;
    },
    publishData() {
      leftOutNull(this.publishData);
      mergePrivateKey(this.publishForm, this.publishData);

      /*------添加（胡）------*/
      this.publishForm.wechatId = this.publishData.wechatids;
      /*------------*/

      if (this.publishForm.tax == "1") {
        this.formatTax = true;
      } else {
        this.formatTax = false;
      }
      if (this.publishForm.deliveryform == "1") {
        this.formatDeliveryform = 1;
      } else if (this.publishForm.deliveryform == "2") {
        this.formatDeliveryform = 2;
      } else if (this.publishForm.deliveryform == "3") {
        this.formatDeliveryform = 3;
      } else if (this.publishForm.deliveryform == "4") {
        this.formatDeliveryform = 4;
      }
      this.saveData = Object.assign({}, this.publishForm);
    }
  },
  mounted() {
    this.saveData = Object.assign({}, this.publishForm);
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
        if (! vm.checkRights.publish.state) {
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
        if (this.publishForm.deliveryform == "1") {
          this.formatDeliveryform = 1;
        } else if (this.publishForm.deliveryform == "2") {
          this.formatDeliveryform = 2;
        } else if (this.publishForm.deliveryform == "3") {
          this.formatDeliveryform = 3;
        } else if (this.publishForm.deliveryform == "4") {
          this.formatDeliveryform = 4;
        }
        //清除校验状态
        this.$refs["publishFormRef"].clearValidate();
        // 还原数据
        // 必须用浅复制，还原publishForm原始数据，否则saveData会关联publishForm
        this.publishForm = Object.assign({}, this.saveData);
      } else {
        if (this.formatTax == true) {
          this.publishForm.tax = 1;
        } else {
          this.publishForm.tax = 2;
        }
        if (this.formatDeliveryform == 1) {
          this.publishForm.deliveryform = "1";
        } else if (this.formatDeliveryform == 2) {
          this.publishForm.deliveryform = "2";
        } else if (this.formatDeliveryform == 3) {
          this.publishForm.deliveryform = "3";
        } else if (this.formatDeliveryform == 4) {
          this.publishForm.deliveryform = "4";
        }
        // console.log(this.publishForm);
        // 点击保存
        // 请求修改接口
        this.$refs["publishFormRef"].validate(async valid => {
          if (valid) {
            let result = await editDelivery(this.publishForm);
            if (result.data == "-3") {
              //登陆态失效
              this.$message.error(result.message);
              setTimeout(function() {
                window.location.href = "./login";
              }, 1000);
            } else if (result.resultCode == "600001") {
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

