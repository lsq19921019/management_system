<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
<!--       <el-form-item label="用户名">
        <el-input v-model="searchForm.usernameLike"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchForm.realnameLike"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="searchForm.mobileLike"></el-input>
      </el-form-item> -->
      <el-form-item label="角色">
        <el-select v-model="searchForm.roleId" clearable>
          <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="searchForm.userName"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable>
          <el-option label="有效" :value="0"></el-option>
          <el-option label="无效" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三方人员">
        <el-select v-model="searchForm.isThird" clearable>
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
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
        <el-table-column prop="id" width="90" label="ID">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="realname" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="mobile" label="手机" width="150">
        </el-table-column>
        <el-table-column label="角色">
          <template scope="scope">
            <el-tag v-for="item in (scope.row.roles.split(','))" v-if="item" :key="item" type="primary" style="margin-right:2px;">{{ item.split('|')[1]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="100">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template scope="scope">
            <el-tag :type="scope.row.status==0? 'success' : 'danger'" close-transition>{{scope.row.status==0?'有效':'无效'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否为三方人员" width="80">
          <template scope="scope">
            <el-tag :type="scope.row.third==1? 'primary' : 'danger'" close-transition>{{scope.row.third==1?'否':'是'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="reset(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
    <!--添加-->
    <el-dialog title="添加用户" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="100px" :rules="inputRule" ref="addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="addForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addForm.remark" auto-complete="off" :maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="roleIds">
          <el-checkbox-group v-model="addForm.roleIds">
            <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="addForm.status" on-text="有效" off-text="无效"></el-switch>
        </el-form-item>
        <el-form-item label="是否为第三方人员" prop="third">
          <el-switch v-model="addForm.third" on-text="是" off-text="否"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">提 交</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改用户" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="editForm" label-position="left" label-width="100px" :rules="inputRule" ref="editForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="editForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-checkbox-group v-model="editForm.roleIds">
            <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="editForm.status" on-text="有效" off-text="无效"></el-switch>
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
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          if (!DataUtil.isMobile(value)) {
            callback(new Error('手机号码格式不正确'));
          }
          callback();
        }
      };

      return {
        roleList: [],
        //搜索
        searchForm: {
          userName: '',
          mobile: '',
          roleId: '',
          isThird:'',
          status:''
        },
        //Grid
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        //Form
        addForm: {
          username: '',
          realname: '',
          remark:'',
          roleIds: [],
          status: true,
          mobile:'',
          third:''
        },
        editForm: {
          id: '',
          username: '',
          realname: '',
          roleIds: [],
          status: true,
          mobile:''
        },
        inputRule: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          realname: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          mobile: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          roleIds: [{
            type: 'array',
            required: true,
            message: '请至少选择一个角色',
            trigger: 'change'
          }],
          remark:[{
            required: true,
            message: '请输入备注',
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
      add(row) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.roleIds = []
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.username = row.username
        this.editForm.realname = row.realname
        this.editForm.roleIds = this.getRoleIds(row.roles.split(','))
        this.editForm.status = row.status == 1 ? false : true
      },
      reset(row) {
        this.$confirm('确认要重置密码吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let _data = {
            uuid: row.uuid
          };

          this.$http.post('manage/resetSysUserPasswd', _data).then(response => {
            if (1 == response.body.code) {
              this.$message({
                message: '密码重置成功',
                type: 'success'
              });
            } else {
              this.$message.error(response.body.message);
            }
          }, response => {

          })
        }).catch(() => {

        })
      },
      getRoleIds(list) {
        var _arr = []
        for (let i = 0; i < list.length; i++) {
          _arr.push(Number(list[i].split('|')[0]))
        }
        return _arr
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
            _data.status = _data.status ? '0' : '1'
            _data.third = _data.third ? '0' : '1'
            _data.roleIds = _data.roleIds.join(',')
            if(_data.roleIds == 0){
              this.$message({
                message: '至少选择一个角色',
                type: 'error'
              });
              return false;
            }

            this.addFormLoading = true

            this.$http.post("manage/sysUserAdd", _data).then(response => {
              this.addFormLoading = false
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
            _data.status = _data.status ? '0' : '1'
            _data.roleIds = _data.roleIds.join(',')
            if(_data.roleIds == 0){
              this.$message({
                message: '至少选择一个角色',
                type: 'error'
              });
                return false;
            }
            this.editFormLoading = true

            this.$http.post("manage/sysUserEdit", _data).then(response => {
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
      bindRole() {
        let _data = {}
        this.$http.post('manage/sysRoleList', _data).then(response => {
          if (1 == response.body.code) {
            let _arr = []
            for (let i = 0; i < response.body.data.length; i++) {
              if (0 == response.body.data[i].status) {
                _arr.push(response.body.data[i])
              }
            }
            this.roleList = _arr
          }
        }, response => {

        });
      },
      bindGrid() {
        this.gridLoading = true
        let _data = Object.assign({}, this.searchForm)
        _data.pageNo = this.pageIndex
        _data.pageSize = this.pageSize
        this.$http.post('manage/sysUserList', _data).then(response => {
          this.gridLoading = false
          if (1 == response.body.code) {
            this.dataTotal = response.body.data.recordsTotal
            this.gridData = response.body.data.data
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.gridLoading = false
        });
      }
    },
    created: function () {
      this.bindRole()
      this.bindGrid()
    }
  }

</script>
