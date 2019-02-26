<template>
    <li class="item_li">
        <div class="item_li_box">
            <div class="iconImg" :style="'background-image: url('+bgImg+');background-position: '+x+'rem '+y+'rem;'"></div>
            <p class="p1">{{ title }}</p>
            <p class="p2">{{ isAuth }}</p>            
        </div>
    </li>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        x:'',   //x定位
        y:'',   //y定位
        isAuth:'',   //是否认证
        title:'',
        bgImg:''
    }
}
</script>

<style lang='scss' scoped>
.item_li{
    width: 33.0666666%;
    height: 2.2rem;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top:1px solid #E6E6E6;
    &:nth-child(n+1){
        border-right: 1px solid #E6E6E6;
    }
    &:nth-child(3n){
        border-right: none;
    }
    .item_li_box{
        display: flex;
        align-items: center;
        flex-direction: column;
        .iconImg{
            width: .56rem;
            height: .56rem;
            background-repeat: no-repeat;
            background-size:1.14rem .56rem;
        }
        .p1{
            font-size:.24rem;
            color:rgba(62,71,93,1);
            line-height:1;
            margin-top: .15rem;          
        }
        .p2{
            font-size:.2rem;
            color:rgba(168,170,178,1);
            line-height:1;
            margin-top: .14rem;           
        }
    }
}
</style>
