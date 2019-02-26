/**
* Created by alan on 17-5-7.
*/
<template>
  <section>
    <el-row>
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <!--基础身份信息配置-->
        <el-tab-pane label="新规则" name="first">
          <el-table :data=baseIdInfoTable highlight-current-row border stripe v-loading="baseIdInfoTableLoading">
            <el-table-column prop="code" label="code"></el-table-column>
            <el-table-column prop="ruleName" label="名称"></el-table-column>
            <el-table-column prop="cdition" label="条件"></el-table-column>
            <el-table-column prop="value" label="数值"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                <el-tag :type="scope.row.status==1 ?  'primary' :'danger'" close-transition>{{returnStatus(scope.row.status)}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!--H5风控规则-->
        <el-tab-pane label="H5风控规则" name="second">
          <el-table :data=h5InfoTable highlight-current-row border stripe v-loading="h5InfoTableLoading">
            <el-table-column prop="code" label="code"></el-table-column>
            <el-table-column prop="ruleName" label="名称"></el-table-column>
            <el-table-column prop="cdition" label="条件"></el-table-column>
            <el-table-column prop="value" label="数值">
              <template scope="scope">
                {{formatRadioValue(scope.row,scope.$index)}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                <el-tag :type="scope.row.status==0 ? 'danger' : 'primary'" close-transition>{{scope.row.status==0?'禁用':'启用'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">修改</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>


        <!--芝麻分配置-->
        <!--<el-tab-pane label="芝麻分" name="second">
          <el-table :data=zhiMaInfoTable highlight-current-row border stripe v-loading="zhiMaInfoTableLoading">
            <el-table-column prop="ruleName" label="名称"></el-table-column>
            <el-table-column prop="cdition" label="条件"></el-table-column>
            <el-table-column prop="value" label="数值">
              <template scope="scope">
                {{formatRadioValue(scope.row,scope.$index)}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                <el-tag :type="scope.row.status==0 ? 'danger' : 'primary'" close-transition>{{scope.row.status==0?'禁用':'启用'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>-->
        <!--同盾配置-->
        <!--<el-tab-pane label="同盾" name="third">
          <el-table :data=tongDunTable highlight-current-row border stripe v-loading="tongDunTableLoading">
            <el-table-column prop="ruleName" label="名称"></el-table-column>
            <el-table-column prop="cdition" label="条件"></el-table-column>
            <el-table-column prop="value" label="数值"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                <el-tag :type="scope.row.status==0 ? 'danger' : 'primary'" close-transition>{{scope.row.status==0?'禁用':'启用'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>-->
        <!--通讯录配置-->
        <!--<el-tab-pane label="通讯录" name="fourth">
          <el-table :data=mailListTable highlight-current-row border stripe v-loading="mailListTableLoading">
            <el-table-column prop="ruleName" label="名称"></el-table-column>
            <el-table-column prop="cdition" label="条件"></el-table-column>
            <el-table-column prop="value" label="数值"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                <el-tag :type="scope.row.status==0 ? 'danger' : 'primary'" close-transition>{{scope.row.status==0?'禁用':'启用'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>-->
        <!--黑名单-->
        <!--<el-tab-pane label="黑名单" name="sixth">
          <el-table :data=blackListTable highlight-current-row border stripe v-loading="blackListTableLoading">
            <el-table-column prop="ruleName" label="名称"></el-table-column>
            <el-table-column prop="cdition" label="条件"></el-table-column>
            <el-table-column prop="value" label="数值">
              <template scope="scope">
                {{formatRadioValue(scope.row,scope.$index)}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                <el-tag :type="scope.row.status==0 ? 'danger' : 'primary'" close-transition>{{scope.row.status==0?'禁用':'启用'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>-->
        <!--其他配置-->
        <!--<el-tab-pane label="其他" name="fifth">
          <el-table :data=otherTable highlight-current-row border stripe v-loading="otherTableLoading">
            <el-table-column prop="ruleName" label="名称"></el-table-column>
            <el-table-column prop="cdition" label="条件"></el-table-column>
            <el-table-column prop="value" label="数值">
              <template scope="scope">
                {{formatRadioValue(scope.row,scope.$index)}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                <el-tag :type="scope.row.status==0 ? 'danger' : 'primary'" close-transition>{{scope.row.status==0?'禁用':'启用'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>-->
      </el-tabs>
    </el-row>
    <!--带radio单选框弹框-->
    <el-dialog :title="commonRadioForm.ruleName" v-model="commonRadioDigVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="commonRadioForm" label-position="left" label-width="0px" :rules="commonRadioFormRule" ref="commonRadioForm">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item prop="value">
              <el-radio-group v-model="commonRadioForm.value">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="status">
              <el-radio-group v-model="commonRadioForm.status">
                <el-radio :label="2">运算</el-radio>
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="">
              <el-input v-model="commonRadioForm.uuid"></el-input>
            </el-form-item>
            <el-form-item v-show="">
              <el-input v-model="commonRadioForm.cdition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="commonRadioFormSubmit" :loading="commonRadioFormLoading">确 定</el-button>
        <el-button type="" @click="commonRadioDigVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--带输入框弹框-->
    <el-dialog :title="commonForm.ruleName" v-model="commonFormDigVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="commonForm" label-position="left" label-width="0px" :rules="commonFormRule" ref="commonForm">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item prop="value">
              <el-input v-model="commonForm.value" :maxlength="10"></el-input>
            </el-form-item>
            <el-form-item prop="status">
              <el-radio-group v-model="commonForm.status">
                <el-radio :label="2">运算</el-radio>
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="">
              <el-input v-model="commonForm.uuid"></el-input>
            </el-form-item>
            <el-form-item v-show="">
              <el-input v-model="commonForm.cdition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="commonFormSubmit" :loading="commonFormLoading">确 定</el-button>
        <el-button type="" @click="commonFormDigVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--不带输入框弹框-->
    <el-dialog :title="noInputForm.ruleName" v-model="noInputFormDigVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="noInputForm" label-position="left" label-width="0px" :rules="noInputFormRule" ref="noInputForm">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item prop="value">
              <el-input v-model="noInputForm.value" :maxlength="10" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item prop="status">
              <el-radio-group v-model="noInputForm.status">
                <el-radio :label="1">运算</el-radio>
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="">
              <el-input v-model="noInputForm.uuid"></el-input>
            </el-form-item>
            <el-form-item v-show="">
              <el-input v-model="noInputForm.cdition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="noInputFormSubmit" :loading="noInputFormLoading">确 定</el-button>
        <el-button type="" @click="noInputFormDigVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  //审核类型：1、基础身份证信息；2、芝麻分；3、铜盾；4、通讯录；5、审核其他、6提现、7、放款

  const notNullMsg = '请输入对比数值';
  const commonRule = {
    value: [{
      required: true,
      message: notNullMsg,
      trigger: 'blur'
    }],
    status: [{
      required: true,
      message: notNullMsg,
      trigger: 'change',
      type: 'number'
    }]
  };
  const editUrl = 'manage/autoReviewEdit';
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        activeName2: 'first',
        baseIdInfoTableLoading: false,
        otherFormLoading: false,
        zhiMaInfoTableLoading: false,
        tongDunTableLoading: false,
        mailListTableLoading: false,
        baseIdInfoTable: [],
        zhiMaInfoTable: [],
        tongDunTable: [],
        mailListTable: [],
        otherTable: [],

        otherForm: {
          status: 1
        },

        commonRadioForm: {
          id: '',
          value: '',
          status: '1',
          cdition: ''
        },
        commonRadioFormLoading: false,
        commonRadioDigVisible: false,
        commonRadioFormRule: {
          value: [{
            required: true,
            message: notNullMsg,
            trigger: 'change',
            type: 'number'
          }],
          status: [{
            required: true,
            message: notNullMsg,
            trigger: 'change',
            type: 'number'
          }]
        },

        commonForm: {
          id: '',
          value: '',
          status: '1',
          cdition: ''
        },
        commonFormRule: commonRule,
        commonFormLoading: false,
        commonFormDigVisible: false,

        noInputForm: {
          id: '',
          value: '',
          status: '1',
          cdition: ''
        },
        noInputFormRule: commonRule,
        noInputFormLoading: false,
        noInputFormDigVisible: false,

        otherTableLoading: false,
        otherFormRules: {

        },
        blackListTableLoading: false,
        blackListTable: []
      }
    },
    methods: {
      handleClick() {

      },
      returnStatus(ruleStatus){
        var status='';
        if(ruleStatus=='1'){
          status='开启';
        } else if(ruleStatus=='0'){
          status='禁用';
        } else if(ruleStatus=='2'){
          status='运算';
        }
        return  status;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      showCommonDig(row) {
        let {
          ruleName,
          value,
          status,
          uuid,
          cdition,
          type
        } = row;
        let tmp = row;
        ({...tmp
        } = {
          value,
          status,
          uuid,
          cdition,
          ruleName
        });
        switch (type) { /*黑名单tab页弹框判断，黑名单列弹框禁止修改条件*/
          case 5:
            (!DataUtil.isNumber(value)) ? this.commonShowDig("commonFormDigVisible") : this.commonShowDig("noInputFormDigVisible");
            (!DataUtil.isNumber(value)) ? this.putData2Dig("commonForm", tmp) : this.putData2Dig("noInputForm", tmp);
            return false;
            break;
        }
        switch (ruleName) {
          case "学籍认证失败是否拒单":
          case "命中芝麻行业关注名单":
            this.commonShowDig("commonRadioDigVisible");
            tmp.value = Number(tmp.value);
            this.putData2Dig('commonRadioForm', tmp);
            break;
          default:
            this.commonShowDig("commonFormDigVisible");
            this.putData2Dig('commonForm', tmp);
            break;
        }
      },

      commonRadioFormSubmit() {
        let param = Object.assign({}, this.commonRadioForm);
        console.log(param);
        this.commonSubmit('commonRadioForm', 'commonRadioFormLoading', 'commonRadioDigVisible', editUrl, param);
      },

      commonFormSubmit() {
        let param = Object.assign({}, this.commonForm);
        console.log(param);
        this.commonSubmit('commonForm', 'commonFormLoading', 'commonFormDigVisible', editUrl, param);
      },

      noInputFormSubmit() {
        let param = Object.assign({}, this.noInputForm);
        this.commonSubmit('noInputForm', 'noInputFormLoading', 'noInputFormDigVisible', editUrl, param);
      },
      formatRadioValue(row, index) {
        switch (row.ruleName) {
          case "学籍认证失败是否拒单":
          case "命中芝麻行业关注名单":
            return (row.value == 1 ? '是' : '否');
            break;
          default:
            return row.value;
            break;
        }
      },

      putData2Dig(formName, row) {
        this[formName] = row;
      },

      formatCommonForm() {
        this.commonForm.value = DataUtil.keepDecimal(event.target.value);
      },

      //请求列表数据接口
      commonTableData(url, loadName, tableName, param) {
        this[loadName] = true;
        this.$http.post(url, param).then((response) => {
          this[loadName] = false;
          let {
            body
          } = response;
          if (1 == body.code) {
            this[tableName] = body.data;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) => {
          this[loadName] = false;
          this.$message.error("网络异常");
        })
      },

      //基础信息table
      baseInfoAjax() {
        this.commonTableData('manage/autoReviewList', 'baseIdInfoTableLoading', 'baseIdInfoTable', {type: 101});
      },
      //芝麻分table
      zhimaAjax() {
        this.commonTableData('manage/autoReviewList', 'zhiMaInfoTableLoading', 'zhiMaInfoTable', {type: 2});
      },
      //h5规则
      h5Ajax() {
        this.commonTableData('manage/autoReviewList', 'h5InfoTableLoading', 'h5InfoTable', {type: 70});
        // this.commonTableData('manage/autoReviewList', 'h5InfoTableLoading', 'h5InfoTable', {type: 15});
      },
      //同盾
      tongDunAjax() {
        this.commonTableData('manage/autoReviewList', 'tongDunTableLoading', 'tongDunTable', {type: 3});
      },
      //通讯录
      mobileListAjax() {
        this.commonTableData('manage/autoReviewList', 'mailListTableLoading', 'mailListTable', {type: 4});
      },
      //黑名单
      blackListAjax() {
        this.commonTableData('manage/autoReviewList', 'blackListTableList', 'blackListTable', {type: 5});
      },
      allInfoAjax() {
        this.baseInfoAjax();
        this.h5Ajax();
        //this.zhimaAjax();
        //this.tongDunAjax();
        //this.mobileListAjax();
        //this.otherAjax();
        //this.blackListAjax();
      },


      //展示弹框
      commonShowDig(visible) {
        this[visible] = true;
      },
      //提交数据
      commonSubmit(formName, loadName, visible, url, formData) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this[loadName] = true;

            this.$http.post(url, formData).then(response => {
              this[loadName] = false;
              let {
                body
              } = response;
              if (1 == body.code) {
                console.log(body.code);
                this[visible] = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.allInfoAjax();
              } else {
                this.$message.error(body.message);
              }
            }).catch((e) => {
              this.$message.error("网络异常");
              this[loadName] = false;
            });

          } else {
            return false;
          }
        })
      }
    },
    mounted() {
      this.allInfoAjax();
    }
  }

</script>
