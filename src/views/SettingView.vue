<script setup lang="ts">
import {reactive} from 'vue'



const languageCheckedGroup = reactive([
  {
    language: 'python',
    fileTypes: ['py'],
    check: true
  },
  {
    language: 'c/c++',
    fileTypes: ['c', 'h', 'cpp', 'hpp'],
    check: true
  },
  {
    language: 'java',
    fileTypes: ['java'],
    check: true
  },
  {
    language: 'javascript',
    fileTypes: ['js', 'ts'],
    check: true
  }
]);
console.log(languageCheckedGroup.length)
</script>

<template>
  <div class="w-full h-full flex flex-col justify-around">
    <el-card class="language-select" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>选择统计的语言</span>
          <!--        <el-button class="button" text>Operation button</el-button>-->
        </div>
      </template>
        <el-checkbox
            v-for="(item, index) in languageCheckedGroup"
            :id="index"
            :label="item.language"
            v-model="item.check"
            size="large"
            border
        />
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>