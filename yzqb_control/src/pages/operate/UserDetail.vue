/**
* Created by alan on 17-5-9.
*/
<template>
  <section>
    <!--客户信息-->
    <template>
      <el-row>
        <template>
          <!--是否限制提现，0：否，1：是-->
          <h1 class="one-title" style="float: left;">客户信息</h1>
        </template>
        <div style="clear:both;">
          <el-col :span="5" class="grid-content">
            <div><span>客户姓名:</span><span>{{ customerInfo.realName }}</span></div>
            <div><span>学历:</span><span>{{ idAddressInfo.academic}}</span></div>
            <div><span>居住地址:</span><span>{{ idAddressInfo.inhabit }}</span></div>
          </el-col>
          <el-col :span="7" class="grid-content">
            <div><span>身份证号:</span><span>{{ customerInfo.idCardNo }}</span></div>
            <div><span>邮箱:</span><span>{{ idAddressInfo.email }}</span></div>
            <div v-if="idAddressInfo.applyType ==1?true:false"><span>学校名称:</span><span>{{ idAddressInfo.schoolName }}</span></div>
            <div v-if="idAddressInfo.applyType ==2?true:false"><span>公司名称:</span><span>{{ idAddressInfo.companyName }}</span></div>
          </el-col>
          <el-col :span="12" class="grid-content">
            <div><span>手机号:</span><span>{{ customerInfo.mobileNumber }}</span></div>
            <div><span>微信号:</span><span>{{ idAddressInfo.socialAccount }}</span></div>
            <div><span>详细地址:</span><span>{{ idAddressInfo.detailed }}</span></div>
          </el-col>
        </div>
      </el-row>
      <div class="divid-line"></div>
    </template>

    <!--依图识别-->
    <!--<template>
      <el-row>
        <h1 class="one-title">依图识别 <span class="subtitle">（水印VS活体相似度{{ yituRecog.yituVsLivesimilarity }}%，水印VS身份证相似度{{yituRecog.yituVsIdcardsimilarity}}）</span></h1>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="8" style="margin-right: 80px">
            <el-card :body-style="{ padding: '0px' }">
              <ml-photo-box ref='photoBox'></ml-photo-box>
              <div style="padding: 14px;">
                <img :src="yituRecog.IDImgSrc" class="imgCss" @click.stop="checkImgID">
                <span class="yituInfo">身份证正面照</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <ml-photo-box ref='photoBox'></ml-photo-box>
              <div style="padding: 14px;">
                <img :src="yituRecog.liveImgSrc" class="imgCss" @click.stop="checkImg">
                <span class="yituInfo">活体识别截图</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <ml-photo-box ref='photoBox'></ml-photo-box>
              <div style="padding: 14px;">
                <img :src="yituRecog.policeImgSrc" class="imgCss" @click.stop="checkImgPolice">
                <span class="yituInfo">公安部水印照</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
      <div class="divid-line"></div>
    </template>-->

    <!--依图识别-->
    <template>
      <el-row>
        <h1 class="one-title">身份识别 <span class="subtitle"></span></h1>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="8" style="margin-right: 80px">
            <el-card :body-style="{ padding: '0px' }">
              <ml-photo-box ref='photoBox'></ml-photo-box>
              <div style="padding: 14px;">
                <img :src="yituRecog.IDImgSrc" class="imgCss" @click.stop="checkImgID">
                <span class="yituInfo">身份证正面照</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
      <div class="divid-line"></div>
    </template>

    <!--征信信息-->
    <!--<template>
      <el-row :model="creditInfo">
        <h1 class="one-title">征信信息</h1>
        <el-col :span="10">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">芝麻信用</span>
              <div style="float: right;">
                <span style="line-height: 36px;">更新时间</span>
                <span>{{ creditInfo.ZMCreateTime }}</span>
              </div>
            </div>
            <div>
              <span>芝麻信用分:</span><span>{{ creditInfo.zmScore }}</span>
            </div>
            <div>
              <span>是否实名认证:</span><span>{{creditInfo.isRealName==true?'是':'否' }}</span>
            </div>
            <div>
              <span>芝麻IVS分:</span><span>{{ creditInfo.zhima_Ivs }}</span>
              <span><a href="javascript:void(0);" @click="IVSDetail">查看风险详情</a></span>
            </div>
            <div>
              <span>是否芝麻关注行业:</span><span>{{ creditInfo.is_matched == true?'是':'否'}}</span>
              <span v-if="creditInfo.is_matched"><a href="javascript:void(0);" @click="focusDetail">查看风险详情</a></span>
            </div>
            &lt;!&ndash; 芝麻分IVS风险详情 &ndash;&gt;
            <el-dialog v-model="IVSRiskDialog">
              <el-table border :data="IVSRiskData" v-loading="IVSLoading" max-height="300">
                <el-table-column property="code" label="风险参数"></el-table-column>
                <el-table-column property="description" label="风险描述"></el-table-column>
              </el-table>
            </el-dialog>
            &lt;!&ndash; 芝麻关注风险详情 &ndash;&gt;
            &lt;!&ndash; &ndash;&gt;
            <el-dialog v-model="industryRiskDialog" size="large">
              <el-table border :data="industryRiskData" v-loading="industryLoading" max-height="300">
                <el-table-column property="bizCode" label="名单类型">
                  <template scope="scope">
                    <span>{{getFocus (scope.row.bizCode)}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="type" label="风险类型">
                  <template scope="scope">
                    <span>{{getFocus(scope.row.type)}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="code" label="风险说明">
                  <template scope="scope">
                    <span>{{getFocus(scope.row.code)}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="statement" label="异议状态">
                  <template scope="scope">
                    <span>{{getObjectState(scope.row.statement)}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="settlement" label="是否结清">
                  <template scope="scope">
                    <span>{{scope.row.settlement == 'true'?'是':'否'}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="status" label="数据类型">
                  <template scope="scope">
                    <span>{{getDatatype(scope.row.status)}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="refreshTime" label="信息更新时间"></el-table-column>
                <el-table-column property="extendInfo" label="补充信息">
                  <template scope="scope">
                    <span>{{getExtendInfo(scope.row.extendInfo)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </el-card>
        </el-col>
        <el-col :span="10" :offset="3">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">魔蝎手机认证</span>
              <div style="float: right;">
                <span style="line-height: 36px;">更新时间</span>
                <span>{{creditInfo.MXCreateTime }}</span>
              </div>
            </div>
            <div v-for="item in detailInfo">
              <div class="redInfo">{{item.check_point+':'+item.result+','+item.evidence}}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-card class="">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;margin-right: 30px">同盾</span>
              <div style="float: right;">
                <span style="line-height: 36px;">更新时间</span>
                <span>{{ creditInfo.TDCreateTime }}</span>
              </div>
            </div>
            <span style="line-height: 36px;">同盾分:</span>
            <span>{{ creditInfo.final_score }} 分</span>
          </el-card>
        </el-col>
      </el-row>
      <div class="divid-line"></div>
    </template>-->

    <el-row :gutter="10" style="padding-left: 10px;padding-right: 10px;">
      <el-col :span="4">
        <el-alert :title=creditInfoBox.id_result_str description="身份认证" :type=creditInfoBox.id_result :closable="false" show-icon></el-alert>
      </el-col>

      <el-col :span="4">
        <el-alert :title=creditInfoBox.person_result_str description="个人信息" :type=creditInfoBox.person_result :closable="false" show-icon></el-alert>
      </el-col>

      <el-col :span="4">
        <el-alert :title=creditInfoBox.zhima_result_str description="芝麻信用" :type=creditInfoBox.zhima_result :closable="false" show-icon></el-alert>
      </el-col>

      <el-col :span="4">
        <el-alert :title=creditInfoBox.mobile_result_str description="运营商认证" :type=creditInfoBox.mobile_result :closable="false" show-icon></el-alert>
      </el-col>

      <el-col :span="4">
        <el-alert :title=creditInfoBox.bank_result_str description="银行卡认证" :type=creditInfoBox.bank_result :closable="false" show-icon></el-alert>
      </el-col>

      <el-col :span="4">
        <el-alert :title=creditInfoBox.link_result_str description="联系人信息" :type=creditInfoBox.link_result :closable="false" show-icon></el-alert>
      </el-col>
    </el-row>

    <!-- 历史订单 -->
    <el-row>
      <h1 class="one-title">历史订单</h1>
      <div style="margin-bottom: 10px">
      </div>
      <el-table :data="historyData" v-loading="historyLoading" max-height="300">
        <el-table-column prop="uuid" label="订单编号">
        </el-table-column>
        <el-table-column prop="status" label="订单状态">
          <template slot-scope="scope">
            <span>{{getOrderType(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amountApply" label="申请金额">
        </el-table-column>
        <el-table-column prop="borrowingTerm" label="期限">
        </el-table-column>
      </el-table>
    </el-row>
    <div class="divid-line"></div>
  </section>
</template>
<script>
  import mlPhotoBox from '../../components/_photoBox.vue'
  import enums from '../../common/Enum'
  import DataUtils from '../../common/dataUtil'
  import Config from '../../common/config'
  export default {
    components: {
      mlPhotoBox
    },
    data () {
      return {
        creditInfoBox:{
          id_result:"error",
          id_result_str:"",
          person_result:"error",
          person_result_str:"",
          zhima_result:"error",
          zhima_result_str:"",
          mobile_result:"error",
          mobile_result_str:"",
          bank_result:"error",
          bank_result_str:"",
          link_result:"error",
          link_result_str:""
        },
        uuid:'',
        gridLoading:false,
        historyLoading:false,
        IVSRiskDialog: false,
        IVSLoading: false,
        industryRiskDialog: false,
        industryLoading: false,
        IVSRiskData:[],//IVS风险详情表格
        industryRiskData:[],//行业关注风险详情表格
        historyData:[],//历史订单
        customerInfo: {},//客户信息
        idAddressInfo:{},//客户身份地址信息
        creditInfo: {
          ZMCreateTime:'',
          zmScore:'',
          isRealName:'',
          zhima_Ivs:'',
          is_matched:'',
          tongdun:'',
          onlineCreateTime:'',
          tianxing:'',
          juxinli:'',
          moxieData: '',//魔蝎
          JXLCreateTime:'',
          TDCreateTime:'',
          MXCreateTime:'',
          final_score:''
        },//征信信息
        detailInfo: [],//聚信立显示
        yituRecog: {
          yituVsLivesimilarity:'',
          yituVsIdcardsimilarity:''
        }//依图识别
      }
    },
    methods: {
      //订单状态
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      //芝麻分行业关注
      getFocus(val) {
        return enums.getFocus(val)
      },
      //性别
      getSex(val) {
        return enums.getSex(val)
      },
      getIdentity(val){//身份
        return enums.getIdentity(val)
      },
      getObjectState(val) {//行业关注异议状态
        return enums.getObjectState(val)
      },
      getDatatype(val) {//行业关注数据状态
        return enums.getDatatype(val)
      },
      getExtendInfo(val) {//补充信息
        if(val){
          return val.description
        }
      },

      /**
       * 用户认证进度*/
      userCreditProcess(){
        this.$http.post("manage/completionInfoByUserUuid",{userUuid:this.uuid}).then(response =>{
          let {body} = response;
          if(body.code == 1){
            console.log(body.data);
            let _data = body.data;
            /*let _data = {"userProgress":1,"detailProgress":0,"bankCardProgress":2,
              "zhimaProgress":0,"operatorProgress":0,"contactsProgress":2};*/

            this.creditInfoBox.id_result_str = this.creditString(_data.userProgress);
            this.creditInfoBox.id_result = this.creditResult(_data.userProgress);
            this.creditInfoBox.person_result_str = this.creditString(_data.detailProgress);
            this.creditInfoBox.person_result = this.creditResult(_data.detailProgress);
            this.creditInfoBox.bank_result_str = this.creditString(_data.bankCardProgress);
            this.creditInfoBox.bank_result = this.creditResult(_data.bankCardProgress);
            this.creditInfoBox.zhima_result_str = this.creditString(_data.zhimaProgress);
            this.creditInfoBox.zhima_result = this.creditResult(_data.zhimaProgress);
            this.creditInfoBox.mobile_result_str = this.creditString(_data.operatorProgress);
            this.creditInfoBox.mobile_result = this.creditResult(_data.operatorProgress);
            this.creditInfoBox.bank_result_str = this.creditString(_data.bankCardProgress);
            this.creditInfoBox.bank_result = this.creditResult(_data.bankCardProgress);
            this.creditInfoBox.link_result_str = this.creditString(_data.contactsProgress);
            this.creditInfoBox.link_result = this.creditResult(_data.contactsProgress);

          }else {
            this.$message.info(body.message)
          }
        })
      },
      creditString(data){
        let str = "未完成";
        if(data == 2){
          str = "已完成"
        }
        return str;
      },
      creditResult(data){
        let type = "error";
        if(data == 2){
          type = "success"
        }
        return type;
      },
      /*
       * 客户和联系人信息
       * */
      customerDataInfo(){
        this.$http.post('manage/userBaseInfo', { uuid:this.uuid}).then(response => {
          if (1 == response.body.code) {
            if(response.body.data){
              this.customerInfo = response.body.data[0];
              //console.log('限制:='+this.customerInfo.forbidWithdraw)
            }
          } else {
            this.$message.error(response.body.message);
          }
        });
        this.$http.post('manage/idAddressInfo',{uuid:this.uuid}).then(response =>{
            if(1 == response.body.code){
                if(response.body.data && response.body.data[0]){
                    this.idAddressInfo = response.body.data[0];
                }
            }
        }).catch((e) =>{});

        /*芝麻分*/
        /*this.getUserThirdData({uuid:this.uuid,dataType:4},(data)=>{
          try{
            let result = JSON.parse(data.data);
            this.creditInfo.ZMCreateTime = DataUtils.formatUnixTime(data.updateTime);
            this.creditInfo.zmScore = result.zm_score;
          }catch (e){}
        });*/
        /*是否芝麻关注行业*/
        /*this.getUserThirdData({uuid:this.uuid,dataType:5},(data)=>{
          try{
            this.creditInfo.is_matched = JSON.parse(data.data).is_matched;
          }catch (e){}
        });*/
        /*芝麻IVS分*/
        /*this.getUserThirdData({uuid:this.uuid,dataType:6},(data)=>{
          try{
            this.creditInfo.is_matched = JSON.parse(data.data).score;
          }catch (e){}
        });*/
        /*moxie*/
        /*this.getUserThirdData({uuid:this.uuid,dataType:1},(data)=>{
          try{
            console.log("result 1 => ",data);
            console.log("result 1 => ",JSON.parse(data.data));
            this.creditInfo.MXCreateTime = DataUtils.formatUnixTime(data.updateTime);
          }catch (e){}
        });*/
        /*水纹照与活体识别照*/
        /*this.getUserThirdData({uuid:this.uuid,dataType:3},(data) =>{
          try{
            this.yituRecog.yituVsLivesimilarity = DataUtils.keepDecimal(JSON.parse(data.data).pair_verify_similarity,1);
          }catch (e){}
        });
        /!*水纹照与身份证别照*!/
        this.getUserThirdData({uuid:this.uuid,dataType:9},(data) =>{
          try{
            this.yituRecog.yituVsLivesimilarity = DataUtils.keepDecimal(JSON.parse(data.data).pair_verify_similarity,1);
          }catch (e){}
        });*/
        /*同盾*/
        /*this.getUserThirdData({uuid:this.uuid,dataType:8},(data)=>{
          try{
            let result = JSON.parse(data.data);
            this.creditInfo.final_score = result.final_score;
            this.creditInfo.TDCreateTime = DataUtils.formatUnixTime(result.apply_time);
          }catch (e){}
        });*/

        /*this.getUserThirdData({uuid:this.uuid,dataType:10},(data)=>{
          try{
          }catch (e){}
        });*/

        /*公安部水印照*/
        this.getUserThirdData({uuid:this.uuid,dataType:2},(data) =>{
            try{
              this.yituRecog.policeImgSrc = "data:image/png;base64,"+JSON.parse(data.data).origin_image_content;
            }catch (e){}
        })

        /*依图识别(三张照片)*/
        this.$http.post('manage/yituImgUrl',{uuid:this.uuid}).then(response =>{
            let {body} = response;
            if(1 == body.code && body.data){
              this.yituRecog.IDImgSrc = Config.imageUrl+"IDCard/"+body.data[0].userIdentityUrl;
              //this.yituRecog.liveImgSrc = Config.imageUrl+body.data[0].yituImageUrl;
            }
        })
      },
      getUserThirdData(postData,callback){
        this.$http.post('manage/userThirdDataMon',postData).then(response =>{
          if(1 == response.body.code){
            if(response.body.data){
              callback(response.body.data);
            }
          }
        }).catch((e) =>{});
      },
      /*
       * 历史订单
       * */
      orderHistory(){
        this.historyLoading = true;
        this.$http.post('manage/userOrderList', {uuid:this.uuid}).then(response => {
          if (1 == response.body.code) {
            this.historyLoading = false;
            if(response.body.data){
              this.historyData = response.body.data;
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.historyLoading = false
        });
      },
      checkImgID() {
        let _photoList = [
          this.yituRecog.IDImgSrc
        ];
        this.$refs.photoBox.show(_photoList)
      },
      checkImg() {
        let _photoList = [
          this.yituRecog.liveImgSrc
        ];
        this.$refs.photoBox.show(_photoList)
      },

      checkImgPolice() {
        let _photoList = [
          this.yituRecog.policeImgSrc
        ];
        this.$refs.photoBox.show(_photoList)
      },
      focusDetail(){
        this.industryRiskDialog = true;
      },
      IVSDetail(){
        this.IVSRiskDialog = true;
      }
    },
    mounted: function () {
      this.uuid = this.$route.query['uuid']||'';
      this.customerDataInfo();//客户和联系人信息
      this.orderHistory();//历史订单
      this.userCreditProcess(); //用户认证进度
    }
  }
</script>
<style scoped>
  /* 标题 */
  .one-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .el-row {
    margin: 15px 30px;
  }
  .grid-content {
    line-height: 28px;
  }
  .el-col span{
    margin-right: 10px;
  }
  .box-card .el-button{
    margin-right: 5px;
  }

  .divid-line{
    height: 10px;
    background: #f1f2f7;
  }
  /*依图识别*/
  .yituInfo{
    display: block;
    text-align: center;
    margin-top: 10px;
  }
  /*征信*/
  .box-card{
    height: 195px;
  }
  .imgCss{
    display:block;
    width: 100%;
    height: 250px;
  }
</style>
