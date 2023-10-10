<script setup lang="ts">
import CountView from "@/views/CountView.vue";
import CodeCounterLogo from "@/components/core/CodeCounterLogo.vue";
</script>

<template>
  <div class="container">
    <el-tabs tab-position="left" style="height: 100%" class="demo-tabs" type="border-card">
      <el-tab-pane label="主页"></el-tab-pane>
      <el-tab-pane label="Count Code"><CountView></CountView></el-tab-pane>
      <el-tab-pane label="setting">设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: calc(98vh - 40px);
}

.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  width: 100%;
}

.demo-tabs {
  width: 100%;
}

</style>