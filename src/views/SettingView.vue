<script setup lang="ts">
import {ref, reactive} from 'vue'



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
  <div class="container">
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
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.card-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>