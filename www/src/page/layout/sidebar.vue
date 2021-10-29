<script setup>
import { useRoute } from "vue-router";
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const bgColor = "#545c64";
const textColor = "#ffd04b";
const route = useRoute();
const defaultActive = route.path;
</script>

<template>
  <div>
    <div class="title">后台管理</div>
    <el-menu
      :active-text-color="textColor"
      :background-color="bgColor"
      class="el-menu-vertical-demo"
      :default-active="defaultActive"
      text-color="#fff"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/site">
        <i class="el-icon-setting"></i>
        <span>站点配置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
    background-color: v-bind(bgColor);

    .title {
        color: v-bind(textColor);
        font-weight: bold;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
    } 
}
</style>
