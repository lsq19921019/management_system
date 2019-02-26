<template>
	<div class="supplierEdit-page">
       
        <el-form ref="editForm" :rules="rules" :model="editData">
                <el-row>
                    <el-col :span="8">
                        <el-form-item 
                            label="名称" 
                            :label-width="labelWidth"
                            prop="providername"
                        >
                            <el-input v-model="editData.providername">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item 
                            label="跟进人" 
                            :label-width="labelWidth"
                            prop="belongerid">
                            <el-autocomplete
                                v-model="belongerName"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                >
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item 
                            label="发掘人" 
                            :label-width="labelWidth"
                            prop="sourcename"
                        >
                            <el-input v-model="editData.sourcename">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item 
                            label="公司地址" 
                            :label-width="labelWidth"
                            prop="companyaddress"
                        >
                            <el-input v-model="editData.companyaddress">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item 
                            label="对接人" 
                            :label-width="labelWidth"
                            prop="dockingpeople"
                        >
                            <el-input v-model="editData.dockingpeople">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item 
                            label="职位" 
                            :label-width="labelWidth"
                            prop="position"
                        >
                            <el-input v-model="editData.position">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item 
                            label="微信" 
                            :label-width="labelWidth"
                            prop="wechatno"
                        >
                            <el-input v-model="editData.wechatno">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item 
                            label="QQ" 
                            :label-width="labelWidth"
                            prop="qqno"
                        >
                            <el-input v-model="editData.qqno">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item 
                            label="电话" 
                            :label-width="labelWidth"
                            prop="telphone"
                        >
                            <el-input v-model="editData.telphone">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item 
                            label="备注" 
                            :label-width="labelWidth"
                            prop="remarks"
                        >
                            <el-input type="textarea" v-model="editData.remarks">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :offset=3>
                       <el-button type="button" @click="submitForm('editForm')">保存</el-button>
                    </el-col>
                </el-row>
                
            </el-form>
    </div>
</template>
<script>
import supplierEdit from "./edit.js";
export default supplierEdit;
</script>
<style>
.supplierEdit-page {
  width: 80%;
  margin-top: 30px;
}
</style>
