<template>
    <div class="intro">
        <div class="int_list">
            <div class="int_item">
                <p class="int_title">
                    <span class="mark"></span>
                    <span class="name">房信贷</span>
                </p>
                <div class="int_con">房信贷是以借款人名下登记的房产作为主要审核授信参考，小鸽理财综合评估借款人征信情况、工作收入情况及名下房产情况后，给与其一定授信额度并在平台发布借款的项目。</div>
            </div>
            <div class="int_item">
                <p class="int_title">
                    <span class="mark"></span>
                    <span class="name">小微企业经营贷</span>
                </p>
                <div class="int_con">小微企业经营贷是为合法正常经营的小微企业提供经营所需周转资金的快速通道，服务对象主要以实体形式经营的小微企业为主。借款方以企业固定资产、设备、车辆、应收账款等作为抵/质押物或反担保物，经过专业风控严格的线下风险评估并通过小鸽理财平台的审核后，在小鸽理财平台上向投资者发布借款标的以获得借贷资金。</div>
            </div>
            <div class="int_item">
                <p class="int_title">
                    <span class="mark"></span>
                    <span class="name">汽车租金贷</span>
                </p>
                <div class="int_con">汽车租金贷是以借款人通过以租代购的形式获取的粤港澳两地车牌及车辆作为主要审核授信参考，借款专项用于支付对应的租金缴纳。小鸽理财综合评估借款人征信情况、工作收入、还款能力情况及其他资产情况后，给与其一定授信额度并在平台发布借款的项目。</div>
            </div>                        
        </div>
    </div> 
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.intro{
    .int_list{
        .int_item{
            background: #fff;
            margin-top: .14rem;
            .int_title{
                font-size: .3rem;
                color: #333;
                padding: .3rem;
                display: flex;
                align-items: center;
                position: relative;
                &::after{
                    content: "";
                    bottom: 0;
                    left: 0;
                    position: absolute;
                    width: 200%;
                    height: 1px;
                    border-bottom: 1px solid #ddd;
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                    -webkit-transform: scale(0.5, 0.5);
                    transform: scale(0.5, 0.5);
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;            
                }                
                .mark{
                    display: inline-block;
                    width:0.06rem;
                    height:0.26rem;
                    background:linear-gradient(90deg,rgba(254,129,86,1),rgba(255,104,75,1),rgba(255,86,55,1));
                    border-radius:0.03rem;                    
                }
                .name{
                    margin-left: .15rem;
                }
            }
            .int_con{
                font-size: .28rem;
                color: #404451;
                padding: .37rem .3rem;
            }
        }
    }
}
</style>
