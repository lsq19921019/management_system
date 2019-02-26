<template>
    <span class="editDialog">
        <el-button type="primary" size="mini" @click="handleAdd()">编辑</el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="编辑" id="multidialog" width="550px">
			<el-form class="small-space" 
					 ref="temps"
					 :model="temp" 
					 :rules="rules"
					 status-icon
					 label-position="right" 
					 label-width="100px" 
					 style='width: 400px; margin-left:50px;'
					 >
				<el-form-item label="头条" prop="firstprice">
					<el-input v-model.number="temp.firstprice" size="small" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="次条" prop="secondprice">
					<el-input v-model.number="temp.secondprice" size="small" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="其他" prop="other">
					<el-input v-model.number="temp.other" size="small" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="hideDialog">取 消</el-button>
				<el-button type="primary" @click="create">确 定</el-button>
			</div>
    	</el-dialog>
    </span>
</template>
<script>
import $ from "jquery";
export default {
  props: ["id","wechatno","info"],
  data() {
    return {
      temp: {
        firstprice: "",
        secondprice:"",
        other:"",
        id:"",
        wechatno:""
      },
      rules: {
        firstprice: [
          { required: true,type:'number', message: "请输入头条", trigger: "blur" }
        ],
        secondprice: [
          { required: true,type:'number',  message: "请输入次条", trigger: "blur" }
        ],
        other: [
          { required: true, type:'number', message: "请输入", trigger: "blur" }
        ]
      },

      dialogFormVisible: false
    };
  },
  mounted() {
      this.temp.id = this.id;
      this.temp.wechatno = this.wechatno;
      this.temp.firstprice = this.info.firstprice;
      this.temp.secondprice = this.info.secondprice;
      this.temp.other = this.info.other;
    //   this.$refs["temps"].resetFields();
  },
  methods: {
    create() {
      this.$refs["temps"].validate(valid => {
        if (valid) {
          this.$emit("updateData", this.temp);
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.providername = "";
    //   this.$refs["temps"].resetFields();
    },
    hideDialog() {
      this.dialogFormVisible = false;
      this.$refs["temps"].resetFields();
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.resetTemp();
      this.$refs["temps"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>

</style>