<script setup lang="ts">
import { useRoute, useRouter }  from 'vue-router';
import Header from '@/layout/header/index.vue';
const route = useRoute();
const router = useRouter();
const data = Object.values(JSON.parse(<string>route.query.data));
console.log(data);
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
      <el-table-column prop="avrFuncLength" label="avrFuncLength">
        <template #default="scope">
          <span>{{scope.row.avrFuncLength.toFixed(2)}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="filesNum" label="files"></el-table-column>
      <el-table-column prop="fileTypes" label="FileTypes"></el-table-column>
    </el-table>
    <el-button type="primary" @click="router.back()">返回</el-button>
  </div>
</template>

<style scoped>

</style>