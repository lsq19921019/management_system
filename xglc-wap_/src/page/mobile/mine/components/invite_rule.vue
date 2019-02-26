<!--
    组件-邀请好友规则
-->
<template>
    <div class="component_rule">
        <a href="javascript:;" class="off" @click="childOffRule"></a>
        <div class="rule_con">
            <div class="rc_title"></div>
            <div class="rc_con">
                <p>活动规则</p>
                <ul>
                    <li>1.活动时间：{{toYear}}年{{toMonth}}月1日-{{toMonth}}月{{monthLast}}日。</li>
                    <li>2.提成奖励计算公式：
                        <br>
                        <br>提成奖励=好友有效投资金额×投资期限（天）÷360×{{rate}}%
                        <br>提成奖励=好友有效投资金额×投资期限（月）÷12×{{rate}}%</li>
                    <li>3.邀请人可享受好友注册后3个月内有效投资的提成奖励。</li>
                    <li>4.好友的有效投资不包括新手标、权益标。</li>
                    <li>5.返现奖励按月分期发放，好友投资成功次月开始每月5号发放至您的“可用余额”中（如未开通银行存管账户，则无法发放）。</li>
                    <li>6.若好友对投项目已成功进行债权转让，则邀请人无法继续享受该笔投资剩余提成奖励。</li>
                </ul>
            </div>
        </div>
        <div class="cr_tips">
            在法律许可的合法范围内，本活动最终解释权归小鸽理财所有。
        </div>
    </div>
</template>

<script>
    export default { 
        data() {
            return {
                toYear: '',
                toMonth : '',
                monthLast : ''
            }
        },       
        props : {
            //邀请好友返现百分比
            rate : {
                type : Number,
                default : 2
            }
        },
        beforeMount() {
            this.getCurrentMonthLast();
        },
        methods : {
            //关闭弹窗
            childOffRule() {
                this.$emit('parentOffRule');
            },
            //获取规则生效时间
            getCurrentMonthLast: function() {
                var date = new Date();
                this.toYear = date.getFullYear()
                var currentMonth = date.getMonth();
                this.toMonth = currentMonth + 1
                var nextMonth = ++currentMonth;
                var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
                var oneDay = 1000 * 60 * 60 * 24;
                this.monthLast = new Date(nextMonthFirstDay - oneDay).getDate()
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul,li{
        list-style:none;
        padding:0;
        margin:0;
    }
    .component_rule{
        position:fixed;
        background:#692dcf;
        z-index:100;
        top:0;
        left:0;
        height:100%;
        width:100%;
        overflow: scroll;
        .off{
            display:block;
            width:.61rem;
            height:.61rem;
            background:url(./images/invite_off_rule.png) no-repeat;
            background-size:.61rem .61rem;
            top:.3rem;
            right:.3rem;
            position:absolute;
        }
        .rule_con{
            width:7.2rem;
            margin:auto;
            margin-top:1.7rem;
            position:relative;
            .rc_title{
                height:.6rem;
                background:#4e11bc;
                border-radius:.3rem;
                position:absolute;
                left:0;
                top:-.3rem;
                width:7.2rem;
            }
            .rc_con{
                width:6.9rem;
                background:#fff;
                margin:auto;
                position:relative;
                z-index:2;
                height:9.5rem;
                overflow-y:scroll;
                border-radius:0 0 .2rem .2rem;
                color:#555;
                p{
                    padding-top:.45rem;
                    font-size:.3rem;
                    font-weight:bold;
                    text-align:center;
                    padding-bottom:.1rem;
                }
                ul{
                    width:5.8rem;
                    margin:auto;
                    padding-bottom:.5rem;
                    li{
                        font-size:.28rem;
                        line-height:.36rem;
                        padding:.15rem 0;
                    }
                }
            }
        }
        .cr_tips{
            padding:.3rem 0;opacity:.6;color:#ebebeb;font-size:.22rem;text-align:center;
        }
        @media screen and (max-width: 340px) {
            .rule_con{
                margin-top:.9rem;
                ul{
                    padding-bottom:.3rem;
                }
                .rc_con{
                    height:8.5rem;
                }
            }
            .off{
                top:.1rem;
                width:.4rem;height:.4rem;
                background-size:.4rem .4rem;
            }
        }
    }
</style>