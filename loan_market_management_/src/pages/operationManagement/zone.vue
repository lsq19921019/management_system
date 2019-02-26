<!--
    create : 田鹏伟 2018-11-21
    desc : 运营管理-专区管理
    config : platformZone.js
-->
<template>
    <div class="_contain">
        <div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="高通过率专区" name="1">
                    <transition name="opacity"><config-table :tableConfig="tableConfig"></config-table></transition>
                </el-tab-pane>
                <el-tab-pane label="大额低息专区" name="2" :lazy="true">
                    <transition name="opacity"><config-table :tableConfig="tableConfig"></config-table></transition>
                </el-tab-pane>
                <el-tab-pane label="闪电放款专区" name="3" :lazy="true">
                    <transition name="opacity"><config-table  :tableConfig="tableConfig"></config-table></transition>
                </el-tab-pane>
            </el-tabs>
        </div>
        
    </div>
</template>

<script>
    import configTable from '@/pages/components/table/main';
    let platformZoneConfig = require('@/pages/components/table/config/platformZone');
    export default {
        name : 'OperationMangementZone',
        data() {
            let _this = this;
            return {
                activeName : '1',  //当前标签页
                tableConfig : {
                    apiName : 'platformZone',  //接口地址
                    showSelection : false,
                    subParam : {
                        type : 1
                    },
                    mainBtns : {
                        add : '添加',
                    },  //主要按钮组
                    subBtns : {
                        clearCach : {
                            text : '清空缓存',
                            handler() {
                                _this.clearCach();
                            }
                        }
                    }
                }
            }
        },
        components : {
            configTable
        },
        //自定义方法集合
        methods : {
            handleClick(tab, event) {
                let type = tab.$options.propsData.name;
                Object.assign(this.tableConfig,{
                    subParam : { type }
                });
                // let sk = platformZoneConfig.searchKeys;
                // for(let k in sk) {
                //     sk[k] = '';
                // }
            },
            //清除缓存
            clearCach() {
                this.http(this,{
                    url : 'redisConfig/delete',
                    data : {
                        key : 'pf.t.z.l'
                    } 
                }).then(data=>{
                    this.$message({
                        message : '清除成功',
                        showClose : true,
                        type : 'success'
                    }); 
                });
            }
        },
        //生命周期-实例创建后
        created() {

        },
        //生命周期-ui渲染前
        beforeMount() {
            
        },
        //生命周期-ui渲染结束
        mounted() {
            
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
    /* 组件切换动画 */
    .opacity-enter-active, .fade-leave-active {
        transition: all .5s ease;
    }
    .opacity-enter {
        opacity:0;
    }
    .opacity-leave-to{
        display:none;
    }
</style>