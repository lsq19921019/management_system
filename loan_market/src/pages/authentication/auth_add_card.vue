<!--
    create:luofeifei 10/29
    desc:信用卡认证
-->
<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>   
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="addcard1">
            <item-li name='姓名' :val='username' type='1'></item-li>
            <item-li name='请选择银行' type='3' :val='selValueSalaryDate' @click.native="showPicker(0)"></item-li>
            <item-li name='银行卡号' :val='bankNo' placeholder='请输入信用卡卡号' type='2' v-model="bankNo"></item-li>
            <item-li name='手机号' :val='bankMobile' placeholder='请输入银行预留手机号' type='2' v-model="bankMobile" maxlen='11'></item-li>
            <li>
                <div class="item_con">
                    <span class="key">验证码</span>
                    <input type="text" placeholder='请输入验证码' maxlength="6" v-model="yzm"/>
                    <div class="btn">
                        <button v-show="sendAuthCode" @click="getAuthCode">点击获取</button>
                        <span class="sBtn" v-show="!sendAuthCode">{{ auth_time }}s</span>
                    </div>            
                </div>
                <div class="item_line"></div>
            </li>
        </div>
        <btn-com btnval='确认绑卡' @click.native='checkData'></btn-com>
        <awesome-picker
            ref="picker"
            :textTitle="picker.textTitle"
            :data="picker.data"
            :anchor="picker.anchor"
            :swipeTime="picker.swiperTime"
            @confirm="handlePicker0Confirm">
        </awesome-picker>        
    </div>
</template>

