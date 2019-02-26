<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="addRoot" type="success">添加根节点</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-tree :data="treeData" :props="defaultProps" node-key="id" v-loading="treeLoading" default-expand-all :expand-on-click-node="false"
      :render-content="renderContent"  ref="tree">
    </el-tree>
    <!--添加-->
    <el-dialog title="添加权限" v-model="addDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="addForm" label-position="left" label-width="80px" :rules="inputRule" ref="addForm">
        <el-form-item label="Code" prop="permissionCode">
          <el-input v-model="addForm.permissionCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="permissionName">
          <el-input v-model="addForm.permissionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="permissionUrl">
          <el-input v-model="addForm.permissionUrl" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">提 交</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改权限" v-model="editDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="editForm" label-position="left" label-width="80px" :rules="inputRule" ref="editForm">
        <el-form-item label="Code" prop="permissionCode">
          <el-input v-model="editForm.permissionCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="permissionName">
          <el-input v-model="editForm.permissionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="permissionUrl">
          <el-input v-model="editForm.permissionUrl" auto-complete="off"></el-input>
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
        defaultProps: {
          children: 'children',
          label: 'permissionName'
        },
        //Form
        addForm: {
          permissionCode: '',
          permissionName: '',
          permissionUrl: '/',
          parentId: '0'
        },
        editForm: {
          id: '',
          permissionCode: '',
          permissionName: '',
          permissionUrl: '/',
        },
        inputRule: {
          permissionCode: [{
            required: true,
            message: '请输入Code',
            trigger: 'blur'
          }],
          permissionName: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          permissionUrl: [{
            required: true,
            message: '请输入路径',
            trigger: 'blur'
          }]
        },
        //Tree
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false
      }
    },
    methods: {
      addRoot() {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.parentId = '0'
      },
      addNode(parent) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.parentId = parent.id
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.permissionCode = row.permissionCode
        this.editForm.permissionName = row.permissionName
        this.editForm.permissionUrl = row.permissionUrl
      },
      del(row) {
        this.$confirm('确认要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let _data = {
            id: row.id
          }
          this.$http.post('manage/deletePermission.json', _data).then(
            response => {
              if (1 == response.body.code) {
                this.bindTree()
                this.$message({
                  message: '删除记录成功',
                  type: 'success'
                });
              } else {

              }
            }, response => {});
        }).catch(() => {

        })
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.addForm)
            this.addFormLoading = true

            this.$http.post('manage/permissionItemAdd', _data).then(response => {
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

            this.$http.post('manage/permissionItemEdit', _data).then(response => {
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
          <span><span><span> {data.permissionName}({data.permissionUrl}) </span></span><span style = "float: right; margin-right: 20px">
          <el-button disabled={node.level!=1} type="success" size = "mini"  on-click = {() => this.addNode(data)} >添加子权限</el-button>
          <el-button size = "mini" on-click = {() => this.edit(data)} >修改</el-button>
          <el-button style="display:none;"  disabled={data.children&&data.children.length>0} type="danger" size = "mini"  on-click = {() => this.del(data)} >删除</el-button>
          </span></span>
        )
      },
      bindTree() {
        this.treeLoading = true
        let _data = {}
        this.$http.post('manage/permissionList', _data).then(response => {
          this.treeLoading = false;
          let {body} = response;
          if (1 == body.code && body.data) {
            this.treeData = body.data
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
