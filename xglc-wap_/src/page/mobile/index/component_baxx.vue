<template>
    <div class="baxx">
        <div class="text">
            <div>
                <span class="title">存管银行</span>
                <span class="content">众邦银行</span>
            </div>
            <div>
                <span class="title">全量业务存管<br>时间</span>
                <span class="content">2017年9月</span>
            </div>
            <div>
                <span class="title">网站备案编号</span>
                <span class="content">粤ICP备14025100号-5</span>
            </div>
            <div>
                <span class="title">电信业务经营<br>许可证</span>
                <span class="content blue" style="position:relative;">粤B2-20140418<img src="./images/32.png" preview="1" preview-text="电信业务经营许可证" style="width:2.1rem;opacity:0;height:.45rem;position:absolute;left:0;"></span>
            </div>
            <div>
                <span class="title title1">可信网站认证</span>
                <span class="content"><img src="./images/11.jpg" style="width:1.14rem;height:.45rem;"></span>
            </div>
            <p>在地方金融监管部门的备案登记信息</p>
            <div>
                <span class="title">备案登记地方<br>金额监管部门</span>
                <span class="content">备案中</span>
            </div>
            <div>
                <span class="title">备案登记时间</span>
                <span class="content">备案中</span>
            </div>
            <div>
                <span class="title">备案编号</span>
                <span class="content">备案中</span>
            </div>
        </div>
        <div class="img">
            <p><i></i>信息系统安全等级保护备案证明</p>
            <div><img src="./images/12.jpg" preview="0" preview-text="信息系统安全等级保护备案证明"></div>
            <p><i></i>信息安全测评认证</p>
            <div><img src="./images/13.jpg" preview="0" preview-text="信息安全测评认证"></div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .baxx{background:#fff;}
    .text{
        padding-top:.3rem;
        color:#404451;
        width:6.8rem;margin:auto;
        p{font-weight:bold;line-height:.7rem;}
        div{
            display:flex;
            align-items:flex-start;
            line-height:1.2;
            padding:.12rem 0;
            .title{
                width:2.27rem;
            }
            .title1{padding-top:.02rem;}
            .blue{color:#1d9afa;}
        }
    }
    .img{
        color:#404451;        
        img{width:100%;}
        width:6.8rem;margin:auto;margin-top:.4rem;padding-bottom:.3rem;
        p{font-weight:bold;font-size:.3rem;line-height:1.5;padding:.3rem 0;
            padding-left:.2rem;position:relative;
            i{
                display:block;position:absolute;left:0;top:.373rem;border-radius:2px;
                width:4px;height:.3rem;background:#ff704f;
            }
        }
    }
</style>