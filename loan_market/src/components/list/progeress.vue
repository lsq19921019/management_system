<template>
    <div class="progeress">
        <span class="rank">{{ rank | filtersLevel }}</span>
        <span class="text">信用等级</span>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:['rank'],
    created(){

    },
    methods:{

    },
    filters : {
        filtersLevel(val) {
            if(val == 'Y' || val == 'Z') return 'E';
            return val;
        }
    }
}
</script>

<style lang="scss" scoped>
.progeress{
    width: 1.8rem;
    height: 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(../../assets/prog1.png) no-repeat;
    background-size: 2rem 1.8rem;
    background-position: -.1rem 0;
    .rank{
        font-size:.6rem;
        font-weight:bold;
        color:rgba(254,235,80,1);
        line-height: 1;      
    }
    .text{
        font-size:.2rem;
        color:rgba(223,225,253,1);
        line-height:1;
        margin-top: .14rem;       
    }
}
</style>
