<!--
    create:luofeifei 10/28
    desc:身份认证
-->
<template>
    <div class="page" ref="page_el">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>    
        <div class="page_title" ref="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="identity">
            <ul>
                <item-li name='身份证验证' v-if="certStatus==1" val="已验证" type='1'></item-li>
                <item-li name='身份证验证' v-else val="点此进行验证" type='3' @click.native='toYz'></item-li>
                <!-- <item-li name='身份证验证' val="点此进行验证" type='3' @click.native='toYz'></item-li> -->
                <item-li name='姓名' :val='username' type='1'></item-li>
                <item-li name='身份证号码' :val='cardid' type='1'></item-li>
                <item-li name='学历' :val='selVal' type='3' @click.native="showPicker(0)"></item-li>                
                <item-li name='现居地址' :val='delselVal1' type='3' @click.native="showPicker(1)"></item-li>
                <item-li name='详细地址' :val='nowAddress' placeholder='请输入详细地址' type='2' v-model="nowAddress"></item-li>
            </ul>
        </div>
        <btn-com btnval='保存' @click.native="checkOther"></btn-com>
        <awesome-picker
            ref="picker"
            :textTitle="picker.textTitle"
            :data="picker.data"
            :anchor="picker.anchor"
            :swipeTime="picker.swiperTime"
            @confirm="handlePicker0Confirm">
        </awesome-picker>
        <!--  省市区三级联动下拉框 -->
        <awesome-picker
            ref="picker1"
            :textTitle="picker1.textTitle"
            :data="picker1.data"
            :anchor="picker1.anchor"
            :swipeTime="picker1.swiperTime"
            @confirm="handlePicker1Confirm">
        </awesome-picker>
        <pop-coma v-show="isShowPopa"></pop-coma>      
    </div>
</template>

