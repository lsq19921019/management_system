<template>
    <div class="img_code">
        <div class="content">
            <a @click="handelerFade" href="javascript:;" class="off"></a>
            <p class="title">请输入图形验证码</p>
            <div class="ipts por">
                <input type="text" placeholder="请输入图形验证码" maxlength="4" v-model="imgCode">
                <img :src="imgCodeSrc" @click="getImgCode(mobile)" alt="">
            </div>
            <button @click="sendImgCodeToParent">确定</button>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'ImgCode',
        data() {
            return {
                imgCode : '',
                imgCodeSrc : '',
                apiPath : {                    
                    imgCode : '/api/message/image_code'
                }
            }
        },
        props : {
            mobile : ''
        },
        created() {
            this.getImgCode(this.mobile);
        },
        methods : {
            //通过修改发送次数显示隐藏图形验证码弹窗
            handelerFade() {
                this.$emit('hideImgCode');
            },
            //调用父组件发送短信验证码方法
            handelerGetCode() {
                this.$emit('getCode');
            },
            //获取图像验证码
            getImgCode(mobile) {
                let regs = this.Base.regs;
                if(this.mobile.length < 1) {
                    this.$msg({ content : '请输入手机号' });
                    return;
                } else if(!regs.mobile.test(this.mobile)) {
                    this.$msg({ content : '请输入正确的手机号' });
                    return;
                }
                let _this = this;
                //请求图片验证码
                let data  = {
                    cellphone : this.mobile
                };
                this.$ajax.post(this.apiPath.imgCode,this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(0,data)
                }).then(res=>{
                    if(res.data.status == 0) {
                        _this.imgCodeSrc = 'data:image/png;base64,'+res.data.result;
                    } else {
                        _this.$msg({ content : res.data.msg });
                    }
                });
            },
            //向父组件传递图形验证码
            sendImgCodeToParent() {
                if(this.imgCode.length < 1) {
                   this.$msg({ content : '请输入图形验证码' });
                   return;
                };
                this.$emit('getImgCode',this.imgCode);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .img_code{
        position:fixed;
        width:100%;
        height:100%;
        background:rgba(0,0,0,.5);
        top:0;
        left:0;
        display:flex;
        justify-content:center;
        align-items:center;
        .content{
            background:#fff;
            position:relative;
            border-radius:.05rem;
            width:5rem;
            padding:.3rem;
            .off{
                display:block;
                width:.26rem;
                height:.26rem;
                background:url(../../assets/module/off_img_code.png) no-repeat; 
                background-size:.26rem; 
                position:absolute;
                top:.15rem;
                right:.15rem; 
            }
            .title{
                font-size:.32rem;

            }
            .ipts{
                margin-top:.3rem;
                input{
                    border:1px solid #efefef;
                    height:.48rem;
                    line-height:.48rem;
                    padding:.2rem;
                    font-size:.28rem;
                    width:2.45rem;
                }
                img{
                    width:1.88rem;
                    height:.88rem;
                    border:1px solid #efefef;
                    position:absolute;
                    right:0;
                    top:0;

                }
            }
            button{
                background:#527BEC;
                color:#fff;
                border-radius:.45rem;
                font-size:.32rem;
                margin-top:.4rem;
                width:100%;
                text-align:center;
                line-height:.9rem;
            }
        }
        
    }
</style>