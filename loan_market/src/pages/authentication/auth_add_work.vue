<!--
    create : 刘思奇 2018-08-08
    desc : 人人贷款-认证模块-添加工作信息
-->
<template>
    <div class="page">
        <div class="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();localStorage.removeItem('pageWorkerInfo');" class="goback"></a>
        </div>
        <div class="tips">
            为保证借款申请顺利通过，请务必填写真实信息    
        </div> 
        <div class="identity">
<!--           上班族 -->
            <ul v-if="workTypeCode==='workType1'">
                <item-li name='工作类型' :val='selValueWorkType' type='3' @click.native="showPicker0(1,selValueWorkType)"></item-li>
                <item-li name='公司名称' v-model='inputValCompany' :val='inputValCompany' placeholder='请输入公司名称' type='2' @input="getVal"></item-li>
                <item-li name='公司类型' :val='selValueCompanyType' type='3' @click.native="showPicker0(2)"></item-li>
                <item-li name='公司区域' :val='selValueCompanyArea' type='3' @click.native="showPicker0(3)"></item-li>
                <item-li name='详细地址' v-model='inputValCompanyAddressDetail' :val='inputValCompanyAddressDetail' placeholder='请输入详细地址' type='2' @input="getVal"></item-li>
                <!-- <item-li name='公司电话' v-model='inputValCompanyPhone' :val='inputValCompanyPhone' placeholder='区号-电话号码-分机号' type='2' @input="getVal"></item-li> -->
                
                <li>
                    <div class="item_con">
                        <span class="key" style="min-width:1.8rem">公司电话</span>
                        <div class="phone">
                            <input type="text" class="phone1" placeholder="区号" v-model='val1'/>
                            <span class="spl">-</span>
                            <input type="text" class="phone2" placeholder="电话号码" v-model='val2'/>
                            <span class="spl">-</span>
                            <input type="text" class="phone3" placeholder="分机号" v-model='val3'/>
                        </div>           
                    </div>
                    <div class="item_line"></div>
                </li>
                <!-- <item-li name='公司电话' v-model='inputValCompanyPhone' :val='inputValCompanyPhone' placeholder='区号-电话号码-分机号' type='2' @input="getVal"></item-li> -->
                <item-li name='工作照片' :val='workImg' type='3' @click.native="toUploadImg"></item-li>
                <item-li name='当前单位工龄' :val='selValueTempWorkTime' type='3' @click.native="showPicker0(4)"></item-li>
                <item-li name='发薪日期' :val='selValueSalaryDate' type='3' :rcolor="rcolor" @click.native="showPicker0(5)"></item-li>
                <item-li name='月收入(元)' v-model='monthSalaryIncome' :val='monthSalaryIncome' placeholder='请输入月收入' type='2' @input="getVal"></item-li>
            </ul>
<!--           企业主 -->
            <ul v-else-if="workTypeCode==='workType2'">
                <item-li name='工作类型' :val='selValueWorkType' type='3' @click.native="showPicker0(1,selValueWorkType)"></item-li>
            </ul>
<!--           个体户 -->
            <ul v-else-if="workTypeCode==='workType3'">
                <item-li name='工作类型' :val='selValueWorkType' type='3' @click.native="showPicker0(1,selValueWorkType)"></item-li>
                <item-li name='实际经营所在地' :val='selValueRunningPlace' type='3' @click.native="showPicker0(6)"></item-li>
                <item-li name='详细地址' v-model='inputValCompanyAddressDetail' :val='inputValCompanyAddressDetail' placeholder='请输入详细地址' type='2' @input="getVal"></item-li>
                <item-li name='所属行业' :val='selValueIndustryClassic' type='3' @click.native="showPicker0(7)"></item-li>
                <item-li name='经营类型' :val='selValueRunningType' type='3' :rcolor="rcolor" @click.native="showPicker0(8)"></item-li>
                <item-li name='是否办理营业执照' :val='selValueIsHaveLicense' type='3' :rcolor="rcolor" @click.native="showPicker0(9)"></item-li>
                <item-li name='经营年限' :val='selValueRunningTime' type='3' :rcolor="rcolor" @click.native="showPicker0(10)"></item-li>
                <item-li name='每月总营收(元)' v-model='monthSalaryIncome' :val='monthSalaryIncome' placeholder='请输入每月总营收' type='2' @input="getVal"></item-li>
            </ul>
