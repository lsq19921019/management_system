<template>
  <section>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <!-- 规则列表 -->
      <el-tab-pane label="规则列表" name="first">
        <!-- 以下为功能标签栏 -->
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label='券编号'>
            <el-select v-model="FirstFormData.couponNo" placeholder="请选择" clearable filterable>
              <el-option v-for="(item,index) in CardNoOptions" :key="item.index" :label="item.couponNo" :value="item.couponNo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='状态'>
            <el-select v-model="FirstFormData.status" placeholder="请选择" clearable>
              <el-option v-for="item in firstStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button style='width: 80px' type="primary" @click="bindGridFirst">查询</el-button>
            <el-button style='width: 80px' type="success" @click="dialogTemplateAddClick">新增</el-button>
          </el-form-item>
        </el-form>
        <!-- 以下为pane1中的表格展示-券编号券名称开始发放日期截止发放日期发放方式面值有效期限获取来源状态唯一标识创建时间操作-->
        <el-table v-loading='FirstGridLoading' :data="firstTableData">
          <el-table-column prop="couponNo" label="券编号"></el-table-column>
          <el-table-column prop="couponName" label="券名称"></el-table-column>
          <el-table-column prop="beginGiveDate" label="开始发放日期" width='130px'>
            <template slot-scope="scope">
              {{formatTime(scope.row.beginGiveDate)}}
            </template>
          </el-table-column>
          <el-table-column prop="endGiveDate" label="截止发放日期" width='130px'>
            <template slot-scope="scope">
              {{formatTime(scope.row.endGiveDate)}}
            </template>
          </el-table-column>
          <el-table-column prop="method" label="发放方式" width='130px'>
            <template slot-scope="scope">
              <el-tag v-for="item in (scope.row.method)" 
              v-if="item" 
              :key="item"
              :type="item == 2?'success':'danger'" 
              style="margin-right:2px;">
                {{ item == 2?'自动':'手动' }}
              </el-tag>             
            </template>
          </el-table-column>
          <el-table-column prop="fixedFaceValueAmount" label="面值"></el-table-column>
          <el-table-column prop="termOfValidity" label="有效期限"></el-table-column>
          <el-table-column prop="getSource" label="获取来源"></el-table-column>          
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status==1? 'success' : 'danger'">{{scope.row.status==1? '启用' : '禁用'}}</el-tag>              
            </template> 
          </el-table-column>          
          <el-table-column prop="isUsedOrderNo" label="唯一标识">
            <template slot-scope="scope">
              {{getOnlyMark(scope.row.isUsedOrderNo)}}
            </template>
          </el-table-column>          
          <el-table-column prop="createTime" label="创建时间" width='130px'>
            <template slot-scope="scope">
              {{formatTime(scope.row.createTime)}}
            </template>
          </el-table-column>          
          <el-table-column label="操作" width='180px'>
            <template slot-scope="scope">
              <el-button size="small" @click.native.prevent="dialogTemplateChangeModel(scope.$index, firstTableData)">修改</el-button>
              <el-button size="small" type="primary" @click="handleSend(scope.$index)">手动发放</el-button>
            </template>
          </el-table-column>  
        </el-table>
        <!--分页-->
        <el-pagination class="pager" @current-change="secondPageIndexChange" :current-page="pageIndex" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="dataTotal">
        </el-pagination>
      </el-tab-pane>
    <!-- 全部发放统计 -->
      <el-tab-pane label="全部发放统计" name="second">
        <el-form :inline="true" :model="secondFormData" class="demo-form-inline">
          <el-form-item label='券编号'>
            <el-select v-model="secondFormData.cardNo" clearable filterable>
              <el-option v-for="(item,index) in CardNoOptions" :key="item.index" :label="item.couponNo" :value="item.couponNo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="secondFormData.realName"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="secondFormData.mobileNumber"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="secondFormData.orderNo"></el-input>
          </el-form-item>
          <el-form-item label='发送方式' >
            <el-select v-model="secondFormData.sendMethod" clearable>
              <el-option v-for="item in secondSendMethodOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='发送短信'>
            <el-select v-model="secondFormData.sendMessage" clearable>
              <el-option v-for="item in secondSendMessageOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>       
          </el-form-item>
          <el-form-item label='券状态'>
            <el-select v-model="secondFormData.status" clearable>
              <el-option v-for="item in StatusOptions" :key="item.dicItemValue" :label="item.dicItemName" :value="item.dicItemValue"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="80px">
            <el-button  style='width: 80px' type="primary" @click="bindGridSecond">查询</el-button>
          </el-form-item>
        </el-form>


        <el-table v-loading='secondGridLoading' :data="secondTableData" style="width: 100%" @row-click="rowClick">
          <el-table-column prop="cardNo" label="券编号"></el-table-column>
          <el-table-column prop="cardName" label="券名称"></el-table-column>
          <el-table-column label="券状态">
            <template slot-scope="scope">
              <span>{{getGiveStatVal(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="姓名"></el-table-column>
          <!-- <el-table-column prop="mobileNumber" width='120px' label="手机号"></el-table-column> -->
          <el-table-column prop="orderNo" width='120px' label="订单号"></el-table-column>
          <el-table-column prop="amount" label="面值"></el-table-column>
          <el-table-column prop="sendMethod" width='100px' label="发送方式">
            <template slot-scope="scope">
              <el-tag v-for="item in (scope.row.sendMethod.split(','))" 
              v-if="item" 
              :key="item"
              :type="item == 2?'success':'danger'" 
              style="margin-right:2px;">
                {{ item == 2?'自动':'手动' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sourcesCome" label="获取来源" width='120px'></el-table-column>
          <el-table-column prop="sendMessage" label="发送短信" width='120px'>
            <template slot-scope="scope">
              <el-tag :type="scope.row.sendMessage==1? 'success':'danger'">{{scope.row.sendMessage==1?'是':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="useTime" label="使用日期" width='120px'>
            <template slot-scope="scope">
              {{formatTime(scope.row.useTime)}}
            </template>
          </el-table-column>
          <el-table-column prop="senderName" label="发放人"></el-table-column>
          <el-table-column prop="sendTime" label="发放日期" width='120px'>
            <template slot-scope="scope">
              {{formatTime(scope.row.sendTime)}}
            </template>
          </el-table-column>      
        </el-table>
        <!--分页-->
        <el-pagination class="pager" @current-change="secondPageIndexChange1" :current-page="pageIndex1" :page-size="pageSize1" layout="total, prev, pager, next, jumper" :total="dataTotal1">
        </el-pagination>
      </el-tab-pane>
    <!-- 手动发放统计 -->
      <el-tab-pane label="手动发放统计" name="third">
        <el-form :inline="true" :model="thirdFormData" class="demo-form-inline">
          <el-form-item label='券编号'>
            <el-select v-model="thirdFormData.cardNo" clearable filterable>
              <el-option v-for="(item,index) in CardNoOptions" :key="item.index" :label="item.couponNo" :value="item.couponNo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="thirdFormData.realName"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="thirdFormData.mobileNumber"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="thirdFormData.orderNo"></el-input>
          </el-form-item>
          <el-form-item label='发送短信'>
            <el-select v-model="thirdFormData.sendMessage" clearable>
              <el-option v-for="item in thirdSendMessageOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='券状态'>
            <el-select v-model="thirdFormData.status" clearable>
              <el-option v-for="item in StatusOptions" :key="item.dicItemValue" :label="item.dicItemName" :value="item.dicItemValue"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button  style='width: 80px' type="primary" @click="bindGridThird">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading='thirdGridLoading' :data="thirdTableData"  @row-click="rowClick">
          <el-table-column prop="cardNo" label="券编号"></el-table-column>
          <el-table-column prop="cardName" label="券名称"></el-table-column>
          <el-table-column prop="batch" label="券批次"></el-table-column>
          <el-table-column label="券状态">
            <template slot-scope="scope">
              <span>{{getGiveStatVal(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="姓名"></el-table-column>
          <!-- <el-table-column prop="mobileNumber" width='120px' label="手机号"></el-table-column> -->
          <el-table-column prop="orderNo" width='120px' label="订单号"></el-table-column>
          <el-table-column prop="amount" label="面值"></el-table-column>
          <el-table-column prop="sendMethod" width='100px' label="发送方式">
            <template slot-scope="scope">
              <el-tag v-for="item in (scope.row.sendMethod.split(','))" 
              v-if="item" 
              :key="item"
              :type="item == 2?'success':'danger'" 
              style="margin-right:2px;">
                {{ item == 2?'自动':'手动' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sourcesCome" label="获取来源" width='120px'></el-table-column>
          <el-table-column prop="sendMessage" label="发送短信" width='120px'>
            <template slot-scope="scope">
              <el-tag :type="scope.row.sendMessage==1? 'success':'danger'">{{scope.row.sendMessage==1?'是':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="useTime" label="使用日期" width='120px'>
            <template slot-scope="scope">
              {{formatTime(scope.row.useTime)}}
            </template>
          </el-table-column>
          <el-table-column prop="senderName" label="发放人"></el-table-column>
          <el-table-column prop="sendTime" label="发放日期" width='120px'>
            <template slot-scope="scope">
              {{formatTime(scope.row.sendTime)}}
            </template>
          </el-table-column>      
        </el-table>
        <!--分页-->
        <el-pagination class="pager" @current-change="secondPageIndexChange2" :current-page="pageIndex2" :page-size="pageSize2" layout="total, prev, pager, next, jumper" :total="dataTotal2">
        </el-pagination>
      </el-tab-pane>
  </el-tabs>
      <!-- 以下为新增现金券模板 -->
      <el-dialog title="现金券模板" :visible.sync="dialogFirstAdd">
        <el-form  label-width="120px" :inline="true" class="demo-form-inline"> 
          <div class="RuleTitle">发放规则</div>
          <el-form-item style='width: 100%'>        
            <el-form-item label="券编号">
              <el-input v-model="couponTemplate.couponNo">
              </el-input>
            </el-form-item>
            <el-form-item label="券名称">
              <el-input v-model="couponTemplate.couponName">
              </el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item style='width: 100%'>
            <el-form-item label="创建日期">
              <el-tag type="gray">
                {{(couponTemplate.createTime)}}
              </el-tag>
            </el-form-item>  
          </el-form-item> 
          <el-form-item label="状态" style='width: 100%'>
            <el-radio class="radio" v-model="couponTemplate.status" label="1">启用</el-radio>
            <el-radio class="radio" v-model="couponTemplate.status" label="2">禁用</el-radio>
          </el-form-item>               
          <el-form-item label="开始发放日期">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="开始日期" v-model="couponTemplate.beginGiveDate"></el-date-picker>
              </el-form-item>
              <el-form-item>
                截至发放日期
              </el-form-item>
              <el-form-item prop="date2">
                <el-date-picker type="date" placeholder="结束日期" v-model="couponTemplate.endGiveDate" >
                </el-date-picker>
              </el-form-item>
          </el-form-item>
          <el-form-item label="发放条件" style='width: 100%' >
              <el-select v-model="couponTemplate.giveCondition" placeholder="请选择">
                <el-option v-for="item in giveCondition"
                  :key="item.dicItemValue"
                  :label="item.dicItemName"
                  :value="item.dicItemValue">
                </el-option>
            </el-select>
          </el-form-item> 
          <el-form-item label="仅限新借款使用" style='width: 100%'>
            <el-radio class="radio" v-model="couponTemplate.isAgain" label="1">是</el-radio>
            <el-radio class="radio" v-model="couponTemplate.isAgain" label="0">否</el-radio>
          </el-form-item> 
          <el-form-item label="每人发放上限" style='width: 100%'>
              <el-input v-model="couponTemplate.apieceGiveTopLimit">
              </el-input>
          </el-form-item> 
          <el-form-item label="发放方式"  style='width: 100%'>
            <el-checkbox-group v-model="couponTemplate.method">
              <el-checkbox label="1" name="type">手动</el-checkbox>
              <el-checkbox label="2" name="type">自动</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="唯一标识" style='width: 100%'>
            <el-radio class="radio" v-model="couponTemplate.isUsedOrderNo" label="1">订单号</el-radio>
            <el-radio class="radio" v-model="couponTemplate.isUsedOrderNo" label="2">手机号</el-radio>
            <el-radio class="radio" v-model="couponTemplate.isUsedOrderNo" label="3">身份证</el-radio>
            <el-form-item label="获取来源">
              <el-input v-model="couponTemplate.getSource">
              </el-input>
            </el-form-item>
          </el-form-item> 
          <el-form-item label="面值" style='width: 100%'>
            <el-radio-group v-model="couponTemplate.faceValue"  @change='faceValueChange'>
              <el-radio class="radio" label="1">固定</el-radio>
              <el-radio class="radio" label="2">浮动</el-radio>
             </el-radio-group>
            <el-form-item label="固定面值金额" >
              <el-input v-model="couponTemplate.fixedFaceValueAmount" :disabled="faceValueDisable">
              </el-input>
            </el-form-item>
          </el-form-item> 

          <div class="RuleTitle">使用规则</div>

          <el-form-item label="产品类型" style='width: 100%'>
            <el-select v-model="couponTemplate.productType" placeholder="请选择">
              <el-option label="铁罐极速卡" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style='width: 100%'>
            <el-form-item label="适用金额">
              <el-checkbox-group v-model="couponTemplate.useAmount">
                <el-checkbox   v-for="item in useAmount"
                  name="type"
                  :key="item.dicItemValue"
                  :label="item.dicItemValue">
                  {{item.dicItemName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="适用期限">
              <el-checkbox-group v-model="couponTemplate.term">
                <el-checkbox
                  v-for="item in term"
                  name="type"
                  :key="item.dicItemValue"
                  :label="item.dicItemValue">
                  {{item.dicItemName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form-item>

          <el-form-item style='width: 100%'>
              <el-form-item prop="date1" label='开始使用日期'>
                <el-date-picker type="date" placeholder="开始日期" v-model="couponTemplate.beginUseDate"></el-date-picker>
              </el-form-item>
                ——
              <el-form-item prop="date2" label='截止使用日期'>
                <el-date-picker type="date" placeholder="结束日期" v-model="couponTemplate.endUseDate" >
                </el-date-picker>
              </el-form-item>
          </el-form-item>
          <el-form-item  class="demo-form-inline">
            <el-form-item  label="有效期限">
                <el-input v-model="couponTemplate.termOfValidity">
                </el-input>
            </el-form-item> 
            <el-form-item>天</el-form-item> 
          </el-form-item>
          <el-form-item style='width: 100%'>
            <el-form-item label="最低限额"> 
              <el-input v-model="couponTemplate.lowAmount">
              </el-input>
            </el-form-item> 
            <el-form-item label="最高限额"> 
              <el-input v-model="couponTemplate.highAmount">
              </el-input>
            </el-form-item> 
          </el-form-item> 
          <el-form-item label="是否叠加使用" style='width: 100%'>
            <el-radio class="radio" v-model="couponTemplate.isDoubleUse" label="1">是</el-radio>
            <el-radio class="radio" v-model="couponTemplate.isDoubleUse" label="2">否</el-radio>
          </el-form-item> 
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFirstAddModel">确 定</el-button>
          <el-button @click="dialogFirstAdd = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 以下为现金券模板修改页面 -->
      <el-dialog title="现金券模板" :visible.sync="dialogTemplateChange">
        <el-form  label-width="120px" :inline="true" class="demo-form-inline"> 
          <div class="RuleTitle">发放规则</div>
          <el-form-item style='width: 100%'>        
            <el-form-item label="券编号">
              <el-input v-model="templateChangeData.couponNo" :disabled="true">
              </el-input>
            </el-form-item>
            <el-form-item label="券名称">
              <el-input v-model="templateChangeData.couponName" :disabled="true">
              </el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item style='width: 100%'>
            <el-form-item label="创建日期">
              <el-tag type="gray">
                {{formatTime(templateChangeData.createTime)}}
              </el-tag>
            </el-form-item>  
          </el-form-item> 
          <el-form-item label="状态" style='width: 100%'>
            <el-radio-group v-model="templateChangeData.status">
              <el-radio class="radio" :label="1">启用</el-radio>
              <el-radio class="radio" :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>               
          <el-form-item label="开始发放日期">
              <el-form-item prop="date1">
                <el-date-picker type="date" v-model="templateChangeData.beginGiveDate"placeholder="开始日期"></el-date-picker>
              </el-form-item>
              <el-form-item>
                截至发放日期
              </el-form-item>
              <el-form-item prop="date2">
                <el-date-picker type="date" placeholder="结束日期" v-model="templateChangeData.endGiveDate" >
                </el-date-picker>
              </el-form-item>
          </el-form-item>
          <el-form-item label="发放条件" style='width: 100%'>
              <el-select v-model="templateChangeData.giveCondition" placeholder="请选择">
                <el-option v-for="item in giveCondition"
                  :key="item.dicItemValue"
                  :value="item.dicItemValue"
                  :label="item.dicItemName">
                </el-option>
            </el-select>
          </el-form-item> 
          <el-form-item label="仅限新借款使用" style='width: 100%'>
            <el-radio-group v-model="templateChangeData.isAgain">
              <el-radio class="radio" :label="1">是</el-radio>
              <el-radio class="radio" :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item> 
          <el-form-item label="每人发放上限" style='width: 100%'>
              <el-input v-model="templateChangeData.apieceGiveTopLimit">
              </el-input>
          </el-form-item> 
          <el-form-item label="发放方式"  style='width: 100%'>
            <el-checkbox-group v-model="templateChangeData.method">
              <el-checkbox label="1" name="type">手动</el-checkbox>
              <el-checkbox label="2" name="type">自动</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="唯一标识" style='width: 100%'>
            <el-radio-group v-model="templateChangeData.isUsedOrderNo">
              <el-radio class="radio" :label="1">订单号</el-radio>
              <el-radio class="radio" :label="2">手机号</el-radio>
              <el-radio class="radio" :label="3">身份证</el-radio>
            </el-radio-group>
            <el-form-item label="获取来源">
              <el-input v-model="templateChangeData.getSource">
              </el-input>
            </el-form-item>
          </el-form-item> 
          <el-form-item label="面值" style='width: 100%'>
            <el-radio-group v-model="templateChangeData.faceValue"  @change='faceValueChange1'>
              <el-radio class="radio" :label="1">固定</el-radio>
              <el-radio class="radio" :label="2">浮动</el-radio>
            </el-radio-group>
            <el-form-item label="固定面值金额" >
              <el-input v-model="templateChangeData.fixedFaceValueAmount" :disabled="faceValueDisable1">
              </el-input>
            </el-form-item>
          </el-form-item> 

          <div class="RuleTitle">使用规则</div>

          <el-form-item label="产品类型" style='width: 100%'>
            <el-select v-model="templateChangeData.productType">
              <el-option label="铁罐极速卡" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style='width: 100%'>
            <el-form-item label="适用金额">
              <el-checkbox-group v-model="templateChangeData.useAmount">
                <el-checkbox   v-for="item in useAmount"
                  name="type"
                  :key="item.dicItemValue"
                  :label="item.dicItemValue">
                  {{item.dicItemName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="适用期限">
              <el-checkbox-group v-model="templateChangeData.term">
                <el-checkbox  v-for="item in term"
                  name="type"
                  :key="item.dicItemValue"
                  :label="item.dicItemValue">
                  {{item.dicItemName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form-item>

          <el-form-item style='width: 100%'>
              <el-form-item prop="date1" label='开始使用日期'>
                <el-date-picker type="date" v-model="templateChangeData.beginUseDate" placeholder="开始日期"></el-date-picker>
              </el-form-item>
                ——
              <el-form-item prop="date2" label='截止使用日期'>
                <el-date-picker type="date" v-model="templateChangeData.endUseDate" >
                </el-date-picker>
              </el-form-item>
          </el-form-item>
          <el-form-item  class="demo-form-inline">
            <el-form-item  label="有效期限">
                <el-input v-model="templateChangeData.termOfValidity">
                </el-input>
            </el-form-item> 
            <el-form-item>天</el-form-item> 
          </el-form-item>
          <el-form-item style='width: 100%'>
            <el-form-item label="最低限额"> 
              <el-input v-model="templateChangeData.lowAmount">
              </el-input>
            </el-form-item> 
            <el-form-item label="最高限额"> 
              <el-input v-model="templateChangeData.highAmount">
              </el-input>
            </el-form-item> 
          </el-form-item> 
          <el-form-item label="是否叠加使用" style='width: 100%'>
            <el-radio-group v-model="templateChangeData.isDoubleUse">
              <el-radio class="radio" :label="1">是</el-radio>
              <el-radio class="radio" :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item> 
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="templateChange">确 定</el-button>
          <el-button @click="dialogTemplateChange = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 以下为现金券模板手动发放页面 -->
      <el-dialog style='width: 1400px; margin-left: 20px' size='large' :visible.sync="dialogFirstHandle">
        <div id="dialogFirstHandleTitle">手动发放</div>
        <el-button type="primary" @click="">批量导入</el-button>
        <el-button type="primary" @click="">短信模板设置</el-button>
        <el-table
          border
          :data="handleSendTableData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          v-loading="handleSendLoading">
          <el-table-column
            prop="userName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobileNumber"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="couponNo"
            label="券编号">
          </el-table-column>
          <el-table-column
            prop="giveNumber"
            label="发放个数">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额">
          </el-table-column>          
          <el-table-column 
            class='mobileMess' 
            prop="mobileMess"
            label='短信'>
            <el-table-column width="100" type="selection"></el-table-column> 
          </el-table-column> 
          <el-table-column
            align='center'
            header-align='center'
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="danger"
                 @click.native.prevent="handleDelete(scope.$index, handleSendTableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <table border="0" style="width: 100%">
          <tr>
            <td><el-input v-model='handleAddData.userName' placeholder='姓名' required></el-input></td>
            <td><el-input v-model='handleAddData.mobileNumber' placeholder='手机号' required></el-input></td>
            <td><el-input v-model='handleAddData.orderNo' placeholder='订单号' required></el-input></td>
            <td><el-input v-model='handleAddData.couponNo' disabled></el-input></td>
            <td><el-input v-model='handleAddData.giveNumber' placeholder='发放个数' required></el-input></td>
            <td><el-input v-model='handleAddData.amount' :disabled="handleSendFackeValue" placeholder='金额'></el-input></td>
            <td style="width: 13%">            
            <el-table-column><span style="color: white">_</span><el-checkbox v-model="mobileMess"></el-checkbox></el-table-column>
            </td>
            <td style="width: 100px"><el-button @click='handleAdd' style='margin-left: 10px' type='primary' size="small">添加</el-button></td>
          </tr>
        </table>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAddSubmite">确 定</el-button>
          <el-button @click="dialogFirstHandle=false">取 消</el-button>
        </div>
      </el-dialog>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        activeName: 'first',
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0, 
        pageIndex1: 1,
        pageIndex2: 1,
        pageSize1: 10,
        pageSize2: 10,
        dataTotal1: 0,
        dataTotal2: 0,
        // pane1数据
        mobileMess: '',
        couponRadio: '',
        newDueRadio: '',
        onlyMarkRadio: '',
        faceValueRadio: '',
        firstTableData: [],
        FirstGridLoading: false,
        dialogFirstAdd: false,
        dialogTemplateChange: false,
        dialogFirstHandle: false,
        handleSendLoading: false,
        FirstFormData:{
          couponNo: '',
          status: ''
        },
        firstStatusOptions: [{
          value: '1',
          label: '启用'
        }, {
          value: '0',
          label: '禁用'
        }],
        CardNoOptions: [],
        handleSendTableData: [],
        adminUserName: '',
        // handleSendTableDataAdd: [],
        templateChangeData: {
          couponNo: '',
          couponName: '',
          createTime: '',
          status: '',
          beginGiveDate: '',
          endGiveDate: '',
          giveCondition: '',
          isAgain: '',
          apieceGiveTopLimit: '',
          method: [],
          isUsedOrderNo: '',
          getSource: '',
          faceValue: '',
          fixedFaceValueAmount: '',
          productType: '',
          useAmount: [],
          term: [],
          beginUseDate: '',
          endUseDate: '',
          termOfValidity: '',
          lowAmount: '',
          highAmount: '',
          isDoubleUse: '',
        },
        options: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        couponTemplate: {
          couponNo: '',
          couponName: '',
          createTime: '',
          status: '',
          beginGiveDate: '',
          endGiveDate: '',
          giveCondition: '',
          isAgain: '',
          apieceGiveTopLimit: '',
          method: [],
          isUsedOrderNo: '',
          getSource: '',
          faceValue: '',
          fixedFaceValueAmount: '',
          productType: '',
          useAmount: [],
          term: [],
          beginUseDate: '',
          endUseDate: '',
          termOfValidity: '',
          lowAmount: '',
          highAmount: '',
          isDoubleUse: '',
        },
        couponTemplateTest: {
          couponNo: '',
          couponName: '',
          createTime: '',
          status: '',
          beginGiveDate: '',
          endGiveDate: '',
          giveCondition: '',
          isAgain: '',
          apieceGiveTopLimit: '',
          method: [],
          isUsedOrderNo: '',
          getSource: '',
          faceValue: '',
          fixedFaceValueAmount: '',
          productType: '',
          useAmount: [],
          term: [],
          beginUseDate: '',
          endUseDate: '',
          termOfValidity: '',
          lowAmount: '',
          highAmount: '',
          isDoubleUse: '',
        },
        giveCondition: [],
        useAmount: [],
        term: [],
        OnlyMark: [{
          id: '1',
          value: '订单号'
        },{
          id: '2',
          value: '手机号'
        },{
          id: '3',
          value: '身份证'
        }
        ],
        handleAddData: {
          userName: '',
          mobileNumber: '',
          orderNo: '',
          couponNo: '',
          giveNumber: '',
          amount: ''
        },
        faceValueDisable: false,
        faceValueDisable1: false,
        handleSendFackeValue: false,
        // giveCondition: {},
        // pane2数据
        thirdGridLoading: false,
        secondGridLoading: false,

        StatusOptions: [],
        secondTableData: [],
        secondSendMethodOptions: [{
          value: '1',
          label: '手动'
        }, {
          value: '2',
          label: '自动'
        }],
        secondSendMessageOptions: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        secondFormData: {
          cardNo: '',
          userName: '',
          mobileNumber: '',
          orderNo: '',
          sendMethod: '',
          sendMessage: '',
          status: ''
        },
        // pane3数据
        thirdTableData: [],
        thirdSendMethodOptions: [{
          value: '1',
          label: '手动'
        }, {
          value: '2',
          label: '自动'
        }],
        thirdSendMessageOptions: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        thirdFormData: {
          cardNo: '',
          userName: '',
          mobileNumber: '',
          orderNo: '',
          sendMethod: '',
          sendMessage: '',
          status: ''
        },
      }
    },
    methods: {
      rowClick(row){
        // let w = window.open(location.href);
        // let w = window.open(location.origin);
        // // let w = window.open('about:blank');
        // setTimeout(()=>{
        //     w.location.href = '/#/UserDetail?&uuid='+row.userUuid;
        // },1000);
        window.open('/#/UserDetail?&uuid='+row.userUuid);
      },
      getGiveStatVal(status) {        //现金券状态
        let re = '';
        this.StatusOptions.forEach(e => {
          if(e.dicItemValue == status){
            re = e.dicItemName;
            return;
          }
        });
        return re;
      },
      getOnlyMark(mark) {
        let re = '';
        this.OnlyMark.forEach(e => {
          if(e.id == mark){
            re = e.value;
            return;
          }
        });
        return re;
      },
      getCardNoOptions() {
        this.$http.post('manage/queryGiveStatGroupNo',{}).then(response => {
          this.CardNoOptions = response.body.data;
        },response =>{});
      },
      getCouponList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'CASH_COUPON_STATUS'}).then(
          response => {
            this.StatusOptions = response.body.data;
          },response => {});
      },
      
      giveConditionList() {
        this.$http.post('manage/dicItemListByDicCode',{"dicCode":"CONDION"}).then(
          response => {
            this.giveCondition = response.body.data;
          },response => {});
      },
      useAmountList() {
        this.$http.post('manage/dicItemListByDicCode',{"dicCode":"FIT_AMOUNT"}).then(
          response => {
            this.useAmount = response.body.data;
          },response => {});
      },
      termList() {
        this.$http.post('manage/dicItemListByDicCode',{"dicCode":"FIT_TERM"}).then(
          response => {
            this.term = response.body.data;
          },response => {});
      },
      handleSelectionChange(val) {
      },
      dialogFirstAddModel() {
        let _data = Object.assign({},this.couponTemplate);
        let date=new Date();
        if(_data.beginGiveDate<(date- 3600 * 1000 * 24)){this.$message({message: '发放的起始日期不可早于当前日期！',type: 'warning'});return}
        if(_data.beginUseDate<(date- 3600 * 1000 * 24)){this.$message({message: '使用的起始日期不可早于当前日期！',type: 'warning'});return}
        if(_data.endGiveDate<_data.beginGiveDate){this.$message({message: '发放的结束日期必须晚于起始日期！',type: 'warning'});return}
        if(_data.endUseDate<_data.beginUseDate){this.$message({message: '使用的结束日期必须晚于起始日期！',type: 'warning'});return}

        if(_data.faceValue==2){_data.fixedFaceValueAmount="1"}
        for(var key in this.couponTemplate){ 
          if(_data[key] == ''){
            this.$message({
            message: '输入选项不能为空',
            type: 'warning'
            });
            return;
          }    
        }
        if(_data.faceValue==2){_data.fixedFaceValueAmount=''}

        let method= this.couponTemplate.method;
        _data.method=method.toString();
        let useAmount1= this.couponTemplate.useAmount;
        _data.useAmount=useAmount1.toString();
        let term1= this.couponTemplate.term;
        _data.term=term1.toString();

        _data.beginGiveDate = DataUtil.formatTime(_data.beginGiveDate);
        _data.endGiveDate = DataUtil.formatTime(_data.endGiveDate);
        _data.beginUseDate = DataUtil.formatTime(_data.beginUseDate);
        _data.endUseDate = DataUtil.formatTime(_data.endUseDate);
        this.$http.post('manage/sysCouponRuleAdd', _data).then(response => {
          if (1 == response.body.code) {
            this.$message({message: '提交成功！',type: 'success'});
            this.dialogFirstAdd = false;
            this.bindGridFirst();
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.FirstGridLoading = false;
        });
      },
      handleAddSubmite() {
        let count;//用来计数input里空格个数，disable的当做空格
        let num;// 用来记录disable的input个数
        if(this.handleSendFackeValue==true){count=2}else{count=1}
        if(this.handleSendFackeValue==true){num=2}else{num=1}
        for(var key in this.handleAddData){    
          if(this.handleAddData[key].length == 0){
            count+=1;
          }    
        }
        let aa=Object.getOwnPropertyNames(this.handleAddData).length-1;
          if(aa!==count&&count!==num){
            this.$message({
            message: '输入框能不为空',
            type: 'warning'
          });
          return;
        }
        if(count==num){
          let _clone = Object.assign({},this.handleAddData);
          for(var key in this.handleAddData){  
            if(key!=="couponNo") {this.handleAddData[key] = ''; }
            else{continue;} 
          }
          _clone.type='1';
          this.handleSendTableData.push(_clone);
        }
        // let _data = this.handleSendTableData.concat(this.handleSendTableDataAdd);
        let _data = this.handleSendTableData;
        for(let key in _data){
          _data[key].adminUserName=this.adminUserName;
        }

        this.$http.post('manage/sysCouponManaulGiveAdd', _data).then(response => {
          if (1 == response.body.code) {
            this.dialogFirstHandle = false;
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.dialogFirstHandle = false;
        });
        if(this.handleSendFackeValue==true){
        this.handleAddData.amount=this.handleSendTableData[0].amount;
        }
      },
      dialogTemplateChangeModel(index,firstTableData) {
        this.dialogTemplateChange=true;
        this.templateChangeData=this.firstTableData[index];
        //发放方式，适用金额，适用期限改为数组形式
        let method= this.templateChangeData.method;
        method=method.toString();
        this.templateChangeData.method=method.split(",");
        let useAmount1= this.templateChangeData.useAmount;
        useAmount1=useAmount1.toString();
        this.templateChangeData.useAmount=useAmount1.split(",");
        let term= this.templateChangeData.term;
        this.templateChangeData.term=term.split(",");
      },
      bindGridFirst() {
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize
        }, this.FirstFormData);
        this.FirstGridLoading = true;
        this.$http.post('manage/sysCouponRuleList', _data).then(response => {
          if (1 == response.body.code) {
            this.FirstGridLoading = false;
            if(response.body.data){
              this.firstTableData = response.body.data.data;
              for(var key in this.firstTableData){
                let method= this.firstTableData[key].method;
                method=method.toString();
                this.firstTableData[key].method=method.split(",");
              }
              this.dataTotal = response.body.data.recordsTotal;
            }else {
              this.firstTableData = [];
              this.dataTotal = 0;
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.FirstGridLoading = false;
        });
      }, 
      handleSend(index) {
        if(this.firstTableData[index].status==0){
          this.$message({message: '该优惠券处于禁用状态，修改后可添加！',type: 'error'});
          return;
        }
        this.dialogFirstHandle=true;
        // this.handleSendLoading=true;
        this.handleSendTableData = [];
        for(var key in this.handleAddData){    
          this.handleAddData[key] = '' 
        }
        this.handleSendFackeValue=false;
        if(this.firstTableData[index].faceValue==1){
          this.handleSendFackeValue=true;
          this.handleAddData.amount=this.firstTableData[index].fixedFaceValueAmount;
        }
        let coupon = Object.assign({}, this.firstTableData);
        this.handleAddData.couponNo=coupon[index].couponNo;
        // let _data = {
        //   pageNo:this.pageIndex,
        //   pageSize:this.pageSize,
        //   couponNo:coupon[index].couponNo,
        // };
        // this.$http.post('manage/sysCouponManaulGiveList', _data).then(response => {
        //   if (1 == response.body.code) {
        //     this.handleSendLoading=false;
        //     if(response.body.data){
        //       this.handleSendTableData = response.body.data.data;
        //       this.dataTotal = response.body.data.recordsTotal;
        //     }else {
        //       this.handleSendTableData = [];
        //       this.dataTotal = 0;
        //     }
        //   } else {
        //     this.handleSendLoading=false;
        //     this.$message.error(response.body.message);
        //   }
        // }, response => {
        // });
      },
      templateChange() {
        this.dialogTemplateChange=true;
        let _data = Object.assign({},this.templateChangeData);
        let date=new Date();
        if(_data.beginGiveDate<(_data.createTime- 3600 * 1000 * 24)){this.$message({message: '发放的起始日期不可早于当前日期！',type: 'warning'});return}
        if(_data.beginUseDate<(_data.createTime- 3600 * 1000 * 24)){this.$message({message: '使用的起始日期不可早于当前日期！',type: 'warning'});return}
        if(_data.endGiveDate<_data.beginGiveDate){this.$message({message: '发放的结束日期必须晚于起始日期！',type: 'warning'});return}
        if(_data.endUseDate<_data.beginUseDate){this.$message({message: '使用的结束日期必须晚于起始日期！',type: 'warning'});return}

        if(_data.faceValue==2){_data.fixedFaceValueAmount="1"}
        for(var key in this.couponTemplateTest){ 
          if(_data[key].length == 0){
            this.$message({
            message: '输入选项不能为空',
            type: 'warning'
            });
            return;
          }    
        }
        if(_data.faceValue==2){_data.fixedFaceValueAmount=''}
        //发放方式，适用金额，适用期限改为字符串形式
        let method= this.templateChangeData.method;
        _data.method=method.toString();
        let useAmount1= this.templateChangeData.useAmount;
        _data.useAmount=useAmount1.toString();
        let term1= this.templateChangeData.term;
        _data.term=term1.toString();

        _data.createTime=DataUtil.formatUnixDateTime(this.templateChangeData.createTime);
        _data.beginGiveDate=DataUtil.formatUnixDateTime(this.templateChangeData.beginGiveDate);
        _data.endGiveDate=DataUtil.formatUnixDateTime(this.templateChangeData.endGiveDate);
        _data.beginUseDate=DataUtil.formatUnixDateTime(this.templateChangeData.beginUseDate);
        _data.endUseDate=DataUtil.formatUnixDateTime(this.templateChangeData.endUseDate);
        this.$http.post('manage/sysCouponRuleEdit', _data).then(response => {
          if (1 == response.body.code) {
            this.$message({message: '提交成功！',type: 'success'});
            this.dialogTemplateChange = false;
            this.bindGridFirst();
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },      
      dialogTemplateAddClick() {
        this.dialogFirstAdd= true;
        for(var key in this.couponTemplate){
          this.couponTemplate[key]='';
        }
        this.couponTemplate.method=[];
        this.couponTemplate.useAmount=[];
        this.couponTemplate.term=[];
        this.getNowDate();
      },
      faceValueChange(){
        if(this.couponTemplate.faceValue==2){
          this.faceValueDisable=true;
        }else{this.faceValueDisable=false;}
      },
      faceValueChange1(){
        if(this.templateChangeData.faceValue==2){
          this.faceValueDisable1=true;
        }else{this.faceValueDisable1=false;}
      },
      //第二屏pane2
      secondPageIndexChange(val) {
        this.pageIndex = val;
        this.bindGridFirst()
      },
      secondPageIndexChange1(val) {
        this.pageIndex1 = val;
        this.bindGridSecond()
      },
      secondPageIndexChange2(val) {
        this.pageIndex2 = val;
        this.bindGridThird()
      },
      handleClick(tab) {
        if(tab.index == 0){
          this.bindGridFirst();
        }else if(tab.index == 1){
          this.bindGridSecond();
        }else if(tab.index == 2){
          this.bindGridThird();
        }
      },
      handleAdd() {
        let count=1;
        for(var key in this.handleAddData){    
          if(this.handleAddData[key].length == 0){
            count+=1;
          }
        }
        let aa=Object.getOwnPropertyNames(this.handleAddData).length-1;
        if(aa!==count&&count!==1){
          this.$message({
          message: '输入框能不为空',
          type: 'warning'
          });
          return;
        }
        if(count==aa){
          return;
        }
        let _clone = Object.assign({},this.handleAddData);
        _clone.type='1';
        this.handleSendTableData.push(_clone);
        for(var key in this.handleAddData){    
          this.handleAddData[key] = '';    
        }
        this.handleAddData.couponNo=this.handleSendTableData[0].couponNo;
        if(this.handleSendFackeValue==true){
        this.handleAddData.amount=this.handleSendTableData[0].amount;
        }
      },
      handleDelete(index, handleSendTableData) {
        // let _del=this.handleSendTableData[index];
        // _del.type='2';
        // this.handleSendTableDataAdd.push(_del);
        this.handleSendTableData.splice(index, 1);
      },
      getSex(parse) {
      },
      getNowDate(){
        let d = new Date();
        let date = d.getFullYear() + "-" +(d.getMonth() + 1) + "-" + d.getDate();
        this.couponTemplate.createTime=date;
      },
      formatTime(time){
          return DataUtil.formatUnixTime(time);
      },
      getUserName() {
        this.adminUserName= DataUtil.userName();
      },
      bindGridSecond() {
        this.secondGridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex1,
          pageSize:this.pageSize
        }, this.secondFormData);

        this.$http.post('manage/sysCouponGiveStat', _data).then(response => {
          if (1 == response.body.code) {
            this.secondGridLoading = false;
            if(response.body.data){
              this.secondTableData = response.body.data.data;
              this.dataTotal1 = response.body.data.recordsTotal;
            }else {
              this.secondTableData = [];
              this.dataTotal1 = 0;
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.secondGridLoading = false;
        });
      },
      //第三屏
      bindGridThird() {
        this.thirdGridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex2,
          pageSize:this.pageSize,
        }, this.thirdFormData);
        _data.sendMethod='1';
        // this.$http.post('manage/sysCouponUseStat.json', _data).then(response => {
        this.$http.post('manage/sysCouponGiveStat', _data).then(response => {
          if (1 == response.body.code) {
            this.thirdGridLoading = false;
            if(response.body.data){
              this.thirdTableData = response.body.data.data;
              this.dataTotal2 = response.body.data.recordsTotal;
            }else {
              this.thirdTableData = [];
              this.dataTotal2 = 0;
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.thirdGridLoading = false;
        });
      },
    }, 
    mounted: function () {
      this.getCardNoOptions();
      this.getCouponList();
      this.giveConditionList();
      this.getNowDate();
      this.useAmountList();
      this.termList();
      this.getUserName();
      this.bindGridFirst();
      // this.bindGridSecond();
      // this.bindGridThird();
      // this.handleSend();
    }
  }
</script>

<style>
  #dialogFirstHandleTitle {
    margin-top: -20px;
    margin-bottom: 20px;
    font-weight: 700;
    font-family: "黑体";
    font-size: 20px;
  }
  .RuleTitle {
    margin-bottom: 20px;
    background-color: #eef1f6;
    font-weight: 700;
    padding:  5px 10px;
    /*color: black;*/
  }
</style>