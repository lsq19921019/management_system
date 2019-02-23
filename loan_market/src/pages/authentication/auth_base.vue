<!--
    create:luofeifei 10/25
    desc:基础信息验证
-->
<template>
    <div class="page" ref="page_el">
        <div class="page_title" ref="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div> 
        <div class="base_info">
            <ul>
                <item-li name='手机号' :val='phone' type='1'></item-li>
                <item-li name='姓名' type='2' placeholder='请输入本人姓名' v-model="name"></item-li>
                <item-li name='身份证号' type='2' placeholder='请输入身份证号' maxlen='18' v-model="idnum"></item-li>
            </ul>
        </div>
        <btn-com btnval='保存' @click.native="baseData"></btn-com>
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
        name : 'AuthBase',
        data() {
            return {
                phone:localStorage.getItem("_mobile"),
                hidden : false,
                name:'',
                idnum:'',
                dialogConfig : {
                    btns : ['取消','确定'],
                    showTitle : true,
                    isShow:false,
                    title : '温馨提示',
                    content : '<span style="line-height:1.5">一旦实名认证通过，相关信息不允许修改，是否确认进行实名认证？</span>'
                },                
            }
        },
        components : {
            //组件
            btnCom,itemLi,popCom
        },
        created() {
            let type = this.$route.query.type;
            if(type != '1'){
                this.$msg({content:'请先进行实名认证'})
            }else{}
            //页面渲染前           
            this.mobile = localStorage.getItem('_mobile');
            // this.getPageData();
        },
        mounted() {
            //页面加载完毕
            console.log();
            //重置页面高度  
            this.$refs.page_el.style.height=(window.screen.height-this.$refs.page_title.offsetHeight)+'px';
        },
        methods:{
            getPageData(){
                // 获取页面数据;
            },
            baseData(){
                let _this = this;
                let regs = this.Base.regs;
                if(!_this.name){
                    this.$msg({content:"请填写姓名"})
                    return false
                }
                if(!regs.name.test(_this.name)){
                    this.$msg({content:"姓名格式不对"})
                    return false
                }
                if(!_this.idnum){
                    this.$msg({content:"请填写身份证号"})
                    return false
                }
                if(!this.checkCard(_this.idnum)){
                    this.$msg({content:"请输入正确的身份证号"})
                    return false
                }             
                this.dialogConfig.isShow = true;
            },
            clons(){
                this.dialogConfig.isShow = false
            },
            open(){
                this.postData()
            },
            //基础信息接口
            postData(){
                let _this = this;
                let data = {
                    userPhone:this.phone,
                    userIdcard:this.idnum,
                    userName:this.name,
                };
                this.$ajax.post('/api/verify/base',_this.$qs.stringify(data),{
                    headers: _this.Base.initAjaxHeader(1,{})
                })
                .then(res=>{
                    let resData = res.data;
                    if(resData.status == '0'){
                        this.$msg({content:"认证成功"})
                        if(this.$route.query.type == 'set'){
                            setTimeout(() => {
                                this.$router.push({ name : 'Set' });
                            }, 500);                            
                        }else{
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 500);
                        }
                    }else{
                        this.$msg({content:resData.msg})
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 500);                       
                    }
                })                
            },
            //判断身份证
            checkCard(cardNo) {
	    	    //省编码
                var provice = {
                    "11": "北京","12": "天津","13": "河北","14": "山西","15": "内蒙古","21": "辽宁","22": "吉林",
                    "23": "黑龙江","31": "上海","32": "江苏","33": "浙江","34": "安徽","35": "福建","36": "江西",
                    "37": "山东","41": "河南","42": "湖北","43": "湖南","44": "广东","45": "广西","46": "海南",
                    "50": "重庆","51": "四川","52": "贵州","53": "云南","54": "西藏","61": "陕西","62": "甘肃",
                    "63": "青海","64": "宁夏","65": "新疆","71": "台湾","81": "香港","82": "澳门","91": "国外"
                };
 
                if(!cardNo){
                    return false;
                }
                var ValCodeArr = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
                var Wi = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
                var Ai = "";
                var length = cardNo.length;
    
                // ================ 号码的长度 15位或18位 ================
                if (cardNo.length != 15 && cardNo.length != 18) {
                    return false;
                }
    
                // ================ 临时操作身份证号 ================
                if (cardNo.length == 18) {
                    Ai = cardNo;
                } else if (cardNo.length == 15) {
                    Ai = cardNo.substring(0, 6) + "19" + cardNo.substring(6, 15);
                }
    
                //判断,如果输入的身份证号..如果最后一位是x或者X全部改为X
                cardNo = cardNo.toUpperCase();
    
                // ================ 18位除最后以为都为数字;15位全部是数字 ================
                if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(cardNo))) {
                    return false;
                }
 
                // ================ 出生年月是否有效 ================
                var strYear = Ai.substring(6, 10); // 年份
                var strMonth = Ai.substring(10, 12); // 月份
                var strDay = Ai.substring(12, 14); // 月份
                if (!isDataFormat(strYear + "-" + strMonth + "-" + strDay)) {
                    return false;
                }
                var nowDate = new Date();
                var cardDate = new Date(strYear + "-" + strMonth + "-" + strDay);
                var currentAge = nowDate.getFullYear() - cardDate.getFullYear();
                var timeDiffer = nowDate.getTime() - cardDate.getTime();
                // ================ 如果出生年份与现在相差大于150年或者生日晚于当前时间 则不在有效范围 ================
                if (currentAge > 150 || timeDiffer < 0) {
                    return false;
                }
                // ================ 地区码是否有效 ================
                if (provice[Ai.substring(0, 2)] == null) {
                    return false;
                }
                // ================ 判断最后一位的值 ================
                var TotalmulAiWi = 0;
                for (var i = 0; i < 17; i++) {
                    TotalmulAiWi = TotalmulAiWi + parseInt(Ai.charAt(i)) * parseInt(Wi[i]);
                }
                var modValue = TotalmulAiWi % 11;
                if (cardNo.length == 18 && cardNo.charAt(17) != ValCodeArr[modValue]) {
                  
                    return false;
                }
                return true;
                    /**
                 * 验证日期字符串是否是YYYY-MM-DD格式
                 * 此正则已对年月日进行校验，包括每月天数差别（28、29、30、31）,及平年闰年
                 */
		        function isDataFormat (str) {
			        var flag = false;
			        var regxStr = "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))" +
			        "[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?" +
			        "((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(" +
			        "\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]" +
			        "))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?" +
			        "((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))" +
			        "))(\\s(((0?[0-9])|([1-2][0-3]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$";
			        var regexp = new RegExp(regxStr);
			        if (regexp.test(str)) {
			            flag = true;
			        }
			        return flag;
		        };
            },            
            //显示弹窗；
            show_alert(){
                var _this = this;
                var regs = _this.Base.regs;
                if(regs.test()){

                }
                this.hidden=true;
            },
            //获取从子弹窗组件传过来的值；
            hide_alert(data){
                this.hidden=data;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page{
        margin-top:1.6rem;
        .base_info{
            background: #fff;
        }
    }
</style>