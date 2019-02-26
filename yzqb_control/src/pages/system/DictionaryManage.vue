<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="addRoot" type="success">添加父字典</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-tree :data="treeData" :props="defaultProps" node-key="id" v-loading="treeLoading" :expand-on-click-node="false"
      :render-content="renderContent"  ref="tree">
    </el-tree>
    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
    <!--添加父字典或子字典-->
    <el-dialog title="添加字典" v-model="addDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="addForm" label-position="left" label-width="80px" :rules="inputRule" ref="addForm">
        <el-form-item label="字典编码" prop="dicCode">
          <el-input v-model="addForm.dicCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="dicName">
          <el-input v-model="addForm.dicName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">提 交</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改字典" v-model="editDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="editForm" label-position="left" label-width="80px" :rules="inputRule" ref="editForm">
        <el-form-item label="Code" prop="dicCode">
          <el-input v-model="editForm.dicCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="dicName">
          <el-input v-model="editForm.dicName" auto-complete="off"></el-input>
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
  export default {
    data() {
      return {
        //Grid
        treeLoading: false,
        treeData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        defaultProps: {
          children: 'children',
          label: 'dicItemName'
        },
        addForm: {
          dicName: '',
          dicCode: '',
          parentId: '0'
        },
        editForm: {
          id: '',
          dicName: '',
          dicCode: ''
        },
        inputRule: {
          dicCode: [{
            required: true,
            message: '请输入Code',
            trigger: 'blur'
          }],
          dicName: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }]
        },
        editUrl: '', //修改字典的接口
        //Tree
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false
      }
    },
    methods: {
      pageSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindTree();
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.bindTree();
      },
      addRoot() {
        this.addDialogVisible = true;
        this.$refs.addForm && this.$refs.addForm.resetFields();
        this.addForm.parentId = '0';
      },
      addNode(parent) {
        this.addDialogVisible = true;
        this.$refs.addForm && this.$refs.addForm.resetFields();
        this.addForm.parentId = parent.id;
      },
      edit(row,node) {
        console.log(row);
        this.editDialogVisible = true;
        this.editForm.id = row.id;
        this.editForm.dicCode = row.dicItemValue;
        this.editForm.dicName = row.dicItemName;
        this.editUrl = (node.level == 1) ?'manage/fatherDicEdit': 'manage/sysDicItemEdit';
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.addForm)
            this.addFormLoading = true;
            let _postUrl = (this.addForm.parentId == 0)? 'manage/fatherDicAdd' : 'manage/sysDicItemAdd'

            this.$http.post(_postUrl, _data).then(response => {
              this.addFormLoading = false
              if (1 == response.body.code) {
                this.addDialogVisible = false
                this.bindTree()
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {
              this.addFormLoading = false
            });

          } else {
            return false
          }
        });
      },
      editFormSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.editForm)
            this.editFormLoading = true

            this.$http.post(this.editUrl, _data).then(response => {
              this.editFormLoading = false
              if (1 == response.body.code) {
                this.editDialogVisible = false
                this.bindTree()
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {
              this.editFormLoading = false
            });

          } else {
            return false
          }
        });
      },
      renderContent(h, {
        node,
        data,
        store
      }) {
         return (
          <span><span><span> {data.dicItemName}({data.dicItemValue}) </span></span><span style = "float: right; margin-right: 20px">
          <el-button disabled={node.level!=1} type="success" size = "small"  on-click = {() => this.addNode(data)} >添加子字典</el-button>
          <el-button size = "small" on-click = {() => this.edit(data,node)} >修改</el-button>
          <el-button style="display:none;"  disabled={data.children&&data.children.length>0} type="danger" size = "mini"  on-click = {() => this.del(data)} >删除</el-button>
          </span></span>
        )
      },
      bindTree() {
        this.treeLoading = true
        let _data = {
          pageNo: this.pageIndex,
          pageSize: this.pageSize
        }
        this.$http.post('manage/fatherDicList', _data).then(response => {
          this.treeLoading = false;
          let {body} = response;
          if (1 == body.code && body.data.data) {
            this.dataTotal = body.data.recordsTotal;
            this.treeData = body.data.data;
          } else {
            this.$message.error(body.message)
          }
        }, response => {
          this.treeLoading = false
        })
      }
    },
    created: function () {
      this.bindTree();
    }
  }

</script>

