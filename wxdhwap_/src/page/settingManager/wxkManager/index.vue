<template>
	<div class="wxkManager-page">
		<el-tabs v-model="activeName"  @tab-click="handleClick" style="padding:10px 30px;z-index:1;">
            <el-tab-pane label="全部" name="total">
                <multiMenu :wechatData ="wechatData" 
                            @paginationCurrentPage="getCurrentPage" 
                            @paginationPageSize="getPageSize"
                            @multiDeletID="getMultiDeleteID"
                            @multiCollectID="getMultiCollectID"
                            @multiMarkID="getMultiMarkID"
                            @multiChoseID="getMultiChoseID"
                            @trackStatus="getTrackStatus"
                            @wechatName="getWechatName"
                            :personOptions="trackData"
                            @multiAssignID = "getMultiAssignID"
                            @assignStatus="getAssignStatus"
                            ></multiMenu>
            </el-tab-pane>
            <el-tab-pane label="待观察" name="watch">
                <multiMenu :wechatData ="wechatData" 
                            @paginationCurrentPage="getCurrentPage" 
                            @paginationPageSize="getPageSize"
                            @multiDeletID="getMultiDeleteID"
                            @multiCollectID="getMultiCollectID"
                            @multiMarkID="getMultiMarkID"
                            @trackStatus="getTrackStatus"
                            @wechatName="getWechatName"
                            :personOptions="trackData"
                            @multiAssignID = "getMultiAssignID"
                            @assignStatus="getAssignStatus"
                            ></multiMenu>
            </el-tab-pane>
            <el-tab-pane label="可投放" name="publish">
                <multiMenu :wechatData ="wechatData" 
                            @paginationCurrentPage="getCurrentPage" 
                            @paginationPageSize="getPageSize"
                            @multiDeletID="getMultiDeleteID"
                            @multiCollectID="getMultiCollectID"
                            @multiMarkID="getMultiMarkID"
                            @trackStatus="getTrackStatus"
                            @wechatName="getWechatName"
                            :personOptions="trackData"
                            @multiAssignID = "getMultiAssignID"
                            @assignStatus="getAssignStatus"
                            ></multiMenu>
            </el-tab-pane>
            <el-tab-pane label="搁置" name="lay">
                <multiMenu :wechatData ="wechatData" 
                            @paginationCurrentPage="getCurrentPage" 
                            @paginationPageSize="getPageSize"
                            @multiDeletID="getMultiDeleteID"
                            @multiCollectID="getMultiCollectID"
                            @multiMarkID="getMultiMarkID"
                            @trackStatus="getTrackStatus"
                            @wechatName="getWechatName"
                            :personOptions="trackData"
                            @multiAssignID = "getMultiAssignID"
                            @assignStatus="getAssignStatus"
                            ></multiMenu>
            </el-tab-pane>
            
        </el-tabs>
       
	</div>
