<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="手机号">
        <el-input v-model="searchForm.mobile" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="提交日期">
        <div class="block">
          <el-date-picker v-model="searchForm.startTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
          </el-date-picker> ~
          <el-date-picker v-model="searchForm.endTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="渠道来源">
        <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
          <el-option v-for="item in qudaolist" :label="item.dicItemName" :key="item.dicId" :value="item.dicItemValue.split('#')[0]"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题类型">
        <el-select v-model="searchForm.questionType" placeholder="请选择" clearable>
          <el-option v-for="item in issueTypeList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="解决情况">
        <el-select v-model="searchForm.stageType" placeholder="请选择" clearable>
          <el-option v-for="item in solutionList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="excelExport" type="info">导出</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <section>
      <el-table :data="gridData" highlight-current-row border v-loading="gridLoading">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户UUID">
          <template slot-scope="scope">
            <span style="color: #50bfff" @click="check(scope.row)">{{scope.row.userUuid}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" prop="createTime">
          <template slot-scope="scope">{{getUnixTime(scope.row.createTime)}}</template>
        </el-table-column>
        <el-table-column label="反馈内容" prop="feedBack">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p class="hideTooMuch">{{scope.row.feedBack}}</p>
              <div slot="reference">
                {{miniText(scope.row.feedBack)}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="问题类型" prop="questionType" min-width="70">
          <template slot-scope="scope">{{getQuestionType(scope.row.questionType)}}</template>
        </el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="解决情况" width="100">
          <template slot-scope="scope">{{getStageType(scope.row.stageType)}}</template>
        </el-table-column>
        <el-table-column label="客服姓名" prop="operatorName" min-width="70"></el-table-column>
        <el-table-column label="渠道" prop="channel" min-width="60">
          <template slot-scope="scope">{{getChannelType(scope.row.channel)}}</template>
        </el-table-column>
        <el-table-column label="操作时间" prop="updateTime">
          <template slot-scope="scope">{{getUnixTime(scope.row.updateTime)}}</template>
        </el-table-column>
        <el-table-column label="操作" prop="remark" width="250">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popover trigger="hover" placement="top">
              <p class="hideTooMuch">{{scope.row.userMobile}}</p>
              <el-button size="small" @click="" slot="reference">查看手机号</el-button>
            </el-popover>
            <el-button size="small" @click.native.prevent="imgReview(scope.row)" v-show="scope.row.uploadImages">查看图片
          </el-button>
          </template>
        </el-table-column>
      </el-table>
      <ml-photo-box ref="photoBox"></ml-photo-box>
      <!--分页-->
      <el-pagination class="pager" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize" layout="total, prev, pager, next, jumper"
        :total="dataTotal">
      </el-pagination>
    </section>

    <!-- 添加备注弹框 -->
    <el-dialog title="添加备注" v-model="editFormDigVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="addRemarkForm" ref="addRemarkForm" label-width="70px">
        <el-form-item label="问题类型" prop="questionType">
          <el-select v-model="addRemarkForm.questionType" placeholder="请选择" clearable>
            <el-option v-for="item in issueTypeList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop="remark">
          <el-input type="textarea" v-model="addRemarkForm.remark" :maxlength="200" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="解决情况" prop="stageType">
          <el-select v-model="addRemarkForm.stageType" placeholder="请选择" clearable>
            <el-option v-for="item in solutionList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="editFormDigVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import mlPhotoBox from '../../components/_photoBox.vue'
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'
  export default {
    data() {
      let compareDate = (time, form, txt, type) => {
        let _cp1 = time.getTime() >= Date.now()
        let _cp2 = false
        let _input = this[form][txt]
        if (_input) {
          let _time = Date.parse(new Date(_input))
          if ((type == "s" && time.getTime() > _time) || (type == "e" && time.getTime() < _time)) {
            _cp2 = true
          }
        }
        return _cp1 || _cp2
      }
      return {
        searchForm: {
          mobile:'',
          startTime: '',
          endTime: '',
          questionType: '',
          stageType: ''
        },
        addRemarkForm: {
          remark: '',
          questionType: '',
          stageType: ''
        },
        issueTypeList: enums.issueTypeList,
        solutionList: enums.solutionList,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        editFormDigVisible: false,
        confirmLoading: false,
        uuid: '',
        qudaolist: [],
        pickerOptions1: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "endTime", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "startTime", "e")
          }
        }
      }
    },
    methods: {
      check(row){
        window.open('/#/UserDetail?&uuid='+row.userUuid);
      },
      getQuestionType(type){
        let re = '';
        this.issueTypeList.forEach(function(obj) {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
        return re
      },
      getChannelType(type){
        //return enums.getChannelType(channel);
        let re = '';
        this.qudaolist.forEach(obj => {
          if (obj.dicItemValue.split('#')[0] == type) {
            re = obj.dicItemName;
            return
          }
        });
        return re
      },
      getStageType(type){
        let re = '';
        this.solutionList.forEach(function(obj) {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
        return re
      },
      getQudaoList() {
        this.$http.post('manage/dicItemListByDicCode',{dicCode:'REGISTER_CHANNEL'}).then(response=>{
          let {body} = response;
          this.qudaolist = body.data || [];
        },response=>{});
      },
      search() {
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.bindGrid()
      },
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      miniText(text) {
        if (text.length > 20) {
          text = text.substr(0, 20) + '...';
        }
        return text;
      },
      excelExport(){
        window.open(Config.host + "/manage/userFeedBackExcel?sessionId="+DataUtil.sid()+"&questionType="+this.searchForm.questionType+"&stageType="+this.searchForm.stageType+"&startTime="+DataUtil.formatTime(this.searchForm.startTime)+"&endTime="+DataUtil.formatTime(this.searchForm.endTime)+"&mobile="+this.searchForm.mobile);
      },
      handleEdit(row) {
        this.$refs.addRemarkForm&&this.$refs.addRemarkForm.resetFields();
        this.editFormDigVisible = true;
        this.uuid = row.uuid;
      },
      editFormSubmit() {
        if(!this.addRemarkForm.remark || this.addRemarkForm.remark.length > 200){
          this.$message.error("请正确填写备注");
          return false;
        }
        if(!this.addRemarkForm.questionType){
          this.$message.error("请选择问题类型");
          return false;
        }
        if(!this.addRemarkForm.stageType){
          this.$message.error("请选择解决情况");
          return false;
        }
        let _data = Object.assign({
          uuid: this.uuid,
          operatorName: DataUtil.userName(),
          userId: DataUtil.id()
        },this.addRemarkForm);
        this.confirmLoading = true;
        this.$http.post('manage/remark2UserFeedBack',_data).then(response => {
          this.confirmLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.editFormDigVisible = false;
            this.bindGrid();
          }else{
            this.$message.error(body.message);
          }
        },response => {this.confirmLoading = false;});
      },
      bindGrid() {
        let _data = Object.assign({
          pageNo: this.pageIndex,
          pageSize: 10
        },this.searchForm,{
          startTime:DataUtil.formatTime(this.searchForm.startTime)||'',
          endTime:DataUtil.formatTime(this.searchForm.endTime)||''});

        this.gridLoading = true;
        this.$http.post('manage/userFeedBackList', _data).then((response) => {
          let {
            body
          } = response;
          if (body.code == 1) {
            this.gridLoading = false;
            this.gridData = body.data.data;
            this.dataTotal = body.data.recordsTotal;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) => {
          this.gridLoading = false;
          this.$message.error("网络异常")
        });

      },
      imgReview(row) {
        let {
          uploadImages
        } = row;
        if (!row) {
          return false;
        }
        let imgArr = uploadImages.split('|');
        imgArr.forEach(function (e, i) {
          // imgArr[i] = Config.imageUrl + e;
          imgArr[i] = 'http://image.yzqianbao.com/MyDownload/feedback/' + e;
        });
        this.$refs.photoBox.show(imgArr);
      }
    },
    components: {
      mlPhotoBox
    },
    mounted: function () {
      this.bindGrid();
      this.getQudaoList();
    }
  }

</script>
<style scoped>
  .hideTooMuch {
    max-width: 268px;
    word-wrap: break-word;
  }
</style>
