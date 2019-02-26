<!--
    create:luofeifei 11/3
    desc:认证-其他模块
-->
<template>
    <div class="page">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="page_con">
            <ul>
                <item-li type='3' v-show="hasShow('borrowUsage')" name='借款用途' :val='sel_Use' @click.native="showPicker(99)"></item-li>
                <item-li type='3' v-show="hasShow('incomeType')" name='收入来源' :val='sel_income' @click.native="showPicker(0)"></item-li>
                <item-li type='3' v-show="hasShow('tradeType')" name='行业类型' :val='sel_guild' @click.native="showPicker(1)"></item-li>
                <item-li type='3' v-show="hasShow('workType')" name='工作类型' :val='sel_work' @click.native="showPicker(2)"></item-li>
                <!-- 工薪族 -->
                <div class="itmeType" v-show="selType=='workType1'">
                    <item-li type='2' v-show="hasShow('companyName')" name='公司名称' :val='inp_companyName' v-model="inp_companyName" placeholder='公司名称'></item-li>
                    <item-li type='3' v-show="hasShow('address')" name='公司所在城市' :val='sel_comCity' @click.native="showPicker(3)"></item-li>
                    <item-li type='2' v-show="hasShow('address')" name='公司详细地址' placeholder='请输入详细地址' :val='inp_address' v-model="inp_address"></item-li>
                    <item-li type='3' v-show="hasShow('companyType')" name='公司类型' :val='sel_companytype' @click.native="showPicker(4)"></item-li>
                    <item-li type='2' v-show="hasShow('monthSalary')" name='月收入（元）' placeholder='请输入月收入' :val='inp_income' v-model="inp_income"></item-li>
                    <li v-show="hasShow('workPhone')">
                        <div class="item_con">
                            <span class="key" style="min-width:1.8rem">单位电话</span>
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
                    <item-li type='3' v-show="hasShow('paySalaryWay')" name='工资发放形式' :val='sel_salary' @click.native="showPicker(5)"></item-li>
                    <item-li type='3' v-show="hasShow('jobPosition')" name='工作职位' :val='sel_position' @click.native='showPicker(6)'></item-li>
                    <item-li type='2' v-show="hasShow('companyEmail')" name='公司邮箱' placeholder='请填写邮箱地址' :val='inp_gsemaill' v-model="inp_gsemaill"></item-li>
                    <item-li type='3' v-show="hasShow('salaryTime')" name='工资发放日' :val='sel_gsmoneyday' @click.native='showPicker(95)'></item-li>
                    <item-li type='3' v-show="hasShow('entryTime')" name='入职时间' :val='sel_time' @click.native='showPicker(7)'></item-li>
                </div>
                <!-- 个体户 -->
                <div class="itmeType" v-show="selType=='workType3'">
                    <item-li type='3' v-show="hasShow('address')" name='实际经营所在地' :val='sel_locality' @click.native="showPicker(8)"></item-li>
                    <item-li type='3' v-show="hasShow('industry')" name='所属行业' :val='sel_industry' @click.native="showPicker(9)"></item-li>
                    <item-li type='3' v-show="hasShow('businessType')" name='经营类型' :val='sel_manage' @click.native="showPicker(10)"></item-li>
                    <item-li type='3' v-show="hasShow('hasBusinessLicense')" name='是否办理营业执照' :val='sel_islicense' @click.native="showPicker(11)"></item-li>
                    <item-li type='3' v-show="hasShow('businessLife')" name='经营年限' :val='sel_lerm' placeholder='经营年限' @click.native="showPicker(12)"></item-li>
                    <item-li type='2' v-show="hasShow('monthRevenue')" name='每月总营收（万元）' placeholder='每月总营收' :val='inp_sumincome' v-model="inp_sumincome"></item-li>
                </div>
                <!-- 学生 -->
                <div class="itmeType" v-show="selType=='workType4'">
                    <item-li type='2' v-show="hasShow('schoolName')" name='学校名称' placeholder='学校名称' :val='inp_schoolname' v-model="inp_schoolname"></item-li>
                    <item-li type='3' v-show="hasShow('address')" name='学校所在城市' :val='sel_schoolAdree' placeholder='学校所在城市' @click.native="showPicker(13)"></item-li>
                    <item-li type='3' v-show="hasShow('schoolTime')" name='入学年份' :val='sel_schoolAge' @click.native="showPicker(14)"></item-li>
                </div>
                <!-- 自由职业者 -->
                <div class="itmeType" v-show="selType=='workType5'">
                    <item-li type='2' v-show="hasShow('monthSalary')" name='月收入' placeholder='月收入' :val='inp_moneyincome' v-model="inp_moneyincome"></item-li>
                </div>
                <!-- 企业主 -->
                <div class="itmeType" v-show="selType=='workType2'"></div>
                <!-- 其他 -->
                <div class="itmeType"></div>
                <item-li type='3' v-show="hasShow('maritalStatus')" name="婚姻状况" :val='sel_marriage' @click.native="showPicker(15)"></item-li>
                <item-li v-show="false" type='3' name="所在城市" :val='sel_city' @click.native="showPicker(16)"></item-li>
                <item-li type='3' v-show="hasShow('homeAddress')" name="所在区域" :val='sel_area' @click.native="showPicker(17)"></item-li>
                <item-li type='2' v-show="hasShow('homeAddress')" name="详细地址" placeholder='详细地址' :val='inp_detailAddress' v-model="inp_detailAddress"></item-li>
                <item-li type='3' v-show="hasShow('homeType')" name="住宅类型" :val='sel_residencetype' @click.native="showPicker(18)"></item-li>
                <item-li type='3' v-show="hasShow('liveTime')" name="现居住地居住时长" :val='sel_adressTime' @click.native="showPicker(19)"></item-li>
                <item-li type='2' v-show="hasShow('qq')" name="QQ" placeholder='QQ号码' :val='inp_qq' v-model="inp_qq"></item-li>
                <item-li type='2' v-show="hasShow('email')" name="邮箱" placeholder='邮箱' :val='inp_emaill' v-model="inp_emaill"></item-li>
                <item-li type='2' v-show="hasShow('wechart')" name="微信" placeholder='微信' :val="inp_wechat" v-model="inp_wechat"></item-li>
                <item-li type='3' v-show="hasShow('educationallevel')" name="教育程度" :val='sel_education' @click.native="showPicker(20)"></item-li>
                <item-li type='3' v-show="hasShow('haveHome')" name="是否有房" :val='sel_haveHome' @click.native="showPicker(97)"></item-li>
                <item-li type='3' v-show="isHaveHome" name="房产所在地" placeholder='房产所在地' :val="sel_roomAddress" @click.native="showPicker(98)"></item-li>
                <item-li type='2' v-show="isHaveHome" name="房产市值(万)" placeholder='房产市值' :val='inp_roomMoney' v-model="inp_roomMoney"></item-li>
                <item-li type='3' v-show="isHaveHome" name="是否有按揭" :val='sel_ismortgage' @click.native="showPicker(21)"></item-li>
                <item-li type='3' v-show="isHaveHome" name="房屋是否抵押" :val='sel_ispledge' @click.native="showPicker(22)"></item-li>
                <item-li type='3' v-show="hasShow('haveCar')" name="是否有车" :val='sel_haveCar' @click.native="showPicker(96)"></item-li>
                <item-li type='3' v-show="isHaveCar" name="车辆状况" :val='sel_carInfo' @click.native="showPicker(23)"></item-li>
                <item-li type='2' v-show="isHaveCar" name="车辆价格(万)" placeholder='车辆价格' :val='inp_carprice' v-model="inp_carprice"></item-li>
                <item-li type='2' v-show="isHaveCar" name="车辆使用年限" placeholder='车辆使用年限' :val='inp_caruseyear' v-model="inp_caruseyear"></item-li>
                <item-li type='3' v-show="hasShow('loan')" name="是否有贷款" :val='sel_loans' @click.native="showPicker(24)"></item-li>
                <item-li type='3' v-show="isShowLoans" name="贷款类型" :val='sel_loanstype' @click.native="showPicker(25)"></item-li>
            </ul>
        </div>
        <btn-com v-if="!isShowLoading" btnval='保存' @click.native="checkOther"></btn-com>
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
        <!--  时间选择 -->
        <awesome-picker
            ref="picker2"
            :textTitle="picker2.textTitle"
            :anchor="picker2.anchor"
            :type="picker2.type"
            :swipeTime="picker2.swiperTime"
            @confirm="handlePicker2Confirm">
        </awesome-picker>              
    </div>