</template>
<script>
import $ from 'jquery'
import {baseUrl} from '@/config/env';
import MultiMenu from './multiMenu.vue';
import {findUserList, addTask} from '@/service/getData.js';
	export default{
        components:{
            MultiMenu
        },
        data() {
            return {
                wechatmanageUrl:baseUrl + '/wechatmanage/query/1',
                batchchooseUrl:baseUrl + '/wechatmanage/batchchoose',
                deleteUrl:baseUrl + '/wechatmanage/delete',
                collectUrl:baseUrl + '/wechatmanage/collect',
                markUrl:baseUrl + '/wechatmanage/mark',
                addUrl: baseUrl + '/wechatmanage/add',
				importeditUrl : baseUrl + '/wechatmanage/importedit',
                activeName: 'total',//tab默认选中全部
                wechatData:[],
                tab:'0',
                currentPage:'1',
                pageSize:'10',
                name:'',
                startId:'',
                endId:'',
                markStatus:'',
                trackStatus:'',
                assignStatus: '',
                trackData:[]
            };
        },
        mounted(){
            this.getData(this.returnPageModel());
            this.init();
        },
        methods: {
            async init(){
                let parma = {
                    pageIndex: 1,
                    pageSize: 50,
                    type : 1
                }
                let result = await findUserList(parma);
                this.trackData = result.data.list; 
            },
            getData(pageModel){
                var _this = this;
                $.ajax({
                    url: _this.wechatmanageUrl,
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data:pageModel,
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
                                }
                        } else {
                            _this.wechatData = '';//清空数据
                            _this.$message.error(result.message);
                        }
                    }
                });
            },    
            getBatchData(pageModel){
                var _this = this;
                $.ajax({
                    url: _this.batchchooseUrl,
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data:pageModel,
                    headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                    success: function(result) {
                        if (result.success) {
                            if(result.data == '-3'){//登陆态失效
                                    _this.$message.error(data.message);
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
            deleteID(ids){
                var _this = this;
                $.ajax({
                    url: _this.deleteUrl,
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                    data:{
                        wechatIds:ids.toString()
                    },
                    success: function(result) {
                        if (result.success) {
                            if(result.data == '-3'){//登陆态失效
                                    _this.$message.error(data.message);
                                    setTimeout(function(){
                                        window.location.href = './login'
                                    },1000);  
                                }else{
                                    _this.wechatData = result.data;
                                }
                            // _this.wechatData = result.data;
                        } else {
                            _this.$message.error(result.message);
                        }
                    }
                });  
            },
            collectID(ids){
                var _this = this;
                $.ajax({
                    url: _this.collectUrl,
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                    data:{
                        wechatIds:ids.toString()
                    },
                    success: function(result) {
                        if (result.success) {
                            if(result.data == '-3'){//登陆态失效
                                    _this.$message.error(data.message);
                                    setTimeout(function(){
                                        window.location.href = './login'
                                    },1000);  
                                }else{
                                _this.wechatData = result.data;
                                _this.$message.success(result.message);
                                }
                        } else {
                            
                            _this.$message.error(result.message);
                        }
                    }
                });  
            },
            markID(data){
                var _this = this;
                $.ajax({
                    url: _this.markUrl,
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    headers:{
                          "token":  localStorage.getItem('token') || ''
                            },
                    data:data,
                    success: function(result) {
                        if (result.success) {
                            if(result.data == '-3'){//登陆态失效
                                    _this.$message.error(data.message);
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
                            _this.$message.error(result.message);
                        }
                    }
                });  
            },

            updateWX(data){
                var url='',
                    updateData='';
				if(data.type=='新增'){
                    url = this.addUrl;
                    updateData = {
                        name:data.name,
                        no:data.no
                    }
                }
                else if(data.type == '编辑'){
                    url = this.importeditUrl;
                    updateData = {
                        name:data.name,
                        no:data.no,
                        id:data.id
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
                                    _this.$message.error(data.message);
                                    setTimeout(function(){
                                        window.location.href = './login'
                                    },1000);  
                                }else{
                                _this.wechatData = result.data;
                                // _this.$message.success(result.message);
                                }
                            // _this.wechatData = result.data;
                        } else {
                            _this.wechatData = '';//清空数据
                            _this.$message.error(result.message);
                        }
                    }
                });
            },
            
            getCurrentPage(data){
                this.currentPage = data;
                this.getData(this.returnPageModel(this.currentPage,this.pageSize,'','','',this.markStatus,this.trackStatus))
            },
            getPageSize(data){
                this.pageSize = data;
                this.getData(this.returnPageModel(this.currentPage,this.pageSize,'','','',this.markStatus,this.trackStatus))
            },
            getTrackStatus(data){
                this.trackStatus = data;
                this.getData(this.returnPageModel(this.currentPage,this.pageSize,'','','','',this.trackStatus, this.assignStatus));
            },
            getAssignStatus(data){
                this.assignStatus = data;
                this.getData(this.returnPageModel(this.currentPage,this.pageSize,'','','','',this.trackStatus, this.assignStatus));
            },
            getWechatName(data){
                this.getData(this.returnPageModel(this.currentPage,this.pageSize,data));
            },
            getMultiDeleteID(data){
                this.deleteID(data);
            },
            getMultiCollectID(data){
                this.collectID(data);
            },
            getMultiMarkID(data){
                this.markID(data);
            },
            // getUpdateID(data){
            //     this.updateWX(data);
            // },
            getMultiChoseID(data){
                console.log(data);
                this.getBatchData(data);
            },
            async getMultiAssignID(data){
                let result = await addTask(data);
                if(result.success){
                    this.$message({
                        type: 'success',
                        message: '指派成功!'
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: '指派失败!'
                    });
                }
            },
            returnPageModel(pageIndex,pageSize,name,startId,endId,markStatus,trackStatus,assignStatus){
                
                switch (this.tab) {
                    case '0':
                        markStatus = '';
                        break;
                    case '1':
                        markStatus = '1';
                        break;
                    case '2':
                        markStatus = '2';
                        break;
                    case '3':
                        markStatus = '3';
                        break;
                    default:
                        break;
                }
                var pageModel = {
                    pageIndex:pageIndex || 1,
                    pageSize:pageSize || 10,
                    name:name||'',//微信公众号名称或微信号
                    startId:startId||'',//起始ID
                    endId:endId||'',//起始ID
                    markStatus:markStatus || '',//标注状态
                    trackStatus:trackStatus || '',//跟踪状态
                    followUser: assignStatus
                }
                return pageModel;
            },
            handleClick(tab) {
                this.tab = tab.index;
                var _this = this;
                if (tab.index == 0) {
                    this.getData(this.returnPageModel());
                }else if (tab.index == 1 ) {
                   this.getData(this.returnPageModel());
                }else if (tab.index == 2 ) {
                   this.getData(this.returnPageModel());
                }else if (tab.index == 3 ) {
                   this.getData(this.returnPageModel());
                }
            },
        }
	}
</script>
<style lang="scss" scoped>
</style>