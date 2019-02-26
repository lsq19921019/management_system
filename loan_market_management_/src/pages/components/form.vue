<!-- 
    create : 田鹏伟 2019-01-12
    desc : 通用表单
-->
<template>
    <el-dialog :title="dialogConfig.title" width="820px" :close-on-click-modal="false"  :modal-append-to-body='false' :visible="config.isShow" center :before-close="dialogClose">
        <div class="form_wrap">
            <el-form :rules="rules" :model="formKeys" ref="formData">
                <el-form-item  
                :label-width="item.type=='richText' ? '60px' :formStyle.labelWidth" 
                class="demo-ruleForm" 
                v-for="item in initFormItemRule" 
                :key="item.field" 
                :prop="item.fillable ? (item.field) : ''"
                :label="item.label">
                    <!--
                        item.field 传给后端的字段
                        item.editable 是否可编辑
                        item.type 类型（input-普通文本框、datetime-事件选择器、date-日期选择器、richtext-富文本）
                    -->
                    <!-- 文本框 type=input -->
                    <!-- placeholder[item.field] ? placeholder[item.field] : '请输入'+item.label -->
                    <el-input 
                        v-if="item.type==='input'" 
                        :placeholder="placeholder ? placeholder[item.field] : '请输入'+item.label" 
                        :disabled="!item.editable" 
                        v-model="formKeys[item.field]">
                    </el-input>
                    <!-- 时间选择器 type=datetime -->
                    <el-date-picker
                        v-if="item.type==='datetime'"
                        v-model="formKeys[item.field]"
                        type="datetime"
                        :placeholder="placeholder ? placeholder[item.field] : '请输入'+item.label"
                        align="left"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                    
                    <!-- 下拉框 type=select  -->
                    <el-select v-if="item.type==='select'" :disabled="!item.editable" :placeholder="'请选择'+item.label" v-model="formKeys[item.field]">
                        <!-- <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option> -->
                        <el-option v-for="(k,i) in pks[item.field]" :key="i" :label="String(k.value)" :value="k.vkey"></el-option >
                    </el-select>

                    <!-- <el-radio-group  v-model="test2">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group> -->

                    <!-- 单选框 type=radio  -->
                    <el-radio-group v-if="item.type==='radio'" :disabled="!item.editable" v-model="formKeys[item.field]">
                        <el-radio v-for="(k,i) in pks[item.field]" :key="i" :label="k.vkey-0">{{ k.value }}</el-radio>
                    </el-radio-group>
                    <!-- 多选框 type=checkbox -->
                    <el-checkbox-group v-if="item.type==='checkbox'" :disabled="!item.editable" v-model="formKeys[item.field]">
                        <el-checkbox v-for="(c,i) in pks[item.field]" :key="i" :label="c.value" v-bind:name="item.field"></el-checkbox>
                    </el-checkbox-group>
                    <!-- 富文本编辑器 type==richText -->
                    <vue-ueditor v-if="item.type==='richText'&&isShowRichText" ref="ueditor" :htmlCon="formKeys[item.field]" :field="item.field" @bindData="bindRichTextData"></vue-ueditor>
                    <!-- 图片上传 -->
                    <div v-if="item.type==='imgUpload'">
                        <img-puload :imgUrl="formKeys[item.field]" :id="config.id" :field="item.field" v-on:getImgUrl="getImgUrl"></img-puload>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogClose">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import imgPuload from '@/components/module/imgUpload';
    import vueUeditor from '@/components/module/ueditor';
    export default {
        name : 'Form',
        data() {
            return {
                formKeys : require('./config')[`${this.pubConfig.apiName}`]['formKeys'], //传给后端的数据
                placeholder : require('./config')[`${this.pubConfig.apiName}`]['placeholder'] ? require('./config')[`${this.pubConfig.apiName}`]['placeholder'] : null, //传给后端的数据
                //formKeys : {},  //传给后端的表单数据
                //弹窗配置
                dialogConfig : {
                    title : '添加',  //弹窗标题
                },
                //pk配置
                pks : {},
                //表单校验规则
                rules : require('./config')[`${this.pubConfig.apiName}`]['rules'],
                //表单样式控制
                formStyle : {
                    labelWidth : '100px', //155px
                },
                //初始化表单控件
                initFormItemRule : [],
                //时间选择器配置
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
                },  
                //是否显示富文本编辑器
                isShowRichText : false,
                //是否显示图片上传控件
                isShowImgUpload : false,
            }
        },
        props : {
            pubConfig : {},
            searchData : {},  //查询条件
            config : {
                //添加规则
                //add : [
                    // {
                    //     editable : true,  //是否可编辑
                    //     fillable : true, //是否必填
                    //     lable : '标题',  //表单控件字段描述
                    //     type : 'input',  //表单控件类型
                    // }
                //], 
                // modify : [],
                // isShow : false,
                // type : 1,
                // addPkConfig : {},
                // modifyPkConfig : {}
            }
        },
        components : {
            vueUeditor, imgPuload
        },
        created() {
            if(this.config.type == 1) {
                this.initFormItemRule = this.config.add;
                this.pks = this.config.addPkConfig;                
                this.dialogConfig.title = '添加';
            } else if(this.config.type == 2){
                this.initFormItemRule = this.config.modify;
                this.pks = this.config.modifyPkConfig;
                console.log(this.pks);
                this.dialogConfig.title = '编辑';
            } else if(this.config.type == 12) {  //添加h5平台
                this.initFormItemRule = this.config.add2;
                this.pks = this.config.addPkConfig;                
                this.dialogConfig.title = '添加';
            } else if(this.config.type == 22) {  //编辑联登平台
                this.initFormItemRule = this.config.modify2;
                this.pks = this.config.modifyPkConfig;                
                this.dialogConfig.title = '编辑';
            }
            if(this.config.labelWidth) {
                this.formStyle.labelWidth = this.config.labelWidth;
            }
            this.initFormKeys();
        },
        methods : {
            //关闭弹窗
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
                    //this.$refs.childForm.resetForm();
                    this.config.handlerShow();
                });
            },
            //提交表单
            submit() {
                let initFormItemRule = this.initFormItemRule;
                let copyData = {};
                let formKeys = this.formKeys;
                for(let k in formKeys) {
                    copyData[k] = formKeys[k];
                }
                let pks = this.pks;  //所有字典数据
                for(let i=0; i<initFormItemRule.length; i++) {
                    let item  = initFormItemRule[i];
                    if(item.type == 'select') {
                        let str = formKeys[item.field];  //活动页面
                        for(let n=0; n<pks[item.field].length; n++) {
                            for(let m=0;m<pks[item.field].length; m++) {
                                if(pks[item.field][m].value == copyData[item.field]) {
                                    if(this.config.type == 2) copyData[item.field] = pks[item.field][m].vkey;
                                }
                            }
                        }
                    }
                    //如果是复选框，提交的数据是数组，需要转成以','分割的字符串
                    if(item.type == 'checkbox') {
                        copyData[item.field] = copyData[item.field].join(',');
                    }
                }
                console.log('提交的数据',copyData);
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        let data = copyData;
                        //传给后端的数据字段不能包含Desc
                        for(let k in data) {
                            if(/desc$/i.test(k)) {
                                data[k.replace(/desc/i,'')] = data[k];
                            }
                        }
                        //表单验证
                        //提交
                        this.http(this,{
                            url : this.pubConfig.apiName+'/addOrUpdate',
                            data : Object.assign(data,{
                                id : this.config.id
                            },this.subParam)
                        }).then(data=>{
                            console.log('表单提交成功');
                            this.$message({
                                message : `${this.dialogConfig.title}成功`,
                                type : 'success'
                            });
                            //刷新表格
                            this.$emit('getList',this.searchData);
                            this.config.isShow = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });                
            },
            //根据initFormItemRule设置formKeys
            initFormKeys() {
                let item = this.initFormItemRule;
                for(let i=0; i<item.length; i++) {
                    //console.log('控件规则',item);
                    //如果item.type为select 设置为数组
                    if(this.formKeys.hasOwnProperty(item[i].field)) {
                        this.formKeys[item[i].field] = '';
                    }
                }
            },
            //动态绑定富文本内容到表单字段
            bindRichTextData(con,field) {
                if(this.$refs.ueditor) {
                    this.formKeys[field] = con;
                } else {
                    console.log('该表单没有富文本编辑器');
                }
            },
            //获取子组件上传的图片路径
            getImgUrl(val) {
                this.formKeys[val.field] = val.url;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .form_wrap{
        padding-right:20px;
    }
    .el-checkbox{
        margin-left:0;
        margin-right:20px;
    }
</style>
