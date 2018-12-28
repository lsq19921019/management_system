<template>

  <div id="getUserLastSmsCode">
    <el-row>
      <el-col :span="7">
        <el-form class="toolbar">
          <el-form-item label="自有开关">
            <el-switch v-model="ziYouOffOn" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
            </el-switch>
          </el-form-item>

          <el-form-item label="现金白卡开关">
            <el-switch v-model="XjbkffOn" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
            </el-switch>
          </el-form-item>

          <el-form-item label="八戒钱贷开关">
            <el-switch v-model="BjqdOff" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
            </el-switch>
          </el-form-item>

          <el-form-item label="小金雁开关">
            <el-switch v-model="XjyOff" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
            </el-switch>
          </el-form-item>

          <el-form-item label="">
            <el-button @click="saveSwitch" type="info">保存</el-button>
          </el-form-item>

        </el-form>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        gridLoading: false,
        tableData: [],
        contentsTitle:[],
        columnInfo:[],
        ziYouOffOn:'',
        XjbkffOn:'',
        BjqdOff:'',
        XjyOff:''
      }
    },
    methods: {
      getUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      saveSwitch(){
        this.edit("manage:day0mask:0",this.ziYouOffOn,()=>{});
        this.edit("manage:day0mask:50",this.XjbkffOn,()=>{});
        this.edit("manage:day0mask:51",this.BjqdOff,()=>{});
        this.edit("manage:day0mask:60",this.XjyOff,()=>{});
        //this.saveUserOperate();
      },
      saveUserOperate(){
        let _data = {sessionId:DataUtil.sid(),desc:"修改redis开关控制",type:8};
        this.$http.post('manage/userOperateMark', _data).then(response =>{window.location.reload()})
      },
      search(key,callback) {
        this.$http.post('manage/redisStringValue', {key: key}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            if (body.data.value) {
              callback(body.data);
            } else {}
          } else {
            this.$message.error(body.message);
          }
        }, response => {
        });
      },
      edit(key, value, callback){
        console.log({key: key,value: value});
        this.$http.post('manage/redisStringValueEdit', {key: key,value: value}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            callback(body.data);
          } else {
            this.$message.error(body.message);
          }
        }, response => {
        });
      },
      initData(){
        this.search("manage:day0mask:0",(data)=>{
          this.ziYouOffOn = data.value;
        });
        this.search("manage:day0mask:50",(data)=>{
          this.XjbkffOn = data.value;
        });
        this.search("manage:day0mask:51",(data)=>{
          this.BjqdOff = data.value;
        });
        this.search("manage:day0mask:60",(data)=>{
          this.XjyOff = data.value;
        });
      }
    },
    mounted() {
      this.initData();
    }
  }
</script>
<style>
  #getUserLastSmsCode {
    margin-top: 20px;
  }
</style>

