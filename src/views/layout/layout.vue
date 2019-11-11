<template>
  <div id="layout">
    <el-container>
      <el-aside>
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Head></Head>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from "../../components/layout/aside.vue";
import Head from "../../components/layout/head.vue";
export default {
  name: "Layout",
  components: {
    Aside,
    Head
  },
  created() {
    console.log(1);
  }
};
</script>
<style lang="less">
.el-header {
  line-height: 60px;
}

.el-aside {
  height: 100vh;
  background-color: black;
}

.el-main {
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