<script>
    import btnCom from '@/components/list/btn';
    import itemLi from '@/components/list/li';
    export default {
        name : 'AuthAddCard',
        data() {
            return {
                isShowLoading : true,
                sendAuthCode:true,
                auth_time: 0,               
                picker: {
                    anchor: [],
                    textTitle: '',
                    data: [],
                    swiperTime:4000
                },
                listData : [],
                username:'',             
                selValueSalaryDate:'请选择银行',
                bankNo:'',
                bankMobile:'',
                yzm:'',
                SYS_BANK:[] //银行卡列表
            }
        },
        components : {
            //组件
            btnCom,itemLi
        },
        created() {
            //页面渲染前
            this.selCard();
            this.bankname();
        },
        mounted() {
            //页面加载完毕   
        },
        methods:{
            //验证码倒计时
            getAuthCode(){
                this.bindCode();
            },
            //获取验证码接口
            bindCode(type){
                let _this = this;
                let regs = this.Base.regs;
                if(_this.selValueSalaryDate=='请选择银行'||!_this.selValueSalaryDate){
                    this.$msg({content : '请选择银行'})
                    return false
                }                
                if(!_this.bankNo){
                    this.$msg({content : '请输入信用卡号'})
                    return false
                }
                if(!regs.bankNo.test(_this.bankNo)){
                    this.$msg({content : '信用卡号有误'})
                    return false
                }
                if(!_this.bankMobile){
                    this.$msg({content : '请输入手机号'})
                    return false
                }
                if(!regs.mobile.test(_this.bankMobile)){
                    this.$msg({content : '手机号格式有误'})
                    return false
                }
                let data = {
                    type:9,
                    callphone:localStorage.getItem("_mobile")
                };
                _this.$ajax.post('/api/message/sms_code',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    console.log(res)
                    let resData=res.data;
                    if(resData.status == '0'){
                        this.$msg({content:'发送成功'})
                        this.sendAuthCode = false;
                        this.auth_time = 60;
                        let auth_timetimer = setInterval(()=>{
                            this.auth_time--;
                            if(this.auth_time<=0){
                                this.sendAuthCode = true;
                                clearInterval(auth_timetimer)
                            }
                        },1000)                        
                    }else{
                        this.$msg({content:resData.msg})
                    }
                })
            },                       
            showPicker (nub) {
                this.$refs.picker.show();
                this.picker.data = [this.listData]
                // if(type==='work_type'){
                    
                // }
            },
            handlePicker0Confirm (v) {
                this.picker.anchor = v
                this.value = v ? JSON.stringify(v) : null;
                let _this = this;
                _this.selValueSalaryDate = '';
                v.forEach(element => {
                    _this.selValueSalaryDate += element.value;
                });
            },
            //检查数据
            checkData(){
                let _this = this;
                let regs = this.Base.regs;
                if(_this.selValueSalaryDate=='请选择银行'||!_this.selValueSalaryDate){
                    this.$msg({content : '请选择银行'})
                    return false
                }
                if(!_this.bankNo){
                    this.$msg({content : '请输入信用卡号'})
                    return false
                }
                if(!regs.bankNo.test(_this.bankNo)){
                    this.$msg({content : '信用卡号有误'})
                    return false
                }
                if(!_this.bankMobile){
                    this.$msg({content : '请输入手机号'})
                    return false
                }
                if(!regs.mobile.test(_this.bankMobile)){
                    this.$msg({content : '手机号格式有误'})
                    return false
                }
                if(!_this.yzm){
                    this.$msg({content : '请输入验证码'})
                    return false
                }
                if(!regs.msgCode.test(_this.yzm)){
                    this.$msg({ content : '请输入正确的手机验证码' })
                    return false
                }              
                _this.bindCard();
            },
            //数据字典
            bankname(){
                let _this = this;
                let data = {
                    pkeys:'SYS_BANK'
                }
                this.$ajax.post('/api/dict/pkey',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    let resData = res.data;
                    if(resData.status == '0'){
                        _this.SYS_BANK = resData.result.SYS_BANK;
                        for(let i=0;i<resData.result.SYS_BANK.length;i++){
                            this.listData.push(resData.result.SYS_BANK[i].value)
                        }
                    }
                })
            },          
            //信用卡查询接口
            selCard(){
                let _this = this;
                let data = {
                    userId:1211
                }
                this.$ajax.post('/api/creditcard/query',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res =>{
                    let resData = res.data
                    console.log(resData)
                    if(resData.status == '0'){
                        if(resData!=null){
                            _this.username = resData.result.name;
                            _this.selValueSalaryDate = _this.Base.getValue(resData.result.bank,_this.SYS_BANK)||'请选择银行';
                            _this.bankNo = resData.result.bankNo;
                            _this.bankMobile =resData.result.bankMobile;
                        }
                    }
                    _this.isShowLoading = false;
                })
            },
            //信用卡保存接口
            bindCard(){
                let _this = this;
                let data = {
                    bank:_this.Base.getVkey(_this.selValueSalaryDate,_this.SYS_BANK),        //银行
                    bankNo:_this.bankNo,      //银行卡号
                    bankMobile:_this.bankMobile,  //银行预留号码
                    msgCode:_this.yzm     //验证码
                }
                this.$ajax.post('/api/creditcard/bind',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res =>{
                    let resData = res.data
                    if(resData.status == '0'){
                        console.log(res)
                        this.$msg({content:'绑卡成功'})
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 500);
                    }else{
                        this.$msg({content:resData.msg})
                    }
                })                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.5rem;
        .addcard1{
            background: #fff;
        }
    }
        li{
        margin-left: .33rem; 
        .item_line{
            position: relative;
            &::before{
                content: '';
                position: absolute;
                width: 200%;
                height: 200%;
                border-bottom: 1px solid #e6e6e6;
                -webkit-transform-origin: 0 0;
                -moz-transform-origin: 0 0;
                -ms-transform-origin: 0 0;
                -o-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scale(0.5, 0.5);
                -ms-transform: scale(0.5, 0.5);
                -o-transform: scale(0.5, 0.5);
                transform: scale(0.5, 0.5);
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }              
        }
        &:last-child{
            .item_line{
                &::before{
                    border-bottom:none;
                }
            }
        }      
        .item_con{
            display: flex;
            justify-content: space-between;
            align-items: center;  
            padding: .35rem .34rem .34rem 0;
            .key{
                font-size: .32rem;
                font-weight:500;
                color:rgba(62,71,93,1);
                line-height: 1;
                display: inline-block;
            }
            .val{
                font-size:.28rem;
                font-weight:500;
                color:rgba(62,71,93,1);
                line-height: 1;
                .icon_img{
                    width: .12rem;
                    height: .22rem;
                    margin-left: .17rem;
                }       
            }
            .right{
                display: flex;
                align-items: center;
                color: #3E475D;
            }
            input{
                font-size:.28rem;
                font-weight:500;
                color:#3E475D;
                text-align:right;
                line-height: 1.2;
            }
            .placetype{
                &::placeholder{text-align: left!important;};
            }
        }
        .flextype{
            justify-content: flex-start!important;
        }
    }
    .btn{
    text-align: center;
    button{
        width:1.58rem;
        height:.6rem;
        background:rgba(82,123,236,1);
        border-radius:.3rem;
        color: #FFF;
        font-size: .24rem;
    };
    .sBtn{
        width:1.58rem;
        height:.6rem;
        background:rgba(53,87,181,1);
        border-radius:.3rem;
        color: #FFF;
        font-size: .24rem;
        display: inline-block;
        line-height: .6rem;   
    }
}
    input::-webkit-input-placeholder{
        color:#ccc;
    }
    input::-moz-placeholder{
        color:#ccc;
    }
    input:-moz-placeholder{
        color:#ccc;
    }
    input:-ms-input-placeholder{
        color:#ccc;
    }
</style>