<script>
    import btnCom from '@/components/list/btn';
    import itemLi from '@/components/list/li';
    import AreaList from './components/area';
    import popComa from '@/components/popup/popup_a';
    export default {
        name : 'AuthIdentity',
        data() {
            return {
                isShowPopa:false,
                isShowLoading:true,
                cityList:'',
                hidden : false,
                picker: {
                    anchor: [],
                    textTitle: '',
                    data: [],
                    swiperTime:4000
                },
                picker1: {
                    anchor: [],
                    textTitle: '',
                    data: AreaList,
                    swiperTime:4000
                },                
                username:'',
                cardid:'',  
                nowAddress:'',
                selectOpt:'',    
                selVal:'请选择',
                selVal1:'请选择',
                edu_list:[],
                certStatus:'',
                SYS_EDU_TYPE:[], //学历
                toType:''
            }
        },
        components : {
            //组件
            btnCom,itemLi,popComa
        },
        created() {
            this.toType=this.$route.query.type;
            this.pkey();
        },
        mounted() {
            //页面加载完毕
            this.selIden();
            //重置页面高度  
            this.$refs.page_el.style.height=(window.screen.height-this.$refs.page_title.offsetHeight)+'px';
        },
        computed:{
            //去掉地址末尾逗号
            delselVal1:function(){
                return (this.selVal1.substring(this.selVal1.length-1)==',')?this.selVal1.substring(0,this.selVal1.length-1):this.selVal1;
            }
        },
        methods:{
            close(){
                this.isShowPopa = false;
            },            
            goBack(){
                // if(this.$route.query.type){
                //     this.$router.push({name:'Authentication'});
                // }else{
                //     this.$router.push({name:'AuthInfor'});
                // }
                this.$router.go(-1);
            },
            getPageData(){
                let data_obj = {};
                let _this = this;
                _this.$ajax.post('/api/idauth/selectOther',_this.$qs.stringify(data_obj),{headers: _this.Base.initAjaxHeader(1,data_obj)}).then(res=>{
                    console.log(res);
                });
            },
            //跳转身份证认证
            toYz(){
                // if(this.Base.getClientType().type=='wap'){
                //     this.isShowPopa = true;
                //     return false;
                // }
                // this.$router.push({name:'IdentityProve',query:{type:4}});
                this.$router.push({name:'newIdentity'});
            },
            showPicker (nub) {
                if(nub == 1){
                    this.$refs.picker1.show();
                }else{
                    this.$refs.picker.show();
                }
                if(nub == '0'){
                    this.picker.data = [this.edu_list]
                }
                this.selectOpt = nub;
            }, 
            handlePicker0Confirm (v) {
                //this.picker.anchor = v
                this.value = v ? JSON.stringify(v) : null;
                let _this = this;
                let tempValue = '';
                v.forEach(element => {
                    tempValue += element.value;
                });
                if(this.selectOpt==0){
                    //插值;
                    this.selVal = tempValue;
                }else{
                    //插值;
                }                          
            },
            //给下拉框赋值；
            handlePicker1Confirm(v){
                this.value = v ? JSON.stringify(v) : null;
                let _this = this;
                _this.selValue = '';
                v.forEach(element => {
                    if(element.value){
                        _this.selValue += element.value+',';
                    }
                });
                if(this.selectOpt==1){
                    _this.selVal1 = _this.selValue;
                }else{
                    
                }
            },
            //数据字典
            pkey(){
                let _this = this;
                let data = {
                    pkeys:'SYS_EDU_TYPE'
                }
                this.$ajax.post('/api/dict/pkey',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res =>{
                    let resData = res.data;
                    if(resData.status == '0'){
                        let arr = resData.result.SYS_EDU_TYPE
                        //学历
                        _this.SYS_EDU_TYPE = resData.result.SYS_EDU_TYPE;
                        for(let i=0;i<arr.length;i++){
                            _this.edu_list.push(arr[i].value)
                        }
                    }
                })
            },
            //身份认证查询接口
            selIden(){
                let _this = this;
                let data = {
                   
                };
                this.$ajax.post('/api/idauth/selectOther',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    let resData = res.data;
                    if(resData.status == '0'){
                        if(resData.result != null) {
                            _this.username = resData.result.userName;
                            _this.cardid = resData.result.cardId;
                            _this.selVal = _this.Base.getValue(resData.result.education,_this.SYS_EDU_TYPE)||'请选择';
                            _this.selVal1 = resData.result.nowZone||'请选择';
                            _this.nowAddress = resData.result.nowAddress;
                            _this.certStatus = resData.result.certStatus;
                        }
                        _this.isShowLoading = false;
                    }else{
                        this.$msg({content:resData.msg})
                    }
                })
            },
            // 验证
            checkOther(){
                let _this = this
                if(_this.selVal=='请选择'||!_this.selVal){
                    this.$msg({content:"请选择学历"})
                    return false
                }
                if(_this.selVal1=='请选择'||!_this.selVal1){
                    this.$msg({content:"请选择现居地址"})
                    return false
                }
                if(!_this.nowAddress){
                    this.$msg({content:"请填写详细地址"})
                    return false
                }
                _this.saveOther()
            },
            //身份认证保存接口
            saveOther(){
                let _this = this;
                let data = {
                   workType:'', //工作类型
                   education:_this.Base.getVkey(_this.selVal,_this.SYS_EDU_TYPE),    //教育程度
                   nowZone:_this.selVal1,  //现居住区域
                   nowAddress:_this.nowAddress    //现居住地址
                };
                this.$ajax.post('/api/idauth/saveOther',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    let resData = res.data;
                    if(resData.status == '0'){
                        this.$msg({content:"保存成功"});
                        if(this.toType == 3){   //跳平台详情
                            setTimeout(() => {
                                _this.$router.push({name:'PlatformDetail',params : { id : localStorage.getItem('pfNo') }});
                            }, 500);
                        }else if(this.toType == 2){ //跳我的-我的资料
                            this.$router.push({ name : 'AuthInfor'});
                        }else{  //跳认证首页
                            setTimeout(() => {
                                _this.$router.push({name:'Authentication'});
                            }, 500);
                        }
                    }else{
                        this.$msg({content:resData.msg})
                    }
                })                
            },
            //显示弹窗；
            show_alert(){
                this.hidden=true;
            },
            //获取从子弹窗组件传过来的值；
            hide_alert(data){
                this.hidden=data;
            },
            postFormData(){
                this.addressDetail;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.6rem;
        .identity{           
            background: #fff;
        }
    }
</style>