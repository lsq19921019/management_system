/**
* Created by alan on 17-5-1.
*/
<template>
  <section>
    <el-dialog title="修改密码" v-model="dialogVisible" size="tiny">
      <el-form :model="inputForm" label-position="left" label-width="100px" :rules="inputRule" ref='inputForm'>
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="inputForm.oldPwd" auto-complete="off" :maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="inputForm.newPwd" auto-complete="off" :maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPwd2">
          <el-input type="password" v-model="inputForm.newPwd2" auto-complete="off" :maxlength="16"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="formLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        let _reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,12}$/;
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (!_reg.test(value)) {
          callback(new Error('密码应为8-16位数字字母组合'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.inputForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: false,
        formLoading: false,
        inputForm: {
          oldPwd: '',
          newPwd: '',
          newPwd2: ''
        },
        inputRule: {
          oldPwd: [{
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          }],
          newPwd: [{
            validator: validatePass,
            required: true,
            trigger: 'blur'
          }],
          newPwd2: [{
            validator: validatePass2,
            required: true,
            trigger: 'blur'
          }]
        }
      }
    },
    props: ['changeType', 'username','uuid'],
    methods: {
      show() {
        this.dialogVisible = true
      },
      hide() {
        this.dialogVisible = false
      },
      submit() {
        this.$refs.inputForm.validate((valid) => {
          if (valid) {
            let _path = '',
              _data = {
                oldPassword: this.inputForm.oldPwd,
                newPassword: this.inputForm.newPwd
              }
            if (1 == this.changeType) {
              _path = "auth/forceChangePassword.json"
              _data.username = this.username
            } else {
              _data.uuid = this.uuid;
              _path = "manage/sysUserPass"
            }
            this.inputFormLoading = true

            this.$http.post(_path, _data).then(response => {
              this.inputFormLoading = false
              if (1 == response.body.code) {
                this.$refs.inputForm.resetFields()
                this.dialogVisible = false
                this.$message({
                  message: '密码修改成功,请重新登录',
                  type: 'success',
                  onClose: () => {
                    this.$router.replace('/login')
                  }
                })
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {
              this.inputFormLoading = false
            });

          } else {
            return false
          }
        });
      }
    },
    mounted: function () {

    }
  }

</script>
<style scoped>

</style>
