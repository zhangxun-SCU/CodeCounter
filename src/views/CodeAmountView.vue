<script setup lang="ts">
import { useRoute, useRouter }  from 'vue-router';
import { useIpcRenderer } from "@vueuse/electron";
import Header from '@/layout/header/index.vue';
import {LangDetail} from "@/interface/lang.ts";
const ipcRender = useIpcRenderer();
const route = useRoute();
const router = useRouter();
const data: LangDetail[] = Object.values(JSON.parse(<string>route.query.data));
console.log(data);
// data.forEach((item: LangDetail) => {
//   item.avrFuncLength = item?.totalFuncLength / item?.funcNum;
// })

// 数据导出
function exportData(/*type: string*/) {
  ipcRender.send('exportData', JSON.stringify(data));
}
ipcRender.on("exportRes", (event, args) => {
  console.log(event, args)
})
</script>

<template>
  <div class="w-full h-full">
    <Header></Header>
    <el-table :data="data" stripe style="width: 100%">
      <el-table-column prop="name" label="Language"></el-table-column>
      <el-table-column prop="lines" label="Lines"></el-table-column>
      <el-table-column prop="funcNum" label="funcNum"></el-table-column>
      <el-table-column prop="maxFuncLength" label="maxFuncLength" ></el-table-column>
      <el-table-column prop="minFuncLength" label="minFuncLength"></el-table-column>
      <el-table-column prop="midFuncLength" label="midFuncLength"></el-table-column>
      <el-table-column prop="avrFuncLength" label="avrFuncLength">
        <template #default="scope">
          <span>{{scope.row.avrFuncLength.toFixed(2)}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="filesNum" label="files"></el-table-column>
      <el-table-column prop="fileTypes" label="FileTypes"></el-table-column>
    </el-table>
    <div class="w-full flex justify-center">
      <el-button type="primary" @click="router.back()">返回</el-button>
      <el-button type="primary" @click="exportData">导出</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>