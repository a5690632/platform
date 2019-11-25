<template>
  <div>
    <el-menu
      :collapse="false"
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">组件</span>
        </template>
        <el-menu-item index="/layout/components/table">表格</el-menu-item>
        <el-menu-item index="/layout/components/form">表单</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: black;
}
</style>