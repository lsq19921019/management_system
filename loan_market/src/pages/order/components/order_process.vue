<template>
    <div>
        <div style="display:flex;width:100%;">
            <div v-for="(item,index) in processList" :key="index" style="flex:1;height:1rem;position:relative;">
                    <div v-if="item.active" class="step_process_handeling">
                        <div class="line" style="height:.06rem;background-color:#2bd17d;;width:100%;top:.31rem;position:absolute;"></div>
                        <div class="circle_box" style="width:100%;position:absolute;top:.10rem;">
                            <div class="circle" style=""></div>
                        </div>  
                        <div style="width:100%;position:absolute;bottom:0rem;text-align:center;">{{item.stattusName}}</div>
                    </div>
                    <div v-else-if="item.showColor" class="step_process_success">
                        <div class="line" style="height:.06rem;background-color:#2bd17d;;width:100%;top:.31rem;position:absolute;"></div>
                        <div class="circle_box" style="width:100%;position:absolute;top:.2rem;">
                            <div class="circle" style="height: .3rem;width: .3rem;background-color:#2bd17d;;margin:0 auto;z-index:16;border-radius:.15rem;"></div>
                        </div>  
                        <div style="width:100%;position:absolute;bottom:0rem;text-align:center;">{{item.stattusName}}</div>
                    </div>
                    <div v-else class="step_process_unhandel">
                        <div class="line" style="height:.06rem;background-color:#ccc;;width:100%;top:.31rem;position:absolute;"></div>
                        <div class="circle_box" style="width:100%;position:absolute;top:.19rem;">
                            <div class="circle" style="height: .3rem;width: .3rem;background-color:#fff;;margin:0 auto;z-index:16;border-radius:.15rem;box-sizing:border-box;border:.05rem solid #ccc;"></div>
                        </div>  
                        <div style="width:100%;position:absolute;bottom:0rem;text-align:center;">{{item.stattusName}}</div>
                    </div>
            </div>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    props:{
        processList:{
            type: Array,
            default:[]
        }
    }
}
</script>

<style lang="scss" scoped>
    .step_process_handeling{
        .circle{
            height: .5rem;
            width: .5rem;
            background-position:center center;
            background-color:#fff;
            background-size:cover;
            background-repeat: no-repeat;
            background-image:url('../../../assets/order/process_handling.png');
            margin:0 auto;
            z-index:16;
            border-radius:.25rem;
            border:.03rem solid #2bd17d;
            box-sizing: border-box;
        }
    }
</style>
        