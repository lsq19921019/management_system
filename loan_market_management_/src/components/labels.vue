<!--
    create : 田鹏伟 2018-12-03
    desc : 标签
-->
<template>
    <div class="labels" v-show="labels.length > 0">
        <el-tag
            :key="index"
            v-for="(label,index) in labels"
            closable
            :disable-transitions="false"
            @click.native="linkTo(label)"
            @close="handleClose(label)">
            {{label.title}}
        </el-tag>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labels : []
            }
        },
        methods : {
            handleClose(label) {
                this.labels.splice(this.labels.indexOf(label), 1);
            },
            linkTo(label) {
                this.$router.push({
                    path : label.path
                });
                if(this.$route.meta.currentMenu) {
                    this.$store.state.currentMenu = this.$route.meta.currentMenu;
                } 
            }
        },
        watch : {
            '$route'() {
                let path = this.$route.path;
                let title = this.$route.meta.title;
                let labels = this.labels;
                if(labels.length == 0) labels.push({ path,title }); 
                let isAdd = true;
                for(let i=0; i<labels.length; i++) {
                    if(path == labels[i].path) {
                        isAdd = false;
                        break;
                    }
                }
                if(isAdd) labels.push({ path,title });
            }
        }
    }
</script>

<style lang="scss" scoped> 
    .labels{
        padding-left:215px;
        padding-bottom:10px;
        border-bottom:1px solid #ddd;
    }
     .el-tag {
        margin-right: 10px;
        margin-top:10px;
        cursor:pointer;
    }
</style>