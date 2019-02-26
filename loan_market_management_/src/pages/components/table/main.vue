<!--
    create : 田鹏伟 2018-12-05
    desc : 数据表格模板
-->
<template>
    <div class="table">
        <!-- 搜索查询 -->
        <div v-if="fliterData.rulesCopy.length > 0" class="search">
            <!-- 动态加载搜索组件 -->                
            <!--
                search.editable 是否可编辑
                search.field 字段名称（搜索时作为字段传给后端）
                search.fillable 是否必填（没用）
                search.label 字段描述
                search.type 类型
            -->
            <!-- 普通input -->                   
            <div class="mt10" :key="index" v-for="(search,index) in fliterData.rulesCopy" v-if="search.type == 'input'"> 
                <el-input :disabled="!search.editable" :placeholder="'请输入'+search.label" v-model="fliterData.searchKeys[search.field]">
                    <template slot="prepend">{{ search.label }}</template> 
                </el-input>
            </div>
            <!-- 带时间的选择器input datetime -->                   
            <div class="mt10 w1" :key="index" v-for="(search,index) in fliterData.rulesCopy" v-if="search.type == 'datetime'" style="width:290px;">   
                <span class="search_title">{{ search.label }}：</span> 
                <el-date-picker
                    v-model="fliterData.searchKeys[search.field]"
                    type="datetime"
                    :placeholder="'请输入'+search.label"
                    align="left"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="fliterData.pickerOptions">
                </el-date-picker>
            </div>
            <!-- 日期选择 input -->
            <div class="mt10" :key="index" v-for="(search,index) in fliterData.rulesCopy" v-if="search.type == 'date'" style="width:290px;">   
                <span class="search_title">{{ search.label }}：</span> 
                <el-date-picker
                    v-model="fliterData.searchKeys[search.field]"
                    align="right"
                    type="date"
                    :disabled="!search.editable"
                    value-format="yyyy-MM-dd"
                    :placeholder="'请输入'+search.label">
                </el-date-picker>
            </div>
            <!-- 下拉框 -->
           
            <div class="mt10" style="width:290px;" :key="index" v-for="(search,index) in fliterData.rulesCopy" v-if="search.type == 'select'">
                <el-row>
                    <el-col :span="5.9"><span class="search_title" style="line-height:40px;">{{ search.label }}:</span></el-col>
                    <el-col :span="16"> <el-select :disabled="!search.editable" v-model="fliterData.searchKeys[search.field]" :placeholder="'请选择'+search.label">
                    <el-option
                    v-for="item in fliterData.formSearchKeysData[search.field]"
                    :key="item.value"
                    :label="item.value"
                    :value="item.vkey"
                    :disabled="!search.editable">
                    </el-option>
                </el-select></el-col>
                </el-row>
                
            </div>
            <div class="mt10"><el-button type="primary" @click="fliterMethods().search()" icon="el-icon-search">搜索</el-button> </div>
            <div class="mt10 td"><el-button type="primary" @click="fliterMethods().reset()" icon="el-icon-refresh">重置</el-button></div>
        </div>
        <!-- 副按钮区 -->
        <div class="mt10" v-if="defaultConfig.mainBtns">
            <el-button v-if="defaultConfig.mainBtns.add" size="small" type="primary" @click="handlerAdd" icon="el-icon-circle-plus-outline">{{ defaultConfig.mainBtns.add }}</el-button>
            <el-button size="small" type="primary" icon="el-icon-delete" @click="handleOperate('deletes')" v-if="defaultConfig.mainBtns.deletes">{{ defaultConfig.mainBtns.deletes }}</el-button>
            <el-button size="small" type="primary" icon="el-icon-setting" @click="getData" v-if="defaultConfig.mainBtns.refresh">{{ defaultConfig.mainBtns.refresh }}</el-button>
            <el-button size="small" type="primary" icon="el-icon-download" @click="exportTable" v-if="defaultConfig.mainBtns.export">{{ defaultConfig.mainBtns.export }}</el-button>
            <el-button size="small" type="danger" icon="el-icon-warning" v-if="tableConfig.subBtns&&tableConfig.subBtns.clearCach" @click="tableConfig.subBtns.clearCach.handler">{{ tableConfig.subBtns.clearCach.text }}</el-button>
            <!-- <el-button size="small" type="primary" icon="el-icon-search">重置密码</el-button>
            <el-button size="small" type="primary" icon="el-icon-warning">冻结</el-button>
            <el-button size="small" type="primary" icon="el-icon-setting">角色分配</el-button>
            <el-button size="small" type="primary" icon="el-icon-setting">刷新</el-button> -->
        </div>
        <!-- 表格 -->
        <!-- <span v-for="(td,index) in firstList" :key="index">{{ td }}---</span> -->
        <div class="mt15">
            <el-table id="rebateSetTable" ref="myTable" :data="listData" @selection-change="handleSelectionChange" border>
                <!-- 选择列 -->
                <el-table-column style="mso-number-format:'\@'" type="selection" v-if="defaultConfig.select"> </el-table-column>
                <!-- 主要数据列 -->
                <el-table-column v-for="(td,index) in firstList" :label="initHeadLabel()(index)" :key="index" v-if="initHeadLabel()(index)">
                    <template slot-scope="scope">
                        <div v-html="initTdType(scope.row,index)"></div>
                    </template>
                </el-table-column>
                <!-- 操作列 -->
                <el-table-column label="操作" v-if="defaultConfig.operate">
                    <template slot-scope="scope">
                        <!-- <el-button @click="handleOperate('modify',scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="handleOperate('delete',scope.row)" type="text" size="small">删除</el-button> -->
                        <!-- 平台列表 上下线 -->
                        <el-button type="text" size="small" @click="handleOperate('offLine',scope)" v-if="defaultConfig.operateConfigBtns.offLine">{{ scope.row.pfstatus==1 ? '下线':'上线' }}</el-button>
                        <el-button v-for="btn in defaultConfig.operateBtns" :key="btn.type" @click="handleOperate(btn.type,scope)" type="text" size="small">{{ btn.label }}</el-button>
                        
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="mt15" v-if="listData.length > 0">
            <el-pagination
                background                
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.pageNum"
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
        <!-- 动态表单 -->
        <el-dialog :title="dialogType" width="820px" :close-on-click-modal="false" :visible="dialogFormVisible" center :before-close="dialogClose">
            <div class="form_wrap">
                <table-form ref="childForm" :id="modifyId" v-if="dialogFormVisible" :apiName="tableConfig.apiName" :keysData="keysData" :operateType="operateType" :subParam="tableConfig.subParam"></table-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import initTableHead from './config/td';
    import tableForm from './components/form';
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        name : 'TableConfig',
        data() {
            return {
                //默认配置
                defaultConfig : {
                    select : true,  //是否显示选择器
                    operate : true,  //是否显示操作列
                    operateBtns : [
                        {
                            label : '编辑',
                            type : 'modify'
                        },
                        {
                            label : '删除',
                            type : 'delete'
                        }                        
                    ],
                    mainBtns : {
                        add : '添加',
                        deletes : '批量删除',                        
                    },
                    operateConfigBtns : {},  //额外配置的

                },
                apiConfig : {
                    //获取表单字段
                    getFormKeys : 'operateConfig/operates'
                },
                listData : [],  //表格数据
                firstList : {},  //第一条数据，用户初始化表格显示列数据
                pagination : {
                    total : 100,  //总条数
                    pageSizes : [5,10,20,30,40,50],  //每页条数
                    pageSize : 10,
                    pages : 2,  //总页数
                    pageNum : 1,  //当前页码
                },  //分页数据
                deleteId : '',  //单项删除时的id
                deleteIds : '',  //多项删除的id
                modifyId : '',  //修改的项id
                dialogFormVisible : false,  //是否显示表单对话框
                dialogType : '添加',
                currentModifyData : {},  //当前修改的数据
                addData : {},  //增加数据
                operateAdd : {}, 
                operateModify : {},
                formKeys : null,
                operateType : 'modify',                 
                keyApiPath : 'dict/pkey',  //数据字典查询 
                keysData : {},  //数据字典查询结果 
                //过滤模块数据集合
                fliterData : {
                    rules : [],  //查询条件数组
                    rulesCopy : [],
                    searchKeys : require(`./config/${this.tableConfig.apiName}`).searchKeys,  //传给后端的数据
                    formSearchKeysData :{},
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
                },
            }
        },
        components : {
            tableForm
        },
        props : {
            tableConfig : {
                type : Object
            }
        },
        created() {
            for(let k in this.fliterData.searchKeys) {
                this.fliterData.formSearchKeysData[k] = '';
            }
            this.getFormKeys();
            this.initParams();
            this.getData();
        },
        mounted() {
        },
        watch : {

        },
        methods : {
            //过滤功能方法集合
            fliterMethods() {
                let _this = this;
                //传给后端的搜索数据
                let searchData = _this.fliterData.searchKeys;
                //查询规则
                let rules = _this.fliterData.rules;
                return {
                    test() {
                    },
                    //搜索事件
                    search() {
                        _this.listData = [];
                        _this.pagination.pageNum = 1;
                        _this.getData(searchData);
                    },
                    //获取查询组件中的字典数据（radio、select）
                    getPk() {                        
                        let arr = [];
                        if(!rules) return;
                        for(let i=0; i<rules.length; i++) {
                            if(rules[i].dict != null && rules[i].dict.length > 0) {
                                arr.push(rules[i].dict);
                            }
                        }
                        if(arr.length == 0) {
                            _this.fliterData.rulesCopy = rules;
                            return;
                        }
                        _this.http(_this,{
                            url : _this.keyApiPath,
                            data : {
                                pkeys : arr.join(',')
                            }
                        }).then(data=>{
                            let formSearchKeysData = _this.fliterData.formSearchKeysData;
                            for(let k in data) {
                                for(let n in formSearchKeysData) {
                                    if(new RegExp(n,'i').test(k.replace(/_/g,''))) {
                                        formSearchKeysData[n] = data[k]
                                    }
                                } 
                            }
                            _this.fliterData.formSearchKeysData = formSearchKeysData; 
                            _this.fliterData.rulesCopy = rules;                           
                        });
                    },
                    //重置查询条件
                    reset() {
                        for(let k in searchData) {
                            searchData[k] = '';
                        }
                        _this.pagination.pageNum = 1;
                        _this.getData(_this.fliterData.searchKeys);
                    }
                };
            },
            //重置默认参数
            initParams() {
                if(this.tableConfig.showSelection === false) {
                    this.defaultConfig.select = this.tableConfig.showSelection;
                }
                if(this.tableConfig.operate === false) {
                    this.defaultConfig.operate = this.tableConfig.operate;
                }
                if(this.tableConfig.operateBtns) {
                    this.defaultConfig.operateBtns = this.tableConfig.operateBtns;
                }
                if(this.tableConfig.mainBtns) {
                    this.defaultConfig.mainBtns = this.tableConfig.mainBtns;
                } else {
                    
                }
                if(this.tableConfig.operateConfigBtns) {
                    this.defaultConfig.operateConfigBtns = this.tableConfig.operateConfigBtns;
                }
            },
            //获取表格数据
            getData(searchKeys) {
                let data = {
                    pageNum : this.pagination.pageNum,
                    pageSize : this.pagination.pageSize
                };
                if(this.tableConfig.subParam) {
                    Object.assign(data,this.tableConfig.subParam);
                }
                if(searchKeys) {
                    // this.pagination.pageSize = 10;
                    Object.assign(data,searchKeys);
                }
                this.http(this,{
                    url : this.tableConfig.apiName+'/list',
                    data : data
                }).then(data=>{
                    let list = data.list;
                    this.pagination.total = data.total;
                    this.pagination.pages = data.pages;
                    if(list.length == 0 || list == null) {

                    } else {
                        this.listData = list;
                        this.firstList = list[0];
                    }
                });
            },
            //获取表单字段&查询条件
            getFormKeys() {
                this.http(this,{
                    url : this.apiConfig.getFormKeys,
                    data : {
                        module : this.tableConfig.apiName
                    }
                }).then(data=>{
                    //设置新增or修改表单字段规则
                    this.$store.state.formAddKeys = data.add;                 
                    this.$store.state.formModifyKeys = data.modify;  
                    this.$store.state.formSearchKeys = data.formSearchKeys; 
                    this.fliterData.rules = data.fliters;
                    this.fliterMethods().getPk();  
                    // setTimeout(_=>{
                    //     this.fliterData.rules = data.fliters;
                    // },100);                        
                });
            },
            //初始化表头列
            initHeadLabel() {
                let config =  require(`./config/${this.tableConfig.apiName}`);
                return config.initTh;
            },
            //修改分页尺寸
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.pagination.pageNum = 1;
                this.getData(this.fliterData.searchKeys);
            },
            //页码选择
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagination.pageNum = val;
                this.getData(this.fliterData.searchKeys);
            },
            /**
             * params (String,Object,Number)
             * params1 [modify|修改,delete|单项删除,deletes|批量删除]
             * params2 [Object|单项删除时待删除的对象]
             * params3 [Number|单项删除时的对象id]
             */
            handleOperate(type,scope) {
                switch(type) {
                    //修改
                    case 'modify':
                    this.modifyId = scope.row.id;
                    this.operateType = 'modify';                    
                    this.getDataById(scope.row.id).then(data=>{  
                        this.dialogType = '修改';     
                        this.currentModifyData = data;
                        this.dialogFormVisible = true;
                        //格式化待修改的数据，用于展示
                        setTimeout(_=>{
                            this.$refs.childForm.resetForm(); 
                            let modify = this.$store.state.formModifyKeys;
                            console.log(modify);
                            this.getKeys(modify).then(res=>{
                                for(let i=0; i<modify.length; i++) {
                                    console.log(modify[i].type);
                                    switch(modify[i].type) {
                                        case 'checkbox':
                                        // console.log(data[modify[i].field]);
                                        if(data[modify[i].field]) {
                                            this.$refs.childForm.formKeys[modify[i].field] = data[modify[i].field].indexOf(',') > -1? data[modify[i].field].split(',') : [data[modify[i].field]];
                                        } else {
                                            this.$refs.childForm.formKeys[modify[i].field] = [];
                                        }
                                        break;
                                        
                                        case 'radio':
                                        this.$refs.childForm.formKeys[modify[i].field] = String(data[modify[i].field]);
                                        break;

                                        case 'select':
                                        let slcData = this.keysData[modify[i].field];
                                        for(let n=0; n<slcData.length; n++) {
                                            console.log(slcData[n].vkey,data[modify[i].field]);
                                            if(slcData[n].vkey == data[modify[i].field]) {
                                                this.$refs.childForm.formKeys[modify[i].field] = slcData[n].value;
                                            }
                                        }
                                        //this.$refs.childForm.formKeys[modify[i].field] = String(data[modify[i].field]);
                                        break;

                                        default:
                                        this.$refs.childForm.formKeys[modify[i].field] = data[modify[i].field];
                                    }
                                }
                            });
                            
                        },200);
                    });
                    break;

                    //删除
                    case 'delete':
                    case 'deletes':
                    if(type == 'delete') this.deleteId = scope.row.id;  
                    if(this.deleteIds.length < 1 && type == 'deletes') {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的项'
                        });
                        return;
                    }                  
                    this.$confirm('此操作将永久删除所选项, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(type == 'deletes') this.pagination.pageNum = 1;
                        this.deleteById(type).then(data=>{
                            if(type == 'delete') {
                                this.listData.splice(scope.$index,1);
                                this.pagination.total -= 1;
                            } else {
                                setTimeout(_=>{
                                    this.getData(this.fliterData.searchKeys);
                                },500);
                            }
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });         
                    });
                    break;

                    //平台列表表格下线操作
                    case 'offLine':
                    this.http(this,{
                        url : this.tableConfig.apiName+'/addOrUpdate',
                        data : {
                            //test
                            id : scope.row.id,
                            pfstatus : scope.row.pfstatus==1? 2 : 1
                        }
                    }).then(data=>{
                        if(data) {
                            this.$message({
                                message : '操作成功',
                                showClose : true,
                                type : 'success'   
                            })
                            this.getData(this.fliterData.searchKeys);
                            // //下线状态，改为上线
                            // if(row.pfstatus == 2) {
                            //     this.listData[scope.$index].pfstatus = 1;
                            // } else if(row.pfstatus == 1) {
                            //     this.listData[scope.$index].pfstatus = 2;
                            // }
                        } else {
                            this.$message({
                                message : '操作失败',
                                showClose : true,
                                type : 'error'   
                            })
                        }
                    });
                    break;

                    //调用父组件方法
                    case 'other':
                    this.$emit('childFnc',scope);
                    break;

                }
            },
            //删除操作
            deleteById(type) {                
                return this.http(this,{
                    url : this.tableConfig.apiName+'/delete',
                    data : {
                        ids : type=='delete' ? this.deleteId : this.deleteIds
                    }
                });
            },
            /**
             * param {Array} 已选择的表格数据列表
             * desc:
             */
            handleSelectionChange(val) {
                let idArr = [];
                for(let i=0; i<val.length; i++) {
                    idArr.push(val[i].id);
                }
                this.deleteIds = idArr.join(',');
                console.log(this.deleteIds);
            },
            //根据表格数据显示文案还是html标签
            initTdType(row,key) {
                let content = row[key];
                // console.log(content);
                let imgW = 45;
                let imgH = 45;
                if(key.indexOf('imgUrl') > -1) {  //banner
                    imgW = '100%';
                    imgH = 'auto';
                }
                //如果是图片链接
                if(/\.(jpg|png|gif)/i.test(content)) {
                    return `<img width="${imgW}" title="${content}" height="${imgH}" src="${content}">`;
                }
                // if(key == 'userIdcard'){
                //     return `<span style="mso-number-format:'\@';color:red;">\t${content}</span>`;
                // }
                return content;
            },
            //弹窗关闭回调
            dialogClose() {
                this.$confirm(`是否在离开页面前保存修改？`, '确认信息', {
                    distinguishCancelAndClose: true,
                    showClose : false,
                    closeOnClickModal : false,
                    confirmButtonText: `继续${this.dialogType}`,
                    cancelButtonText: `放弃${this.dialogType}`
                })
                .then(() => {
                                    
                })
                .catch(action => {
                    this.$refs.childForm.resetForm(); 
                    this.dialogFormVisible = false;
                });
            },
            //提交表单
            submit() {
                this.$refs.childForm.submitForm().then(data=>{
                    this.$message({
                        message : `${this.dialogType}成功`,
                        type : 'success'
                    });
                    this.dialogFormVisible = false;
                    this.getData();
                });
            },
            //通过id获取数据（修改前）
            getDataById(id) {
                return this.http(this,{
                    url : this.tableConfig.apiName+'/detail',
                    data : {
                        id : id
                    }
                });
            },
            //添加
            handlerAdd() {
                this.dialogType = '添加';
                this.operateType = 'add';
                this.modifyId = '';
                this.dialogFormVisible = true;
                setTimeout(_=>{
                    this.$refs.childForm.resetForm(); 
                    let adds = this.$store.state.formAddKeys;
                    this.getKeys(adds);
                    for(let i=0; i<adds.length; i++) {
                        switch(adds[i].type) {
                            case 'checkbox':
                            this.$refs.childForm.formKeys[adds[i].field] = [];
                            break;

                            default:
                            this.$refs.childForm.formKeys[adds[i].field] = '';
                        }
                    }
                },100);
                
            },
            //获取字典
            getKeys(formKeys) {
                console.log(formKeys);
                // {"id":41,"field":"imgUrl","label":"图片","type":"imgUpload","module":"platformBanner","operate":"modify","editable":true,"fillable":true,"dict":null,"flag":true}
                return new Promise((resolve,reject)=>{
                    let arr = [];
                    let fields = [];
                    for(let i=0; i<formKeys.length; i++) {
                        if(formKeys[i].dict) {
                            arr.push(formKeys[i].dict);
                            fields.push(formKeys[i].field);
                        }
                    }
                    if(arr.length == 0) {
                        resolve('success');
                        return;
                    }
                    this.http(this,{
                        url : this.keyApiPath,
                        data : {
                            pkeys : arr.join(',')
                        }
                    }).then(data=>{
                        let keys = {};
                        let dataArr = [];
                        // for(let k in data) {
                        //     dataArr.push(data[k]);
                        // }
                        for(let i=0; i<fields.length; i++) {
                            for(let k in data) {
                                if(new RegExp(fields[i],'i').test(k.replace(/_/g,''))) {
                                    keys[fields[i]] = data[k]
                                }
                            }
                            // keys[fields[i]] = dataArr[i]
                        }
                        this.keysData = keys;
                        resolve('success');
                        // this.keysData = keys;
                    });
                })
            },
            //导出表格
            exportTable() {
                let title = this.$route.meta.title;
                let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'array' });
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${title}.xlsx`);
                } catch (e)
                {
                    if (typeof console !== 'undefined')
                        console.log(e, wbout)
                }
                return wbout
            }
            
        },
        filters : {
            a() {
                let fliters = [
                    {
                        type : 'date',
                        label : '创建日期',
                        field : 'createDate'
                    },{
                        type : 'select',
                        label : '组织机构',
                        field : 'createDate'
                    },{
                        type : 'input',
                        label : '手机号码',
                        field : 'mobile'
                    }
                ];
                let modify = [
                    {
                        type : 'date',
                        label : '创建日期',
                        field : 'createDate',
                        isMofify : false
                    }
                ];
            }
        }
        
    }
</script>

<style lang="scss" scoped>
          
</style>