<template>
    <div class="header_table">
        <div class="left">
           <router-link to="/idnex" :class=" { active : curnav==1 } ">快讯<i></i></router-link>
        </div>
        <div class="right">
           <router-link to="/selected_news" :class=" { active : curnav==2 } ">好文<i></i></router-link>
        </div>
    </div>
</template>

<script>
export default {
  methods: {},
  props: {
    curnav: ""
  }
};
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
}
.header_table {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.79rem;
  z-index: 10;
  background: #fff;
}
.left a {
  height: 3.79rem;
  line-height: 3.79rem;
  float: left;
  width: 28%;
  text-align: center;
  margin-left: 22%;
  color: #333;
  font-size: 1.335rem;
  position: relative;
}
.right a {
  height: 3.79rem;
  line-height: 3.79rem;
  float: left;
  width: 28%;
  text-align: center;
  color: #333;
  font-size: 1.335rem;
  position: relative;
  margin-right: 22%;
  margin-left: 0;
}
.left a.active,
.right a.active {
  color: #f64427;
  font-weight: bold;
}
.left a.active i,
.right a.active i {
  background: url(/static/img/header_ttable_line.png) no-repeat center;
  background-size: 100% 100%;
}
.left a i,
.right a i {
  display: block;
  width: 2.9rem;
  height: 0.24rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.1rem;
}
</style>