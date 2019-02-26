<!--
    create : 田鹏伟 2018-12-07
    desc : 动态表单组件
-->
<template>
    <div class="form">
        <el-form :model="formKeys" :rules="rules" ref="formData">            
            <el-form-item label-width="155px" class="demo-ruleForm" v-for="form in forms" :key="form.field" :label="form.label" :prop="form.fillable ? form.field : ''">                
                <!-- 文本框 -->
                <el-input v-if="form.type==='input'" :placeholder="'请输入'+form.label" :disabled="!form.editable" v-model="formKeys[form.field]"></el-input>
                 <!-- 关联搜索文本框 平台专区专用 -->
                <el-autocomplete v-if="form.type==='fuzzySearch'" class="inline-input" v-model="formKeys[form.field]" :fetch-suggestions="querySearchAsync" :placeholder="'请关联'+form.label" @select="handleSelect(formKeys[form.field])" ><i class="el-icon-search el-input__icon" slot="suffix"></i></el-autocomplete>
                <!-- 下拉框 -->
                <el-select v-if="form.type==='select'" :disabled="!form.editable" :placeholder="'请选择'+form.label" v-model="formKeys[form.field]">
                    <!-- <el-option label="否" value="0"></el-option>
                    <el-option label="是" value="1"></el-option> -->
                    <el-option v-for="(k,i) in keysData[form.field]" :key="i" :label="String(k.value)" :value="String(k.vkey)"></el-option >
                </el-select>
                <!-- 日期选择器 -->
                <el-date-picker v-if="form.type==='date'" :disabled="!form.editable" v-model="formKeys[form.field]" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:215px" ></el-date-picker>
                <!-- 文本域 -->
                <el-input v-if="form.type==='textarea'" :disabled="!form.editable"  type="textarea" v-model="formKeys[form.field]"></el-input>
                <!-- 多选 -->
                <el-checkbox-group v-if="form.type==='checkbox'" :disabled="!form.editable"  v-model="formKeys[form.field]">
                    <el-checkbox v-for="(c,i) in keysData[form.field]" :key="i" :label="c.value" v-bind:name="form.field"></el-checkbox>
                </el-checkbox-group>
                <!-- 单选框 -->
                <el-radio-group v-if="form.type==='radio'" :disabled="!form.editable" v-model="formKeys[form.field]">
                    <!-- <el-radio>{{typeof keysData[form.field]}}</el-radio> -->
                    <el-radio v-for="(k,i) in keysData[form.field]" :key="i" :label="k.vkey">{{ k.value }}</el-radio>
                </el-radio-group>
                <!-- 图片上传 -->
                <div v-if="form.type==='imgUpload'">
                    <img-puload :imgUrl="formKeys[form.field]" :id="id" :field="form.field" v-on:getImgUrl="getImgUrl"></img-puload>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script> 
    import imgPuload from '@/components/module/imgUpload';
    export default {
        name : 'Form',
        data() {
            return {
                formKeys : require(`../config/${this.apiName}`).keys,
                rules: require(`../config/${this.apiName}`).check,
                forms : this.$store.state.formModifyKeys, 
                searchData : [],  //平台专区专用 
            }
        },
        components : {
            imgPuload
        },
        computed : {
            
        },
        props : {
            //待修改的数据行id
            id : 0,
            apiName : {
                type : String,
                default : ''
            },
            keysData : {},  //查询到的数字字典
            operateType : '',  //操作类型 新增or编辑
            subParam : {},  //平台专区专用
        },
        created() {       
            if(this.subParam && this.subParam.type) {
                this.searchPlatformName();
            }
            if(this.operateType == 'add') {
                this.forms = this.$store.state.formAddKeys;
            }         
        },
        watch : {
            operateType() {
                if(this.operateType == 'add') {
                    this.forms = this.$store.state.formAddKeys;
                } else {
                    this.forms = this.$store.state.formModifyKeys;
                }
            }
        },
        mounted() {
        },
        methods : {
            initFormKeys() {
                let config = this.forms;
                for(let i=0; i<config.length; i++) {
                    this.formKeys[config[i].field] = '';
                }
            },
            //提交表单
            submitForm() {
                //如果forms里类型为 checkbox，则转成以','分割的字符串传给后端
                let data = {};
                let cbField = {};
                let forms = this.forms;
                let keysData = this.keysData;
                for(let i=0; i<forms.length; i++) {
                    if(forms[i].type == 'checkbox') {    
                        if(this.formKeys[forms[i].field]) {
                            cbField[forms[i].field] = this.formKeys[forms[i].field].join(',');
                        } else {
                            cbField[forms[i].field] = '';
                        }                 
                    } else if(forms[i].type == 'select') {
                        let data = keysData[forms[i].field];
                        for(let n=0;n<data.length;n++) {
                            if(this.formKeys[forms[i].field] == data[n].value) {
                                cbField[forms[i].field] = data[n].vkey;
                            }
                        }
                        
                    }
                }
                console.log(cbField);
                // return;
                for(let k in this.formKeys) data[k] = this.formKeys[k];
                data = Object.assign(data,cbField);
                console.log(data);
                return new Promise((resolve,reject)=>{                    
                    this.$refs['formData'].validate((valid) => {
                        if (valid) {
                            //校验通过，提交表单
                            this.http(this,{
                                url : this.apiName+'/addOrUpdate',
                                data : Object.assign(data,{
                                    id : this.id
                                },this.subParam)
                            }).then(data=>{
                                resolve();
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                });
            },
            //重置表单
            resetForm() {
                this.$refs['formData'].resetFields();
            },
            //获取子组件上传的图片路径
            getImgUrl(val) {
                this.formKeys[val.field] = val.url;
            },
            //字典查询
            getKeys() {
                let keys = this.forms;
                console.log(this.forms);
                
            },
            //平添专区，搜索平台名称
            searchPlatformName() {
                this.http(this,{
                    url : 'platformZone/selectByZone',
                    data : {
                        platformName : '',
                        type : this.subParam.type
                    }
                }).then(data=>{
                    for(let i=0; i<data.length; i++) {
                        this.searchData.push({
                            value : data[i]
                        });
                    }
                });
            },
            querySearchAsync(queryString, cb) {
                var searchData = this.searchData;
                var results = queryString ? searchData.filter(this.createStateFilter(queryString)) : searchData;
                cb(results);
            },
            createStateFilter(queryString) {
                return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
            }
        },
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