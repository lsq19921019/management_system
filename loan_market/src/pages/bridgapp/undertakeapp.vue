<template>
    <div>
        <loading v-if="isShowLoading" :text="'处理中...'"></loading>
        <!-- <button class="btn" @click="clons" style="width: 100%;height: 50px;">关闭</button> -->
    </div>
</template>

<script>
export default {
    name: 'DistributeApp',
    data() {
        return {
            isShowLoading : true
        }
    },
    components : {
        
    },
    mounted() {
    },
    created() {
       setTimeout(() => {
            this.handlerRequest();
       }, 5000);
    },
    methods:{
        clons(){
            this.Base.interactiveWithApp_ttj('onClose',{}).then(data=>{
                if(data == 'wap') {
                    console.log('selectContact','wap');
                } else {
                    console.log('selectContact','app');
                }
            });    
        },
        handlerRequest() {
            let type = this.$route.params.type;
            this.clons();
        }              
    }
}
</script>

<style lang="scss" scoped>
.btn{
    background: #527BEC;
    color: #fff;
    position: absolute;
    bottom: 0;
}
</style>
