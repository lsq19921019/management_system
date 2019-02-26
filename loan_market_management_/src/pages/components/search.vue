<!--
    create : 田鹏伟 2019-01-07
    desc : 过滤查询组件
-->
<template>
    <div class="search">
        <!-- 动态加载搜索组件 -->                
            <!--
                search.editable 是否可编辑
                search.field 字段名称（搜索时作为字段传给后端）
                search.fillable 是否必填（没用）
                search.label 字段描述
                search.type 类型
            -->
            <!-- 普通input -->                   
            <div class="mt10" :key="index" v-for="(search,index) in subConfig.fliters" v-if="search.type == 'input'"> 
                <el-input :disabled="!search.editable" :placeholder="'请输入'+search.label" v-model="searchKeys[search.field]">
                    <template slot="prepend">{{ search.label }}</template> 
                </el-input>
            </div>
            <!-- 带时间的选择器input datetime -->                   
            <div class="mt10 w1" :key="index" v-for="(search,index) in subConfig.fliters" v-if="search.type == 'datetime'" style="width:285px;">   
                <span class="search_title">{{ search.label }}：</span> 
                <el-date-picker
                    v-model="searchKeys[search.field]"
                    type="datetime"
                    :placeholder="'请输入'+search.label"
                    align="left"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <!-- 日期选择 input -->
            <div class="mt10" :key="index" v-for="(search,index) in subConfig.fliters" v-if="search.type == 'date'" style="width:280px;">   
                <span class="search_title">{{ search.label }}：</span> 
                <el-date-picker
                    v-model="searchKeys[search.field]"
                    align="right"
                    type="date"
                    :disabled="!search.editable"
                    value-format="yyyy-MM-dd"
                    :placeholder="'请输入'+search.label">
                </el-date-picker>
            </div>
            <!-- 下拉框 -->           
            <div class="mt10" style="width:280px" :key="index" v-for="(search,index) in subConfig.fliters" v-if="search.type == 'select'">
                <el-row>
                    <el-col :span="5.9"><span class="search_title" style="line-height:40px;">{{ search.label }}:</span></el-col>
                    <el-col :span="16"><el-select :disabled="!search.editable" v-model="searchKeys[search.field]" :placeholder="'请选择'+search.label">
                        <el-option
                        v-for="item in subConfig.fliterChildData[search.field]"
                        :key="item.value"
                        :label="item.value"
                        :value="item.vkey"
                        :disabled="!search.editable">
                        </el-option>
                    </el-select></el-col>
                </el-row>                
                 
            </div>
            <!-- 动态配置按钮 -->
            <div class="mt10" v-for="btn in subConfig.fliterBtnConfig" :key="btn.type" v-if="subConfig.fliterBtnConfig.length > 0"><el-button v-bind:type="btn.type" v-bind:icon="btn.icon" @click="btn.fncName">{{ btn.text }}</el-button> </div>
            <!-- 搜索模块固定两个按钮 -->
            <div class="mt10"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button> </div>
            <div class="mt10 td"><el-button type="primary" icon="el-icon-refresh" @click="reset">重置</el-button></div>
    </div>
</template>

<script>
    export default {
        name : 'Search',
        data() {
            return {
                // searchKeys : require(`./table/config/${this.pubConfig.apiName}`).searchKeys, 
                //searchKeys : require('./config')[`${this.pubConfig.apiName}`]['searchKeys'], //传给后端的数据
                searchKeys : {},
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
            }
        },
        props : {
            pubConfig : {},
            subConfig : {
                fliters : [],  //搜索规则
                fliterBtnConfig : [],  //额外按钮配置
                fliterChildData : {}  //搜索查询中需要用到的字典数据（下拉框项、单选框项）
            }
        },
        created() {
            //console.log('搜索字段',this.searchKeys);
        },
        methods : {
            //查询方法
            search() {
                console.log('搜索字段',Object.keys(this.searchKeys));
                this.$emit('search',this.searchKeys,2);
            },
            //重置
            reset() {
                for(let k in this.searchKeys) {
                    this.searchKeys[k] = '';
                }
                this.$emit('search',this.searchKeys,1);
            }
        },
    }
</script>