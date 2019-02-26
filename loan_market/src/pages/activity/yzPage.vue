<!--
    create:luofeifei 2018/11/20
    desc:落地页
-->
<template>
    <div class="main">
        <div class="bg_img">
            <img src="../../assets/activity/rrdk_logo.png" alt="" style="width:1.44rem;height:0.37rem;position: relative;left: .22rem;top: .22rem;">
        </div>
        <div class="main_con">
            <div class="t1">
                <div class="phone_box">
                    <span class="phone_ico"></span>
                    <input class="phone_txt" v-model="mobile" type="tel" maxlength="11" placeholder="请输入手机号" disabled>
                </div>
                <div class="deal">
                    <div style="line-height:0.26rem;" @click="isDealClick">
                        <img v-if="isDeal" src="../../assets/icon_n.png" alt="">
                        <img v-else src="../../assets/icon_y.png" alt="">
                    </div>
                    <span class="deal_txt">申请即表示你同意<a onclick=" location.href='/agreement?type=2' ">《服务协议》</a></span>
                </div>
                <a href="javascript:;" class="reg_btn" @click="login">看看我能借多少</a>
                <p class="info">
                    借款额度因个人情况资质而定，需您确认用款后才放款，请放心操作</p>
                <div class="list_ico">
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_1.png" alt="">
                        <p class="p1">审核极快</p>
                        <p class="p2">最快3分钟到账</p>
                    </div>
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_2.png" alt="">
                        <p class="p1">门槛超低</p>
                        <p class="p2">身份证就能贷</p>
                    </div>
                    <div class="ico_item">
                        <img src="../../assets/activity/icon_3.png" alt="">
                        <p class="p1">产品多样</p>
                        <p class="p2">多重选择通过率高</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="t2" style="height:2rem;"></div>
    </div>
</template>

<script>
    import DES3 from '../../../static/3DES.js';
    export default {
        name : 'Login',
        data() {
            return {
                mobile:this.$route.query.str1||'',
                isDeal:false
            }
        },
        components : {

        },
        created() {
        },
        mounted() {
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'background-color:#E6F3FF')
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        },
        methods : {          
            //登录
            login() {
                let _this = this;
                if(this.isDeal){
                    this.$msg({content:'请先同意服务协议'})
                    return
                }
                let data = {
                    phone:this.$route.query.str1||'',
                    signPhone:this.$route.query.str2||'',
                    sourceCode:'yz'
                }
                this.$ajax.post('/api/user/register_only_phone',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(0,data)
                })
                .then(resData=>{
                    if(resData.data.status == 0){
                        _this.$msg({ content : '申请成功,请用该账号登录人人贷款查看额度' });
                        setTimeout(() => {
                            _this.$router.push({name:'yzPageSuc'})
                        }, 1000);
                    }else{
                        _this.$msg({ content : resData.data.msg });
                    }
                })
            },
            isDealClick(){
                this.isDeal = !this.isDeal;
            }
        }
    }
</script>

<style lang='scss' scoped>
.main{
    width: 100%; 
    .bg_img{
        background: url(../../assets/activity/reg_bg1.png) no-repeat;
        background-size: 100% 100%;
        height: 12.05rem;
        width: 100%;
    }
    .main_con{
        margin-top: -6rem;
    }
    .t1{
        text-align: center;
        .phone_box{
            width:6.3rem;
            height:.9rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(180, 215, 251, 1);
            border-radius:.45rem;
            display: flex;
            align-items: center;
            margin: 0 auto;         
            .phone_ico{
                width: .4rem;
                height: .4rem;
                background: url(../../assets/activity/phone_a.png) no-repeat;
                background-size: cover;
                margin-left: .29rem;                
            }
            .phone_txt{
                font-size:.28rem;
                margin-left: .17rem;
            }             
        }
        .password_box{
            width:6.3rem;
            height:.9rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(180, 215, 251, 1);
            border-radius:.45rem;
            display: flex;
            align-items: center;
            margin: .1rem auto 0;
            position: relative;
            .password_ico{
                width: .4rem;
                height: .4rem;
                background: url(../../assets/activity/password_a.png) no-repeat;
                background-size: cover;
                margin-left: .27rem;                    
            }
            .password_txt{
                font-size:.28rem;
                margin-left: .17rem;
                width: 3.8rem;
            }
            .v_code{
                font-size:.24rem;
                color:rgba(127,151,216,1);
                position: absolute;
                right: .3rem;
                min-width: 1.24rem;
            }                             
        }
        .reg_btn{
            width:6.3rem;
            height:.9rem;
            line-height: .9rem;
            display: inline-block;
            text-align: center;
            margin: .2rem auto .27rem;
            background:rgba(82,123,236,1);
            box-shadow:0px 4px 13px 0px rgba(17,93,190,0.11);
            border-radius:.45rem;
            color:rgba(255,255,255,1);
            font-size:.32rem;
        }
        .info{
            width:6.3rem;
            margin:0 auto;
            text-align: left;
            font-size:.24rem;
            color:rgba(153,153,153,1);           
        }
        .list_ico{
            display: flex;
            justify-content: space-between;
            margin: .6rem auto 0rem;
            width: 86%;
           .ico_item{
               img{
                  width: .8rem;
                  height: .8rem; 
               }
               .p1{
                    font-size:.26rem;
                    font-weight:bold;
                    color:rgba(50,50,51,1);
                    line-height:1;
                    margin-top: .2rem;                
               }
               .p2{
                   font-size:.22rem;
                    font-weight:500;
                    color:rgba(50,50,51,1);
                    opacity:0.85;
                    line-height:1;
                    margin-top: .13rem; 
               }
           } 
        }
        .deal{
            width: 6.3rem;
            margin: .2rem auto 0;
            text-align: left;
            display: flex;
            align-items: center;
            img{
                width: 0.26rem;
                height: 0.26rem;
            }
            .deal_txt{
                font-size:.24rem;
                color:rgba(152,172,226,1);
                line-height:.4rem;
                display: inline-block;
                margin-left: .14rem;
                a{
                    color:rgba(152,172,226,1);
                }                
            }
        }
    }
}
</style>
