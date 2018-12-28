<template>
  <section>
    <el-dialog v-model="dialogVisible" size="full" class="photo_box">
      <el-carousel :height="windowHeight" arrow="always" :autoplay="false">
        <el-carousel-item v-for="(item,index) in photoList" :key="index">
          <div class="photo_box_wrap">
            <img :src="item" width="auto" height="100%">
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        windowHeight: '500px',
        dialogVisible: false,
        photoList: []
      }
    },
    props: [],
    methods: {
      show(photoList) {
        this.photoList = photoList
        this.dialogVisible = true
      },
      hide() {
        this.dialogVisible = false
      },
      getWindowHeight() {
        let re
        if (window.innerHeight)
          re = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
          re = document.body.clientHeight;
        return re
      }
    },
    mounted: function () {
      this.windowHeight = this.getWindowHeight() - 100 + 'px'
    }
  }

</script>
<style>
  .photo_box .el-dialog {
    background: #99a9bf
  }

  .photo_box_wrap {
    width: 100%;
    height: 100%;
    background: #99a9bf;
    position: relative;
  }

  .photo_box_wrap img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
