<template>
    <div class="about">
        <div class="page_title">
            <p>关于我们</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <div class="floor floor1" v-html="strHtml">
            <!-- <div class="title tac">
                <div><strong>产品介绍</strong><i></i></div>
                <p>Product introduction</p>
            </div>
            <div class="content">
                人人贷款致力于为金融用户提供全方位、多服务的借款信息获取服务，业务涵盖极速贷款、小额贷款、大额贷款、信用卡等借贷服务，并根据个人资料、借款需求与贷款产品智能精准匹配，综合比较推荐额度高、放款快、费率低的贷款产品，打造最快速、最简单的一站式借款信息获取平台。
            </div> -->
        </div>
        <!-- <div class="floor">
            <div class="title tac">
                <div><strong>平台特色</strong><i></i></div>
                <p>Platform features</p>
            </div>
            <div class="content">
                <span>【极速贷款】</span>当天申请，最快仅需一天即可闪电放款。<br>
                <span>【产品丰富】</span>由贷款机构和金融机构提供丰富的借贷产品，500-50000元额度随心贷，月利率低至0.3%，还款期限高至36个月。<br>
                <span>【简单便捷】</span>全程线上操作，一键申请，随时随地，想贷就贷。<br>
                <span>【门槛超低】</span>0抵押0担保，人人都能申请。<br>
                <span>【安全保障】</span>信息保密，安全有保障。
            </div>
        </div> -->
    </div>
</template>

<script>
    export default {
        name : 'About',
        data() {
            return {
                apiPath : {
                    //detail : '/api/help/detail'
                    detail: '/api/sysTerm/detail'
                },
                strHtml : ''
            }
        },
        created() {
            this.getDetail();
        },
        methods : {
            getDetail() {
                let _this = this;
                this.$ajax.post(this.apiPath.detail,_this.$qs.stringify({ position : 1 }),{
                    headers: _this.Base.initAjaxHeader(0,{})
                }).then(rs=>{
                    let res = rs.data;
                    if(res.status == 0) {
                        _this.strHtml = res.result.content;
                    } else {
                        _this.$msg({ content : res.msg });
                    }
                })
            }
        }
        
    }
</script>

<style lang="scss" scoped>
    .about{        
        .floor{
            margin-top:1rem;
            font-size:.24rem;
            line-height:.4rem;
            .title{
                div{
                    line-height:1.5;
                    font-size:.36rem;
                    i{
                        display:block;
                        width:.6rem;
                        height:.04rem;
                        margin:auto;
                        margin-top:.08rem;
                        background:linear-gradient(90deg,rgba(111,94,250,1),rgba(126,229,242,1));
                        border-radius:.02rem;
                    }
                }
                p{
                    color:#B2B5BE;
                    font-size:.28rem;
                    padding-top:.17rem;
                }
            }
            .content{
                padding-top:.35rem;
                width:6.72rem;
                margin:auto;
                text-align:justify;
                span{
                    font-size:.28rem;
                    position:relative;
                    left:-.05rem;
                }
            }
        }
        .floor1{
            margin-top:1.4rem;
            padding:.3rem;
        }
    }
</style>