<script setup>
import sidebar from "@/page/layout/sidebar.vue";
import top from "@/page/layout/top.vue";
</script>

<template>
  <div class="container">
    <sidebar class="sidebar" />
    <div class="right-container">
      <top class="header" />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;

  .sidebar {
    width: 200px;
    :global(.el-menu) {
      border-right: none;
    }
  }
  .right-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .content {
      flex: 1;
      padding: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: start;

      :deep(.el-table-container) {
        flex: 1;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        overflow-y: auto;
      }

      :deep(.el-pagination-contaniner) {
        text-align: right;
        width: 100%;
        .el-pagination-contaniner_total {
          font-weight: normal;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
