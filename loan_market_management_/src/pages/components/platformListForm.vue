<!--
    create : 田鹏伟 2019-01-08
    desc :  平台列表专属表单
-->
<template>
    <el-dialog :title="formType" width="820px" :close-on-click-modal="false" :visible="dialogFormVisible" center :before-close="dialogClose">
        <div class="form_wrap">
        <div class="form">
            <el-form :model="formData" :rules="rules" ref="myForm">
                <el-form-item label-width="155px" class="demo-ruleForm" label="平台名称" prop="platformName">
                    <el-input placeholder="请输入平台名称"  v-model="formData.platformName"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="平台排序" prop="sort">
                    <el-input placeholder="请输入平台排序"  v-model="formData.sort"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="是否首页推荐" prop="showIndex">
                    <el-radio-group v-model="formData.showIndex">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="平台Logo" prop="productLogo">
                    <div>
                        <img-upload :imgUrl="formData.productLogo" :id="row.id" :field="'productLogo'" v-on:getImgUrl="getImgUrl"></img-upload>
                    </div>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="机构所属公司全称">
                    <el-input placeholder="请输入平台推荐号"  v-model="formData.companyFullName"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="一句话简介" prop="productDesc">
                    <el-input placeholder="一句话简介"  v-model="formData.productDesc"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="最低额度（元）" prop="minAmount">
                    <el-input placeholder="请输入最低额度"  v-model="formData.minAmount"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="最高额度（元）" prop="maxAmount">
                    <el-input placeholder="请输入最高额度"  v-model="formData.maxAmount"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="最低期限（天）" prop="minTrem">
                    <el-input placeholder="请输入最低期限"  v-model="formData.minTrem"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="最高期限（天）" prop="maxTrem">
                    <el-input placeholder="请输入最高期限"  v-model="formData.maxTrem"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="参考日利率" prop="highRate">
                    <el-input placeholder="请输入参考日利率"  v-model="formData.highRate"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="最快放款时间" prop="fastLoanTime">
                    <el-input placeholder="请输入最快放款时间"  v-model="formData.fastLoanTime"></el-input>
                </el-form-item>
                <!-- h5平台特有注册链接 -->
                <el-form-item v-if="type == 1" label-width="155px" class="demo-ruleForm" label="注册链接" prop="productUrl">
                    <el-input placeholder="请输入注册链接"  v-model="formData.productUrl"></el-input>
                </el-form-item>

                <!-- 联登平台专属字段 ios地址-->
                <el-form-item v-if="type == 2" label-width="155px" class="demo-ruleForm" label="ios地址">
                    <el-input placeholder="请输入ios地址"  v-model="formData.ios"></el-input>
                </el-form-item>
                <!-- 联登平台专属字段 安卓地址 -->
                <el-form-item v-if="type == 2" label-width="155px" class="demo-ruleForm" label="android地址">
                    <el-input placeholder="请输入android地址"  v-model="formData.android"></el-input>
                </el-form-item>

                <el-form-item label-width="155px" class="demo-ruleForm" label="贷款类型（可多选）" prop="loanType">
                    <el-checkbox-group v-model="formData.loanType">
                        <el-checkbox label="身份证贷" name="loanType"></el-checkbox>
                        <el-checkbox label="银行卡贷" name="loanType"></el-checkbox>
                        <el-checkbox label="信用卡贷" name="loanType"></el-checkbox>
                        <el-checkbox label="公积金贷" name="loanType"></el-checkbox>
                        <el-checkbox label="社保贷" name="loanType"></el-checkbox>
                        <el-checkbox label="芝麻分贷" name="loanType"></el-checkbox>                    
                    </el-checkbox-group>
                </el-form-item>

            </el-form>
        </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogClose">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import imgUpload from '@/components/module/imgUpload';
    export default {
        name : 'PlatformListForm',
        data() {
            let _this = this;
            return {
                type : 1,  //平台类型 1-h5 2-联登 3-全流程
                formType : '新增',  //表单类型 新增|编辑
                row : {},  //修改的这条数据集合
                dialogFormVisible : false,
                //表单数据
                formData : {
                    companyFullName : '',
                    platformName : '',   //平台名称
                    sort : '',
                    showIndex : '',
                    productDesc : '',
                    productLogo : '',
                    minAmount : '',
                    maxAmount : '',
                    minTrem : '',
                    maxTrem : '',
                    highRate : '',
                    fastLoanTime : '',
                    productUrl : '',
                    loanType : [],
                    platformNo : '',
                    android : '',
                    ios : ''
                },
                formDataCopy : {
                    companyFullName : '',
                    platformName : '',   //平台名称
                    sort : '',
                    showIndex : '',
                    productDesc : '',
                    productLogo : '',
                    minAmount : '',
                    maxAmount : '',
                    minTrem : '',
                    maxTrem : '',
                    highRate : '',
                    fastLoanTime : '',
                    productUrl : '',
                    loanType : [],
                    platformNo : '',
                    android : '',
                    ios : ''
                },
                //表单校验规则
                rules : {
                    platformName: [
                        { required: true, message: '请输入平台名称', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: '请输入平台排序', trigger: 'blur' }
                    ],
                    showIndex: [
                        { required: true, message: '请选择是否首页推荐', trigger: 'change' }
                    ],
                    companyFullName: [
                        { required: true, message: '机构所属公司全称', trigger: 'blur' }
                    ],
                    productDesc: [
                        { required: true, message: '请输入一句话简介', trigger: 'blur' }
                    ],
                    productLogo: [
                        { required: true, message: '请上传平台logo', trigger: 'blur' }
                    ],
                    minAmount: [
                        { required: true, message: '请输入最低额度', trigger: 'blur' }
                    ],
                    maxAmount: [
                        { required: true, message: '请输入最高额度', trigger: 'blur' }
                    ],
                    minTrem: [
                        { required: true, message: '请输入最低期限', trigger: 'blur' }
                    ],
                    maxTrem: [
                        { required: true, message: '请输入最高期限', trigger: 'blur' }
                    ],
                    highRate: [
                        { required: true, message: '请输入参考日利率', trigger: 'blur' }
                    ],
                    fastLoanTime: [
                        { required: true, message: '请输入最快放款时间', trigger: 'blur' }
                    ],
                    productUrl: [
                        { required: true, message: '请输入注册链接', trigger: 'blur' }
                    ],
                    loanType: [
                        { type: 'array', required: true, message: '请至少选择一种贷款类型', trigger: 'change' }
                    ],
                    platformNo: [
                        { required: true, message: '请输入平台编号', trigger: 'blur' }
                    ]
                }
            }
        },
        components : {
            imgUpload
        },
        props : {
            pubConfig : {}
        },
        methods : {
            //取消关闭弹窗
            dialogClose() {},
            //确定关闭弹窗&提交
            submitForm() {
                let data = {};
                for(let k in this.formData) {
                    data[k] = this.formData[k];
                }
                data.loanType = this.formData.loanType.join(',');
                return new Promise((resolve,reject)=>{                  
                    this.$refs['myForm'].validate((valid) => {
                        if (valid) {
                            //校验通过，提交表单
                            this.http(this,{
                                url : this.pubConfig.apiName+'/addOrUpdate',
                                data : Object.assign(data,{
                                    id : this.row.id,
                                    platformType : this.type
                                },this.subParam)
                            }).then(data=>{
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                });
                                this.$emit('getList');
                                //this.resetForm();
                                this.dialogFormVisible = false;
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                });
            },
            //弹窗关闭回调
            dialogClose() {
                this.$confirm(`是否在离开页面前保存修改？`, '确认信息', {
                    distinguishCancelAndClose: true,
                    showClose : false,
                    closeOnClickModal : false,
                    confirmButtonText: `继续`,
                    cancelButtonText: `放弃`
                })
                .then(() => {              
                })
                .catch(action => {
                    //this.changeFiledType('table');
                    //this.$refs['myForm'].resetFields();
                    this.dialogFormVisible = false;
                    setTimeout(_=>{
                        this.resetForm();
                    },100);
                });
            },
            //显示弹窗
            showForm(o) {  
                this.formType = o.formType;  //设置表单标题
                if(o.operateType == 'add') {
                    this.type = o.platformType;  //设置表单类型
                    setTimeout(_=>{
                        this.clearForm();
                    },100);
                } else if(o.operateType == 'modify') {
                    this.clearForm();
                    let row = o.row;  //当前编辑的数据
                    this.type = row.platformType;
                    console.log('当前编辑的平台类型：',this.type);
                    this.row = row;
                    for(let k in this.formData) {
                        this.formData[k] = row[k];
                    }
                    //添加平台类型字段  
                    Object.assign(this.formData,{ platformType : this.type }); 
                    //对复选框作特殊处理
                    this.changeFiledType('form');
                }
                this.dialogFormVisible = true;  //显示表单
            },
            //获取子组件上传的图片路径
            getImgUrl(val) {
                this.formData[val.field] = val.url;
            },
            //重置表单
            resetForm() {
                this.$refs['myForm'].resetFields();
            },
            //清空表单数据
            clearForm() {
                for(let k in this.formData) {
                    this.formData[k] = this.formDataCopy[k];
                }
            },
            //formData里面的某些字段在表格、表单显示的时候需要转换类型
            changeFiledType(showType) {
                if(this.row.loanType) {
                    if(showType == 'table') {
                        // this.formData.loanType = this.row.loanType.join(',');
                        // console.log(this.formData.loanType);
                    } else if(showType == 'form') {
                        this.formData.loanType = this.row.loanType.split(',');
                    }
                }
                if(this.row.showIndex) {
                    if(showType == 'table') {
                        // this.formData.loanType = this.row.loanType.join(',');
                    } else if(showType == 'form') {
                        this.formData.showIndex = this.row.showIndex.toString();
                    }
                }
                
            }
        },
        created() {},
        mounted() {}
    }
</script>

<style lang="scss" scoped>
    .form{
        padding-right:50px;
        .el-input{
            width:80%;
        }
    }
    .el-checkbox{
        margin-left:0;
        margin-right:20px;
    }
    .el-upload-list--picture .el-upload-list__item-thumbnail{
        width:100px;height:auto;
    }
</style>