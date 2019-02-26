<template>
  <div id="app">
    <keep-alive>
        <router-view  v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
      //获取注册渠道码  
      //this.$store.state.sourceCode = this.$route.params.sourceCode;       
  },
  methods : {
    //   setSourceCode() {
    //       let pathNameArr = [
    //           'Login',
    //           'Landing',
    //           'NewReg',   
    //           'NewRegA',
    //           'NewRegB'                      
    //       ];
    //       let routeName = this.$route.name;
    //       for(let i=0; i<pathNameArr.length; i++) {
    //           if(routeName == pathNameArr[i]) {
    //               this.$store.state.sourceCode = this.$route.params.sourceCode; 
    //           }
    //       } 
    //   }
  }
}
</script>

<style>
</style>
