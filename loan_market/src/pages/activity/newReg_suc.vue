<!--
    create:luofeifei 2018/11/20
    desc:登录注册成功
-->
<template>
    <div class="main">
        <div class="p1">
        </div>
        <div class="p2">
            <img src="../../assets/activity/btn.png" alt="" @click="toLink">
        </div>
        <div class="news">
           <ul :class="{marquee_top:animate}">
                <li v-for="(item,index) in marqueeList" :key="index">{{ item.content }}</li>
            </ul>
        </div>
        <div class="p3">
            <img src="../../assets/activity/p3.png" alt="p3">
        </div>      
        <div class="foot">
            <p>具体放款额度，以平台实际审核为准</p>
            <p>深圳微融信息科技有限公司</p>
        </div>     
    </div>
</template>

<script>
    export default {
        data() {
            return {
                animate: false,
                marqueeList:[],
            }
        },
        components : {
        },
        created() {
            setInterval(this.showMarquee, 5000)
        },
        mounted() {
        },
        beforeMount(){
            this.getList();
        },
        methods:{
            toLink(){
                let _this = this;
                if(_this.Base.getSysType() == 'IOS') {
                    location.href = this.Base.downloadUrl.ios;
                } else {
                    location.href = this.Base.downloadUrl.android;
                }                
            },
            showMarquee: function () {
                this.animate = true;
                setTimeout(()=>{
                    this.marqueeList.push(this.marqueeList[0]);
                    this.marqueeList.shift();
                    this.animate = false;
                },500)
            },
            //获取列表数据
            getList() {      
                let _this = this;                     
                let data = {
                   pageNum : 1,
                   type : ''
                };                              
                this.$ajax.post('/api/platform/index',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                }).then(res=>{
                    let result = res.data; 
                    if(result.status == 0 || result.status == -100 || result.status == -9) { 
                        _this.marqueeList = result.result.carouseList;
                    } else {
                        _this.$msg({ content : result.msg });
                    }
               });
            },                       
        }
    }
</script>

<style lang='scss' scoped>
.main{
    background-color: #5053fd;
    .p1{
        background: url(../../assets/activity/reg_bg.png) no-repeat;
        background-size: cover;
        height: 8.99rem;
    }
    .p2{
        text-align: center;
        margin-top: -1.4rem;
        img{
            width: 5.74rem;
            height: .97rem;
        }
    }
    .news{
        margin: .44rem auto .39rem;
        width:6.9rem;
        height:.7rem;
        background:rgba(0,0,0,0.14);
        border-radius:.35rem;
        font-weight:bold;
        color:rgba(255,255,255,1);
        font-size:.28rem;
        overflow: hidden;
        .marquee_top {
            transition: all 0.5s;
            margin-top: -30px
        }
        ul li{
            line-height: .7rem;
            text-align: center;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
        }
    }
    .p3{
        text-align: center;
        img{
            width: 6.9rem;
            height: 4.66rem;
            padding-bottom: .3rem;
        }
    }
    .foot{
        height:1.1rem;
        background:#5062FD;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
            font-size:.24rem;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height: 1;
            text-align: center;
            &:nth-child(2){
                margin-top: .15rem;
            }
        }
    }
}
</style>
