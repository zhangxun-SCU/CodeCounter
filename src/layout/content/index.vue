<script setup lang="ts">
import CountView from "@/views/CountView.vue";
import SettingView from "@/views/SettingView.vue";
// import CodeCounterLogo from "@/components/core/CodeCounterLogo.vue";
</script>

<template>
  <div class="w-full flex-auto h-full">
    <el-tabs tab-position="left" class="tabs w-full h-full" type="border-card">
      <el-tab-pane label="主页"></el-tab-pane>
      <el-tab-pane label="Count Code"><CountView/></el-tab-pane>
      <el-tab-pane label="AI分析"></el-tab-pane>
      <el-tab-pane label="setting"><SettingView/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>

.tabs > .el-tabs__content {
  height: 100%;
}

.tabs > .el-tabs__content > .el-tab-pane {
  @apply h-full w-full;
  height: 100%;
}
</style>