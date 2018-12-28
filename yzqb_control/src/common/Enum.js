/*
 * 枚举
 */

const channelType = [{
  code:"0",
  name:"自有"
}]

const getChannelType = (val) =>{
  let re = ''
  channelType.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name
      return
    }
  })
  return re
}

//客户端平台
const sysType = [{
    code: "1",
    name: "android"
}, {
    code: "2",
    name: "IOS"
}]

const getSysType = (val) => {
    let re = ''
    sysType.forEach(function(obj) {
        if (obj.code == val) {
            re = obj.name
            return
        }
    })
    return re
}

//APP类型
const appType = [{
    code: "1",
    name: "摇钱罐客户端"
}]

const getAppType = (val) => {
    let re = ''
    appType.forEach(function(obj) {
        if (obj.code == val) {
            re = obj.name
            return
        }
    })
    return re
}

//资金渠道
const payChannelList = [{
  code:0,name:'自有资金',
},{
  code:1,name:'大账户',
},{
  code:2,name:'口袋理财',
},{
  code:3,name:'微贷',
}];

//运营反馈列表问题类型，解决情况
const issueTypeList = [{
  code:1,name:'申请流程',
},{
  code:2,name:'放款流程',
},{
  code:3,name:'还款流程',
},{
  code:4,name:'投诉类',
},{
  code:5,name:'市场推广',
},{
  code:6,name:'其他',
}];
const solutionList = [{
  code:1,name:'已解决',
},{
  code:2,name:'待跟进',
},{
  code:3,name:'暂时无解',
},{
  code:4,name:'无须回复',
}];
//联系人关系标签
const contactTagList = [{
  code:0,name:'借款人',
},{
  code:10,name:'紧急联系人',
},{
  code:20,name:'总通话次数前5',
},{
  code:-1,name:'其他',
}];

