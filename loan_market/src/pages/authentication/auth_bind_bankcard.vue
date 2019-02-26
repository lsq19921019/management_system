<template>
    <div>
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="base_info">
            <ul> 
                <item-li name='姓名' :val='uname' type='1'></item-li>
                <item-li name='请选择银行卡' :val='selVal' type='3' @click.native="showPicker(0)"></item-li> 
                <item-li name='银行卡号' type='2' placeholder='请输入银行卡号' v-model="bankNo" :val='bankNo' @input="getVal"></item-li>
                <item-li name='手机号' :val='phone' type='1'></item-li>
            </ul>
        </div>
        <btn-com btnval='确认绑卡' @click.native="bindCardConfirm"></btn-com>
        
        <awesome-picker
            ref="picker"
            :textTitle="picker.textTitle"
            :data="picker.data"
            :anchor="picker.anchor"
            :swipeTime="picker.swiperTime"
            @confirm="handlePicker0Confirm">
        </awesome-picker>
        <transition name="fade">
            <div v-if='showVerifyBox' class="inp_yzm">
                <div class="inp_box">
                    <div class="inp_txt">请输入验证码&nbsp;&nbsp;&nbsp;
                        <input class="inp_con" v-model="captcha" type="text" maxlength="6"/>
                    </div>
                    <div class="inp_btn">
                        <div @click="hideVerifyBox" class="close">取消</div>
                        <div @click="sendVerifyCodeFun" class="confirm">确认</div>
                    </div>
                </div>
            </div>
        </transition>          
    </div>
</template>
<script>
    import btnCom from '@/components/list/btn';
    import itemLi from '@/components/list/li';
    import popCom from '@/components/popout';
export default {
        name : 'bindCard',
    data(){
        return{
            inputVerifyCode: '',
            phone:localStorage.getItem('_mobile'),
            uname:'',
            realName:'',
            bankNo:'',
            selVal:'请选择',
            selCode:'',
            picker:{
                data:[],
                anchor: [],
                textTitle:'',
                swiperTime:400,
            },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            value:'',
            bankList:[],
            showVerifyBox:false,
            orderNo:this.$route.params.orderNo,
            pfNo:localStorage.getItem('pfNo'),
            captcha:''
        }
    },
    components:{
        btnCom,itemLi,popCom
    },
    created(){
        // this.getData();
        this.getBankList();
    },
    mounted(){
    },
    methods:{
        hideVerifyBox(){
            this.showVerifyBox = false;
        },        
        sendVerifyCodeFun(){
            let _this = this;
            if(!_this.captcha){
                _this.$msg({content:'验证码不能为空!'});
                return;
            }
            let data = {
                userName: this.realName,
                bankCode: this.selCode,
                cardNo: this.bankNo,
                bankName:this.selVal,
                bindPhoneNo:this.phone,
                pfNo:this.pfNo,
                orderNo:this.orderNo,  
                captcha:this.captcha,            
            }
            this.$ajax.post('/api/order/bindCard',_this.$qs.stringify(data),{
                headers: _this.Base.initAjaxHeader(1,data)
            })
            .then(res=>{
                if(res.data.result!=null){
                    if(res.data.result.bind){
                        this.$msg({content:'绑卡成功'});
                        setTimeout(_=>{
                            _this.$router.go(-1);
                        },500);
                    }else{
                        this.$msg({content:res.data.result.tip});
                    }
                }else{
                    this.$msg({content:res.data.msg});
                }
                this.showVerifyBox = false;
                console.log(data);
            });            
        },
        openAlert(){
            this.dialogConfig.isShow = true;
        },
        closeAlert(){
            this.dialogConfig.isShow = false;
        },
        bindCardConfirm(){
            let _this = this;
            if(this.selVal==='请选择'){
                this.$msg({content:'请选择银行！'});
                return;
            }
            if(!this.Base.regs.bankNo.test(this.bankNo)){
                this.$msg({content:'银行卡格式错误！'});
                return;
            }
            let data = {
                userName: this.realName,
                bankCode: this.selCode,
                cardNo: this.bankNo,
                bankName:this.selVal,
                bindPhoneNo:this.phone,
                pfNo:this.pfNo,
                orderNo:this.orderNo,
                // repayPeriods:'',
                
                captcha:'',
                // verifyCode:'',
            };
            this.$ajax.post('/api/order/bindCard',_this.$qs.stringify(data),{
                headers: _this.Base.initAjaxHeader(1,data)
            })
            .then(res=>{
                console.log(data);
                if(res.data.result!=null){
                    if(res.data.result.yzm){
                        this.showVerifyBox = true
                    }else{
                        this.$msg({content:res.data.result.tip});
                    }
                }else{
                    this.$msg({content:res.data.msg});
                }      
            },err=>{
                console.log(err);
                this.$msg({content:res.data.msg});
            });
        },
        getVal(){
            console.log(this.idnum);
        },
        getBankList(){
                let _this = this;
                let data = {
                   pfNo:this.pfNo
                };
                this.$ajax.post('/api/order/bindCardBanKList',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                })
                .then(res=>{
                    if(res.data.status==='0'){
                        _this.uname = res.data.result.userName;
                        _this.realName = res.data.result.realName
                        //_this.bankList = JSON.parse(res.data.result.bankJson);
                        _this.bankList = res.data.result.bankJson;
                        let bankSelList = [];
                        _this.bankList.forEach((v,i)=>{
                            bankSelList.push({value:v.bank_name,code:v.bank_code}); 
                        })                        
                        _this.picker.data=bankSelList;
                    }
                });
        },
        showPicker(){   
            this.$refs.picker.show();
        },
        handlePicker0Confirm(v){
            this.picker.anchor = v
            this.value = v ? JSON.stringify(v) : null;
            let _this = this;
            let tempValue = '';
            let tempCode = '';
            v.forEach(element => {
                tempValue += element.value;
                tempCode += _this.picker.data[element.index].code;     
            });
            this.selVal = tempValue;
            this.selCode = tempCode;
        }
    }
}
</script>
<style lang="scss" scoped>
    .base_info{
        background: #fff;
        margin-top: 1.6rem;
    }
    .inp_yzm{
        position:fixed;
        top:0rem;
        display:flex;
        align-items:center;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        .inp_box{
            text-align:center;
            border:1px solid #ccc;
            background:rgba(255,255,255,1);
            width:5.3rem;margin:0 auto;
            box-sizing:border-box;
            border-radius:.2rem;
            position:relative;
            .inp_txt{
                text-align:center;
                padding:.5rem 0;
                font-size:.3rem;
                line-height:.6rem;
                color:#2d2d2d;
                .inp_con{
                    border:1px solid #ccc;
                    text-indent:.2rem;
                    -webkit-appearance: none;
                    width:2.18rem;
                    height:.6rem;
                    line-height:.6rem;
                }
            }
            .inp_btn{
                width:100%;
                font-size:.34rem;
                overflow:hidden;
                border-top:1px solid #ccc;
                line-height:.9rem;
                .close{
                    width:50%;
                    float:left;
                }
                .confirm{
                    width:50%;
                    float:left;
                    box-sizing:border-box;
                    border-left:1px solid #ccc;
                    color:#527bec;
                }
            }
        }
    }
</style>
