<template>
    <span class="updataDialog">
        <el-button :type="btnType" size="mini" plain @click="handleAdd()" class="menu-btn">{{btnText}}</el-button>
        <el-dialog :visible.sync="dialogFormVisible" :title="dialogTitle" id="multidialog" width="550px">
			<el-form class="small-space" 
					 ref="temps"
					 :model="temp" 
					 :rules="rules"
					 status-icon
					 label-position="right" 
					 label-width="100px" 
					 style='width: 400px; margin-left:50px;'
					 >
				<el-form-item label="名称" prop="wechatname">
					<el-input v-model="temp.wechatname" size="small" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="公众号ID" prop="wechatno">
					<el-input v-model="temp.wechatno" size="small" auto-complete="off"></el-input>
				</el-form-item>
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
  props: ["btnText", "btnType", "dialogTitle", "providerid","id","index","info"],
  data() {
    return {
      temp: {
        id: "",
        firstprice: "",
        secondprice: "",
        wechatno: "",
        other: "",
        providerid: "",
        index:""
      },
      rules: {
        wechatname: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        wechatno: [
          { required: true, message: "请输入公众号ID", trigger: "blur" }
        ],
        firstprice: [
          { required: true, type:'number', message: "请输入头条价格", trigger: "blur" }
        ],
        secondprice: [
          { required: true, type:'number',message: "请输入次条价格", trigger: "blur" }
        ],
        other: [
            { required: true, type:'number',message: "请输入", trigger: "blur" }
        ]
      },

      dialogFormVisible: false
    };
  },
  mounted() {
    this.temp.wechatname = this.info.wechatname;
    this.temp.wechatno = this.info.wechatno;
    this.temp.firstprice = this.info.firstprice;
    this.temp.secondprice = this.info.secondprice;
    this.temp.other = this.info.other;

    if (this.btnText == "新增") {
      this.temp.providerid = this.providerid;
    } else {
        delete this.temp.providerid;
        this.temp.id = this.id;
        this.temp.index = this.index;
    }
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
    // resetTemp() {
    //   this.wechatname = "";
    // },
    hideDialog() {
      this.dialogFormVisible = false;
      this.$refs["temps"].resetFields();
    },
    handleAdd() {
      this.dialogFormVisible = true;
    //   this.resetTemp();
      this.$refs["temps"].resetFields();
    }
  },
  watch: {
    id() {
      this.temp.id = this.id;
    },
    providerid() {
      this.temp.providerid = this.providerid;
    }
  }
};
</script>
<style lang="scss" scoped>

</style>