</template>

<script>
    import btnCom from '@/components/list/btn';
    import itemLi from '@/components/list/li';
    import AreaList from './components/area';
    export default {
        name : 'AuthOther',
        data() {
            return {
                picker: {
                    anchor: [0],
                    textTitle: '',
                    data: [],
                    swiperTime:4000
                },
                picker1: {
                    anchor: [0],
                    textTitle: '',
                    data: AreaList,
                    swiperTime:4000
                },
                picker2: {
                    anchor: [],
                    textTitle: '',
                    type:'date',
                    swiperTime:4000
                },
                isNub : /^\d+$/,
                isNone:/^\S*$/,
                isShowLoading : true,
                platfromFormItem:'', //这个比较特殊，放这里
                isShowLoans:false,
                isHaveHome:false,
                isHaveCar:false,      
                selectOpt:'',
                sel_haveHome:'请选择',
                haveHomeList:[],    //是否有房
                sel_haveCar:'请选择',   
                haveCarList:[], //是否有车
                selType:'', //选择的工作类型（根据类型不通生成不同表单）
                sel_Use:'请选择',  //借款用途
                sel_income:'请选择',   //收入来源
                sel_guild:'请选择',   //行业类型
                sel_work:'请选择',    //工作类型
                sel_comCity:'请选择',   //公司所在城市
                sel_companytype:'请选择', //公司类型
                sel_salary:'请选择',    //工资发放形式
                sel_position:'请选择',  //工作职位
                sel_time:'请选择',  //入职时间
                sel_locality:'请选择',  //实际经营所在地
                sel_industry:'请选择',  //所属行业
                sel_manage:'请选择',    //经营类型
                sel_islicense:'请选择', //是否办理营业执照
                sel_schoolAdree:'请选择',   //学校所在城市
                sel_lerm:'请选择',  //经营年限
                sel_schoolAge:'请选择', //入学年份
                sel_marriage:'请选择', //婚姻状况
                sel_city:'请选择',  //所在城市
                sel_area:'请选择',  //所在区域
                sel_education:'请选择', //教育程度
                sel_residencetype:'请选择', //住宅类型
                sel_adressTime:'请选择',    //居住时长
                sel_ismortgage:'请选择',    //是否有按揭
                sel_ispledge:'请选择',  //房屋是否抵押
                sel_carInfo:'请选择',   //车辆状况
                sel_loans:'请选择',     //是否有贷款
                sel_loanstype:'请选择', //贷款类型
                sel_roomAddress:'请选择', //房产所在地
                inp_companyName:'', //公司名称
                inp_moneyincome:'', //月收入
                inp_address:'', //公司详细地址
                inp_income:'',  //月收入
                inp_gsemaill:'',    //公司邮箱
                sel_gsmoneyday:'请选择',  //工资发放日
                gsmoneydayList:[],
                inp_sumincome:'',   //每月总收入
                inp_schoolname:'',  //学校名称
                inp_detailAddress:'',   //详细地址
                inp_qq:'',
                inp_emaill:'',
                inp_wechat:'',
                inp_roomMoney:'',   //房产市值
                inp_carprice:'',    //车辆价格
                inp_caruseyear:'',  //车辆使用年限
                userList:[],
                incomeList:[],
                guildList:[],
                workList:['工薪族','自由职业者','企业主','个体户','学生'],
                companytypeList:[],
                salaryList:[],
                positionList:[],
                industryList:[],
                manageList:[],
                islicenseList:[],
                lermList:[],
                marriageList:[],
                residencetypeList:[],
                adressTimeList:[],
                educationList:[],
                ismortgageList:[],
                ispledge:[],
                carInfoList:[],
                loansList:[],
                loanstypeList:[],
                yearList:[],    //年份
                val1:'',
                val2:'',
                val3:'',
                ADD_LOAN_USE:[],    //借款用途
                ADD_REVENUE_SOURCE:[],  //收入来源
                ADD_BUSINESS_TYPE:[],   //行业类型
                ADD_COMPANY_TYPE:[],    //公司类型
                ADD_PAY_TYPE:[],    //工资发放形式
                ADD_COMPANY_POSITION:[],    //工作职位
                ADD_LOAN_TYPE:[],   //贷款类型
                ADD_OWN_IS_LICENSE:[],  //是否办理执照
                ADD_SOLE_INDUSTRY:[],   //所属行业
                ADD_OWN_MANAGE_LIFE_TIME:[],    //经营年限
                ADD_IS_LOAN:[], //是否有贷款
                ADD_HOUSE_LOAN_STATUS:[],   //是否有按揭
                ADD_HOUSE_PLEDGE_STATUS:[], //房屋是否抵押
                ADD_HOUSE_TYPE:[],  //住宅类型
                ADD_LIVE_TIME:[],   //居住时长
                ADD_CAR_STATUS:[],  //车辆状况
                SYS_EDU_TYPE:[],    //教育程度
                ADD_HAVE_HOME:[],   //是否有房
                ADD_HAVE_CAR:[],    //是否有车
                ADD_MARRIAGE:[],
                selVal:[],
                otherInfo:[]
            }
        },
        components : {
            //组件
            btnCom,itemLi
        },
        created() {
            //页面渲染前
            this.getYear();
            this.getday();
            this.pkey().then(data=>{
                if(data == 0) {
                    this.otherQuery();
                }
            },data=>{

            });
        },
        mounted() {
            //页面加载完毕
            // this.otherQuery();
        },
        computed:{
            //去掉地址末尾逗号
            // delsel_time:function(){
            //     return (this.sel_time.substring(this.sel_time.length-1)==',')?this.sel_time.substring(0,this.sel_time.length-1):this.sel_time;
            // },
        },
        methods:{        
            //数据字典查询
            pkey(){
                let _this = this;
                let data = {
                    pkeys:'ADD_REVENUE_SOURCE,ADD_BUSINESS_TYPE,ADD_LOAN_TYPE,ADD_COMPANY_TYPE,ADD_PAY_TYPE,ADD_COMPANY_POSITION,ADD_OWN_IS_LICENSE,ADD_MARRIAGE,ADD_HOUSE_TYPE,SYS_EDU_TYPE,ADD_OWN_MANAGE_LIFE_TIME,ADD_LOAN_USE,ADD_SOLE_INDUSTRY,ADD_IS_LOAN,ADD_LIVE_TIME,ADD_HOUSE_LOAN_STATUS,ADD_HOUSE_PLEDGE_STATUS,ADD_CAR_STATUS,ADD_HAVE_HOME,ADD_HAVE_CAR'
                }
                return new Promise((resolve,reject)=>{
                    _this.$ajax.post('/api/dict/pkey',_this.$qs.stringify(data),{
                        headers: _this.Base.initAjaxHeader(1,{})
                    })
                    .then(res =>{
                        let resData = res.data;
                        if(resData.status == '0'){
                            resolve(0);
                            _this.ADD_LOAN_USE = resData.result.ADD_LOAN_USE;   //借款用途
                            _this.ADD_REVENUE_SOURCE = resData.result.ADD_REVENUE_SOURCE;   //收入来源
                            _this.ADD_BUSINESS_TYPE = resData.result.ADD_BUSINESS_TYPE; //行业类型
                            _this.ADD_COMPANY_TYPE = resData.result.ADD_COMPANY_TYPE;   //公司类型
                            _this.ADD_PAY_TYPE = resData.result.ADD_PAY_TYPE;   //工资发放形式
                            _this.ADD_COMPANY_POSITION = resData.result.ADD_COMPANY_POSITION;   //工作职位
                            _this.ADD_LOAN_TYPE = resData.result.ADD_LOAN_TYPE; //贷款类型
                            _this.ADD_OWN_IS_LICENSE = resData.result.ADD_OWN_IS_LICENSE;   //是否办理执照
                            _this.ADD_SOLE_INDUSTRY = resData.result.ADD_SOLE_INDUSTRY; //所属行业
                            _this.ADD_OWN_MANAGE_LIFE_TIME = resData.result.ADD_OWN_MANAGE_LIFE_TIME;   //经营年限
                            _this.ADD_IS_LOAN = resData.result.ADD_IS_LOAN; //是否有贷款
                            _this.ADD_LIVE_TIME = resData.result.ADD_LIVE_TIME; //居住时长
                            _this.ADD_HOUSE_LOAN_STATUS = resData.result.ADD_HOUSE_LOAN_STATUS; //是否有按揭
                            _this.ADD_HOUSE_PLEDGE_STATUS = resData.result.ADD_HOUSE_PLEDGE_STATUS; //房屋是否抵押
                            _this.ADD_CAR_STATUS = resData.result.ADD_CAR_STATUS;   //车辆状况
                            _this.SYS_EDU_TYPE = resData.result.SYS_EDU_TYPE;   //教育程度
                            _this.ADD_HOUSE_TYPE = resData.result.ADD_HOUSE_TYPE;   //住宅类型
                            _this.ADD_HAVE_HOME = resData.result.ADD_HAVE_HOME; //是否有房
                            _this.ADD_HAVE_CAR = resData.result.ADD_HAVE_CAR;   //是否有车
                            _this.ADD_MARRIAGE = resData.result.ADD_MARRIAGE;
                            //借款用途
                            for (let i = 0; i < resData.result.ADD_LOAN_USE.length; i++) {
                                _this.userList.push(resData.result.ADD_LOAN_USE[i].value);
                            }                        
                            //收入来源
                            for (let i = 0; i < resData.result.ADD_REVENUE_SOURCE.length; i++) {
                                _this.incomeList.push(resData.result.ADD_REVENUE_SOURCE[i].value);
                            }
                            //行业类型
                            for (let i = 0; i < resData.result.ADD_BUSINESS_TYPE.length; i++) {
                                _this.guildList.push(resData.result.ADD_BUSINESS_TYPE[i].value);
                            }
                            //贷款类型
                            for (let i = 0; i < resData.result.ADD_LOAN_TYPE.length; i++) {
                                _this.loanstypeList.push(resData.result.ADD_LOAN_TYPE[i].value);
                            }
                            //公司类型
                            for (let i = 0; i < resData.result.ADD_COMPANY_TYPE.length; i++) {
                                _this.companytypeList.push(resData.result.ADD_COMPANY_TYPE[i].value);
                                //经营类型
                                _this.manageList.push(resData.result.ADD_COMPANY_TYPE[i].value);
                            }
                            //工资发放形式
                            for (let i = 0; i < resData.result.ADD_PAY_TYPE.length; i++) {
                                _this.salaryList.push(resData.result.ADD_PAY_TYPE[i].value);
                            }
                            for (let i = 0; i < resData.result.ADD_COMPANY_POSITION.length; i++) {
                                _this.positionList.push(resData.result.ADD_COMPANY_POSITION[i].value);
                            }
                            //是否办理执照
                            for (let i = 0; i < resData.result.ADD_OWN_IS_LICENSE.length; i++) {
                                _this.islicenseList.push(resData.result.ADD_OWN_IS_LICENSE[i].value);
                            }
                            //经营年限ADD_OWN_MANAGE_LIFE_TIME
                            for (let i = 0; i < resData.result.ADD_OWN_MANAGE_LIFE_TIME.length; i++) {
                                _this.lermList.push(resData.result.ADD_OWN_MANAGE_LIFE_TIME[i].value);
                            }
                            //婚姻状况
                            for (let i = 0; i < resData.result.ADD_MARRIAGE.length; i++) {
                                _this.marriageList.push(resData.result.ADD_MARRIAGE[i].value);
                            }
                            //住宅类型ADD_HOUSE_TYPE  
                            for (let i = 0; i < resData.result.ADD_HOUSE_TYPE.length; i++) {
                                _this.residencetypeList.push(resData.result.ADD_HOUSE_TYPE[i].value);
                            }
                            //教育程度SYS_EDU_TYPE
                            for (let i = 0; i < resData.result.SYS_EDU_TYPE.length; i++) {
                                _this.educationList.push(resData.result.SYS_EDU_TYPE[i].value);
                            }
                            //所属行业ADD_SOLE_INDUSTRY
                            for (let i = 0; i < resData.result.ADD_SOLE_INDUSTRY.length; i++) {
                                _this.industryList.push(resData.result.ADD_SOLE_INDUSTRY[i].value);
                            }
                            //居住时长
                            for (let i = 0; i < resData.result.ADD_LIVE_TIME.length; i++) {
                                _this.adressTimeList.push(resData.result.ADD_LIVE_TIME[i].value);
                            }
                            //是否有按揭ADD_HOUSE_LOAN_STATUS
                            for (let i = 0; i < resData.result.ADD_HOUSE_LOAN_STATUS.length; i++) {
                                _this.ismortgageList.push(resData.result.ADD_HOUSE_LOAN_STATUS[i].value);
                            }
                            //房屋是否抵押
                            for (let i = 0; i < resData.result.ADD_HOUSE_PLEDGE_STATUS.length; i++) {
                                _this.ispledge.push(resData.result.ADD_HOUSE_PLEDGE_STATUS[i].value);
                            }
                            //车辆状况
                            for (let i = 0; i < resData.result.ADD_CAR_STATUS.length; i++) {
                                _this.carInfoList.push(resData.result.ADD_CAR_STATUS[i].value);
                            }
                            //是否有贷款
                            for (let i = 0; i < resData.result.ADD_IS_LOAN.length; i++) {
                                _this.loansList.push(resData.result.ADD_IS_LOAN[i].value);
                            }
                            //ADD_HAVE_HOME是否有房
                            for (let i = 0; i < resData.result.ADD_HAVE_HOME.length; i++) {
                                _this.haveHomeList.push(resData.result.ADD_HAVE_HOME[i].value);
                            }
                            //ADD_HAVE_CAR是否有车
                            for (let i = 0; i < resData.result.ADD_HAVE_CAR.length; i++) {
                                _this.haveCarList.push(resData.result.ADD_HAVE_CAR[i].value);
                            }
                        } else {
                            reject(resData.status);
                        }
                    })
                });
            },
            //判断显示隐藏
            hasShow(str){
                return this.platfromFormItem.indexOf(str)!=-1;
            },
            // 检查判断
            checkOther(){
                let _this = this;
                let regs = this.Base.regs;
                
                if((_this.sel_Use == '请选择' || !_this.sel_Use)&&_this.hasShow('borrowUsage')){
                    this.$msg({content:'请选择借款用途'})
                    return false
                }
                if((_this.sel_income == '请选择' || !_this.sel_income)&&_this.hasShow('incomeType')){
                    this.$msg({content:'请选择收入来源'})
                    return false
                }
                if((_this.sel_guild == '请选择' || !_this.sel_guild)&&_this.hasShow('tradeType')){
                    this.$msg({content:'请选择行业类型'})
                    return false
                }                
                if((_this.sel_work == '请选择' || !_this.sel_work)&&_this.hasShow('workType')){
                    this.$msg({content:'请选择工作类型'})
                    return false
                }
                //  工薪族
                if(_this.selType == 'workType1'){
                    if(!_this.inp_companyName&&_this.hasShow('companyName')){
                        this.$msg({content:'请填写公司名称'})
                        return false
                    }                    
                    if((_this.sel_comCity == '请选择' ||!_this.sel_comCity)&&_this.hasShow('address')){
                        this.$msg({content:'请选择公司所在城市'})
                        return false
                    }
                    if(!_this.inp_address&&_this.hasShow('address')){
                        this.$msg({content:'请输入公司详细地址'})
                        return false
                    }
                    if((_this.sel_companytype == '请选择' || !_this.sel_companytype)&&_this.hasShow('companyType')){
                        this.$msg({content:'请选择公司类型'})
                        return false
                    }
                    if(!_this.inp_income&&_this.hasShow('monthSalary')){
                        this.$msg({content:'请输入月收入'})
                        return false
                    }
                    if(!_this.isNub.test(_this.inp_income)&&_this.hasShow('monthSalary')){
                        this.$msg({content:'月收入格式有误'})
                        return false
                    }
                    if(!_this.val1&&_this.hasShow('workPhone')){
                        this.$msg({content:'请填写电话区号'})
                        return false
                    }
                    if(_this.val1.length>0&&!regs.phoZone.test(_this.val1)){
                        this.$msg({content:'号码区号格式有误'})
                        return false;
                    }
                    if(!_this.val2&&_this.hasShow('workPhone')){
                        this.$msg({content:'请输入单位电话'})
                        return false
                    }
                    if(_this.val2.length>0&&!regs.phoneNo.test(_this.val2)&&_this.val1.length>0){
                        this.$msg({content:'电话号码格式有误'})
                        return false;
                    }
                    if((_this.sel_salary == '请选择' || !_this.sel_salary)&&_this.hasShow('paySalaryWay')){
                        this.$msg({content:'请选择工资发放形式'})
                        return false
                    }
                    if((_this.sel_position == '请选择' || !_this.sel_position)&&_this.hasShow('jobPosition')){
                        this.$msg({content:'请选择工资职位'})
                        return false
                    }
                    if(!_this.inp_gsemaill&&_this.hasShow('companyEmail')){
                        this.$msg({content:'请输入公司邮箱'})
                        return false
                    }
                    if(!regs.email.test(_this.inp_gsemaill)&&_this.hasShow('companyEmail')){
                        this.$msg({content:'公司邮箱格式有误'})
                        return false
                    }                    
                    if((_this.sel_gsmoneyday=='请选择' || !_this.sel_gsmoneyday)&&_this.hasShow('salaryTime')){
                        this.$msg({content:'请输入工资发放日'})
                        return false
                    }
                    if((_this.sel_time == '请选择'|| !_this.sel_time)&&_this.hasShow('entryTime')){
                        this.$msg({content:'请选择入职时间'})
                        return false
                    }
                }
                //  个体户
                if(_this.selType == 'workType3'){
                    if((_this.sel_locality=='请选择'||!_this.sel_locality)&&_this.hasShow('address')){
                        this.$msg({content:'请选择经营所在地'})
                        return false
                    }
                    if((_this.sel_industry == '请选择' || !_this.sel_industry)&&_this.hasShow('industry')){
                        this.$msg({content:'请选择所属行业'})
                        return false
                    }
                    if((_this.sel_manage == '请选择' || !_this.sel_manage)&&_this.hasShow('businessType')){
                        this.$msg({content:'请选择经营类型'})
                        return false
                    }
                    if((_this.sel_islicense == '请选择' || !_this.sel_islicense)&&_this.hasShow('hasBusinessLicense')){
                        this.$msg({content:'请选择是否办理营业执照'})
                        return false
                    }
                    if((_this.sel_lerm == '请选择' || !_this.sel_islicense)&&_this.hasShow('businessLife')){
                        this.$msg({content:'请选择经营年限'})
                        return false
                    }
                    if(!_this.inp_sumincome&&_this.hasShow('monthRevenue')){
                        this.$msg({content:'请输入每月总收入'})
                        return false
                    }
                }
                // 学生
                if(_this.selType == 'workType4'){
                    if(!_this.inp_schoolname&&_this.hasShow('schoolName')){
                        this.$msg({content:'请输入学校名称'})
                        return false
                    }
                    if((_this.sel_schoolAdree == '请选择'|| !_this.sel_schoolAdree)&&_this.hasShow('address')){
                        this.$msg({content:'请选择学校所在城市'})
                        return false      
                    }
                    if((_this.sel_schoolAge == '请选择' || !_this.sel_schoolAge)&&_this.hasShow('schoolTime')){
                        this.$msg({content:'请选择入学年份'})
                        return false
                    }
                }
                //自由职业者
                if(_this.selType == 'workType5'){
                    if(!_this.inp_moneyincome&&_this.hasShow('monthSalary')){
                        this.$msg({content:'请输入月收入'})
                        return false
                    }
                }
                //  其他
                if((_this.sel_marriage == '请选择' || !_this.sel_marriage)&&_this.hasShow('maritalStatus')){
                    this.$msg({content:'请选择婚姻状况'})
                    return false
                }
                if((_this.sel_area == '请选择' || !_this.sel_area)&&_this.hasShow('homeAddress')){
                    this.$msg({content:'请选择所在区域'})
                    return false
                }
                if(!_this.inp_detailAddress&&_this.hasShow('homeAddress')){
                    this.$msg({content:'请输入详细地址'})
                    return false
                }
                if((_this.sel_residencetype == '请选择' || !_this.sel_residencetype)&&_this.hasShow('homeType')){
                    this.$msg({content:'请选择住宅类型'})
                    return false
                }
                if((_this.sel_adressTime == '请选择' || !_this.sel_adressTime)&&_this.hasShow('liveTime')){
                    this.$msg({content:'请选择居中时长'})
                    return false
                }
                if(!_this.inp_qq&&_this.hasShow('qq')){
                    this.$msg({content:'请输入QQ'})
                    return false
                }
                if(!_this.isNub.test(_this.inp_qq)&&_this.hasShow('qq')){
                    this.$msg({content:'QQ号格式有误'})
                    return false
                }
                if(!_this.inp_emaill&&_this.hasShow('email')){
                    this.$msg({content:'请输入邮箱'})
                    return false
                }
                if(!regs.email.test(_this.inp_emaill)&&_this.hasShow('email')){
                    this.$msg({content:'邮箱格式有误'})
                    return false
                }                
                if(!_this.inp_wechat&&_this.hasShow('wechart')){
                    this.$msg({content:'请输入微信'})
                    return false
                }
                if(!_this.isNone.test(_this.inp_wechat)&&_this.hasShow('wechart')){
                    this.$msg({content:'微信号格式有误'})
                    return false
                }
                if((_this.sel_education == '请选择' || !_this.sel_education)&&_this.hasShow('educationallevel')){
                    this.$msg({content:'请选择教育程度'})
                    return false                    
                }
                //是否有房
                if((_this.sel_haveHome == '请选择'||!_this.sel_haveHome)&&_this.hasShow('haveCar')){
                    this.$msg({content:'请选择是否有房'})
                    return false
                }
                if(_this.isHaveHome){
                    if((_this.sel_roomAddress == '请选择'||!_this.sel_roomAddress)&&_this.hasShow('resProvince')){
                        this.$msg({content:'请输入房产所在地'})
                        return false
                    }
                    if(!_this.inp_roomMoney&&_this.hasShow('homeValue')){
                        this.$msg({content:'请输入房产市值'})
                        return false                    
                    }
                    if(!_this.isNub.test(_this.inp_roomMoney)&&_this.hasShow('homeValue')){
                        this.$msg({content:'房产市值的格式有误'})
                        return false
                    }
                    if((_this.sel_ismortgage == '请选择' || !_this.sel_ismortgage)&&_this.hasShow('mortgage')){
                        this.$msg({content:'请选择按揭情况'})
                        return false
                    }
                    if((_this.sel_ispledge == '请选择' || !_this.sel_ispledge)&&_this.hasShow('pledge')){
                        this.$msg({content:'请选择抵押情况'})
                        return false                    
                    }
                }
                //是否有车
                if((_this.sel_haveCar == '请选择' || !_this.sel_haveCar)&&_this.hasShow('haveCar')){
                    this.$msg({content:'请选择是否有车'})
                    return false
                }
                if(_this.isHaveCar){
                    if((_this.sel_carInfo == '请选择' || !_this.sel_carInfo)&&_this.hasShow('carStatus')){
                        this.$msg({content:'请选择车辆状况'})
                        return false
                    }
                    if(!_this.inp_carprice&&_this.hasShow('carValue')){
                        this.$msg({content:'请输入车辆价格'})
                        return false                    
                    }
                    if(!_this.isNub.test(_this.inp_carprice)&&_this.hasShow('carValue')){
                        this.$msg({content:'车辆价格格式有误'})
                        return false
                    }
                    if(!_this.inp_caruseyear&&_this.hasShow('carTime')){
                        this.$msg({content:'请输入车辆使用年限'})
                        return false                          
                    }
                    if(!_this.isNub.test(_this.inp_caruseyear)&&_this.hasShow('carTime')){
                        this.$msg({content:'车辆使用年限格式有误'})
                        return false
                    }
                }
                //是否贷款
                if((_this.sel_loans == '请选择' || !_this.sel_loans)&&_this.hasShow('loan')){
                    this.$msg({content:'请选择贷款情况'})
                    return false
                }
                if(_this.isShowLoans){
                    if((_this.sel_loanstype == '请选择' || !_this.sel_loanstype)&&_this.hasShow('loan')){
                        this.$msg({content:'请选择贷款类型'})
                        return false
                    }
                }    
                _this.bindOther()
            },
            //其他信息保存接口
            bindOther(){
                let _this = this;
                //公共对象
                let pubdata = {
                    pfNo:localStorage.getItem('pfNo'),  //平台ID，必传
                    borrowUsage:_this.Base.getVkey(_this.isStr(_this.sel_Use),_this.ADD_LOAN_USE),   //借款用途
                    incomeType:_this.Base.getVkey(_this.isStr(_this.sel_income),_this.ADD_REVENUE_SOURCE),    //收入来源
                    workType:_this.selType, //工作类型
                    tradeType:_this.Base.getVkey(_this.isStr(_this.sel_guild),_this.ADD_BUSINESS_TYPE),   //行业类型
                    maritalStatus:_this.Base.getVkey(_this.isStr(_this.sel_marriage),_this.ADD_MARRIAGE),   //婚姻状况
                    homeProvince:_this.sel_area.split(',')[0],    //家-省
                    homeCity:_this.sel_area.split(',')[1],    //家-市
                    homeArea:_this.sel_area.split(',')[2],    //家-区
                    homeAddress:_this.inp_detailAddress||'',  //家-详细地址
                    homeType:_this.Base.getVkey(_this.isStr(_this.sel_residencetype),_this.ADD_HOUSE_TYPE),    //住宅类型
                    liveTime:_this.Base.getVkey(_this.isStr(_this.sel_adressTime),_this.ADD_LIVE_TIME),   //居住时间
                    qq:_this.inp_qq||'',    //qq
                    email:_this.inp_emaill||'', //emaill
                    wechart:_this.inp_wechat||'',    //wechat
                    educationallevel:_this.Base.getVkey(_this.isStr(_this.sel_education),_this.SYS_EDU_TYPE),   //教育程度
                    haveHome:_this.Base.getVkey(_this.isStr(_this.sel_haveHome),_this.ADD_HAVE_HOME),   //是否有房
                    resProvince:_this.isStr(_this.sel_roomAddress.split(',')[0]), //房产所在地-省
                    resCity:_this.sel_roomAddress.split(',')[1], //房产所在地-市
                    resArea:_this.sel_roomAddress.split(',')[2], //房产所在地-区
                    homeValue:_this.inp_roomMoney||'',  //房产市值
                    mortgage:_this.Base.getVkey(_this.isStr(_this.sel_ismortgage),_this.ADD_HOUSE_LOAN_STATUS),  //是否按揭
                    pledge:_this.Base.getVkey(_this.isStr(_this.sel_ispledge),_this.ADD_HOUSE_PLEDGE_STATUS),  //是否抵押
                    carInfo:_this.Base.getVkey(_this.isStr(_this.sel_haveCar),_this.ADD_HAVE_CAR),   //是否有车
                    carStatus:_this.Base.getVkey(_this.isStr(_this.sel_carInfo),_this.ADD_CAR_STATUS),    //车辆状况
                    carValue:_this.inp_carprice||'',    //车辆价格
                    carTime:_this.inp_caruseyear||'',   //车辆使用年限
                    loan:_this.Base.getVkey(_this.isStr(_this.sel_loans),_this.ADD_IS_LOAN),   //是否有贷款
                    loanType:_this.isShowLoans?_this.Base.getVkey(_this.isStr(_this.sel_loanstype),_this.ADD_LOAN_TYPE):'',    //贷款类型
                    homePhone:_this.otherInfo.homePhone,
                    homePhoneArea:_this.otherInfo.homePhoneArea,
                    homePhoneExtend:_this.otherInfo.homePhoneExtend,
                    carNo:_this.otherInfo.carNo
                };
                //补充对象
                let postdata = {

                }
                switch (_this.selType) {
                    case 'workType1':   //工薪族
                        postdata = {
                            companyName:_this.inp_companyName,
                            province:_this.sel_comCity.split(',')[0],
                            city:_this.sel_comCity.split(',')[1],
                            area:_this.sel_comCity.split(',')[2],
                            address:_this.inp_address,
                            companyType:_this.Base.getVkey(_this.isStr(_this.sel_companytype),_this.ADD_COMPANY_TYPE),
                            monthSalary:_this.inp_income,
                            workPhoneArea:_this.val1||'',
                            workPhone:_this.val2||'',
                            workPhoneExtend:_this.val3||'',
                            paySalaryWay:_this.Base.getVkey(_this.isStr(_this.sel_salary),_this.ADD_PAY_TYPE),  //工资发放形式
                            jobPosition:_this.Base.getVkey(_this.isStr(_this.sel_position),_this.ADD_COMPANY_POSITION), //工作职位
                            companyEmail:_this.inp_gsemaill||'',
                            salaryTime:_this.sel_gsmoneyday||'',
                            entryTime:_this.sel_time
                        }
                        break;
                    case 'workType2':   //企业主
                        postdata = {
                            
                        }                                           
                        break;
                    case 'workType3':   //个体户
                        postdata = {
                            province:_this.sel_locality.split(',')[0],
                            city:_this.sel_locality.split(',')[1],
                            area:_this.sel_locality.split(',')[2],
                            industry:_this.Base.getVkey(_this.isStr(_this.sel_industry),_this.ADD_SOLE_INDUSTRY),    //所属行业
                            businessType:_this.Base.getVkey(_this.isStr(_this.sel_manage),_this.ADD_COMPANY_TYPE),   //经营类型
                            hasBusinessLicense:_this.Base.getVkey(_this.isStr(_this.sel_islicense),_this.ADD_OWN_IS_LICENSE), //是否办理执照
                            businessLife:_this.Base.getVkey(_this.isStr(_this.sel_lerm),_this.ADD_OWN_MANAGE_LIFE_TIME), //经营年限
                            monthRevenue:_this.inp_sumincome||''
                        }                                           
                        break;
                    case 'workType4':   //学生
                        postdata = {
                            schoolName:_this.inp_schoolname||'',                            
                            schoolTime:_this.sel_schoolAge,
                            province:_this.sel_schoolAdree.split(',')[0],
                            city:_this.sel_schoolAdree.split(',')[1],
                            area:_this.sel_schoolAdree.split(',')[2]
                        }                                           
                        break;
                    case 'workType5':   //自由职业者
                        postdata = {
                            monthSalary:_this.inp_moneyincome||''
                        }                   
                        break;                                                                                        
                    default:
                        break;
                }
                         
                //合并对象
                let objdata = Object.assign({},pubdata,postdata)
                this.$ajax.post('/api/otherinfo/bind',_this.$qs.stringify(objdata),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res =>{
                    let resData = res.data;
                    if(resData.status == 0){
                        this.$msg({content:'保存成功'})
                        setTimeout(() => {
                            this.$router.go(-1)
                            //返回
                            //console.log('返回')
                        }, 500);
                    }else{
                        this.$msg({content:resData.msg})
                    }
                    console.log(res)
                })
            },
            // 其他信息查询接口
            otherQuery(){
                let _this = this;
                let data = {
                    pfNo:localStorage.getItem('pfNo')
                };
                this.$ajax.post('/api/otherinfo/query',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res =>{
                    let resData = res.data
                    if(resData.status == '0'){
                        if(resData.result!=null){
                            
                            _this.platfromFormItem = resData.result.platfromFormItem;
                            
                            if(resData.result.loan == '2'){
                                _this.isShowLoans = true;
                            }else{
                                _this.isShowLoans = false;
                            }

                            if(resData.result.haveHome == '2'){
                                _this.isHaveHome = true;
                            }else{
                                _this.isHaveHome = false;
                            }

                            if(resData.result.haveCar == '2'){
                                _this.isHaveCar = true;
                            }else{
                                _this.isHaveCar = false;
                            }

                            switch (resData.result.workType) {
                                case 'workType1':
                                    _this.inp_companyName = resData.result.companyName||'';
                                    _this.sel_comCity = resData.result.province ? resData.result.province+','+resData.result.city+','+resData.result.area : '请选择';
                                    _this.inp_address = resData.result.address||'';
                                    _this.sel_companytype = _this.Base.getValue(resData.result.companyType,_this.ADD_COMPANY_TYPE)||'请选择';
                                    _this.inp_income = resData.result.monthSalary;
                                    _this.val1 = resData.result.workPhoneArea||'';
                                    _this.val2 = resData.result.workPhone||'';
                                    _this.val3 = resData.result.workPhoneExtend||'';
                                    _this.sel_salary = _this.Base.getValue(resData.result.paySalaryWay,_this.ADD_PAY_TYPE)||'请选择';
                                    _this.sel_position = _this.Base.getValue(resData.result.jobPosition,_this.ADD_COMPANY_POSITION)||'请选择';
                                    _this.inp_gsemaill = resData.result.companyEmail;
                                    _this.sel_gsmoneyday = resData.result.salaryTime;
                                    _this.sel_time = resData.result.entryTime||'请选择';
                                    break;
                                case 'workType2':
                                    break;
                                case 'workType3':
                                    _this.sel_locality = resData.result.province ? resData.result.province+','+resData.result.city+','+resData.result.area : '请选择';
                                    _this.sel_industry = _this.Base.getValue(resData.result.industry,_this.ADD_SOLE_INDUSTRY)||'请选择';
                                    _this.sel_manage = _this.Base.getValue(resData.result.businessType,_this.ADD_COMPANY_TYPE)||'请选择';
                                    _this.sel_islicense = _this.Base.getValue(resData.result.hasBusinessLicense,_this.ADD_OWN_IS_LICENSE)||'请选择';
                                    _this.sel_lerm = _this.Base.getValue(resData.result.businessLife,_this.ADD_OWN_MANAGE_LIFE_TIME)||'请选择';
                                    _this.inp_sumincome = resData.result.monthRevenue||'';
                                    break;
                                case 'workType4':
                                    //学生
                                    _this.inp_schoolname = resData.result.schoolName||'';
                                    _this.sel_schoolAge = resData.result.schoolTime||'请选择';
                                    _this.sel_schoolAdree =resData.result.province ? resData.result.province+','+resData.result.city+','+resData.result.area : '请选择';                                     
                                    break;
                                case 'workType5':
                                    _this.inp_moneyincome = resData.result.monthSalary||''; //月薪
                                    break;
                                default:
                                    break;
                            }
                                                       
                            _this.selType = resData.result.workType;
                            _this.sel_Use = _this.Base.getValue(resData.result.borrowUsage,_this.ADD_LOAN_USE)||'请选择';   //借款用途
                            _this.sel_income =_this.Base.getValue(resData.result.incomeType,_this.ADD_REVENUE_SOURCE)||'请选择';  //收入来源
                            //
                            _this.sel_guild = _this.Base.getValue(resData.result.tradeType,_this.ADD_BUSINESS_TYPE)||'请选择';   //行业类型
                            //
                            _this.sel_work = this.getWorkType(resData.result.workType)||'请选择';   //工作类型
                            //
                            _this.inp_emaill = resData.result.email||'';
                            _this.inp_qq = resData.result.qq||'';
                            _this.inp_wechat = resData.result.wechart||'';

                            //其他
                            _this.sel_haveCar = _this.Base.getValue(resData.result.carInfo,_this.ADD_HAVE_CAR)||'请选择'; //是否有车
                            _this.sel_carInfo = _this.Base.getValue(resData.result.carStatus,_this.ADD_CAR_STATUS)||'请选择';   //车辆状况
                            _this.inp_carprice = resData.result.carValue||'';   //车辆价值
                            _this.inp_caruseyear = resData.result.carTime||'';  //车辆使用年限
                            _this.sel_marriage = _this.Base.getValue(resData.result.maritalStatus,_this.ADD_MARRIAGE)||'请选择';  //婚姻状况
                            _this.sel_area = resData.result.homeProvince ? resData.result.homeProvince+',' + resData.result.homeCity+',' + resData.result.homeArea : '请选择';   //所在区域
                            _this.inp_detailAddress = resData.result.homeAddress||'';   //详细地址
                            _this.sel_residencetype = _this.Base.getValue(resData.result.homeType,_this.ADD_HOUSE_TYPE)||'请选择';  //住宅类型
                            _this.sel_adressTime = _this.Base.getValue(resData.result.liveTime,_this.ADD_LIVE_TIME)||'请选择'; //居住时长
                            _this.sel_education = _this.Base.getValue(resData.result.educationallevel,_this.SYS_EDU_TYPE)||'请选择';  //教育程度
                            _this.sel_haveHome = _this.Base.getValue(resData.result.haveHome,_this.ADD_HAVE_HOME)||'请选择',//是否有房
                            _this.sel_roomAddress = resData.result.resProvince ? resData.result.resProvince+','+resData.result.resCity+','+resData.result.resArea : '请选择' //房产所在地
                            _this.inp_roomMoney = resData.result.homeValue||''; //房产市值
                            _this.sel_ismortgage = _this.Base.getValue(resData.result.mortgage,_this.ADD_HOUSE_LOAN_STATUS)||'请选择'; //是否按揭
                            _this.sel_ispledge = _this.Base.getValue(resData.result.pledge,_this.ADD_HOUSE_PLEDGE_STATUS)||'请选择'; //是否抵押
                            _this.sel_loans = _this.Base.getValue(resData.result.loan,_this.ADD_IS_LOAN)||'请选择';  //是否有贷款  
                            _this.sel_loanstype = _this.Base.getValue(resData.result.loanType,_this.ADD_LOAN_TYPE)||'请选择';  //贷款类型
                            _this.isShowLoading = false;
                            _this.otherInfo = resData.result;
                            
                        }else{
                            this.$msg({content:resData.msg})
                        }
                    }else{
                        this.$msg({content:resData.msg})
                    }
                })
            },
            //获取用户角色;
            getWorkType(type){
                if(type==='workType1'){
                    return '工薪族'
                }else if(type==='workType2'){
                    return '企业主'
                }else if(type==='workType3'){
                    return '个体户'
                }else if(type==='workType4'){
                    return '学生'
                }else if(type==='workType5'){
                    return '自由职业者'
                }else{
                    return '请选择'
                }
            },                   
            showPicker (nub) {
                this.selectOpt = nub;
                if(nub==3||nub==8||nub==13||nub==16||nub==17||nub==98){
                    this.$refs.picker1.show(); 
                }else if(nub == 7){
                    this.$refs.picker2.show();
                }else{
                    this.$refs.picker.show(); 
                }
                switch (nub) {
                    case 0:
                        this.picker.data = [this.incomeList]
                        break;
                    case 1:
                        this.picker.data = [this.guildList]
                        break;
                    case 2:
                        this.picker.data = [this.workList]
                        break;
                    case 4:
                        this.picker.data = [this.companytypeList]
                        break;
                    case 5:
                        this.picker.data = [this.salaryList]
                        break;
                    case 6:
                        this.picker.data = [this.positionList]
                        break;
                    case 9:
                        this.picker.data = [this.industryList]
                        break;
                    case 10:
                        this.picker.data = [this.manageList]
                        break;
                    case 11:
                        this.picker.data = [this.islicenseList]
                        break;
                    case 12:
                        this.picker.data = [this.lermList]
                        break;
                    case 14:
                        let myDate=new Date();
                        myDate.setFullYear(myDate.getFullYear(),8,1);
                        let today = new Date();
                        if(myDate<today){
                            this.picker.anchor = [0]
                        }else{
                            this.picker.anchor = [1]
                        }                    
                        this.picker.data = [this.yearList]
                        break;                        
                    case 15:
                        this.picker.data = [this.marriageList]
                        break;
                    case 18:
                        this.picker.data = [this.residencetypeList]
                        break;
                    case 19:
                        this.picker.data = [this.adressTimeList]
                        break;
                    case 20:
                        this.picker.data = [this.educationList]
                        break;
                    case 21:
                        this.picker.data = [this.ismortgageList]
                        break;
                    case 22:
                        this.picker.data = [this.ispledge]
                        break;
                    case 23:
                        this.picker.data = [this.carInfoList]
                        break;
                    case 24:
                        this.picker.data = [this.loansList]
                        break;
                    case 25:
                        this.picker.data = [this.loanstypeList]
                        break;                   
                    case 99:
                        this.picker.data = [this.userList]
                        break;
                    case 97:
                        this.picker.data = [this.haveHomeList]
                        break;
                    case 96:
                        this.picker.data = [this.haveCarList]
                        break;
                    case 95:
                        this.picker.data = [this.gsmoneydayList]
                    default:
                        break;
                }
            },            
            handlePicker0Confirm (v) {
                this.value = v ? JSON.stringify(v) : null;
                let _this = this;
                let tempValue = '';
                v.forEach(element => {
                    tempValue += element.value;
                });
                switch (this.selectOpt) {
                    case 99:
                        this.sel_Use = tempValue;
                        break;
                    case 97:
                        this.sel_haveHome = tempValue;
                        if(this.sel_haveHome == '否'){
                            this.isHaveHome = false;
                        }else{
                            this.isHaveHome = true;
                        }
                        break;
                    case 96:
                        this.sel_haveCar = tempValue;
                        if(this.sel_haveCar == '否'){
                            this.isHaveCar = false;
                        }else{
                            this.isHaveCar = true;
                        }
                        break;
                    case 95:
                        this.sel_gsmoneyday = tempValue;
                        break;
                    case 0:
                        this.sel_income = tempValue;
                        break;
                    case 1:
                        this.sel_guild = tempValue;
                        break;
                    case 2:
                        this.sel_work = tempValue;
                        if(this.sel_work == '工薪族'){
                            this.selType = 'workType1';
                        }else if(this.sel_work == '个体户'){
                            this.selType = 'workType3';
                        }else if(this.sel_work == '企业主'){
                            this.selType = 'workType2';
                        }else if(this.sel_work == '学生'){
                            this.selType = 'workType4';
                        }else if(this.sel_work == '自由职业者'){
                            this.selType = 'workType5';
                        }else{
                            this.selType = '';
                        }
                        break;
                    case 4:
                        this.sel_companytype = tempValue;
                        break;
                    case 5:
                        this.sel_salary = tempValue;
                        break;
                    case 6:
                        this.sel_position = tempValue;
                        break;
                    case 9:
                        this.sel_industry = tempValue;
                        break;
                    case 10:
                        this.sel_manage = tempValue;
                        break;
                    case 11:
                        this.sel_islicense = tempValue;
                        break;
                    case 12:
                        this.sel_lerm = tempValue;
                        break;
                    case 14:
                        this.sel_schoolAge = tempValue;
                        break;
                    case 15:
                        this.sel_marriage = tempValue;
                        break;
                    case 18:
                        this.sel_residencetype = tempValue;
                        break;
                    case 19:
                        this.sel_adressTime = tempValue;
                        break;
                    case 20:
                        this.sel_education = tempValue;
                        break
                    case 21:
                        this.sel_ismortgage= tempValue;
                        break;
                    case 22:
                        this.sel_ispledge = tempValue;
                        break;
                    case 23:
                        this.sel_carInfo = tempValue;
                        break;
                    case 24:
                        this.sel_loans = tempValue;
                        if(this.sel_loans == '否'){
                            this.isShowLoans = false;
                            return;
                        }else{
                            this.isShowLoans = true;
                            return;
                        }
                        break;
                    case 25:
                        this.sel_loanstype = tempValue;
                        break;
                    default:
                        break;
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
                let len = _this.selValue.length;
                _this.selValue = _this.selValue.slice(0,len-1);
                if(this.selectOpt===3){
                    _this.sel_comCity = _this.selValue;
                }else if(this.selectOpt === 8){
                    _this.sel_locality = _this.selValue;
                }else if(this.selectOpt === 13){
                    _this.sel_schoolAdree = _this.selValue;
                }else if(this.selectOpt ===16){
                    _this.sel_city = _this.selValue;
                }else if(this.selectOpt ===17){
                    _this.sel_area = _this.selValue;
                }else if(this.selectOpt == 98){
                    _this.sel_roomAddress = _this.selValue;
                }else{

                }
            },
            //时间下拉框赋值；
            handlePicker2Confirm(v){
                this.value = v ? JSON.stringify(v) : null;
                let _this = this;
                _this.selValue = '';
                v.forEach(element => {
                    _this.selValue += element.value+'';
                });
                if(this.selectOpt===7){
                    _this.sel_time = _this.selValue;
                }else{
                    
                }
            },
            isStr(str){
                if(str == '请选择'){
                    str = ''
                }
                return str
            },            
            //获取年份
            getYear(){
                let _this = this;
                let data = new Date;
                for(let i=0;i<7;i++){                    
                    _this.yearList.push((data.getFullYear()-i)+'年')
                }
            },
            //获取日期
            getday(){
                let _this = this;
                for(let i =1 ;i<=31;i++){
                    _this.gsmoneydayList.push(i+'日')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.4rem;
        margin-bottom: .5rem;
        .page_con{
            background: #fff;
        }
        // .itmeType{
            
        // }
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
</style>