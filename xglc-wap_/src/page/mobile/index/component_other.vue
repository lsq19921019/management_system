<template>
    <div class="other_wrap">
        <div class="other">
            <p class="title"><i></i>官方渠道</p>
            <div class="text">
                <div>
                    <span>官方网址</span>
                    <span>www.xiaogelicai.com</span>
                </div>
                <div>
                    <span>IP地址</span>
                    <span>112.74.228.234</span>
                </div>
                <div>
                    <span>微信公众号</span>
                    <span>小鸽服务平台</span>
                </div>
                <div>
                    <span>全新版本APP<br>上线运营时间</span>
                    <span>2017年9月</span>
                </div>
            </div>
            <p class="title"><i></i>联系我们</p>
            <div class="img">
                <p>地址：深圳市南山区高新九道北理工创新大厦1202</p>
                <img src="./images/15.jpg">
            </div>
            <div class="text">
                <div>
                    <span>全国服务热线</span>
                    <span>400-700-4007</span>
                </div>
                <div>
                    <span>投诉电话</span>
                    <span>（0755）2833-6926</span>
                </div>
                <div>
                    <span>服务时间</span>
                    <span>工作日9:00～18:30</span>
                </div>
                <div>
                    <span>客服邮箱</span>
                    <span>kefu@xiaogelicai.com</span>
                </div>
                <div>
                    <span>邮编</span>
                    <span>518000</span>
                </div>
                <div>
                    <span>品牌&商务合作<br>&媒体采访</span>
                    <span>pr@xiaogelicai.com</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">
    .other_wrap{
        background:#fff;padding-bottom:.3rem;font-size:.28rem;
        .other{
            width:6.8rem;margin:auto;color:#404451;        
            img{width:100%;}
            .title{font-weight:bold;font-size:.3rem;line-height:1.5;padding:.3rem 0;
                padding-left:.2rem;position:relative;
                i{
                    display:block;position:absolute;left:0;top:.4rem;border-radius:2px;
                    width:4px;height:.3rem;background:#ff704f;
                }
            }
            .img{
                img{
                    margin:.2rem 0;
                }
            }
            .text{
                div{
                    display:flex;
                    align-items:flex-start;
                    line-height:1.2;
                    padding:.15rem 0;
                    span:nth-child(1){
                        width:2.27rem;
                    }
                }
            }
        }
    }
</style>