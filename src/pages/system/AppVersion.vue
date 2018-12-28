<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="APP类型">
        <el-select v-model="searchForm.appType" clearable placeholder="全部">
          <el-option v-for="item in appType" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable placeholder="全部">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="add" type="success">新增</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column type="index" width="80">
        </el-table-column>
        <el-table-column label="系统类型">
          <template scope="scope">
            <span>{{getSysType(scope.row.sysType)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" maxlength="10">
        </el-table-column>
        <el-table-column label="APP类型">
          <template scope="scope">
            <span>{{getAppType(scope.row.appType)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="versionNo" label="版本号">
        </el-table-column>
        <el-table-column label="更新时间" width="200">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.updateTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="强制更新" width="100">
          <template scope="scope">
            <span>{{scope.row.isForce==1?'否':'是'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template scope="scope">
            <el-tag :type="scope.row.status==2 ? 'danger' : 'primary'" close-transition>{{scope.row.status==2?'禁用':'启用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column inline-template label="操作" width="100">
          <div>
            <el-button size="small" @click="edit(row)">编辑</el-button>
          </div>
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
    <!--添加-->
    <el-dialog title="添加版本信息" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="100px" :rules="addFormRule" ref="addForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title" auto-complete="off" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="升级说明" prop="memo">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.memo"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="versionNo">
          <el-input v-model="addForm.versionNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否强更" prop="isForce">
          <el-switch v-model="addForm.isForce" on-text="是" off-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="按钮文案">
          <el-col :span="11">
            <el-form-item prop="leftButton">
              <el-input v-model="addForm.leftButton" auto-complete="off" :placeholder="addForm.isForce?'':'左边按钮'"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11" v-show="!addForm.isForce">
            <el-form-item prop="rightButton">
              <el-input v-model="addForm.rightButton" auto-complete="off" placeholder="右边按钮"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="APP类型" prop="appType">
          <el-select v-model="addForm.appType">
            <el-option v-for="item in appType" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" prop="sysType">
          <el-select v-model="addForm.sysType">
            <el-option v-for="item in sysType" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下载地址" prop="downloadAddress">
          <el-input v-model="addForm.downloadAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="addForm.status" on-text="启用" off-text="禁用"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">提 交</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改版本信息" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="editForm" label-position="left" label-width="100px" :rules="editFormRule" ref="editForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="升级说明" prop="memo">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.memo"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="versionNo">
          <el-input v-model="editForm.versionNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否强更" prop="isForce">
          <el-switch v-model="editForm.isForce" on-text="是" off-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="按钮文案">
          <el-col :span="11">
            <el-form-item prop="leftButton">
              <el-input v-model="editForm.leftButton" auto-complete="off" :placeholder="editForm.isForce?'':'左边按钮'"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11" v-show="!editForm.isForce">
            <el-form-item prop="rightButton">
              <el-input v-model="editForm.rightButton" auto-complete="off" placeholder="右边按钮"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="APP类型" prop="appType">
          <el-select v-model="editForm.appType">
            <el-option v-for="item in appType" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" prop="sysType">
          <el-select v-model="editForm.sysType">
            <el-option v-for="item in sysType" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下载地址" prop="downloadAddress">
          <el-input v-model="editForm.downloadAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="editForm.status" on-text="启用" off-text="禁用"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormSubmit" :loading="editFormLoading">提 交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import enums from '../../common/Enum'
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      let validateRightButton = (rule, value, callback) => {
        if (this.addForm.isForce) {
          this.addForm.rightButton = ""
        }
        if (value === "" && !this.addForm.isForce) {
          callback(new Error('请输入按钮文案'));
        } else {
          callback();
        }
      }

      let validateRightButton2 = (rule, value, callback) => {
        if (this.addForm.isForce) {
          this.addForm.rightButton = ""
        }
        if (value === "" && !this.editForm.isForce) {
          callback(new Error('请输入按钮文案'));
        } else {
          callback();
        }
      }

      let validateDownloadAddress = (rule, value, callback) => {
        if (value === "" && this.addForm.sysType == "1") {
          callback(new Error('请输入下载地址'));
        } else {
          callback();
        }
      }

      let validateDownloadAddress2 = (rule, value, callback) => {
        if (value === "" && this.editForm.sysType == "1") {
          callback(new Error('请输入下载地址'));
        } else {
          callback();
        }
      }

      return {
        sysType: enums.sysType,
        appType: enums.appType,
        //搜索
        searchForm: {
          appType: '',
          status: ''
        },
        //Grid
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        //Form
        addForm: {
          title: '',
          memo: '',
          versionNo: '',
          isForce: false,
          leftButton: '',
          rightButton: '',
          appType: '',
          sysType: '',
          downloadAddress: '',
          status: true
        },
        editForm: {
          id: '',
          title: '',
          memo: '',
          versionNo: '',
          isForce: false,
          leftButton: '',
          rightButton: '',
          appType: '',
          sysType: '',
          downloadAddress: '',
          status: true
        },
        addFormRule: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          memo: [{
            required: true,
            message: '请输入升级说明',
            trigger: 'blur'
          }],
          versionNo: [{
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          }],
          leftButton: [{
            required: true,
            message: '请输入按钮文案',
            trigger: 'blur'
          }],
          rightButton: [{
            validator: validateRightButton,
            trigger: 'blur'
          }],
          appType: [{
            required: true,
            message: '请选择APP类型',
            trigger: 'blur'
          }],
          sysType: [{
            required: true,
            message: '请选择设备类型',
            trigger: 'blur'
          }],
          downloadAddress: [{
            validator: validateDownloadAddress,
            trigger: 'blur'
          }]
        },
        editFormRule: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          versionNo: [{
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          }],
          leftButton: [{
            required: true,
            message: '按钮文案',
            trigger: 'blur'
          }],
          rightButton: [{
            validator: validateRightButton2,
            trigger: 'blur'
          }],
          downloadAddress: [{
            validator: validateDownloadAddress2,
            trigger: 'blur'
          }]
        },
        //Dialog
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false
      }
    },
    methods: {
      getUnixTime(time){
          return DataUtil.formatUnixTime(time);
      },
      getSysType(val) {
        return enums.getSysType(val)
      },
      getAppType(val) {
        return enums.getAppType(val)
      },
      add() {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.title = row.title
        this.editForm.memo = row.memo
        this.editForm.versionNo = row.versionNo
        this.editForm.isForce = row.isForce == 1 ? false : true
        this.editForm.leftButton = row.leftButton
        this.editForm.rightButton = row.rightButton
        this.editForm.appType = row.appType + ""
        this.editForm.sysType = row.sysType + ""
        this.editForm.downloadAddress = row.downloadAddress
        this.editForm.status = row.status == 2 ? false : true
        this.editForm.appUpdateDate = new Date()
      },
      pageSizeChange(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val
        this.bindGrid()
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.addForm)
            _data.isForce = _data.isForce ? '2' : '1'
            _data.status = _data.status ? '1' : '2'
            this.addFormLoading = true

            this.$http.post("manage/appVersionAdd", _data).then(response => {
              this.addFormLoading = false;
              if (1 == response.body.code) {
                this.addDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {})

          } else {
            return false
          }
        });
      },
      editFormSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.editForm)
            _data.isForce = _data.isForce ? '2' : '1'
            _data.status = _data.status ? '1' : '2'
            this.editFormLoading = true

            this.$http.post("manage/appVersionEdit", _data).then(response => {
              this.editFormLoading = false
              if (1 == response.body.code) {
                this.editDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {})

          } else {
            return false
          }
        });
      },
      search() {
        this.pageIndex = 1
        this.bindGrid()
      },
      bindGrid() {
        this.gridLoading = true
        let _data = {
          appType: this.searchForm.appType,
          status: this.searchForm.status,
          pageNo: this.pageIndex,
          pageSize: this.pageSize,
          orderType: "DESC"
        }
        this.$http.post('manage/appVersionList', _data).then(response => {
          this.gridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            this.dataTotal = body.data.recordsTotal
            this.gridData = body.data.data
          } else {
            this.$message.error(body.data.message);
          }
        }, response => {
          this.gridLoading = false
        });
      }
    },
    mounted: function () {
      this.bindGrid()
    }
  }

</script>
