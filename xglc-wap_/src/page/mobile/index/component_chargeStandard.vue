<template>
    <div>
        <div class="table">
            <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td colspan="2">业务标准</td><td>收费标准</td>
                </tr>
                <tr>
                    <td colspan="2">1.用户注册</td><td>免费</td>
                </tr>
                <tr>
                    <td colspan="2">2.开通银行存管账户</td><td>免费</td>
                </tr>
                <tr>
                    <td style="width:1rem" rowspan="3">3.投标</td>
                    <td style="width:3rem">
                        G自动服务自动投标服务
                    </td>
                    <td>免费</td>
                </tr>
                <tr>
                    <td style="width:3rem">
                        散标
                    </td>
                    <td>免费</td>
                </tr>
                <tr>
                    <td style="width:3rem">
                        债权项目
                    </td>
                    <td>免费</td>
                </tr>
                <tr>
                    <td colspan="2">4.回款到账</td><td>免费</td>
                </tr>
                <tr>
                    <td colspan="2">5.债权转让</td><td>平台按实际成交债权价格的2%收取服务费用</td>
                </tr>
                <tr>
                    <td colspan="2">6.散标利息管理费</td><td>平台按回款利息的10%收取利息管理费</td>
                </tr>
                <tr>
                    <td colspan="2">7.G自动服务利息管理费</td><td>免费</td>
                </tr>
                <tr>
                    <td colspan="2">8.充值</td><td>免费</td>
                </tr>
                <tr>
                    <td colspan="2">9.提现</td><td>每月可免费提现5次，超过5次后收取提现金额的0.2%手续费（最低2元，无上限）</td>
                </tr>
                <tr>
                    <td colspan="2">10.借款人收费</td><td>小鸽理财平台对借款人收费不超过5%</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .table{
        color:#666;
        width:6.8rem;
        margin:auto;
        font-size:.28rem;
        margin:.3rem auto;
        table{
            border-top:1px solid #ddd;
            border-left:1px solid #ddd;
            td:nth-child(1){                
                line-height:1.5;
            }
            td{border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:.2rem .15rem;}
            tr:nth-child(1) {
                td{
                    background:#fafafa;
                    color:#333;
                }
            }
        }
    }
</style>