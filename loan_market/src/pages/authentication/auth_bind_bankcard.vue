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
        
        <transition name="fade" >
            <pop-com v-if="dialogConfig.isShow" :config="dialogConfig" v-on:parentSure="open" v-on:parentOff="clons"></pop-com>
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
            phone:localStorage.getItem('_mobile'),
            uname:'',
            bankNo:'',
            selVal:'请选择',
            selCode:'',
            picker:{
                data:[],
                anchor: [],
                textTitle:'',
                swiperTime:400,
            },
            dialogConfig : {
                    btns : ['取消','确定'],
                    isShow:false,
                    showTitle : true,
                    title : '温馨提示',
                    isShow:false,
                    content : '<span style="line-height:1.5">一旦实名认证通过，相关信息不允许修改，是否确认进行实名认证？</span>'
                },   
            value:'',
            bankList:[],
            pfNo:this.$route.params.orderNo 
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
                userName: this.uname,
                bankCode: this.selCode,
                cardNo: this.bankNo,
                bindPhoneNo:this.phone,
                pfNo:this.pfNo,
                // repayPeriods:'',
                
                captcha:'',
                // verifyCode:'',
            };
            this.$ajax.post('/api/order/bindCard',_this.$qs.stringify(data),{
                headers: _this.Base.initAjaxHeader(1,data)
            })
            .then(res=>{
                console.log(data);
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
                        _this.bankList = JSON.parse(res.data.result.bankJson);
                        let bankSelList = [];
                        _this.bankList.forEach((v,i)=>{
                            bankSelList.push({value: v.bank_name, index:v.bank_code}); 
                        })
                        _this.picker.data = bankSelList;
                        console.log(_this.bankList);
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
                tempCode += element.index;
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
</style>
