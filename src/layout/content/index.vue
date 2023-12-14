<script setup lang="ts">
// import CodeCounterLogo from "@/components/core/CodeCounterLogo.vue";

// import { ref } from 'vue'
// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   Setting,
// } from '@element-plus/icons-vue'
import CountView from "@/views/CountView.vue";
// import SettingView from "@/views/SettingView.vue";

// const isCollapse = ref(true)

// const changeCollapse = () => {
//   isCollapse.value = !isCollapse.value;
// };
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// }
// const handleSelect = (index, indexPath, item, routeResult) => {
//   console.log(index, indexPath, item, routeResult);
// }


</script>

<template>
  <div class="w-full flex-auto h-full">
    <el-tabs tab-position="left" class="tabs w-full h-full" type="border-card">
<!--      <el-tab-pane label="主页"></el-tab-pane>-->
      <el-tab-pane label="Count Code"><CountView/></el-tab-pane>
<!--      <el-tab-pane label="AI分析"></el-tab-pane>-->
<!--      <el-tab-pane label="setting"><SettingView/></el-tab-pane>-->
    </el-tabs>

<!--    <el-menu-->
<!--        default-active="/count"-->
<!--        router-->
<!--        class=""-->
<!--        style="margin: 0"-->
<!--        :collapse="isCollapse"-->
<!--        @open="handleOpen"-->
<!--        @close="handleClose"-->
<!--        @select="handleSelect"-->
<!--    >-->
<!--      <el-menu-item index="1" @click="changeCollapse">-->
<!--        <el-icon><icon-menu /></el-icon>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="content">-->
<!--        <el-icon><icon-menu /></el-icon>-->
<!--        <template #title>index</template>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/count">-->
<!--        <el-icon><icon-menu /></el-icon>-->
<!--        <template #title>Count</template>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="4">-->
<!--        <RouterLink to="/">-->
<!--          <el-icon><document /></el-icon>-->
<!--        </RouterLink>-->
<!--        <template #title>AI analyze</template>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="5">-->
<!--        <RouterLink to="/setting">-->
<!--          <el-icon><setting /></el-icon>-->
<!--        </RouterLink>-->
<!--        <template #title>setting</template>-->
<!--      </el-menu-item>-->
<!--    </el-menu>-->
<!--    <RouterView />-->
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