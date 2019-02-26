/**
* Created by alan on 2017/3/10.
*/
<template>
  <section class="orderBox">
    <!--订单详情 toCutServiceFee-->
    <el-row>
      <div style="float:left;">
        <h1 class="one-title">订单操作</h1>
        <div><i class="el-icon-warning"></i>温馨提示：手动代扣贷款服务费成功后，该订单会进入到订单管理列表中！</div>
      </div>
      <el-button type="primary" v-if='cutStatus===0||cutStatus===2||cutStatus===5' size="small" style="float: right;" @click="cutServieceDialog">手动代扣服务费</el-button>
      <el-button type="info" disabled="true" v-else-if='cutStatus===4||cutStatus===3||cutStatus===1' size="small" style="float: right;" @click="cutServieceDialog">扣款处理中</el-button>
      <el-button type="info" disabled="true" v-else-if='cutStatus===6' size="small" style="float: right;" @click="cutServieceDialog">扣款成功</el-button>
      <div v-if='cutStatus===5' style="float:right;padding: 7px 9px;font-size: 12px;color:#ff3300;">扣款失败，点击右侧按钮可重新扣款！</div>
      <el-dialog title="手动扣款" v-model="cutServiceFeeVisible">
          您确定要执行手动代扣贷款服务费的操作吗？<br/>
          <p>代扣金额: <span style="font-size:1.5rem">{{gameRechargeAmount}}</span>元</p>
          <div style="padding:1rem 0;float:right;">
              <el-button @click="toCutServiceFeeCancel">取消</el-button>
              <el-button type="primary" @click="toCutServiceFee">确认</el-button>
          </div>
      </el-dialog>
      <el-dialog title="操作成功" v-model="alertSuccessVisible">
          <div style="padding: .1rem;">
            <p>手动代扣可能需要几分钟才能返回结果，请耐心等待，你可在秒扣失败订单列表页查看扣款状态</p>
          </div>
          <div style="padding:1rem 0;float:right;">
              <el-button type="primary" @click="hideAlertSuccess">知道了</el-button>
          </div>
      </el-dialog>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <h1 class="one-title">订单详情</h1>
      <el-col :span="15" class="grid-content">
        <div><span>催收标签:</span><span><el-tag type="danger">{{cuishouTag || '无'}}</el-tag></span>
            <span>进件标识:</span><span><el-tag type="danger">{{orderChannel || '无'}}</el-tag></span>
            <span>资金渠道:</span><span><el-tag type="danger">{{payChannel || '无'}}</el-tag></span></div>
        <div><span>订单状态:</span><span>{{getOrderType(orderDetail.status)}}</span></div>
        <div v-if="orderDetail.status == 7">
          <span>订单拒绝原因:</span>
          <el-popover placement="top-start" width="260" trigger="hover" :content="refuseReasonDetail">
            <span slot="reference">{{refuseReason}}</span>
          </el-popover>
        </div>
      </el-col>
      <el-col :span="9" class="grid-content">
        <div><span>订单编号:</span><span>{{orderDetail.uuid}}</span></div>
        <div><span>下单时间:</span><span>{{formatUnixTime(orderDetail.createTime)}}</span></div>
      </el-col>
      <el-col :span="20">
        <el-tag :type="orderAuthState.zhimaConf==1?'success':''">芝麻信用 <span>{{orderAuthState.zhimaConf==1?"(已认证)":"(未认证)"}}</span></el-tag>
        <el-tag :type="orderAuthState.tongdunConf==1?'success':''">同盾 <span>{{orderAuthState.tongdunConf==1?"(已认证)":"(未认证)"}}</span></el-tag>
        <el-tag :type="orderAuthState.moxieConf==1?'success':''">魔蝎<span>{{orderAuthState.moxieConf==1?"(已认证)":"(未认证)"}}</span></el-tag>
        <el-tag :type="orderDetail.isAgain==1?'danger':''">复借订单<span>{{orderDetail.isAgain==1?"(是)":"(否)"}}</span></el-tag>
      </el-col>
    </el-row>
    <div class="divid-line"></div>

    <!--联系人信息-->
    <div v-if="seen">
      <el-row class="line-height">
        <h1 class="one-title">联系人信息
          <el-badge :value="totalLinkMan">
            <el-button type="primary" size="small" @click="addressBook">通讯录信息</el-button>
            <el-dialog title="" v-model="dialogTableVisible">
              <el-table :data="linkData" v-loading="linkLoading" height="260" size="large">
                <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column property="mobile" label="手机号"></el-table-column>
                <el-table-column property="flag" label="标签">
                  <template scope="scope">
                    <span>{{getFlag(scope.row.flag)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </el-badge>
        </h1>
        <el-col :span="7">
          <span>联系人姓名:</span><span>{{ decodeURI(linkManInfo.immediateRelativesName || '') }}</span>
        </el-col>
        <el-col :span="9">
          <span>联系人电话:</span><span>{{ linkManInfo.immediateRelativesMobile }}</span>
        </el-col>
        <el-col :span="8">
          <span>与借款人关系: <span>{{idAddressInfo.kinship}}</span></span>
        </el-col>
        <el-col :span="7">
          <span>联系人姓名:</span><span>{{ decodeURI(linkManInfo.secondRelativesName || '') }}</span>
        </el-col>
        <el-col :span="9">
          <span>联系人电话:</span><span>{{ linkManInfo.secondRelativesMobile }}</span>
        </el-col>
        <el-col :span="8">
          <span>与借款人关系: <span>{{idAddressInfo.secondKinship}}</span></span>
        </el-col>
      </el-row>
      <div class="divid-line"></div>
    </div>

    <!--征信信息-->
    <div v-if="seen">
      <el-row>
        <h1 class="one-title">征信信息</h1>
        <el-col :span="9">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">芝麻信用</span>
            </div>
            <div><span>芝麻信用分:</span><span>{{ creditInfo.zmScore }}</span></div>
            <div><span>是否实名认证:</span><span>{{ creditInfo.zmScore?'是':'否' }}</span></div>
            <div>
              <span>芝麻IVS分:</span><span>{{ creditInfo.zhima_Ivs }}</span>
              <span><a href="javascript:void(0);" @click="IVSDetail">查看风险详情</a></span>
            </div>
            <div>
              <span>是否芝麻关注行业:</span><span>{{ creditInfo.zhimaFocus == true?'是':'否'}}</span>
              <span v-if="creditInfo.zhimaFocus"><a href="javascript:void(0);" @click="focusDetail">查看风险详情</a></span>
            </div>
          </el-card>
          <!-- 芝麻分IVS风险详情 -->
          <el-dialog v-model="IVSRiskDialog">
            <el-table border :data="IVSRiskData" v-loading="IVSLoading" max-height="300">
              <el-table-column property="code" label="风险参数"></el-table-column>
              <el-table-column property="description" label="风险描述"></el-table-column>
            </el-table>
          </el-dialog>
          <!-- 芝麻关注风险详情 -->
          <!--todo 补充信息 -->
          <el-dialog v-model="industryRiskDialog" size="large">
            <el-table border :data="industryRiskData" v-loading="industryLoading" max-height="300">
              <el-table-column property="bizCode" label="名单类型">
                <template scope="scope">
                  <span>{{getFocus(scope.row.bizCode)}}</span>
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
        </el-col>
        <el-col :span="9" :offset="3">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;">魔蝎手机认证</span>
              <el-button style="float: right;" type="primary" :disabled="isTrueMX" size="small" :loading="MxLoading">报告</el-button>
              <el-button style="float: right;margin-right: 20px" :disabled="isTrueMXCall" type="primary" size="small" @click="moxieCallLog">通话记录</el-button>
            </div>
            <el-dialog v-model="moxieCallLogDialog" title="通话记录" size="large">
              <el-table border :data="moxieCallLogData" v-loading="moxieCallLogLoading" max-height="500">
                <el-table-column property="peer_number" label="电话号码"></el-table-column>
                 <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column property="fee" label="通话总次数"></el-table-column>
                <el-table-column property="duration" label="通话总时长（秒）"></el-table-column>
                <el-table-column property="time" label="最近通话时间"></el-table-column>
                <el-table-column property="location" label="最近通话地点"></el-table-column>
                <el-table-column property="location_type" label="通话类型"></el-table-column>
                <el-table-column property="dial_type" label="呼叫类型">
                  <template scope="scope">
                    <span>{{scope.row.dial_type == 'DIALED'?'被叫':'主叫'}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;margin-right: 30px">同盾</span>
              <span style="line-height: 36px;">同盾分:</span>
              <span>{{ creditInfo.final_score }} 分</span>
              <el-button style="float: right;" type="primary" size="small" :disabled="isTrueJXL" @click="" :loading="TdLoading">全部信息</el-button>
            </div>
            <el-table :data="tongdunData" v-loading="tongdunLoading" max-height="200">
              <el-table-column prop="item_id" label="ID">
              </el-table-column>
              <el-table-column prop="item_name" label="规则">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <div class="divid-line"></div>
    </div>

    <el-row>
      <h1 class="one-title">订单备注</h1>
      <div style="margin-bottom: 10px"></div>
      <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="200">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="220">
          <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
        </el-table-column>
        <el-table-column prop="recordUserName" label="姓名">
        </el-table-column>
        <el-table-column prop="contactTag" label="关系">
          <template slot-scope="scope">{{getContactTag(scope.row.contactTag)}}</template>
        </el-table-column>
        <el-table-column prop="recordUserPhone" label="手机号">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="orderTag" label="标签" width="100">
         <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
        </el-table-column>
           <el-table-column prop="collecterName" label="催收人员" width="100">
          </el-table-column>
         <el-table-column prop="alertTime" label="下次提醒时间" width="220">
          <template scope="scope">{{formatUnixTime(scope.row.alertTime)}}</template>
        </el-table-column>
      </el-table>
    </el-row>
    <div class="divid-line"></div>

    <!--添加订单标签及备注-->
    <el-row>
      <h1 class="one-title">添加订单标签及备注</h1>
      <el-form :inline="true" :model="tagForm" :rule="addRemarkRule" label-width="100px">
        
        <el-form-item label="手机号" prop="recordUserPhone">
          <el-input v-model="tagForm.recordUserPhone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="recordUserName"  label-width="100px">
          <el-input v-model="tagForm.recordUserName" maxlength="10" style="display:inline-block;width:150px;"></el-input><span>(非必填)</span>
        </el-form-item>
      </el-form>
      <el-form :model="addRemarkForm" :rule="addRemarkRule" ref="addRemarkForm" label-width="100px">
        <el-form-item label="填写备注" prop="remark">
          <el-input type="textarea" v-model="addRemarkForm.remark" :maxlength="300" :rows="5"></el-input>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="tagForm" :rule="addRemarkRule" label-width="100px">
        <el-form-item label="选择标签" prop="remark">
          <el-select v-model="tagForm.orderTag" placeholder="请选择" clearable>
            <el-option v-for="item in tagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="添加提醒时间" prop="remindTime">
         <el-date-picker v-model="tagForm.remindDate" type="date" placeholder="请选择日期" :picker-options="pickerOptions"></el-date-picker>
         <el-time-select placeholder="请选择时间" v-model="tagForm.remindTime" :picker-options="pickerTimeOptions"></el-time-select>（非必填）
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveTagForm" :loading="tagFormLoading">打个标签</el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <div class="divid-line"></div>

    <!--借款信息-->
    <template>
      <el-row>
        <h1 class="one-title">借款信息 </h1>
        <el-col :span="8" class="grid-content">
          <span>借款金额:</span><span>{{ orderDetail.amountApply }}</span>
        </el-col>
        <el-col :span="8" class="grid-content">
          <span>借款期限:</span><span>{{ orderDetail.borrowingTerm }} 天</span>
        </el-col>
      </el-row>

      <div>
        <el-table :data="loanInfoData" highlight-current-row v-loading="gridLoading" class="loanDetail">

          <el-table-column label="应还款日">
            <template scope="scope">
              <span>{{formatUnixTime(scope.row.refundTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalRepayment" label="应还款总金额(元)"></el-table-column>
          <el-table-column prop="amountApply" label="本金(元)"></el-table-column>
          <el-table-column prop="gameRechargeAmount" label="游戏币(元)"></el-table-column>
          <el-table-column prop="interest" label="利息"></el-table-column>
          <el-table-column label="审核服务费">
            <template scope="scope">
              <span>{{(parseFloat(scope.row.reviewFee).toFixed(2))}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="infoFee" label="征信服务费"></el-table-column>
          <el-table-column prop="accountFee" label="账户管理费"></el-table-column>
          <el-table-column prop="overdueManageFee" label="逾期账户管理费" >

          </el-table-column>
          <el-table-column prop="overdueLateFee" label="逾期账户滞纳金">

          </el-table-column>

        </el-table>
      </div>
      <div class="divid-line"></div>
    </template>

    <!--还款信息模块-->
    <template>
      <el-row>
        <h1 class="one-title">还款信息 </h1>
        <h3 style="margin: 10px;">线下还款提交历史:</h3>

        <el-table :data="orderHandleList" v-loading="orderHandleListLoading">
          <el-table-column prop="id" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="aliPayNo" label="支付宝账号">
          </el-table-column>

          <el-table-column prop="createTime" label="提交时间" width="150">
            <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
          </el-table-column>

          <el-table-column prop="actualAmount" label="实还金额">
          </el-table-column>
          <el-table-column prop="transNo" label="流水号">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
          <el-table-column prop="offineRefundType" label="还款渠道">
            <template scope="scope">{{formatChannel(scope.row.offineRefundType)}}</template>
          </el-table-column>
          <el-table-column prop="operateName" label="操作人">
          </el-table-column>

          <!--<el-table-column label="操作" width="220" >
            <template scope="scope">
              <el-button size="small" @click="checkPic(scope.row)">查看附件</el-button>

              <el-button v-show="scope.row.status == 0" size="small" @click="enableIt(scope.row)">有效</el-button>
              <el-button v-show="scope.row.status == 0" size="small" @click="disableIt(scope.row)">无效</el-button>

            </template>
          </el-table-column>-->
        </el-table>


        <h3 style="margin: 10px ;">资金流水记录:</h3>

        <el-table :data="repayOrderList" v-loading="repayOrderListLoading">
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="amountApply" label="总申请金额"></el-table-column>
          <el-table-column prop="couponAmount" label="减免金额"></el-table-column>
          <el-table-column prop="createTime" label="还款时间">
            <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
          </el-table-column>
          <el-table-column prop="userUuid" label="用户uuid"></el-table-column>
          <el-table-column prop="payChannelType" label="还款方式">
            <template scope="scope">{{formatRepayType(scope.row.payChannelType)}}</template>
          </el-table-column>
        </el-table>
      </el-row>

      <div class="divid-line"></div>
    </template>

    <!--客户信息-->
    <template>
      <el-row>
        <h1 class="one-title">客户信息 <span class="subtitle"> (下单时)</span></h1>
        <el-col :span="5" class="grid-content">
          <div><span>客户姓名:</span><span>{{ customerInfo.realName }}</span></div>
          <div><span>客户性别:</span><span>{{ getSex(customerInfo.sex)}}</span></div>
          <div><span>社交账号:</span><span>{{ idAddressInfo.socialAccount }}</span></div>
          <div><span>公司详细地址:</span><span>{{idAddressInfo.companyDetailAdress}}</span></div>
          <div><span>当前公司工作年限:</span><span>{{idAddressInfo.workYear}}</span></div>
          <div><span>住宅类型:</span><span>{{idAddressInfo.residential}}</span></div>
        </el-col>
        <el-col :span="7" class="grid-content">
          <div><span>身份证号:</span><span>{{ customerInfo.idCardNo }}</span></div>
          <div><span>手机号:</span><span>{{ customerInfo.mobileNumber }}</span></div>
          <div><span>公司名称:</span><span>{{ idAddressInfo.companyName }}</span></div>
          <div><span>公司电话:</span><span>{{ idAddressInfo.companyPhone }}</span></div>
          <div><span>月收入(元):</span><span>{{ idAddressInfo.monthlyIncome }}</span></div>
          <div><span>现居住地居住时间:</span><span>{{ idAddressInfo.inhabitFixedYear }}</span></div>
        </el-col>
        <el-col :span="12" class="grid-content">
          <div><span>现居住地址:</span><span>{{ idAddressInfo.inhabit }} {{ idAddressInfo.detailed }}</span></div>
          <div><span>下单位置:</span><span>{{idAddressInfo.actualInhabit}}</span></div>
          <div><span>公司所在城市:</span><span>{{ idAddressInfo.companyAdress}} </span></div>
          <div><span>公司类型:</span><span>{{ idAddressInfo.companyType}} </span></div>
          <div><span>婚姻状况:</span><span>{{ idAddressInfo.marriage}} </span></div>
          <div><span>教育程度:</span><span>{{ idAddressInfo.academic}} </span></div>
        </el-col>
      </el-row>
      <div class="divid-line"></div>
    </template>

    <!--依图识别-->
    <div v-if="seen">
      <el-row>
        <h1 class="one-title">依图识别 <span class="subtitle">（水印VS活体相似度{{ yituRecog.yituVsLivesimilarity }} %，水印VS身份证相似度{{yituRecog.yituVsIdcardsimilarity}}）</span></h1>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <ml-photo-box ref='photoBox'></ml-photo-box>
              <div style="padding: 14px;">
                <img :src="yituRecog.IDImgSrc" class="imgCss" @click.stop="checkImgID">
                <span class="yituInfo">身份证正面照</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-card :body-style="{ padding: '0px' }">
              <ml-photo-box ref='photoBox'></ml-photo-box>
              <div style="padding: 14px;">
                <img :src="yituRecog.liveImgSrc" class="imgCss" @click.stop="checkImg">
                <span class="yituInfo">活体识别截图</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
       
      </el-row>
      <div class="divid-line"></div>
    </div>

    <!-- 订单进度 -->
    <template>
      <el-row>
        <h1 class="one-title">订单进度</h1>
        <el-row>
          <el-steps :data="orderProData" :active="active" :align-center="true" finish-status="success">
            <el-step v-for="item in orderProData" :key="item.status" :title="getOrderPro(item.status)">
              <div slot="description">
                {{getOrderPro(item.status)}}<br>{{formatUnixTime(item.createTime)}}</div>
            </el-step>
          </el-steps>
        </el-row>
      </el-row>
      <div class="divid-line"></div>
    </template>

    <!-- 审核记录 -->
    <template>
      <el-row>
        <h1 class="one-title">审核记录</h1>
        <el-table :data="refundReasonData" v-loading="refundReasonLoading" max-height="300">
          <el-table-column prop="createTime" label="操作日期">
            <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
          </el-table-column>
          <el-table-column prop="orderNo" label="订单编号">
          </el-table-column>
<!--      <el-table-column prop="amountApply" label="用户名">
          </el-table-column> -->
          <el-table-column prop="" label="姓名">
            <template scope="scope">{{refundName}}</template>
          </el-table-column>
          <el-table-column prop="" label="操作状态">
              <template scope="scope">拒绝</template>
          </el-table-column>
        </el-table>
      </el-row>
      <div class="divid-line"></div>
    </template>

    <!-- 历史订单 -->
    <template>
      <el-row>
        <h1 class="one-title">历史订单&nbsp;</h1>
        <el-table :data="historyData" v-loading="historyLoading" max-height="300">
          <el-table-column prop="orderNo" label="订单编号">
            <template scope="scope">
              <a href="javascript:void(0);" @click="historyDetail(scope.row)">{{scope.row.uuid}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="订单状态">
            <template scope="scope">
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
    </template>

    <!-- 订单审核 -->
    <template>
      <el-row>
        <h1 cl
        ass="one-title">订单审核&nbsp;<el-button type="primary" size="small" @click="toExamine(3)" v-if="orderDetail.status == 13">审核通过</el-button>&nbsp;<el-button type="primary" size="small" @click="toExamine(10)" v-if="orderDetail.status == 13">审核失败</el-button></h1>
      
      </el-row>
      <div class="divid-line"></div>
    </template>

    <!-- 风控历史 -->
    <template>
      <el-row>
        <h1 class="one-title">风控历史</h1>
        <el-table :data="riskData" v-loading="riskLoading" max-height="300">
          <el-table-column prop="userUuid" label="用户ID">
            <template scope="scope">
              <span>{{scope.row.userUuid}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uuid" label="订单编号">
            <template scope="scope">
              <span>{{scope.row.uuid}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="风控编号">
          </el-table-column>
          <el-table-column prop="createTime" label="风控时间">
            <template scope="scope">
              <span>{{formatUnixTime(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="detail" label="风控详情">
          </el-table-column>
          <el-table-column prop="ruleName" label="风控描述">
          </el-table-column>
           <el-table-column prop="falg" label="审核状态">
          </el-table-column>
        </el-table>
      </el-row>
      <div class="divid-line"></div>
    </template>

    <template>


    </template>

  </section>
</template>
<script>
  // import mlPhotoBox from '../../components/_photoBox.vue'
  // import enums from '../../common/Enum'
  // import DataUtil from '../../common/dataUtil'
  // import Config from '../../common/config'
  import mlPhotoBox from '../components/_photoBox.vue'
  import enums from '../common/Enum'
  import DataUtil from '../common/dataUtil'
  import Config from '../common/config'
import { setTimeout } from 'timers';
  export default {
    components: {
      mlPhotoBox
    },
    props:['seen','uuid','userUuid'],
    data () {
      let compareDate = (time) => {
        let _time = time.setDate(time.getDate()+1);
        return time.getTime() <= Date.now();
      }
      return {
        gameRechargeAmount:'', //代扣金额；
        refundReasonData: [],  //审核记录数据
        refundReasonLoading: false,
        refundName: '',   //审核记录姓名
        flag: [],
        // seen: false,//区别订单详情
        createUser: '',
        userId: '',
        orderNo: '',
        orderId: '',
        // uuid: '',
        // userUuid:'',
        cuishouTag:'',    //催收标签
        orderChannel: '',
        payChannel: '',
        qudaolist: [],
        tagList:[{
            name:'完全失联',code:1
        },{
            name:'暂时失联',code:2
        },{
            name:'可联跳票',code:3
        },{
            name:'可联承诺',code:4
        }],
        userHistoryId: '',
        alertSuccessVisible: false,
        cutServiceFeeVisible: false,
        dialogTableVisible: false,
        IVSRiskDialog: false,
        IVSLoading: false,
        industryRiskDialog: false,
        callLogDialog: false,
        moxieCallLogDialog: false,
        reportDialog: false,
        moxieReportDialog: false,
        JxlLoading: false,
        TdLoading: false,
        MxLoading: false,
        industryLoading: false,
        formLoadnig: false,
        linkLoading: false,
        reLoadingZM: false,
        reLoadingJXL: false,
        historyLoading: false,
        riskLoading: false,
        tongdunLoading: false,
        callLogLoading: false,
        moxieCallLogLoading: false,
        refundingButton:false,
        JXLtoken: '',//
        MXtoken: '',//
        isTrueMX: true,//
        isTrueMXCall:false,//
        isTrueJXL: true,//
        reportLoading: false,
        gridLoading:false,
        totalLinkMan: 0,//通讯录个数
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话记录
        moxieCallLogData: [],//通话记录

        orderProData: [],//订单进度
        loanInfoData:[],//借款信息表格
        IVSRiskData:[],//IVS风险详情表格
        industryRiskData:[],//行业关注风险详情表格
        tongdunData:[],//同盾表格
        historyData:[],//历史订单表格
	riskData:[],//风控历史表格
        orderDetail: {},//订单详情
        orderAuthState:{},//订单认证状态
        customerInfo: {},//客户信息
        idAddressInfo:{},//客户身份地址信息
        linkManInfo: {},//联系人信息
        refuseReason:'',//审核拒绝原因
        refuseReasonDetail:'',//审核拒绝原因详情
        creditInfo: {
          final_score:'',
          zmScore:'',
          zhima_Ivs:'',
          zhimaFocus:'',
          isRealName:''
        },//征信信息
        yituRecog: {
          yituVsLivesimilarity:'',
          yituVsIdcardsimilarity:''
        },//依图识别
        orderRemarkList:[], //订单备注
        orderRemarkLoading:false,
        addRemarkForm:{},  //订单备注
        tagForm:{
          orderTag:'',
          remindDate: '',
          remindTime: ''
        },       //订单标签
        addRemarkRule:{},
        saveRemarkFormLoading:false,
        tagFormLoading:false,
        active:0,
        pickerOptions: {
          disabledDate(time) {
            return compareDate(time)
          }
        },
        pickerTimeOptions: {
          start: '00:00',
          end: '23:00',
          step: '01:00'
        },
        orderHandleList:[],
        orderHandleListLoading:false,
        repayOrderList:[],
        repayOrderListLoading:false,
        clickAble:'true',
        cutStatus:'',
      }
    },
    methods: {
        toCutServiceFee(){
            let _data = {
                uuid : this.uuid,
                sessionId :DataUtil.sid()
            };
            this.$http.post('manage/secondBuckleOrder', _data).then(response => {
                let {body} = response;
                if(1 == body.code) {	
                    this.cutServiceFeeVisible = false;
                    this.alertSuccessVisible = true;
                }
                return;
            });
        },
        toCutServiceFeeCancel(){
            this.cutServiceFeeVisible = false;
        },
        hideAlertSuccess(){
          this.alertSuccessVisible = false;
          setTimeout(()=>{
                window.location.reload();
          },500)
        },
      //审核
      toExamine(status) {
	let _data = {
	  uuid : this.uuid,
          status : status,
          sessionId :DataUtil.sid()
	};
	this.$http.post('manage/updateOrderToLoan', _data).then(response => {
          let {body} = response;
          if(1 == body.code) {
		alert('操作成功');	
	  }
	  window.location.reload();
        });

      },
      getQudaoChannel(val) {        //渠道来源
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'REGISTER_CHANNEL'}).then(response=>{
          let {body} = response;
          this.qudaolist = body.data || [];
          this.qudaolist.forEach(e => {
            let _val = e.dicItemValue.split('#')[0];
            if(_val == val){
              this.orderChannel = e.dicItemName;
            }
          });
        },response=>{});
      },
      getPayChannel(val){
        enums.payChannelList.forEach(e => {
          if (e.code == val) {
            this.payChannel = e.name;
          }
        });
      },
      getOrderType(type){
          return enums.getOrderPro(type);
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      getContactTag(type){
        return enums.getContactTagList(type);
      },
      formatUnixTime(time){
          return DataUtil.formatUnixTime(time);
      },
      formatChannel(data){
        let channel = '';
        if(data == 1){
          channel = '支付宝'
        }
        if(data == 2){
          channel = '微信';
        }
        return channel;
      },
      formatRepayType(data){
        let str = "";
        if(data == 1){
          str = "联动优势";
        }
        if(data == 2){
          str = "支付宝";
        }
        if(data == 3){
          str = "宝付";
        }
        if(data == 4){
          str = "线下还款";
        }
        if(data == 5){
          str = "宝付，陈展新账户";
        }
        if(data == 6){
          str = "通联";
        }
        if(data == 7){
          str = "钱方二维码收款(微信)";
        }
        if(data == 8){
          str = "钱方二维码收款(支付宝)";
        }
        if(data == 9){
          str = "钱放支付宝收款";
        }
        if(data == 10){
          str = "畅捷​";
        }
        return str;
      },
      getInfoCheck(val) {//检查项
        return enums.getInfoCheck(val)
      },
      getRiskCount(val) {//风险统计
        return enums.getRiskCount(val)
      },
      getRiskTime(val) {//
        return enums.getRiskTime(val)
      },
      getCallRisk(val) {//风险联系
        return enums.getCallRisk(val)
      },
      getServiceTypeTime(val){
        return enums.getServiceTypeTime(val)
      },
      getServiceType(val){
        return enums.getServiceType(val)
      },
      getFocus(val) {//芝麻分行业关注
        return enums.getFocus(val)
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
      getOrderPro(val) {//订单进度
        return enums.getOrderPro(val)
      },
      getSex(val) {//性别
        return enums.getSex(val)
      },
      getIdentity(val){//身份
        return enums.getIdentity(val)
      },
      getHandleHistoryList(){ /*获取线下还款提交历史*/
        this.orderHandleListLoading = true;
        this.$http.post("manage/getOfflineRefundHistoryList",{userUuid:this.userUuid,uuid:this.uuid}).then(response =>{
          let {body} = response;
          this.orderHandleList = body.data;
          this.orderHandleListLoading = false;
        })
      },
      getRepayOrderList(){  /*获取资金流水记录*/
        this.repayOrderListLoading = true;
        this.$http.post("manage/repayListByOrderNo",{orderNo:this.uuid}).then(response =>{
          let {body} = response;
          this.repayOrderList = body.data;
          this.repayOrderListLoading = false;
        })
      },
      getFlagByDicItem() {
        this.$http.post('manage/dicItemListByDicCode', {dicCode:'CONTACT_HIGH_RISK'}).then(response => {
          if (1 == response.body.code) {
            let _data = response.body.data;
            this.flag = _data;
            if(_data){
              for(let i=0;i<_data.length;i++){
                this.dicFlag.push({'code':_data[i].dicItemValue,'value':_data[i].dicItemName});
              }
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },
      getFlag(val){
        let re = '';
        this.dicFlag.forEach(function(obj) {
            if (obj.code == val) {
              re = obj.value;
              return
            }
          });
          return re
      },
      /**
       * 图片预览
       * @return {[type]} [description]
       */
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

      // 通讯录信息按钮
      addressBook(){
        this.dialogTableVisible = true;
      },
      // 通讯录信息按钮
      cutServieceDialog(){
        this.cutServiceFeeVisible = true;
      },
      //魔蝎通话记录
      moxieCallLog(){
        this.moxieCallLogDialog = true;
      },
      /*还款订单还款信息*/
      repaymentLoanInfo(status){
        let postUrl = '';
        postUrl = 'manage/orderLoanInfoByUuid'  /*还款前订单还款信息*/
        this.$http.post(postUrl, { uuid:this.uuid}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            if(body.data){
              let arr = [];
              arr.push(body.data);
              this.loanInfoData = arr;
              this.gridLoading = false;
            }
          } else {
            this.gridLoading = false;
          }
        });
      },
      focusDetail(){
        this.industryRiskDialog = true;
      },
      IVSDetail(){
        this.IVSRiskDialog = true;
      },
      /*
       * 订单详情
       * */
      orderDataDetail(){
        let _this = this;
        this.gridLoading = true;
        this.$http.post('manage/orderInfoByUuid', { uuid:this.uuid}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            if(body.data){
              _this.cutStatus = body.data.cutPaymentStatus;
              // if(body.data.cutPaymentStatus===2){
              //   _this.clickAble = false;
              // }
              this.orderDetail = body.data;
              if(body.data.status == 7){    //查询订单拒绝原因
                this.refundReasonLoading = true;
                  this.$http.post('manage/orderBlackListByOrderNo',{uuid:this.uuid}).then(response =>{
                    this.refundReasonLoading = false;
                      let {body} = response;
                      if(1 == body.code && body.data[0]){
                          if(body.data[0].type == 90){
                            this.refuseReason = '业务异常';
                          } if(body.data[0].type == 91){
                            this.refundReasonData = body.data;
                            this.refundName = body.data[0].responseMessage.split('手动拒绝订单')[0];
                             this.refuseReason = body.data[0].responseMessage;
                          }else {
                            this.refuseReason = body.data[0].responseMessage;
                          }
                        this.refuseReasonDetail = body.data[0].responseMessage;
                      }
                  })
              }
              this.gameRechargeAmount = body.data.gameRechargeAmount;
              this.getPayChannel(body.data.payChannel);
              this.repaymentLoanInfo(body.data.status);
              this.getQudaoChannel(body.data.channel);
              this.addreBook(body.data.channel);        //通讯录信息兼容360渠道
              this.getTop20ContactList(body.data.channel);  //通话记录兼容360
              if(body.data.channel == 11 || body.data.channel == 50){                  //芝麻分
                this.$http.post('manage/orderUserByUuid', { uuid:this.uuid}).then(response => {
                    let {body} = response;
                    if (1 == body.code) {
                      if(body.data){
                        this.creditInfo.zmScore = body.data.zhimaScore;
                      }
                    }
                  });
              }else{
                this.getUserThirdData({uuid:this.userUuid,dataType:4},(data)=>{      //芝麻分
                  try{
                    let result = JSON.parse(data.data);
                    this.creditInfo.zmScore = result.zm_score;
                  }catch (e){}
                });
              }
            }
          }
        });
        this.$http.post('manage/userAuthStateMon',{uuid:this.userUuid,orderNo:this.uuid}).then(response => {
          let {body} = response;
          if(1 == body.code && body.data){
            this.orderAuthState = body.data;
          }
        })
        /*催收标签*/
        this.$http.post('manage/orderTagInfo',{orderNo:this.uuid,systemSource:'1'}).then(response => {
          let {body} = response;
          if(1 == body.code && body.data){
            for(let i = 0;i < this.tagList.length;i++){
                if(this.tagList[i].code == body.data.orderTag){
                  this.cuishouTag = this.tagList[i].name;
                }
            }
          }
        })
      },
      /*
       * 客户和联系人信息
       * */
      customerDataInfo(){
        this.$http.post('manage/userBaseInfo', { uuid:this.userUuid}).then(response => {
          if (1 == response.body.code) {
            if(response.body.data && response.body.data[0]){
              this.customerInfo = response.body.data[0];
            }
          }
        });
        this.$http.post('manage/orderUserByUser', { userUuid:this.userUuid}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            if(body.data){
              this.idAddressInfo = body.data;
              this.linkManInfo = body.data;
            }
          }
        });
      },
      /**
       * 依图识别三张照片
       * @return {[type]} [description]
       */
      yituDataInfo(){
        this.$http.post('manage/yituImgUrl',{uuid:this.userUuid}).then(response =>{
          let {body} = response;
          if(1 == body.code && body.data){
            this.yituRecog.IDImgSrc = Config.imageUrl + "IDCard/"+body.data[0].userIdentityUrl;
            this.yituRecog.liveImgSrc = Config.imageUrl+ "grepImage/" +body.data[0].yituImageUrl || "";
            this.yituRecog.policeImgSrc = Config.imageUrl+body.data[0].originImageUrl || "";
          }
        })
      },
      /**
       * 依图对比分数
       * @return {[type]} [description]
       */
      thirdDataInfo(){
        this.getUserThirdData({uuid:this.userUuid,dataType:22},(data) =>{    //水印VS活体相似度
          try{
            let result = JSON.parse(data.data);
            this.yituRecog.yituVsLivesimilarity = parseFloat(result.pair_verify_similarity).toFixed(2);
          }catch (e){}
        });
        this.getUserThirdData({uuid:this.userUuid,dataType:9},(data) =>{      //水印VS身份证相似度
          try{
            let result = JSON.parse(data.data);
            this.yituRecog.yituVsIdcardsimilarity = parseFloat(result.pair_verify_similarity).toFixed(2);
          }catch (e){}
        });
        this.getUserThirdData({uuid:this.userUuid,dataType:5},(data)=>{    //是否芝麻关注行业
          try{
            this.creditInfo.zhimaFocus = JSON.parse(data.data).is_matched;
            this.industryRiskData = JSON.parse(data.data).details;
          }catch (e){}
        });
        this.getUserThirdData({uuid:this.userUuid,dataType:6},(data)=>{    //芝麻IVS分
          try{
            this.creditInfo.zhima_Ivs = JSON.parse(data.data).score;
          }catch (e){}
        });
        this.getUserThirdData({uuid:this.userUuid,dataType:8},(data)=>{    //同盾分
          try{
            let result = JSON.parse(data.data);
            
            console.log(result);
            result = JSON.parse(result.data);
            
            console.log(result);
            this.creditInfo.final_score = result.final_score;
            this.tongdunData = result.risk_items;
          }catch (e){}
        });
      },
      getOrderThirdDataInfo(postData,callback){
          this.$http.post('manage/thirdDataByOrderNoMon',postData).then((response) =>{
              let {body} = response;
              if(1 == body.code && body.data){
                  callback(body.data);
              }
          })
      },
      /*通过用户的uuid查询第三方信息*/
      getUserThirdData(postData,callback){
        this.$http.post('manage/userThirdDataMon',postData).then(response =>{
          if(1 == response.body.code){
            if(response.body.data){
              callback(response.body.data);
            }
          }
        }).catch((e) =>{});
      },
      /**
       * 通话记录
       */
      getTop20ContactList(channel) {
         let _url = 'manage/getTop20MoXieContactList';
        // (channel == 50 || channel == 51 || channel == 60 || channel == 61) ? _url = 'manage/matchTop20Rong360ContactList' : _url = 'manage/getTop20MoXieContactList';
         _url = 'manage/matchTop20Rong360ContactList'
         this.$http.post(_url,{uuid:this.userUuid,dataType:1,orderNo:this.uuid,channel:channel}).then((response) =>{   //通话记录
          let {body} = response;
          if(1 == body.code && body.data){
            try{
              let result = body.data;
              if(result){
                this.isTrueMXCall = false;
              }
              this.moxieCallLogData = result;
            }catch (e){}
          }
      })
      },
      /**
       * 通讯录信息
       * @return {[type]} [description]
       */
      addreBook(channel){
        this.linkLoading = true;
        let _url = '';
        let _data = {};
        // (channel == 11|| channel == 50 || channel == 51 || channel == 60 || channel == 61) ? _url = 'manage/rong360UserContactByUserUuidMongo' : _url = 'manage/orderUserContactMongoByOrderNo';
        // (channel == 11|| channel == 50 || channel == 51 || channel == 60 || channel == 61) ? _data = {uuid: this.userUuid,channel:channel} : _data = {uuid: this.uuid,userUuid:this.userUuid};
        _url = 'manage/rong360UserContactByUserUuidMongo';
        _data = {uuid: this.userUuid,channel:channel};
        this.$http.post(_url, _data).then(response => {
          this.linkLoading = false;
          if (1 == response.body.code) {
            let {body} = response;
            if(1 == body.code && body.data){
              this.totalLinkMan = body.data.length;
              this.linkData = body.data;
            }
          }
        })
      },
      /**
       * 订单进度
       * @return {[type]} [description]
       */
      orderSchedule(){
        this.$http.post('manage/orderSchedule', {uuid:this.uuid}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            if(body.data){
              this.active = body.data.length;
              this.orderProData = body.data;
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },
      /**
       * 打标签列表
       * @return {[type]} [description]
       */
      getRemarkList() {
        this.orderRemarkLoading = true;
        this.$http.post("manage/orderRemarkList",{uuid:this.uuid,systemSource:'1'}).then(response =>{
            let {body} = response;
            if(1 == body.code && body.data){
                this.orderRemarkList= body.data;
            }
          this.orderRemarkLoading = false;
        }).catch(e =>{this.orderRemarkLoading = false})
      },
      /**
       * 打标签
       * @return {[type]} [description]
       */
      saveTagForm(){
        if(!this.tagForm.recordUserPhone){
          this.$message.error("请填写手机号");
          return false;
        }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.tagForm.recordUserPhone))){
          this.$message.error("手机号格式错误");
          return false;
        }
        if(!this.addRemarkForm.remark || this.addRemarkForm.remark.length > 300){
          this.$message.error("请正确填写备注");
          return false;
        }
        if(!this.tagForm.orderTag){
          this.$message.error("请选择标签");
          return false;
        }
        if(!this.tagForm.remindDate && this.tagForm.remindTime){
          this.$message.error('请先选择日期');
          return false;
        }
        if(this.tagForm.remindDate && !this.tagForm.remindTime){
          this.$message.error('请选择具体时间');
          return false;
        }
        let _data = {
          systemSource:'1',
          recordUserName:this.tagForm.recordUserName,
          recordUserPhone:this.tagForm.recordUserPhone,
          orderNo:this.uuid,
          orderTag:this.tagForm.orderTag,
          userUuid:this.userUuid,
          operateId: DataUtil.id(),
          alertTime: this.tagForm.remindDate ? (this.tagForm.remindDate.setHours(this.tagForm.remindTime.split(':')[0])) : '',
          remark:this.addRemarkForm.remark + ' ['+DataUtil.userName()+'|'+DataUtil.formatUnixTime(new Date())+']'
        };
        this.tagFormLoading = true;
        this.$http.post("manage/tagToOrder",_data).then(response =>{
          let {body} = response;
          if(1 == body.code){
            window.location.reload();
          }
          this.tagFormLoading = false;
        }).catch(e =>{this.saveRemarkFormLoading = false;})
      },

      /**
       * 获取历史订单
       * @return {[type]} [description]
       */
      orderHistory(){
        this.historyLoading = true;
        this.$http.post('manage/userOrderList', {uuid:this.userUuid}).then(response => {
          if (1 == response.body.code) {
            this.historyLoading = false;
            if(response.body.data){
              this.historyData = response.body.data;
            }
          }
        }, response => {
          this.historyLoading = false
        });
      },
      
	/**
       * 获取风控历史
       * @return {[type]} [description]
       */
      orderRisk(){
        this.riskLoading = true;
        this.$http.post('/manage/riskList', {uuid:this.uuid}).then(response => {
          if (1 == response.body.code) {
            this.riskLoading = false;
            if(response.body.data){
              this.riskData = response.body.data;
            }
          }
        }, response => {
          this.riskLoading = false
        });
      },
      /**
       * 历史订单跳转
       * @param  {[type]} row [description]
       * @return {[type]}     [description]
       */
      historyDetail(row){
        // this.$router.push({ path:'/OrderDetail',query: {
        //   seen:this.$route.query['seen'],
        //   userUuid: row.userUuid,
        //   uuid:row.uuid||''
        // }});
        
        window.open('/#/OrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
        //window.location.reload()
      }
    },
    mounted: function () {
      // this.seen = this.$route.query['seen'];
      this.createUser = this.$route.query['createUser'];
      this.orderId = this.$route.query['id'];
      this.userId = this.$route.query['userId'];
      this.userHistoryId = this.$route.query['userHistoryId'];
      this.orderNo = this.$route.query['orderNo'];
      // this.uuid = this.$route.query['uuid']||'';
      // this.userUuid = this.$route.query['userUuid']||'';
      this.orderDataDetail();//订单详情
      // this.orderRiskInfo();//风控临时信息
      this.yituDataInfo();//依图信息
      this.thirdDataInfo()//征信信息
      this.getRemarkList(); //备注列表
      this.customerDataInfo();//客户和联系人信息
      // this.addreBook();//通讯录
      this.orderSchedule();//订单进度
      this.orderHistory();//历史订单
      this.orderRisk();//历史订单
      this.getFlagByDicItem();//通讯录字典
      this.getHandleHistoryList();//用户线下还款信息
      this.getRepayOrderList(); //获取用户资金流水
    }
  }
</script>
<style>
    /* 标题 */
    .main-title{
      font-size: 22px;
      margin-top: -15px;
      margin-bottom: 15px;
    }
  .one-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .two-title{
    font-size: 13px;
    color: #888;
    margin: 10px 0
  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .orderBox .el-row {
    margin: 15px 30px;
  }
  .orderBox .el-col span{
    margin-right: 10px;
  }
    .orderBox .el-button span,.orderBox .el-tag span{
      margin-right: 0;
    }
  .orderBox .box-card .el-button{
    margin-right: 5px;
  }
  .orderBox .grid-content {
    line-height: 28px;
  }

  .divid-line{
    height: 10px;
    background: #f1f2f7;
  }
  /*借款信息*/
  .loanDetail{
    margin: 0 30px 15px;
    width: 94%;
    max-height:250px;
  }
  /*依图识别*/
  .yituInfo{
    display: block;
    text-align: center;
    margin-top: 10px;
  }
  /*征信*/
  .orderBox .box-card{
    height: 225px;
  }
  .JXLBox{
    border: 1px solid #ccc;
    padding: 10px
  }
  .JXLBox div{
    padding: 5px;
  }
  .imgCss{
    display:block;
    width: 100%;
    height: 250px;
  }
  .orderBox .el-table .info-row {
      background: #e2f0e4;
    }

  .orderBox .el-table .red-row{
      background: #F33;
    }
  .redInfo{
    color: #F33;
  }

  .line-height .el-col{
    margin-bottom: 10px;
  }
</style>
