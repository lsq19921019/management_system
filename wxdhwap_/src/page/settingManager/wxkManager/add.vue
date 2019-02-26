<template>
	<div class="wxkManager-add-page">
		<el-row style="margin:20px 0" type="flex">
			<el-col :span="1" style="margin-right:20px" offset="17">
				<update-dialog btnText="新增" dialogTitle="新增" @updateData="getUpdateData"></update-dialog>
			</el-col>
			<el-col :span="1" style="margin-right:20px"><el-button type="primary" plain size="mini" @click="saveImporData">保存</el-button></el-col>
            <el-col :span="2" style="margin-right:20px">
                <upload btnText="批量上传" 
                        :url="importUrl"
                        @updateSuccess="getUpdateSuccess"></upload>
            </el-col>
		</el-row>
		<el-table :data="wechatData.list"  
				  :show-header="true" 
				  :fit="true">
			<el-table-column
                type="index"
                width="50">
            </el-table-column>
			<el-table-column  label="名称" >
				<template slot-scope="scope">
					<span>{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="公众号ID" >
				<template slot-scope="scope">
					<p>{{ scope.row.no }}</p>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
                    <update-dialog btnText="编辑" 
                                   dialogTitle="编辑" 
                                   :wechatID="scope.row.id"
                                   @updateData="getUpdateData"
                                   >
                    </update-dialog>
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column label="信息">
				<template slot-scope="scope">
					<p>{{ scope.row.message }}</p>
				</template>
			</el-table-column>
		</el-table>
		<div class="block" style="margin-top:20px">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="cpageNum"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="cpageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="wechatData.total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
import {baseUrl} from '@/config/env';
import updateDialog from '../wxkManager/updateDialog.vue';
import upload from '../wxkManager/fileUpload.vue';

	export default{
        components:{
			updateDialog,
			upload
        },
        data() {
            return {
                queryUrl:baseUrl + '/wechatmanage/importquery',
				addUrl: baseUrl + '/wechatmanage/add',
                importUrl: baseUrl + '/wechatmanage/import',//上传链接
				importeditUrl : baseUrl + '/wechatmanage/importedit',
                importdeleteUrl:baseUrl + '/wechatmanage/importdelete',
                importsaveUrl: baseUrl + '/wechatmanage/importsave',
                wechatData:'',
                wechatID:'',
                cpageSize:10,
                cpageNum:1,
            };
        },
        mounted(){
            this.getData(this.returnPageModel());
        },
        methods: {
            getData(pageModel){
                var _this = this;
                $.ajax({
                    url: _this.queryUrl,
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                    data:pageModel,
                    success: function(result) {
                        if (result.success) {
                            if(result.data == '-3'){//登陆态失效
                                _this.$message.error(result.message);
                                setTimeout(function(){
                                    window.location.href = './login'
                                },1000);  
                            }else{
                                _this.wechatData = result.data;
                            }
                            // _this.wechatData = result.data;
                            // _this.cpageSize = result.data.pageSize;
                            // _this.cpageNum = result.data.pageNum;
                        } else {
                            _this.wechatData = '';//清空数据
                            _this.$message.error(result.message);
                        }
                    }
                });
            },
			updateWX(data){
                var url='',
                    updateData={};
				if(data.type=='新增'){
                    url = this.addUrl;
                    updateData={
                        no:data.no,
                        name:data.name
                    }
                   
                    
                }
                else if(data.type == '编辑'){
                    url = this.importeditUrl;
                    updateData={
                        id:data.id,
                        name:data.name,
                        no:data.no
                    }
                }
                var _this = this;
                
                $.ajax({
                    url: url,
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                    data:updateData,
                    success: function(result) {
                        if (result.success) {
                            if(result.data == '-3'){//登陆态失效
                                _this.$message.error(result.message);
                                setTimeout(function(){
                                    window.location.href = './login'
                                },1000);  
                            }else{
                                _this.wechatData = result.data;
                            }
                            // _this.wechatData = result.data;
                        } else {
                            _this.wechatData = '';//清空数据
                            _this.$message.error(result.message);
                        }
                    }
                });
            },
            saveImporData(){
                var _this = this;
                $.ajax({
                    url: _this.importsaveUrl,
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                    success: function(result) {
                        if (result.success) {
                            if(result.data == '-3'){//登陆态失效
                                _this.$message.error(result.message);
                                setTimeout(function(){
                                    window.location.href = './login'
                                },1000);  
                            }else{
                                _this.wechatData = result.data;
                                _this.$message.success(result.message);
                            }
                            // _this.wechatData = result.data;
                            // _this.$message.success(result.message);
                        } else {
                            _this.wechatData = '';//清空数据
                            _this.$message.error(result.message);
                        }
                    }
                });
            },
			getUpdateData(data){
				this.updateWX(data);
            },
            getUpdateSuccess(data){
                if(data){
                    this.getData(this.returnPageModel());
                }
            },
            handleSizeChange(val) {
                this.cpageSize = val;
                this.getData(this.returnPageModel(this.currentPage,`${val}`))
            },
            handleCurrentChange(val) {
                this.cpageNum = val;
                this.getData(this.returnPageModel(`${val}`,this.pageSize))
            },
            returnPageModel(pageIndex,pageSize){
                var pageModel = {
                    pageIndex:pageIndex||this.cpageNum,
                    pageSize:pageSize||this.cpageSize,
                }
                return pageModel;
            },
            handleDelete(id){
                this.$confirm('此操作将删除所选公众号, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var _this = this;
                    $.ajax({
                        url: _this.importdeleteUrl,
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                        data:{
                            id:id
                        },
                        success: function(result) {
                            if (result.success) {
                                if(result.data == '-3'){//登陆态失效
                                _this.$message.error(result.message);
                                    setTimeout(function(){
                                        window.location.href = './login'
                                    },1000);  
                                }else{
                                    _this.wechatData = result.data;
                                }
                                // _this.wechatData = result.data;
                            } else {
                                _this.wechatData = '';//清空数据
                                _this.$message.error(result.message);
                            }
                        }
                    });
				});
               
            }, 
        }
	}
</script>
<style lang="scss" scoped>
</style>