<!--
    create : 田鹏伟 2018-11-20
    desc : 系统管理-用户管理
-->
<template>
    <div class="_contain">     
        <!--
        <el-row :gutter="20">
            <el-col :span="3">
                <el-select v-model="values.zzjg" placeholder="请选择组织机构">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="账号/姓名/手机" v-model="values.userName">
                    <template slot="prepend">用户名称</template>
                </el-input>
            </el-col>
            <el-col :span="3.5">
                <el-date-picker
                    v-model="values.registerStartDate"
                    align="right"
                    type="date"
                    placeholder="选择注册开始日期">
                </el-date-picker>
            </el-col>
            <el-col :span="3.5">
                <el-date-picker
                    v-model="values.registerEndDate"
                    align="right"
                    type="date"
                    placeholder="选择注册结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh">重置</el-button>
            </el-col>
        </el-row>

        <div class="mt10">
            <el-row>
                <el-col :span="16">
                    <el-button size="small" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
                    <el-button size="small" type="primary" icon="el-icon-edit">修改</el-button>
                    <el-button size="small" type="primary" icon="el-icon-delete">删除</el-button>
                    <el-button size="small" type="primary" icon="el-icon-search">重置密码</el-button>
                    <el-button size="small" type="primary" icon="el-icon-warning">冻结</el-button>
                    <el-button size="small" type="primary" icon="el-icon-setting">角色分配</el-button>
                    <el-button size="small" type="primary" icon="el-icon-setting">刷新</el-button>
                </el-col>
                <el-col :span="4">
                    
                </el-col>
            </el-row>
            <div class="pt10">
                <el-checkbox :indeterminate="values.isIndeterminate" v-model="values.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="values.checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="(city,index) in values.cities" :label="city" :key="index">{{city.value}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <div class="mt15">
            <transition name="el-fade-in-linear">
                <template v-if="isShowTable">
                    <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection">
                        </el-table-column>

                        <el-table-column v-for="(tab,index) in this.values.checkedCities" :key="index"
                        :prop="tab.key"
                        :label="tab.value">
                        </el-table-column>
                    </el-table>
                </template>
            </transition>
        </div>
        -->
    </div>
</template>

<script>
    const cityOptions = [
        {
            key : 'id',
            value : 'id',
            index : 0
        },
        {
            key : 'account',
            value : '账号',
            index : 1
        },
        {
            key : 'name',
            value : '姓名',
            index : 2
        },
        {
            key : 'sex',
            value : '性别',
            index : 3
        },
        {
            key : 'role',
            value : '角色',
            index : 3
        },
        {
            key : 'company',
            value : '部门',
            index : 4
        },
        {
            key : 'email',
            value : '邮箱',
            index : 5
        },
        {
            key : 'no',
            value : '平台编号',
            index : 6
        },
        {
            key : 'mobile',
            value : '电话',
            index : 7
        },
        {
            key : 'time',
            value : '创建时间',
            index : 8
        },
        {
            key : 'status',
            value : '状态',
            index : 9
        }
    ];
    export default {
        name : 'systemManagementUsers',
        data() {
            return {
                title : '系统管理-用户管理',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                values : {
                    zzjg : '',  //组织架构
                    userName : '',  //用户名称
                    registerStartDate : '',  //注册开始日期
                    registerEndDate : '',  //注册结束日期                    
                    checkedCities: cityOptions,
                    cities: cityOptions,
                    isIndeterminate: true,
                    checkAll: false,
                    multipleSelection : [],  //选中的表格
                },
                isShowTable : true,
                tableData3: [
                    {
                        id : 1, account : '736101853', name : '王小虎', sex : '男', role : '演员', company : '技术部', email : '736101853@qq.com', no : '123456', mobile : '13128912815', time : '2018-12-12', status : '失联'
                    },{
                        id : 1, account : '736101853', name : '王小虎', sex : '男', role : '演员', company : '技术部', email : '736101853@qq.com', no : '123456', mobile : '13128912815', time : '2018-12-12', status : '失联'
                    },{
                        id : 1, account : '736101853', name : '王小虎', sex : '男', role : '演员', company : '技术部', email : '736101853@qq.com', no : '123456', mobile : '13128912815', time : '2018-12-12', status : '失联'
                    },{
                        id : 1, account : '736101853', name : '王小虎', sex : '男', role : '演员', company : '技术部', email : '736101853@qq.com', no : '123456', mobile : '13128912815', time : '2018-12-12', status : '失联'
                    },
                ]
            }
        },
        //自定义方法集合
        methods : {
            test() {
                window.open(location.origin+'/systemManagement/userNotics?name=1213', '_blank');
            },
            /**
             * param {Array} 已选择表头列表
             * desc:表头全选/全不选后重置表格
             */
            handleCheckAllChange(val) {
                this.values.checkedCities = val ? cityOptions : [];
                this.values.isIndeterminate = false;
                if(this.values.checkedCities.length == 0) {
                    this.isShowTable =false;
                } else {
                    this.isShowTable = true;
                }
            },
            /**
             * param {Array} 已选择的表头列表
             * desc:选择/取消选择单个表头项后重置表格
             */
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.values.checkAll = checkedCount === this.values.cities.length;
                this.values.checkedCities = value;
                this.values.isIndeterminate = checkedCount > 0 && checkedCount < this.values.cities.length;
                if(this.values.checkedCities.length == 0) {
                    this.isShowTable =false;
                } else {
                    //数组排序
                    value.sort((o1,o2)=>{
                        let a = o1.index;
                        let b = o2.index;
                        if(a < b) {
                            return -1;
                        } else if(a > b) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    this.isShowTable = true;
                }
                //数组重新排序
                
            },
            /**
             * param {Array} 已选择的表格数据列表
             * desc:
             */
            handleSelectionChange(val) {
                this.values.multipleSelection = val;
            },
            //根据表头项判断是否包含当前表头
            resetTable(key) {
                let checked = this.values.checkedCities;
                for(let k in checked) {
                    if(key == checked[k].key) return true;
                }
                return false;
            }
        },
        //生命周期-实例创建后
        created() {
            // this.http(this,{
            //     url : 'platformInfo/list'
            // }).then(data=>{
            //     console.log(data);
            // });
        },
        //生命周期-ui渲染前
        beforeMount() {
            
        },
        //生命周期-ui渲染结束
        mounted() {
            this.handleCheckedCitiesChange(this.values.cities);
        },
        //生命周期-组件销毁前
        beforeDestroy() {

        },
        //生命周期-组件销毁后
        destroyed() {
            
        }
    }
</script>

<style scoped>

</style>