<!--           学生 -->
            <ul v-else-if="workTypeCode==='workType4'">
                <item-li name='工作类型' :val='selValueWorkType' type='3' @click.native="showPicker0(1,selValueWorkType)"></item-li>
                <item-li name='学校名称' v-model='inputValSchool' :val='inputValSchool' placeholder='请输入学校名称' type='2' @input="getVal"></item-li>
                <item-li name='学校地址' :val='selValueSchoolArea' type='3' @click.native="showPicker0(11)"></item-li>
                <item-li name='详细地址' v-model='inputValSchoolAddressDetail' :val='inputValSchoolAddressDetail' placeholder='请输入详细地址' type='2' @input="getVal"></item-li>
                <item-li name='入学年份' :val='selEnterSchoolYear' type='3' :rcolor="rcolor" @click.native="showPicker0(12)"></item-li>
            </ul>
<!--           自由职业 -->
            <ul v-else-if="workTypeCode==='workType5'">
                <item-li name='工作类型' :val='selValueWorkType' type='3' @click.native="showPicker0(1,selValueWorkType)"></item-li>
                <item-li name='月收入(元)' v-model='monthSalaryIncome' :val='monthSalaryIncome' placeholder='请输入月收入' type='2' @input="getVal"></item-li>
            </ul>
<!--           默认状态 -->
            <ul v-else>
                <item-li name='工作类型' :val='selValueWorkType' type='3' @click.native="showPicker0(1,selValueWorkType)"></item-li>
            </ul>

        </div>
        <btn-com btnval='保存' @click.native="saveWorkInfo(1)"></btn-com>
    <div>
<!--  单列下拉框 -->
        <awesome-picker
        ref="picker0"
        :textTitle="picker0.textTitle"
        :data="picker0.data"
        :anchor="picker0.anchor"
        :swipeTime="picker0.swiperTime"
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
        </div>
        <pop-coma v-show="isShowPopa"></pop-coma>   
    </div>
</template>