const getContactTagList = (val) => {
  let re = '';
  contactTagList.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

//订单标签
const orderTagList = [{
  code:1,name:'完全失联',
},{
  code:2,name:'暂时失联',
},{
  code:3,name:'可联跳票',
},{
  code:4,name:'可联承诺',
}];

const getOrderTagList = (val) => {
  let re = '';
  orderTagList.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

//是否复借订单
const isAgainOrder = [{
  code: '1',
  name: '是'
},{
  code: '0',
  name: '否'
}];

//是否复借订单
const sexList = [{
  code: '1',
  name: '男'
},{
  code: '0',
  name: '女'
}];

//是否测试订单
const isTestOrderList = [{
  code: '1',
  name: '是'
},{
  code: '0',
  name: '否'
}];

//手动扣款状态
const cutStatusSelection = [{
  code: '0',
  name: '未处理'
},{
  code: '1',
  name: '放款中'
},{
  code: '2',
  name: '放款成功'
},{
  code: '3',
  name: '放款失败'
},{
  code: '4',
  name: '扣款中'
},{
  code: '5',
  name: '扣款失败'
},{
  code: '6',
  name: '扣款成功'
}];

const getCutStatus = (val) =>{
  let re = '';
  cutStatusSelection.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  if(!re){
    re = '---';
  }
  return re
};
//申请天数
const applyTimeList = [{
  code: '7',
  name: '7'
},{
  code: '14',
  name: '14'
}];

const getApplyTimeList = (val) =>{
  let re = '';
  applyTimeList.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  if(!re){
    re = '---';
  }
  return re
};
//是否已确认用款
const isConfirmSelection = [{
  code: '7',
  name: '是'
},{
  code: '8',
  name: '否'
}];

const getIsUse = (val) =>{
  let re = '';
  isConfirmSelection.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  if(!re){
    re = '---';
  }
  return re
};
//订单进度
const orderPro = [{
  code: "1",
  name: "申请中"
},{
  code: "2",
  name: "初审中"
}, {
  code: "3",
  name: "复审中"
},{
  code: "4",
  name: "待放款"
}, {
  code: "5",
  name: "待还款"
},{
  code: "6",
  name: "正常已还款"
},{
  code: "7",
  name: "初审不通过",
},{
  code: "8",
  name: "已逾期"
},{
  code: "9",
  name: "逾期已还款"
},{
  code: "10",
  name: "复审不通过"
},{
  code: "11",
  name: "还款处理中"
},{
  code: "12",
  name: "放款失败"
},{
  code: "13",
  name: "风控审核通过，待放款"
}];
const getOrderPro = (val) => {
  let re = '';
  orderPro.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

//性别
const sex = [{
  code: "0",
  name: "未知"
}, {
  code: "1",
  name: "男"
},{
  code: "2",
  name: "女"
}];

const getSex = (val) => {
  let re = '';
  sex.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

//身份（是否是学生）
const  identity= [{
  code: "1",
  name: "已工作"
}, {
  code: "2",
  name: "学生"
}];

const getIdentity = (val) => {
  let re = '';
  identity.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

//行业关注
const focus = [{
  code: "S001",
  name: "金融(信贷类)"
}, {
  code: "S002",
  name: "公检法"
},{
  code: "S003",
  name: "金融(支付类)"
},{
  code:"S005",
  name:"租车行业"
},{
  code:"S006",
  name:"酒店行业"
},{
  code:"S007",
  name:"电商行业"
},{
  code:"R001",
  name:"借贷逾期"
},{
  code:"R005",
  name:"套现"
},{
  code:"R010",
  name:"失信被执行人"
},{
  code:"R011",
  name:"盗卡者/盗卡者同伙"
},{
  code:"R012",
  name:"欺诈者/欺诈同伙"
},{
  code:"R013",
  name:"盗卡操作/盗用者同伙"
},{
  code:"R014",
  name:"盗卡支出/盗用者同伙"
},{
  code:"R015",
  name:"骗赔"
},{
  code:"R016",
  name:"逾期未支付"
},{
  code:"R017",
  name:"超期未还车"
},{
  code:"R018",
  name:"逾期未支付"
},{
  code:"R019",
  name:"虚假交易"
},{
  code:"R021",
  name:"涉嫌售假"
},{
  code:"R00101",
  name:"逾期 1 - 30 天"
},{
  code:"R00102",
  name:"逾期 31 - 60 天"
},{
  code:"R00103",
  name:"逾期 61 - 90 天"
},{
  code:"R00104",
  name:"逾期 91 - 120 天"
},{
  code:"R00105",
  name:"逾期 121 - 150 天"
},{
  code:"R00106",
  name:"逾期 151 - 180 天"
},{
  code:"R00107",
  name:"逾期 180 天以上"
},{
  code:"R00121",
  name:"逾期 1 期"
},{
  code:"R00122",
  name:"逾期 2 期"
},{
  code:"R00123",
  name:"逾期 3 期"
},{
  code:"R00124",
  name:"逾期 4 期"
},{
  code:"R00125",
  name:"逾期 5 期"
},{
  code:"R00126",
  name:"逾期 6 期"
},{
  code:"R00127",
  name:"逾期 6 期以上"
},{
  code:"R00501",
  name:"严重逾期且套现"
},{
  code:"R01001",
  name:"失信被执行人"
},{
  code:"R01101",
  name:"盗卡者/盗卡者同伙"
},{
  code:"R01201",
  name:"欺诈者/欺诈同伙"
},{
  code:"R01301",
  name:"盗卡操作/盗用者同"
},{
  code:"R01401",
  name:"盗卡支出/盗用者同伙"
},{
  code:"R01501",
  name:"骗赔"
},{
  code:"R03201",
  name:"营销作弊黑名单"
},{
  code:"R01601",
  name:"逾期 1 - 7 天"
},{
  code:"R01602",
  name:"逾期 8 - 14 天"
},{
  code:"R01603",
  name:"逾期 15 - 30 天"
},{
  code:"R01604",
  name:"逾期 31 天以上"
},{
  code:"R01701",
  name:"超期 1 - 7 天"
},{
  code:"R01702",
  name:"超期 8 - 14 天"
},{
  code:"R01703",
  name:"超期 15 - 30 天"
},{
  code:"R01704",
  name:"超期 31 天以上"
},{
  code:"R01801",
  name:"逾期 1 - 7 天"
},{
  code:"R01802",
  name:"逾期 8 - 14 天"
},{
  code:"R01803",
  name:"逾期 15 - 30 天"
},{
  code:"R01804",
  name:"逾期 31 天以上"
},{
  code:"R01901",
  name:"炒信"
},{
  code:"R02101",
  name:"涉嫌售假"
}];
const getFocus = (val) => {
  let re = '';
  focus.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

//行业关注:异议状态
const  objectState= [{
  code: "0",
  name: "原始状态"
}, {
  code: "1",
  name: "用户有异议,信息核查中"
}, {
  code: "2",
  name: "核查完毕,信息无误"
}, {
  code: "3",
  name: "核查完毕,信息已修改"
}, {
  code: "4",
  name: "核查完毕,删除该负面信息"
}, {
  code: "5",
  name: "用户对此记录有异议,但异议主张经核查未获支持"
}, {
  code: "6",
  name: "无法核实,删除该负面信息"
}];

const getObjectState = (val) => {
  let re = '';
  objectState.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

//行业关注:数据类型
const  datatype= [{
  code: "Negative",
  name: "负面信息"
}, {
  code: "Risk",
  name: "风险信息"
}];

const getDatatype = (val) => {
  let re = '';
  datatype.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

//信息校验
const  infoCheck= [{
  code: "idcard_check",
  name: "身份证号码有效性"
}, {
  code: "email_check",
  name: "邮箱有效性"
}, {
  code: "address_check",
  name: "地址有效性"
}, {
  code: "call_data_check",
  name: "通话记录完整性"
}, {
  code: "idcard_match",
  name: "身份证号码是否与运营商数据匹配"
}, {
  code: "name_match",
  name: "姓名是否与运营商数据匹配"
}, {
  code: "is_name_and_idcard_in_court_black",
  name: "申请人姓名+身份证号码是否出现在法院黑名单"
}, {
  code: "is_name_and_idcard_in_finance_black",
  name: "申请人姓名+身份证号码是否出现在金融机构黑名单"
}, {
  code: "is_name_and_mobile_in_finance_black",
  name: "申请人姓名+手机号码是否出现在金融机构黑名单"
}, {
  code: "mobile_silence_3m",
  name: "号码沉默度(近3月)"
}, {
  code: "mobile_silence_6m",
  name: "号码沉默度(近6月)"
}, {
  code: "arrearage_risk_3m",
  name: "欠费风险度(近3月)"
}, {
  code: "arrearage_risk_6m",
  name: "欠费风险度(近6月)"
}, {
  code: "binding_risk",
  name: "亲情网风险度"
}];
const getInfoCheck = (val) => {
  let re = '';
  infoCheck.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};
//风险统计
const  riskCount= [{
  code: "110",
  name: "与110通话次数"
}, {
  code: "120",
  name: "与120通话次数"
}, {
  code: "loan",
  name: "与贷款公司通话次数"
}, {
  code: "credit_card",
  name: "与信用卡机构通话次数"
}, {
  code: "macao",
  name: "与1澳门地区通话次数"
}, {
  code: "collection",
  name: "与催收公司通话次数"
}, {
  code: "lawyer",
  name: "与律师通话次数"
}, {
  code: "agency",
  name: "与中介通话次数"
}, {
  code: "fraud",
  name: "与诈骗累号码通话次数"
}, {
  code: "nuisance",
  name: "与骚扰类号码通话次数"
}];

const getRiskCount = (val) => {
  let re = '';
  riskCount.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};
const  riskTime= [{
  code: "110",
  name: "与110通话时长（秒）"
}, {
  code: "120",
  name: "与120通话时长（秒）"
}, {
  code: "loan",
  name: "与贷款公司通话时长（秒）"
}, {
  code: "credit_card",
  name: "与信用卡机构通话时长（秒）"
}, {
  code: "macao",
  name: "与澳门地区通话时长（秒）"
}, {
  code: "collection",
  name: "与催收公司通话时长（秒）"
}, {
  code: "lawyer",
  name: "与律师通话时长（秒）"
}, {
  code: "agency",
  name: "与中介通话时长（秒）"
}, {
  code: "fraud",
  name: "与诈骗累号码通话时长（秒）"
}, {
  code: "nuisance",
  name: "与骚扰类号码通话时长（秒）"
}];

const getRiskTime = (val) => {
  let re = '';
  riskTime.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};
//常用服务
const  serviceType= [{
  code: "bank",
  name: "与银行通话时长（秒）"
}, {
  code: "special_service",
  name: "与特种服务通话时长（秒）"
}, {
  code: "express",
  name: "与快递公司通话时长（秒）"
}, {
  code: "railway_airway",
  name: "与航旅机构通话时长（秒）"
},{
  code: "ins_fin",
  name: "与保险公司通话时长（秒）"
}, {
  code: "car_firm",
  name: "与汽车公司通话时长（秒）"
}, {
  code: "carrier",
  name: "与通信服务通话时长（秒）"
}];

const getServiceType = (val) => {
  let re = '';
  serviceType.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};
const  serviceTypeTime= [{
  code: "bank",
  name: "与银行通话次数"
}, {
  code: "special_service",
  name: "与特种服务通话次数"
}, {
  code: "express",
  name: "与快递公司通话次数"
}, {
  code: "railway_airway",
  name: "与航旅机构通话次数"
},{
  code: "ins_fin",
  name: "与保险公司通话次数"
}, {
  code: "car_firm",
  name: "与汽车公司通话次数"
}, {
  code: "carrier",
  name: "与通信服务通话次数"
}];

const getServiceTypeTime = (val) => {
  let re = '';
  serviceTypeTime.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};
const  callRisk= [{
  code: "110",
  name: "110"
}, {
  code: "120",
  name: "120"
}, {
  code: "loan",
  name: "小额贷款类"
}, {
  code: "credit_card",
  name: "信用卡类"
}, {
  code: "collection",
  name: "催收公司类"
}];

const getCallRisk = (val) => {
  let re = '';
  callRisk.forEach(function(obj) {
    if (obj.code == val) {
      re = obj.name;
      return
    }
  });
  return re
};

let Enum = {
    sysType,
    getSysType,
    appType,
    getAppType,
    sex,
    getSex,
    focus,
    getFocus,
    orderTagList,
    applyTimeList,getApplyTimeList,
    getOrderTagList,getContactTagList,
    isAgainOrder,isTestOrderList,sexList,
    isConfirmSelection,
    orderPro,
    getOrderPro,
    getIsUse,
    identity,
    getIdentity,
    objectState,
    getObjectState,
    datatype,
    getDatatype,
    infoCheck,
    getInfoCheck,
    riskTime,
    getRiskTime,
    riskCount,
    getRiskCount,
    callRisk,
    getCallRisk,
    serviceTypeTime,
    getServiceTypeTime,
    serviceType,
    getServiceType,
    issueTypeList,
    solutionList,
    payChannelList,
    getChannelType,
    cutStatusSelection,
    getCutStatus,
};

export default Enum
