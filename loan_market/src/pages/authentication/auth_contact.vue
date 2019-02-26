<!--
    create:luofeifei 10/20
    desc:联系人认证
-->
<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>   
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <div class="contact_list">
            <p class="contact_title">直系亲属联系人（常联系的真实号码有助于通过审核）</p>
            <ul>
                <item-li name='与本人关系' :val='selValueSalaryDate0' type='3' @click.native="showPicker(0)"></item-li>
                <item-li name='紧急联系人' type='3' :val="linkman1.split(':')[0]" @click.native="selectContact('linkman1')"></item-li>
            </ul>
            <p class="contact_title">其他联系人（常联系的真实号码有助于通过审核）</p>
            <ul>
                <item-li name='与本人关系' :val='selValueSalaryDate1' type='3' @click.native="showPicker(1)"></item-li>
                <item-li name='紧急联系人' type='3' :val="linkman2.split(':')[0]" @click.native="selectContact('linkman2')"></item-li>
            </ul>
        </div>
        <btn-com btnval='保存' @click.native='checkData'></btn-com>
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
        name : 'AuthContact',
        data() {
            return {
                isShowLoading : true,
                selectOpt: 0,
                value: null,
                picker: {
                    anchor: [],
                    textTitle: '',
                    data: [],
                    swiperTime:4000
                },               
                selValueSalaryDate0:"请选择",
                selValueSalaryDate1:"请选择",
                zxlinkList:[],
                qtlinkList:[],
                linkman1:'',
                linkman2:'',
                ZX_CONTACT_RELATION:[],    //直系联系人
                QT_CONTACT_RELATION:[]      //其他联系人
            }
        },
        components : {
            //组件
            btnCom,itemLi
        },
        created() {
            //页面渲染前         
            this.pkey().then(data=>{
                if(data == 0){
                    this.contactInfo();
                }
            })
        },
        mounted() {
            //页面加载完毕   
        },
        methods:{
            //选择联系人
            selectContact(key) {
                let _this = this;              
                this.Base.interactiveWithApp('selectContact',{}).then(data=>{
                    if(data == 'wap') {
                        console.log('selectContact','wap');
                    } else {
                        data = JSON.parse(data).result;
                        _this[key] = data.name + ':' + data.phone;
                    }
                });
            },
            //联系人查询接口
            contactInfo(){
                let _this = this;
                let data = {
                    userId:1211
                };
                this.$ajax.post('/api/contact/query',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    let resData = res.data;
                    if(resData.status == '0'){
                        if(resData.result != null) {
                            _this.selValueSalaryDate0 = _this.Base.getValue(resData.result.relation,_this.ZX_CONTACT_RELATION);
                            _this.selValueSalaryDate1 = _this.Base.getValue(resData.result.relationSpare,_this.QT_CONTACT_RELATION);
                            _this.linkman1 = resData.result.name+":"+resData.result.mobile
                            _this.linkman2 = resData.result.nameSpare+":"+resData.result.mobileSpare
                        }
                    }else{
                        this.$msg({content:resData.msg}) 
                    }
                    _this.isShowLoading = false;
                })
            },
            //  数据字典
            pkey(){
                let _this = this;
                return new Promise((resolve,reject)=>{
                    _this.$ajax.post('/api/dict/pkey',_this.$qs.stringify({pkeys:'ZX_CONTACT_RELATION,QT_CONTACT_RELATION'}),{
                        headers: _this.Base.initAjaxHeader(1,{})
                    })
                    .then(res=>{
                        let resData = res.data;
                        if(resData.status == '0'){
                            resolve(0);
                            _this.ZX_CONTACT_RELATION = resData.result.ZX_CONTACT_RELATION;
                            _this.QT_CONTACT_RELATION = resData.result.QT_CONTACT_RELATION;
                            for(let i=0;i<resData.result.ZX_CONTACT_RELATION.length;i++){
                                _this.zxlinkList.push(resData.result.ZX_CONTACT_RELATION[i].value);
                            }
                            for(let i=0;i<resData.result.QT_CONTACT_RELATION.length;i++){
                                _this.qtlinkList.push(resData.result.QT_CONTACT_RELATION[i].value);
                            }
                        }else{
                            reject(resData.status)
                        }
                    })
                })
            },            
            //数据验证
            checkData(){
                let _this = this;
                if(_this.selValueSalaryDate0=='请选择'||!_this.selValueSalaryDate0){
                    this.$msg({content:'请选择直系亲属联系人关系'})
                    return false
                }
                if(_this.linkman1 == ''){
                    this.$msg({content:'请选择直系亲属联系人'})
                    return false                    
                }
                if(_this.selValueSalaryDate1=='请选择'||!_this.selValueSalaryDate1){
                    this.$msg({content:'请选择其他联系人关系'})
                    return false
                }
                if(_this.linkman2 == ''){
                    this.$msg({content:'请选择其他联系人'})
                    return false                    
                }
                if(!_this.linkman1.split(':')[1]){
                    this.$msg({content:'直系亲属联系人号码不能为空'})
                    return false                       
                }
                if(!_this.linkman2.split(':')[1]){
                    this.$msg({content:'其他联系人号码不能为空'})
                    return false                       
                }                
                this.contactData()
            },
            //联系人保存接口
            contactData(){
                let _this = this;
                let data = {
                    name:_this.linkman1.split(':')[0],             //第一联系人姓名
                    mobile:_this.linkman1.split(':')[1],           //第一联系人电话
                    relation:_this.Base.getVkey(_this.selValueSalaryDate0,_this.ZX_CONTACT_RELATION),         //第一联系人与用户关系
                    nameSpare:_this.linkman2.split(':')[0],        //第二联系人姓名
                    mobileSpare:_this.linkman2.split(':')[1],      //第二联系人电话
                    relationSpare:_this.Base.getVkey(_this.selValueSalaryDate1,_this.QT_CONTACT_RELATION)    //第二联系人与用户关系
                };
                this.$ajax.post('/api/contact/bind',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    let resData = res.data;
                    if(resData.status == '0'){
                        this.$msg({content:'保存成功'})
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 500);
                    }else{
                        this.$msg({content:resData.msg})
                    }
                })
            },
            showPicker (nub) {
                this.selectOpt = nub;
                if(nub=='0'){
                    this.picker.data = [this.zxlinkList]
                }else if(nub=='1'){
                    this.picker.data = [this.qtlinkList]
                }
                this.$refs.picker.show();
                    
            }, 
            handlePicker0Confirm (v) {
                //this.picker.anchor = v
                this.value = v ? JSON.stringify(v) : null;
                let _this = this;
                let tempValue = '';
                v.forEach(element => {
                    tempValue += element.value;
                });
                if(this.selectOpt===0){
                    //插值;
                    this.selValueSalaryDate0 = tempValue;
                }else if(this.selectOpt===1){
                    //插值;
                    this.selValueSalaryDate1 = tempValue;
                }
            }                     
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.4rem;
        .contact_list ul{
            background: #fff;
        }
        .contact_title{
           padding: .27rem .33rem; 
        }
    }
</style>