<script>
    import AreaList from './components/area';
    import btnCom from '@/components/list/btn';
    import itemLi from '@/components/list/li';
    import { setTimeout } from 'timers';
    import popComa from '@/components/popup/popup_a';
    export default {
        name : 'addWorkInfo',

        data() {
            return {
                isShowPopa:false,
                showSelection:false,
                value: null,
                //下拉框组件配置信息；
                picker0: {
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
                pickerAnchor:[],
                workTypeCode:'',
                workTypeList:[],
                companyTypeList:[],
                companyAreaList:[],
                IsHaveLicenseList:['是','否'],
                EnterSchoolYearList:['2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000','1999','1998','1997','1996','1995','1994','1993','1992','1991','1990','1989','1988','1987','1986','1985','1984','1983','1982','1981','1980','1979','1978','1977','1976','1975','1974','1973','1972','1971','1970'],
                IndustryClassicList:['批发零售','其他'],
                RunningTimeList:['1年以下','1-3年','3年以上'],
                sendSalaryTimeList:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                tempWorkTimeList:[],
                isShowArea:false,
                currentValueArea:'请选择',
                selType:0,
                rcolor:'',
                areaNum:'1',
                //下拉框暂存值;
                selValue:'请选择',
                //下拉框选择值;
                selValueWorkType:'请选择',
                selValueCompanyType:'请选择',
                selValueCompanyArea:'请选择',
                selValueSchoolArea:'请选择',
                selRealRuningPlace:'请选择',
                selValueTempWorkTime:'请选择',
                selValueSalaryDate:'请选择',
                selValueRunningPlace:'请选择',
                selValueIndustryClassic:'请选择',
                selValueIsHaveLicense:'请选择',
                selValueRunningType:'请选择',
                selValueIsHaveLicense:'请选择',
                selValueRunningTime:'请选择',
                selEnterSchoolYear:'请选择',
                inputValCompany:'',
                inputValSchool:'',
                inputValCompanyAddressDetail:'',
                inputValSchoolAddressDetail:'',
                inputValCompanyPhone:'',
                monthSalaryIncome:'',
                workImg:'上传',
                val1:'',
                val2:'',
                val3:'',
                photoList:[],
                SYS_JOB_TYPE:[],
                ADD_COMPANY_TYPE:[],
                ADD_WORK_AGE:[]
            }
        },
        components : {
            //组件
            btnCom,itemLi,popComa
        },
        created() {
            //页面渲染前
            // this.saveWorkInfo();
            this.pkey();
            this.resetYearList();
            let _this = this;
            //获取页面缓存信息;
            if(localStorage.getItem('pageWorkerInfo')){
                        let infoData = JSON.parse(localStorage.getItem('pageWorkerInfo'));
                        _this.selValueWorkType = infoData.selValueWorkType;
                        _this.workTypeCode = infoData.workTypeCode;
                        _this.selValueCompanyType = infoData.selValueCompanyType;
                        _this.selValueCompanyArea = infoData.selValueCompanyArea;
                        _this.selValueTempWorkTime = infoData.selValueTempWorkTime;
                        _this.selValueSalaryDate = infoData.selValueSalaryDate;
                        _this.inputValCompany = infoData.inputValCompany;
                        _this.inputValCompanyAddressDetail = infoData.inputValCompanyAddressDetail;
                        _this.monthSalaryIncome = infoData.monthSalaryIncome;
                        _this.val1 = infoData.val1;
                        _this.val2 = infoData.val2;
                        _this.val3 = infoData.val3;
                        _this.inputValCompanyPhone = infoData.inputValCompanyPhone;
                        _this.workImg = infoData.workImg;
            }else{
                this.getWorkInfo(); 
            }
        },
        mounted() {
            //页面加载完毕  
            // this.getWorkInfo(); 
            // this.photoData()
        },
        methods:{
            close(){
                this.isShowPopa = false;
            },            
            pkey(){
                let _this = this;
                this.$ajax.post('/api/dict/pkey',_this.$qs.stringify({pkeys:'SYS_JOB_TYPE,ADD_COMPANY_TYPE,ADD_WORK_AGE'}),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    let resData = res.data;
                    //工作类型
                    _this.SYS_JOB_TYPE = resData.result.SYS_JOB_TYPE;
                    //公司类型
                    _this.ADD_COMPANY_TYPE = resData.result.ADD_COMPANY_TYPE;
                    //工龄
                    _this.ADD_WORK_AGE = resData.result.ADD_WORK_AGE;
                    //工作类型
                    for(let i=0;i<resData.result.SYS_JOB_TYPE.length;i++){
                        _this.workTypeList.push(resData.result.SYS_JOB_TYPE[i].value);
                    }
                    //公司类型
                    for(let i=0;i<resData.result.ADD_COMPANY_TYPE.length;i++){
                        _this.companyTypeList.push(resData.result.ADD_COMPANY_TYPE[i].value);
                    }
                    //工龄
                    for(let i=0;i<resData.result.ADD_WORK_AGE.length;i++){
                        _this.tempWorkTimeList.push(resData.result.ADD_WORK_AGE[i].value);
                    }                    
                })
            },
            resetYearList(){
                this.EnterSchoolYearList = [];
                let d = new Date();
                let tempYear = d.getFullYear();
                let tempMonth = d.getMonth()+1;
                let tempDate = d.getDate();
                // alert(tempYear+'-'+tempMonth+'-'+tempDate);
                if(tempMonth<8||(tempMonth===8&&tempDate===1)){
                    // alert(tempMonth+'-'+tempDate);
                    this.EnterSchoolYearList = [tempYear-1,tempYear-2,tempYear-3,tempYear-4,tempYear-5,tempYear-6,];
                }else{
                    this.EnterSchoolYearList = [tempYear,tempYear-1,tempYear-2,tempYear-3,tempYear-4,tempYear-5,tempYear-6,];
                }
            },
            // 图片资料接口
            photoData(){
                let _this = this;
                let data = {
                    userId:1211
                };
                this.$ajax.post('/api/userimg/query',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,data)
                })
                .then(res=>{
                    console.log(res)
                    if(res.status == '200'){
                        _this.photoList = res.data.result.fileItems;
                        if(_this.photoList&&_this.photoList.length>0){
                            _this.workImg=_this.photoList.length;
                        }
                    }else{
                        console.log(res)
                    }
                })
            },
            //获取页面信息；
            getWorkInfo(){
                let postData = {
                            //  userId:'1211'
                }
                let _this = this;
                _this.$ajax.post('/api/workinfo/query',_this.$qs.stringify(postData),{headers: _this.Base.initAjaxHeader(1,postData)}).then(res=>{
                    if(parseInt(res.data.status)===0){
                        // alert(1111);
                        let infoData = res.data.result;
                        for(var i in infoData){
                            if(!infoData[i]){
                                infoData[i]='';
                            }
                        };
                        // _this.selValueWorkType = _this.getWorkType(infoData.workType);

                        _this.selValueWorkType = _this.Base.getValue(infoData.workType,_this.SYS_JOB_TYPE);
                        // alert(infoData.workType);
                        // _this.picker0.anchor = [_this.selValueWorkType];
                        // alert(_this.SYS_JOB_TYPE);
                        _this.workTypeCode = _this.getWorkTypeCode(_this.selValueWorkType);
                        if(_this.workTypeCode==='workType1'){
                            // alert(12222);
                            //上班族表单信息;
                            let ext_pho = '';
                            if(infoData.workPhoneExtend){
                                ext_pho = ',';
                            }
                            _this.selValueCompanyType = infoData.companyType?_this.Base.getValue(infoData.companyType,_this.ADD_COMPANY_TYPE):'请选择';
                            _this.selValueCompanyArea = infoData.area?infoData.province+','+infoData.city+','+infoData.area:'请选择';
                            _this.selValueTempWorkTime = infoData.workTime?_this.Base.getValue(infoData.workTime,_this.ADD_WORK_AGE):'请选择';
                            _this.selValueSalaryDate = infoData.salaryTime?infoData.salaryTime:'请选择';
                            _this.inputValCompany = infoData.companyName?infoData.companyName:'';
                            _this.inputValCompanyAddressDetail = infoData.address?infoData.address:'';
                            _this.monthSalaryIncome = infoData.monthSalary?infoData.monthSalary:'';
                            _this.val1 = infoData.workPhoneArea||'';
                            _this.val2 = infoData.workPhone||'';
                            _this.val3 = infoData.workPhoneExtend||'';
                            _this.inputValCompanyPhone = infoData.workPhone?infoData.workPhoneArea+'-'+infoData.workPhone+ext_pho+infoData.workPhoneExtend:'';
                            _this.workImg = infoData.workImage.length?infoData.workImage.length:'上传';
                        }else if(_this.workTypeCode==='workType2'){
                            //企业主表单信息;

                        }else if(_this.workTypeCode==='workType3'){
                            //个体户表单信息;
                            _this.selValueRunningPlace = infoData.area?infoData.province+','+infoData.city+','+infoData.area:'请选择';
                            _this.inputValCompanyAddressDetail = infoData.address?infoData.address:'';
                            _this.selValueIndustryClassic = infoData.industry?infoData.industry:'';
                            _this.selValueRunningType = infoData.businessType?infoData.businessType:'';
                            _this.selValueIsHaveLicense = infoData.hasBusinessLicense?infoData.hasBusinessLicense:'';
                            _this.selValueRunningTime = infoData.businessLife?infoData.businessLife:'';
                            _this.monthSalaryIncome = infoData.monthRevenue?infoData.monthRevenue:'';
                        }else if(_this.workTypeCode==='workType4'){
                            //学生表单信息;
                            _this.inputValSchool = infoData.schoolName?infoData.schoolName:'';
                            _this.selValueSchoolArea = infoData.area?infoData.province+','+infoData.city+','+infoData.area:'请选择';
                            _this.inputValSchoolAddressDetail = infoData.address?infoData.address:'';
                            _this.selEnterSchoolYear = infoData.schoolTime?infoData.schoolTime:'';
                        }else if(_this.workTypeCode==='workType5'){
                            //自由职业表单信息;
                            _this.monthSalaryIncome = infoData.monthSalary?infoData.monthSalary:'';
                        }
                        _this.workImg = infoData.workImage.length?infoData.workImage.length:'上传';
                    }else{
                        _this.$msg({content:res.data.msg});
                    }
                    console.log(res);
                });
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
                    return '自由职业'
                }else{
                    return '请选择'
                }
            },
            //获取用户角色;
            getWorkTypeCode(type){
                if(type==='工薪族'){
                    return 'workType1'
                }else if(type==='企业主'){
                    return 'workType2'
                }else if(type==='个体户'){
                    return 'workType3'
                }else if(type==='学生'){
                    return 'workType4'
                }else if(type==='自由职业'){
                    return 'workType5'
                }
            },
            //上传图片页面跳转;
            toUploadImg(){
                if(this.Base.getClientType().type=='wap'){
                    this.isShowPopa = true;
                    return false;
                }
                this.$router.push({name:'UploadPhoto',params:{type:'0'}});
                // window.location.href='/auth/uploadPhoto/0';
                // saveTempInfo();
                this.saveTempInfo();
            },
            //缓存页面信息;
            saveTempInfo(){
                let _this = this;
                localStorage.setItem('pageWorkerInfo',JSON.stringify({
                    'selValueWorkType':_this.selValueWorkType,
                    'workTypeCode':_this.workTypeCode,
                    'selValueCompanyType':_this.selValueCompanyType,
                    'selValueCompanyArea':_this.selValueCompanyArea,
                    'selValueTempWorkTime':_this.selValueTempWorkTime,
                    'selValueSalaryDate':_this.selValueSalaryDate,
                    'inputValCompany':_this.inputValCompany,
                    'inputValCompanyAddressDetail':_this.inputValCompanyAddressDetail,
                    'monthSalaryIncome':_this.monthSalaryIncome,
                    'val1':_this.val1,
                    'val2':_this.val2,
                    'val3':_this.val3,
                    'inputValCompanyPhone':_this.inputValCompanyPhone,
                    'workImg':_this.workImg,
                }));
            },
            //保存工作信息;
            saveWorkInfo(status){
                let _this = this;
                
                //判断数据校验是否通过;
                if(status){
                    if(!this.checkData()){
                        return;
                    }
                }
                let postData = {};
                if(_this.workTypeCode==='workType1'){
                    let phoneArr = _this.inputValCompanyPhone.split('-');
                    console.log(phoneArr);
                    if(!phoneArr[2]){
                        phoneArr[2] = '';
                    }
                    postData = { 
                                workType:_this.Base.getVkey(_this.selValueWorkType,_this.SYS_JOB_TYPE),
                                companyName:_this.inputValCompany,
                                companyType:_this.Base.getVkey(_this.selValueCompanyType,_this.ADD_COMPANY_TYPE),
                                province:_this.selValueCompanyArea.split(',')[0],
                                city:_this.selValueCompanyArea.split(',')[1],
                                area:_this.selValueCompanyArea.split(',')[2],
                                address:_this.inputValCompanyAddressDetail,
                                workTime:_this.Base.getVkey(_this.selValueTempWorkTime,_this.ADD_WORK_AGE),
                                salaryTime:_this.selValueSalaryDate,
                                monthSalary:_this.monthSalaryIncome,
                                workPhone:_this.val2,
                                workPhoneArea:_this.val1,
                                workPhoneExtend:_this.val3
                    };
                }else if(_this.workTypeCode==='workType2'){
                    postData = {
                                workType:_this.workTypeCode,
                    };
                }else if(_this.workTypeCode==='workType3'){
                    postData = {
                                workType:_this.Base.getVkey(_this.selValueWorkType,_this.SYS_JOB_TYPE),//工作类型；
                                industry:_this.selValueIndustryClassic,
                                province:_this.selValueRunningPlace.split(',')[0],
                                city:_this.selValueRunningPlace.split(',')[1],
                                area:_this.selValueRunningPlace.split(',')[2],
                                address:_this.inputValCompanyAddressDetail,
                                businessType:_this.selValueRunningType,
                                hasBusinessLicense:_this.selValueIsHaveLicense,
                                monthRevenue:_this.monthSalaryIncome,
                                businessLife:_this.selValueRunningTime,
                    };
                }else if(_this.workTypeCode==='workType4'){
                    postData = {
                                workType:_this.Base.getVkey(_this.selValueWorkType,_this.SYS_JOB_TYPE),
                                schoolName:_this.inputValSchool,
                                province:_this.selValueSchoolArea.split(',')[0],
                                city:_this.selValueSchoolArea.split(',')[1],
                                area:_this.selValueSchoolArea.split(',')[2],
                                address:_this.inputValSchoolAddressDetail,
                                schoolTime:_this.selEnterSchoolYear,
                    };
                }else if(_this.workTypeCode==='workType5'){
                    postData = {
                                workType:_this.Base.getVkey(_this.selValueWorkType,_this.SYS_JOB_TYPE),
                                monthSalary:_this.monthSalaryIncome
                    };
                }
                _this.$ajax.post('/api/workinfo/bind',_this.$qs.stringify(postData),{headers: _this.Base.initAjaxHeader(1,postData)}).then(res=>{
                    if(parseInt(res.data.status)===0){
                        if(status){
                            _this.$msg({content:res.data.msg});
                            if(this.$route.query.type == 2){
                                this.$router.push({ name : 'AuthInfor'});
                            }else{
                                setTimeout(_=>{
                                    _this.$router.push({name:'Authentication'});
                                    // window.location.href = '/authentication';
                                },500);                                
                            }
                        }
                    }else{
                        _this.$msg({content:res.data.msg});
                    }
                    console.log(res);
                });
            },
            //获取输入的值
            getVal(data){
                console.log(data);
            },
            showInputVal(){
                console.log(this.inputValCompany+'======'+this.inputValCompanyAddressDetail+'====='+this.inputValCompanyAddressDetail+'======='+this.inputValCompanyPhone);
            },
            //显示下拉框;
            showPicker0 (type,selVal) {
                this.showSelection = true;
                let _this = this;
                this.selType = type;
                if(type===1){
                    // _this.picker0.anchor=[selVal];
                    this.picker0.data = [this.workTypeList];
                }else if(type===2){
                    this.picker0.data = [this.companyTypeList];
                }else if(type===4){
                    this.picker0.data = [this.tempWorkTimeList];
                }else if(type===5){
                    this.picker0.data = [this.sendSalaryTimeList];
                }else if(type===7){
                    this.picker0.data = [this.IndustryClassicList];
                }else if(type===8){
                    this.picker0.data = [this.companyTypeList];
                }else if(type===9){
                    this.picker0.data = [this.IsHaveLicenseList];
                }else if(type===10){
                    this.picker0.data = [this.RunningTimeList];
                }else if(type===12){
                    this.picker0.data = [this.EnterSchoolYearList];
                }
                // setTimeout(function(){
                //     _this.$refs.picker0.show();
                // },100);
                if(type===3||type===6||type===11){
                    _this.$refs.picker1.show();
                }else{
                    _this.$refs.picker0.show();
                }
                // console.log(_this.picker0.data);
                // _this.picker0.anchor=[selVal];
            },
            //给下拉框赋值；
            handlePicker1Confirm(v){
                this.value = v ? JSON.stringify(v) : null;
                let _this = this;
                _this.selValue = '';
                v.forEach(element => {
                    _this.selValue += element.value+',';
                });
                let len = _this.selValue.length;
                _this.selValue = _this.selValue.slice(0,len-1);
                if(this.selType===3){
                    _this.selValueCompanyArea = _this.selValue;
                }else if(this.selType===6){
                    _this.selValueRunningPlace = _this.selValue;
                }else if(this.selType===11){
                    _this.selValueSchoolArea = _this.selValue;
                }
            },
            //给下拉框赋值；
            handlePicker0Confirm (v) {
                // this.picker0.anchor = v
                this.value = v ? JSON.stringify(v) : null;
                let _this = this;
                _this.selValue = '';
                v.forEach(element => {
                    _this.selValue += element.value;
                });
                if(this.selType===1){
                    _this.workTypeCode = _this.getWorkTypeCode(_this.selValue);
                    _this.selValueWorkType = _this.selValue;
                    _this.selValueCompanyType='请选择',
                    _this.selValueCompanyArea='请选择',
                    _this.selValueSchoolArea='请选择',
                    _this.selRealRuningPlace='请选择',
                    _this.selValueTempWorkTime='请选择',
                    _this.selValueSalaryDate='请选择',
                    _this.selValueRunningPlace='请选择',
                    _this.selValueIndustryClassic='请选择',
                    _this.selValueIsHaveLicense='请选择',
                    _this.selValueRunningType='请选择',
                    _this.selValueIsHaveLicense='请选择',
                    _this.selValueRunningTime='请选择',
                    _this.selEnterSchoolYear='请选择',
                    _this.inputValCompany='',
                    _this.inputValSchool='',
                    _this.inputValCompanyAddressDetail='',
                    _this.inputValSchoolAddressDetail='',
                    _this.inputValCompanyPhone='',
                    _this.monthSalaryIncome='';
                }else if(this.selType===2){
                _this.selValueCompanyType = _this.selValue;
                }else if(this.selType===4){
                    _this.selValueTempWorkTime = _this.selValue;
                }else if(this.selType===5){
                    _this.selValueSalaryDate = _this.selValue;
                }else if(this.selType===7){
                    _this.selValueIndustryClassic = _this.selValue;
                }else if(this.selType===8){
                    _this.selValueRunningType = _this.selValue;
                }else if(this.selType===9){
                    _this.selValueIsHaveLicense = _this.selValue;
                }else if(this.selType===10){
                    _this.selValueRunningTime = _this.selValue;
                }else if(this.selType===12){
                    _this.selEnterSchoolYear = _this.selValue;
                }
                
                    
            },
            checkData(){
                let _this = this;
                let regs = _this.Base.regs
                if(_this.selValueWorkType==='请选择'){
                    _this.$msg({content:'请选择工作类型'});
                    return false;
                }
                if(_this.workTypeCode==='workType1'){
                    if(_this.inputValCompany.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length===0){
                        _this.$msg({content:'请填写公司名称'});
                        return false;
                    }else if(_this.selValueCompanyType==='请选择'){
                        _this.$msg({content:'请选择公司类型'});
                        return false;
                    }else if(_this.selValueCompanyArea==='请选择'){
                        _this.$msg({content:'请选择公司区域'});
                        return false;
                    }else if(_this.inputValCompanyAddressDetail.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length===0){
                        _this.$msg({content:'请填写公司详细地址'});
                        return false;
                    }else if(_this.val1.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length===0){
                        _this.$msg({content:'请填写电话区号'});
                        return false;
                    }else if(!regs.phoZone.test(_this.val1)){
                        _this.$msg({content:'电话区号格式错误'});
                        return false;
                    }else if(_this.val2.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length===0){
                        _this.$msg({content:'请填写电话号码'});
                        return false;
                    }else if(!regs.phoneNo.test(_this.val2)){
                        _this.$msg({content:'电话号码格式错误'});
                        return false;
                    }
                    // else if(_this.val3.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length===0){
                    //     _this.$msg({content:'请填写电话分机号'});
                    //     return false;
                    // }
                    else if(!regs.phoExtend.test(_this.val3)){
                        _this.$msg({content:'电话分机号格式错误'});
                        return false;
                    }
                    // else if(_this.workImg==='上传'){
                    //     _this.$msg({content:'请上传图片'});
                    //     return false;
                    // }
                    // else if(_this.selValueTempWorkTime==='请选择'){
                    //     _this.$msg({content:'请选择当前单位工龄'});
                    //     return false;
                    // }
                    // else if(_this.selValueSalaryDate==='请选择'){
                    //     _this.$msg({content:'请选择发薪日期'});
                    //     return false;
                    // }
                    else if(_this.monthSalaryIncome.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length>0){
                        
                        if(!_this.Base.regs.monthSalary.test(_this.monthSalaryIncome.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""))){
                        _this.$msg({content:'月收入格式不正确'});
                        return false;
                        }else{
                            return true;
                        }
                    }
                    else{
                        return true;
                    }
                }else if(_this.workTypeCode==='workType2'){
                    //企业主;
                    return true;
                }else if(_this.workTypeCode==='workType3'){
                    if(_this.selValueIndustryClassic==='请选择'){
                        _this.$msg({content:'请选择所属行业'});
                        return false;
                    }else if(_this.selValueRunningPlace==='请选择'){
                        _this.$msg({content:'请选择实际经营所在地'});
                        return false;
                    }else if(_this.inputValCompanyAddressDetail.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length===0){
                        _this.$msg({content:'请填写详细地址'});
                        return false;
                    }else if(_this.selValueRunningType==='请选择'){
                        _this.$msg({content:'请选择经营类型'});
                        return false;
                    }else if(_this.selValueIsHaveLicense==='请选择'){
                        _this.$msg({content:'请选择是否办理营业执照'});
                        return false;
                    }
                    // else if(_this.selValueRunningTime==='请选择'){
                    //     _this.$msg({content:'请选择经营年限'});
                    //     return false;
                    // }
                    else if(_this.monthSalaryIncome.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length>0){
                        if(!_this.Base.regs.monthSalary.test(_this.monthSalaryIncome.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""))){
                        _this.$msg({content:'每月总营收(元)格式不正确'});
                            return false;
                        }else{
                            return true;
                        }
                    }
                    else{
                        return true;
                    }
                }else if(_this.workTypeCode==='workType4'){
                    if(_this.inputValSchool.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length===0){
                        _this.$msg({content:'请填写学校名称'});
                        return false;
                    }else if(_this.selValueSchoolArea==='请选择'){
                        _this.$msg({content:'请选择学校地址'});
                        return false;
                    }else if(_this.inputValSchoolAddressDetail.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length===0){
                        _this.$msg({content:'请填写详细地址'});
                        return false;
                    }else if(_this.selEnterSchoolYear==='请选择'){
                        _this.$msg({content:'请选择入学年份'});
                        return false;
                    }else{
                        return true;
                    }

                }
                else if(_this.workTypeCode==='workType5'){
                    if(_this.monthSalaryIncome.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").length>0){
                        if(!_this.Base.regs.monthSalary.test(_this.monthSalaryIncome.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""))){
                            _this.$msg({content:'月收入格式不正确'});
                            return false;
                        }else{
                            return true;
                        }
                    }else{
                        return true;
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.4rem;
        padding-bottom: 1.3rem;
        .tips{
            padding: .2rem .33rem;
            color: #aaa;
        }
        .identity{
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
                }
                .phone2{
                    max-width: 30%;
                    width: 22%;
                }
                .phone3{
                    max-width: 35%;
                    width: 18%;
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
    }
</style>