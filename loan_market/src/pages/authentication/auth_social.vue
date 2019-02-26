<!--
    create:luofeifei 10-24
    desc:社交信息
-->
<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>   
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="social">
            <p class="social_title">为保证借款申请顺利通过，请务必填写真实信息</p>
            <div class="social_list">
                <ul>
                    <item-li type='2' :val="email" name='常用邮箱' placeholder='请输入邮箱' v-model="email"></item-li>
                    <item-li type='2' :val="qq" name='QQ账号' placeholder='请输入QQ账号' v-model="qq"></item-li>
                    <item-li type='2' :val="wechart" name='微信账号' placeholder='请输入微信账号' v-model="wechart"></item-li>
                </ul>
            </div>
        </div>
        <btn-com btnval='保存' @click.native="verifyInfo"></btn-com>
    </div>
</template>

<script>
    import btnCom from '@/components/list/btn';
    import itemLi from '@/components/list/li';
    export default {   
        name : 'AuthIdentity3',
        data() {
            return {
                isShowLoading : true,
                isNone:/^\S*$/,
                patrn:/^[0-9]*$/,
                isNub:/^[^\u4e00-\u9fa5]+$/,
                email:'',
                qq:'',
                wechart:'',        
            }
        },
        components : {
            //组件
            btnCom,itemLi
        },
        created() {
            //页面渲染前
            this.selSocial()
        },
        mounted() {
            //页面加载完毕
        },
        methods:{
            // 验证信息
            verifyInfo(){
                let _this = this
                let regs = this.Base.regs;
                if(!_this.email && !_this.qq && !_this.wechart){
                    this.$msg({content:"请填写一项社交信息"})
                }else if(!regs.email.test(_this.email)&&_this.email.length>0){
                    this.$msg({content:"请填写正确的邮箱"})
                }else if(!_this.patrn.test(_this.qq)&&_this.qq.length>0){
                    this.$msg({content:"请填写正确的QQ账号"})
                }else if(!_this.isNub.test(_this.wechart)&&_this.wechart.length>0){
                    this.$msg({content:"请填写正确的微信账号"})
                }else{
                     _this.upSocial();                  
                }
            },
            // 保存社交信息接口
            upSocial(){
                let _this = this;
                let data = {
                    userId:12027,
                    email:_this.email,
                    qq:_this.qq,
                    wechart:_this.wechart.replace(/\s/g,'')
                }
                this.$ajax.post('/api/socialinfo/bind',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    let resData = res.data;              
                    if(resData.status == '0'){
                        this.$msg({content:"保存成功"})
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 500);
                    }else{
                        this.$msg({content:resData.msg})
                    }
                })           
            },
            //查询社交信息接口
            selSocial(){
                let _this = this;
                let data = {}
                this.$ajax.post('/api/socialinfo/query',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res =>{
                    let resData = res.data
                    if(resData.status=='0'){
                        if(resData.result!=null){
                            _this.email = resData.result.email||'';
                            _this.qq = resData.result.qq||'';
                            _this.wechart = resData.result.wechart||'';
                        }
                    }
                    _this.isShowLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.4rem;
        .social{
            .social_title{
                padding: .26rem .33rem;
                font-size:.28rem;
                font-weight:500;
                color:rgba(168,170,178,1);
                line-height:1;                
            }
            .social_list{
                background: #fff;
            }
        }
    }
</style>