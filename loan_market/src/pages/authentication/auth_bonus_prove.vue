<!--
    create:luofeifei 10-24
    desc:加分认证
-->
<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>   
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="prove">
            <ul>
                <li>
                    <div class="item_con">
                        <span class="key" style="min-width:1.8rem">住宅电话</span>
                        <div class="phone">
                            <input type="tel" class="phone1" placeholder="区号" v-model='val1'/>
                            <span class="spl">-</span>
                            <input type="tel" class="phone2" placeholder="电话号码" v-model='val2'/>
                            <span class="spl">-</span>
                            <input type="tel" class="phone3" placeholder="分机号" v-model='val3'/>
                        </div>           
                    </div>
                    <div class="item_line"></div>
                </li>
                <item-li type="3" :val='selValueSalaryDate0' name="居住时长" @click.native="showPicker(0)"></item-li>
                <item-li type="3" :val='selValueSalaryDate1' name="住宅类型" @click.native="showPicker(1)"></item-li>
                <item-li type="3" :val='selValueSalaryDate2' name="车辆信息" @click.native="showPicker(2)"></item-li>
                <item-li type="3" v-show="hasCar" :val='selValueSalaryDate3' name="车辆状况" @click.native="showPicker(3)"></item-li>
                <item-li type="2" v-show="hasCar" :val='carNo' name="车牌号" placeholder="请输入车牌号" v-model="carNo"></item-li>
                <item-li type="3" :val='selValueSalaryDate4' name="婚姻状况" @click.native="showPicker(4)"></item-li>
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
        name : 'AuthIdentity3',
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
                isNub:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
                listData0:[],
                listData1:[],
                listData2:[], 
                listData3:[], 
                listData4:[],
                selValueSalaryDate0:'请选择',
                selValueSalaryDate1:'请选择',
                selValueSalaryDate2:'请选择',
                selValueSalaryDate3:'请选择',
                selValueSalaryDate4:'请选择',
                val1:'',
                val2:'',
                val3:'',
                carNo:'',           //车牌号
                hasCar:true,
                ADD_CAR_STATUS : [],  //车贷类型
                ADD_MARRIAGE : [],  //婚姻状况
                ADD_HOUSE_TYPE : [],  //住宅类型
                ADD_LIVE_TIME:[],    //居住时长
                ADD_CAR_INFO:[],    //车辆信息
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
                    this.selProve();
                }
            },data=>{

            });
        },
        mounted() {
            //页面加载完毕
            //this.selProve();
                   
        },
        methods:{
            getInp(data){
                console.log(data)
            },
            //检查数据
            checkData(){
                let _this = this;
                let regs = this.Base.regs;
                if(_this.val1.length>0&&!regs.phoZone.test(_this.val1)){
                    this.$msg({content:'号码区号格式有误'})
                    return false;
                }
                if(_this.val2.length>0&&!regs.phoneNo.test(_this.val2)&&_this.val1.length>0){
                    this.$msg({content:'电话号码格式有误'})
                    return false;
                }
                if(_this.carNo.length>0&&!_this.isNub.test(_this.carNo)){
                    this.$msg({content:'车牌号格式有误'})
                    return false;
                }
                this.proveData()
            },
            //加分认证接口
            proveData(){
                let _this = this;
                let data = {
                    homePhoneArea:_this.val1||'',  //区号
                    homePhone:_this.val2||'',       //电话号码
                    homePhoneExtend:_this.val3||'',    //分机号
                    carInfo:_this.Base.getVkey(_this.isStr(_this.selValueSalaryDate2),_this.ADD_CAR_INFO),         //车辆信息
                    carStatus:_this.Base.getVkey(_this.isStr(_this.selValueSalaryDate3),_this.ADD_CAR_STATUS),     //车辆状况  
                    carNo:_this.carNo||'',           //车牌号
                    liveTime:_this.Base.getVkey(_this.isStr(_this.selValueSalaryDate0),_this.ADD_LIVE_TIME),        //居住时间
                    homeType:_this.Base.getVkey(_this.isStr(_this.selValueSalaryDate1),_this.ADD_HOUSE_TYPE),        //住宅类型 ADD_HOUSE_TYPE
                    maritalStatus:_this.Base.getVkey(_this.isStr(_this.selValueSalaryDate4),_this.ADD_MARRIAGE),    //婚姻状况
                };
                this.$ajax.post('/api/bonusinfo/bind',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res =>{
                    if(res.data.status =='0'){
                        this.$msg({ content : '信息保存成功' });
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 500);
                    }else{
                        this.$msg({ content : res.data.msg });
                    }
                })
            },
            //数据字典查询
            pkey(){
                let _this = this;
                return new Promise((resolve,reject)=>{
                    _this.$ajax.post('/api/dict/pkey',_this.$qs.stringify({pkeys:'ADD_CAR_STATUS,ADD_MARRIAGE,ADD_HOUSE_TYPE,ADD_LIVE_TIME,ADD_CAR_INFO'}),{
                        headers: _this.Base.initAjaxHeader(1,{})
                    })
                    .then(res=>{
                        let resData = res.data;
                        if(resData.status == '0'){
                            resolve(0);
                            //车贷类型
                            _this.ADD_CAR_STATUS = resData.result.ADD_CAR_STATUS;
                            //住宅类型
                            _this.ADD_HOUSE_TYPE = resData.result.ADD_HOUSE_TYPE;
                            //婚姻状况
                            _this.ADD_MARRIAGE = resData.result.ADD_MARRIAGE;
                            //居住时长
                            _this.ADD_LIVE_TIME = resData.result.ADD_LIVE_TIME;
                            //车辆信息
                            _this.ADD_CAR_INFO = resData.result.ADD_CAR_INFO;
                            //车辆状况
                            for(let i=0;i<resData.result.ADD_CAR_STATUS.length;i++){
                                _this.listData3.push(resData.result.ADD_CAR_STATUS[i].value);
                            }
                            //婚姻状况
                            for(let i=0;i<resData.result.ADD_MARRIAGE.length;i++){
                                _this.listData4.push(resData.result.ADD_MARRIAGE[i].value);
                            }
                            //住宅类型
                            for(let i=0;i<resData.result.ADD_HOUSE_TYPE.length;i++){
                                _this.listData1.push(resData.result.ADD_HOUSE_TYPE[i].value);
                            }
                            //居住时长
                            for(let i=0;i<resData.result.ADD_LIVE_TIME.length;i++){
                                _this.listData0.push(resData.result.ADD_LIVE_TIME[i].value);
                            }
                            //车辆信息
                            for(let i=0;i<resData.result.ADD_CAR_INFO.length;i++){
                                _this.listData2.push(resData.result.ADD_CAR_INFO[i].value);
                            } 
                        }else{
                            reject(resData.status)
                        }           
                    })
                })
            },
            //用户添加加分信息-查询
            selProve(){
                let _this = this;
                let data = {};
                this.$ajax.post('/api/bonusinfo/query',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res =>{
                    let resData = res.data.result;
                    if(res.data.status == '0'){
                        if(res.data.result!=null){
                            _this.hasCar = resData.carInfo == '1' ? false : true;
                            _this.val1 = resData.homePhoneArea||'';
                            _this.val2 = resData.homePhone||'';
                            _this.val3 = resData.homePhoneExtend||'';
                            _this.selValueSalaryDate2 = _this.Base.getValue(resData.carInfo,_this.ADD_CAR_INFO)||'请选择';
                            _this.selValueSalaryDate3 = _this.Base.getValue(resData.carStatus,_this.ADD_CAR_STATUS)||'请选择';
                            _this.carNo = resData.carNo||'';
                            _this.selValueSalaryDate0 = _this.Base.getValue(resData.liveTime,_this.ADD_LIVE_TIME)||'请选择';
                            _this.selValueSalaryDate1 = _this.Base.getValue(resData.homeType,_this.ADD_HOUSE_TYPE)||'请选择';
                            _this.selValueSalaryDate4 = _this.Base.getValue(resData.maritalStatus,_this.ADD_MARRIAGE)||'请选择';
                        }
                        _this.isShowLoading = false;
                    }else{
                        _this.$msg({content:res.data.msg})
                    }
                })
            },
            isStr(str){
                if(str == '请选择'){
                    str = ''
                }
                return str
            },
            showPicker (nub) {
                this.selectOpt = nub;
                this.$refs.picker.show();
                if(nub == '0'){
                    this.picker.data = [this.listData0]
                }
                else if(nub == '1'){
                    this.picker.data = [this.listData1]
                }
                else if(nub == '2'){
                    this.picker.data = [this.listData2]
                }
                else if(nub == '3'){
                    this.picker.data = [this.listData3]
                }
                else if(nub == '4'){
                    this.picker.data = [this.listData4]
                }
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
                }else if(this.selectOpt===2){
                    this.selValueSalaryDate2 = tempValue;
                    if(this.selValueSalaryDate2=='无自主产权汽车'){
                        this.hasCar = false
                    }else{
                        this.hasCar = true
                    }
                    //插值;
                }else if(this.selectOpt===3){
                    this.selValueSalaryDate3 = tempValue;
                    //插值;
                }else if(this.selectOpt===4){
                    this.selValueSalaryDate4 = tempValue;
                    //插值;
                }                          
            },
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.6rem;
        .prove{
            background: #fff;
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
        .item_con{
            display: flex;
            justify-content: space-between;
            align-items: center;  
            padding: .35rem .34rem .34rem 0;
            .phone{
                text-align: right;
                .spl{
                    color: #ccc;
                }
                .phone1{
                    max-width: 20%;
                    line-height: 1.2;
                }
                .phone2{
                    max-width: 30%;
                    width: 24%;
                    line-height: 1.2;
                }
                .phone3{
                    max-width: 35%;
                    width: 18%;
                    line-height: 1.2;
                }
            }
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
            }
            .placetype{
                &::placeholder{text-align: left!important;};
            }
        }
        .flextype{
            justify-content: flex-start!important;
        }
    }        
    }
</style>