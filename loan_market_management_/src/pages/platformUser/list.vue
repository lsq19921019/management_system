<!--
    create : 田鹏伟 2018-11-21
    desc : 用户信息-用户列表
-->
<template>
    <div class="_contain">
        <!-- 条件查询组件-->
        <search-component :pubConfig="pubConfig" :subConfig="searchConfig" @search="getList" v-if="isShowSearchComponent"></search-component>
        <!-- 副按钮 -->
        <sub-btns :subBtnsConfig="subBtnsConfig"></sub-btns> 
        <!-- 表格&分页 -->
        <table-component :tableConfig="tableConfig" @getList="getList" :pubConfig="pubConfig" ref="myTable"></table-component>
        <!-- 展示用户详情 -->
        <div class="detail">
            <el-dialog title="" :visible.sync="outerVisible" fullscreen >
                <h1 style="position:relative;top:-30px;">用户详情</h1>
                <div class="detail_td">
                    <p class="detail_title">身份信息</p>
                    <div style="width:800px;"  v-if="detailData.userInfoExtEntity!=null">
                        <el-row :gutter="20" class="mt10">
                            <el-col :span="8">
                                <strong>姓名：</strong>{{ detailData.userInfoExtEntity.userName|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>手机号：</strong>{{ detailData.userInfoExtEntity.userPhone|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>身份证账号：</strong>{{ detailData.userInfoExtEntity.userIdcard|handlerNull }}
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="mt10">
                            <el-col :span="8">
                                <strong>注册时间：</strong>{{ detailData.userInfoExtEntity.createTimeDesc|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>注册来源1：</strong>{{ detailData.userInfoExtEntity.relation|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>注册来源2：</strong>{{ detailData.userInfoExtEntity.srelation|handlerNull }}
                            </el-col>
                        </el-row>
                    </div>
                    <p v-else>暂无数据</p>
                </div> 
                <div class="detail_td mt15">
                    <p class="detail_title">认证情况</p>
                    <p class="mt5">共认证&nbsp;<span class="c1">{{ detailData.hasVerifys }}</span>&nbsp;项内容</p>
                    <div class="mt10" style="width:700px;">
                        <el-table :data="detailData.userVerifyList" border>
                            <el-table-column prop="name" label="认证名称"></el-table-column>
                            <el-table-column label="认证状态">
                                <template slot-scope="scope">
                                    <span :class="{ c1 : scope.row.hasVerify }" v-if="scope.row.name != '设备信息'">{{ scope.row.hasVerify ? '已认证' : '未认证' }}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="认证详情">
                                <template slot-scope="scope">
                                    <a href="javascript:;" @click="lookVerify(scope.row)" v-if="scope.row.hasVerify && scope.row.name != '运营商报告'" class="c1">查看</a>
                                    <a href="javascript:;" class="c1" @click="lookVerify(scope.row)" v-if="scope.row.name == '设备信息'">查看</a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="updateTimeDesc" label="最近更新时间"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="detail_td mt15">
                    <p class="detail_title">订单信息</p>
                    <div class="mt10" style="width:900px;">
                        <el-table border :data="detailData.orderInfoList">
                            <el-table-column prop="createTimeDesc" label="申请时间"></el-table-column>
                            <el-table-column prop="platformName" label="产品名称"></el-table-column>
                            <el-table-column prop="bizId" label="订单号"></el-table-column>
                            <el-table-column prop="statusDesc" label="订单状态"></el-table-column>
                            <el-table-column prop="borrowAmount" label="借款金额"></el-table-column>
                            <el-table-column prop="repayTimeDesc" label="还款时间"></el-table-column>
                            <el-table-column prop="repayAmount" label="还款金额"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 内层对话框 -->
                <el-dialog width="1100px" :title="innerTitle" :visible.sync="innerVisible" append-to-body>
                    <!-- 身份认证-对接完成 -->
                    <div v-if="innerTitle == '身份认证'">
                        <el-row :gutter="20" class="">
                            <el-col :span="8">
                                <strong>姓名：</strong>{{ detailData.identityInfo.cardName|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>手机号：</strong>{{ detailData.identityInfo.phone|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>身份证账号：</strong>{{ detailData.identityInfo.cardId|handlerNull }}
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="mt10">
                            <el-col :span="8">
                                <strong>年龄：</strong>{{ detailData.identityInfo.age|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>教育程度：</strong>{{ detailData.identityInfo.educationDesc|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>婚姻状况：</strong>{{ detailData.identityInfo.maritalDesc|handlerNull }}
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="mt10">
                            <el-col :span="8">
                                <dl class="idcard_img">
                                    <dt><img :src="detailData.identityInfo.positiveImg"></dt>
                                    <dd><strong>身份证正面照片</strong></dd>
                                </dl>
                            </el-col>
                            <el-col :span="8">
                                <dl class="idcard_img">
                                    <dt><img :src="detailData.identityInfo.reverseImg"></dt>
                                    <dd><strong>身份证反面照片</strong></dd>
                                </dl>
                            </el-col>
                            <el-col :span="8">
                                <dl class="idcard_img">
                                    <dt><img :src="detailData.identityInfo.livingImg"></dt>
                                    <dd><strong>人脸照片</strong></dd>
                                </dl>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="mt10">
                            <el-col :span="8">
                                <dl class="idcard_img">
                                    <dt><img :src="detailData.identityInfo.handImg"></dt>
                                    <dd><strong>手持身份证照</strong></dd>
                                </dl>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 联系人认证-对接完成 -->
                    <div v-if="innerTitle == '联系人认证'" style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                        <p class="p1 pb5">（直系亲属联系人）</p>
                        <el-row :gutter="20" class="">
                            <el-col :span="8">
                                <strong>与本人关系：</strong>{{ detailData.concatInfo.relationDesc|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>联系人昵称：</strong>{{ detailData.concatInfo.name|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>手机号：</strong>{{ detailData.concatInfo.mobile|handlerNull }}
                            </el-col>
                        </el-row>
                        <p class="p1 pb5 mt10">（其他联系人）</p>
                        <el-row :gutter="20" class="">
                            <el-col :span="8">
                                <strong>与本人关系：</strong>{{ detailData.concatInfo.relationSpareDesc|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>联系人昵称：</strong>{{ detailData.concatInfo.nameSpare|handlerNull }}
                            </el-col>
                            <el-col :span="8">
                                <strong>手机号：</strong>{{ detailData.concatInfo.mobileSpare|handlerNull }}
                            </el-col>
                        </el-row>
                        <p class="p1 pb5 mt10">（通讯录信息）</p>
                        <!-- <el-row :gutter="20" class="mt5" v-for="(c,index) in detailData.contactsList" :key="index">
                            <el-col :span="8">
                                <strong>姓名：</strong>{{ c
                                .name|handlerNull }}
                            </el-col>
                            <el-col :span="14">
                                <strong>联系方式：</strong>{{ c
                                .number|handlerNull }}
                            </el-col>
                        </el-row> -->
                        <el-table :data="detailData.contactsList">
                            <el-table-column width="350" label="姓名">
                                <template slot-scope="scope">
                                    {{ scope.row.name|handlerNull }}
                                </template>
                            </el-table-column>
                            <el-table-column label="联系方式">
                                <template slot-scope="scope">
                                    {{ scope.row.number|handlerNull }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 工作信息-对接完成 -->
                    <div v-if="innerTitle == '工作信息'">
                        <el-row :gutter="20" class="">
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>工作类型：</strong>{{ detailData.userWorkInfo.workTypeDesc|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>公司名称：</strong>{{ detailData.userWorkInfo.companyName|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>公司类型：</strong>{{ detailData.userWorkInfo.companyTypeDesc|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>公司区域：</strong>{{ detailData.userWorkInfo.allRegion|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>公司详细地址：</strong>{{ detailData.userWorkInfo.address|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>单位电话：</strong>{{ detailData.userWorkInfo.allWorkPhone|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>当前单位工龄：</strong>{{ detailData.userWorkInfo.workTimeDesc|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>发薪日期：</strong>{{ detailData.userWorkInfo.salaryTime|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>月收入（元）：</strong>{{ detailData.userWorkInfo.monthSalary|handlerNull }}
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 社交认证-对接完成 -->
                    <div v-if="innerTitle == '社交认证'">
                        <el-row :gutter="20" class="">
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>常用邮箱：</strong>{{ detailData.socialContactInfo.email|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>QQ账号：</strong>{{ detailData.socialContactInfo.qq|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>微信账号：</strong>{{ detailData.socialContactInfo.wechart|handlerNull }}
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 加分资料认证-对接完成 -->
                    <div v-if="innerTitle == '加分资料认证'">
                        <el-row :gutter="20" class="">
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>现居地址：</strong>{{ detailData.userBonusInfo.allHomeRegion|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>现居详细地址：</strong>{{ detailData.userBonusInfo.homeAddress|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>住宅类型：</strong>{{ detailData.userBonusInfo.homeTypeDesc|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>住宅电话：</strong>{{ detailData.userBonusInfo.allHomePhone|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="16">
                                <div class="mt10">
                                    <strong>居住时长：</strong>{{ detailData.userBonusInfo.liveTimeDesc|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>车辆信息：</strong>{{ detailData.userBonusInfo.carInfoDesc|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>车辆状况：</strong>{{ detailData.userBonusInfo.carStatusDesc|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>车牌号：</strong>{{ detailData.userBonusInfo.carNo|handlerNull }}
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 照片资料-对接完成 -->
                    <div v-if="innerTitle == '照片资料认证'">
                        <el-row :gutter="20" class="">
                            <el-col :span="8" v-for="(p,i) in detailData.fileDataInfoList" :key="i">
                                <div class="mt10">
                                    <strong>{{ p.name }}：</strong>{{ p.num }}&nbsp;
                                    <a href="javascript:;" class="c1" v-if="p.num > 0" @click="lookPhoto(p)">查看</a>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 设备信息-对接完成 -->
                    <div v-if="innerTitle == '设备信息'">
                        <el-row :gutter="20" class="">
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>设备标识：</strong>{{ detailData.deviceInfo.deviceId|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>设备名称：</strong>{{ detailData.deviceInfo.deviceInfo|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>设备类型：</strong>{{ detailData.deviceInfo.osType|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>系统版本号：</strong>{{ detailData.deviceInfo.osVersion|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>最后登录时间：</strong>{{ detailData.deviceInfo.lastLoginTime|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>经度：</strong>{{ detailData.deviceInfo.gpsLongitude|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>纬度：</strong>{{ detailData.deviceInfo.gpsLatitude|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>具体地址：</strong>{{ detailData.deviceInfo.gpsAddress|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>登录设备IP地址：</strong>{{ detailData.deviceInfo.ip|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>内存容量：</strong>{{ detailData.deviceInfo.memory|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>总内存存储：</strong>{{ detailData.deviceInfo.storage|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>可使用内部存储：</strong>{{ detailData.deviceInfo.unuseStorage|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>是否使用WIFI：</strong>{{ detailData.deviceInfo.wifi|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>运营商：</strong>{{ detailData.deviceInfo.carrier|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>APP下载渠道：</strong>{{ detailData.deviceInfo.appMarke|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>是否ROOT或越狱：</strong>{{ detailData.deviceInfo.isRoot|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>是否为模拟器：</strong>{{ detailData.deviceInfo.isSimulator|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>图片数量：</strong>{{ detailData.deviceInfo.picCount|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>Android_id：</strong>{{ detailData.deviceInfo.androidId|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>唯一设备标识符：</strong>{{ detailData.deviceInfo.udid|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>国际移动用户识别码：</strong>{{ detailData.deviceInfo.imsi|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>MAC地址：</strong>{{ detailData.deviceInfo.mac|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>内存卡容量：</strong>{{ detailData.deviceInfo.sdcard|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>已使用的容量：</strong>{{ detailData.deviceInfo.unuseSdcard|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>IMEI：</strong>{{ detailData.deviceInfo.imei|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>注册时间：</strong>{{ detailData.deviceInfo.createTimeDesc|handlerNull }}
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="mt10">
                                    <strong>更新时间：</strong>{{ detailData.deviceInfo.updateTimeDesc|handlerNull }}
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 照片资料弹窗 -->
                    <el-dialog width="700px" :title="innerPhotoTitle" :visible.sync="innerPhotoVisible" append-to-body>
                        <div v-for="(img,i) in innerPhotoSrc" :key="i" style="padding:5px;">
                            <img :src="img" style="width:100%;" />
                        </div>
                    </el-dialog>


                </el-dialog>
            </el-dialog>
        </div>
        <form action="">

        </form>
    </div>
</template>

<script>
    import searchComponent from '@/pages/components/search';
    import subBtns from '@/pages/components/subBtns';
    import tableComponent from '@/pages/components/table';
    export default {
        name : 'PlatformUserList',
        data() {
            let _this = this;
            return {
                //公共
                pubConfig : {
                    apiName : 'userInfo',
                },
                //公共-传递给子组件的数据
                searchConfig : {
                    //后端返回的搜索规则
                    fliters : [
                    //    {
                    //        field : 'platformName',  //字段
                    //        type : 'datetime',  //搜索组件类型
                    //        editable : true,  //是否可用（用于权限判断）
                    //    } 
                    ], 
                    //搜索组件额外的按钮配置
                    fliterBtnConfig : [],
                    fliterChildData : {},  //搜索查询中需要用到的字典数据（下拉框项、单选框项）
                },
                //公共-是否显示(搜索)子组件（当异步执行完毕时候更改值）
                isShowSearchComponent : false,
                //公共-副按钮组配置
                subBtnsConfig : [
                    {
                        icon : 'el-icon-download',  //图标
                        text : '批量导出',  //按钮文案
                        //供子元素调用的方法
                        fncName() {
                            _this.export();                            
                        },
                    }
                ],
                //公共-表格配置
                tableConfig : {
                    thConfig : [
                        {
                            text : 'UID',
                            key : 'userId'
                        },{
                            text : '真实姓名',
                            key : 'userName'
                        },{
                            text : '注册手机号',
                            key : 'userPhone'
                        },{
                            text : '是否实名注册', 
                            key : 'statusDesc'
                        },{
                            text : '性别',
                            key : 'sexDesc'
                        },{
                            text : '注册来源1',
                            key : 'relation'
                        },{
                            text : '注册来源2',
                            key : 'srelation'
                        },{
                            text : '注册时间',
                            key : 'createTimeDesc'
                        }
                    ],
                    showOpreate : true,  //是否显示操作列
                    showPagination : true,  //是否显示分页
                    operateBtnConfig : [
                        {
                            text : '详情',  //按钮文案
                            //供子元素调用的方法
                            fncName(row) {
                                _this.openDetail(row); 
                            },
                        }
                    ]
                },
                searchData : {},  //搜索条件
                //以下页面独有字段
                //外层对话框
                outerVisible : false,
                //显示内层对话框 
                innerVisible : false,
                //内层对话框标题
                innerTitle : '',
                //照片弹窗标题
                innerPhotoTitle : '',
                //显示照片弹窗
                innerPhotoVisible : false,
                //显示的照片地址数据
                innerPhotoSrc : [],
                detailData : {
                    userInfoExtEntity : {},  //用户基础信息
                    hasVerifys : [],  //用户已认证项
                    orderInfoList : [],  //用户订单信息
                    identityInfo : {},  //用户身份信息
                    concatInfo : {},  //用户紧急联系人
                    contactsList : [],  //通讯录信息
                    userWorkInfo : {},  //工作信息
                    socialContactInfo : {},  //社交信息
                    fileDataInfoList : [],  //照片资料
                    deviceInfo : {},  //设备标识
                }
            }
        },
        components : {
            searchComponent,subBtns,tableComponent
        },
        //自定义方法集合
        methods : {
            //获取当前页面模块配置
            getOperateConfig() {
                this.http(this,{
                    url : 'operateConfig/operates',
                    data : {
                        module : this.pubConfig.apiName
                    }
                }).then(data=>{
                    //设置搜索子组件规则
                    let fliters = data.fliters;
                    this.searchConfig.fliters = fliters;
                    this.getKeys(fliters);                    
                });
            },
            //获取子组件需要用到的字典数据
            getKeys() {
                let fliters = this.searchConfig.fliters;
                let fliterChildData = this.searchConfig.fliterChildData;
                let arr = [];
                for(let i=0; i<fliters.length; i++) {
                    if(fliters[i].dict != null && fliters[i].dict.length > 0) {
                        arr.push(fliters[i].dict);
                        fliterChildData[fliters[i].field] = null;
                    }
                }
                if(arr.length < 1) {
                    this.isShowSearchComponent = true;
                    return;
                };
                this.http(this,{
                    url : 'dict/pkey',
                    data : {
                        pkeys : arr.join(',')
                    }
                }).then(data=>{
                    //new RegExp(n,'i').test(k.replace(/_/g,''))
                    //console.log(data);
                    for(let k in fliterChildData) {
                        for(let n in data) {
                            if(new RegExp(k,'i').test(n.replace(/_/g,''))) {
                                fliterChildData[k] = data[n]
                            }
                        }
                    }
                    this.isShowSearchComponent = true;
                })
            },
            //获取数据
            getList(searchData,type) {
                let o = {};
                if(searchData) {
                    o = searchData;
                    if(this.searchData) this.searchData = searchData;
                }
                this.$refs.myTable.getList(o,type);
            },
            //打开用户详情对话框
            openDetail(row) {
                this.http(this,{
                    url : 'userInfo/detail',
                    data : {
                        userId : row.userId
                    }
                }).then(data=>{
                    this.detailData = data;
                    if(data.orderInfoList == null) {
                        this.detailData.orderInfoList = [];
                    }
                    this.outerVisible = true;
                });
            },
            //打开内层对话框
            lookVerify(row) {
                this.innerTitle = row.name;
                this.innerVisible = true;
            },
            //用户列表导出
            export() {
                // this.http(this,{
                //     url : `${this.pubConfig.apiName}/export`,
                //     data : this.searchData
                // }).then(data=>{
                    
                // });
                let token = localStorage.getItem('_token');
                if(token.length < 1 || token == undefined) {
                    return;
                }
                let searchData = this.searchData;
                let str = '';
                if(Object.keys(searchData).length > 0) {
                    str = '&';
                    for(let k in searchData) {
                        str += `${k}=${searchData[k]}&`;
                    }
                    str = str.replace(/&$/,'');
                }
                //str = str.replace(\/$\,'');
                console.log(location.origin + '/api/userInfo/export?token=' + token+str);
                location.href = location.origin + '/api/userInfo/export?token=' + token + str;
            },
            //查看照片
            lookPhoto(p) {
                this.innerPhotoTitle = p.name;
                this.innerPhotoSrc = p.urls;
                this.innerPhotoVisible = true;
            }
        },
        //生命周期-实例创建后
        created() {
            //获取当前页面模块配置
            this.getOperateConfig();
            //this.openDetail();
        },
        //生命周期-ui渲染前
        beforeMount() {
            
        },
        //生命周期-ui渲染结束
        mounted() {
            
        },
        //生命周期-组件销毁前
        beforeDestroy() {

        },
        //生命周期-组件销毁后
        destroyed() {
            
        },
        filters : {
            handlerNull(val) {
                if(val == null || val.length < 1) return '-';
                if(val.length > 100) {
                    return val.substr(0,99)+'...';
                }
                return val;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .detail_td{
        min-width:900px;
        color:#666;
        .detail_title{
            font-size:16px;
            font-weight:bold;
        }
    }
    .idcard_img{
        width:100%;
        dt{
            padding:10px 20px;
            display:flex;
            height:200px;
            overflow:hidden;
            align-items: center;
            img{
                width:100%;
            }
        }
        dd{
            line-height:30px;
        }
    }
    .p1{
        font-size:12px;
    }
    .c1{
        color:red;
    }
</style>