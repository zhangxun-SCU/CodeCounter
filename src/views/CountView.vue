<script setup lang="ts">
import { useIpcRenderer } from "@vueuse/electron";
import {ref, reactive, nextTick} from 'vue';
const ipcRender = useIpcRenderer();
function send() {
  console.log(1)
  ipcRender.send("submit", "打开资源管理器");
}
ipcRender.on("reply", (event, arg) => {
  console.log(event);
  if (!arg.canceled) {
    console.log(arg);
    paths.push(arg.filePaths[0]);
  }
});
//   选择的路径
const paths:string[] = reactive([]);

import { ElInput } from 'element-plus'
const inputValue = ref('')
const dynamicTags = ref(['lib', 'node_modules'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<template>
<div class="container">
  <el-card class="code-path" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>代码路径</span>
        <el-button class="button" @click="send">选择文件夹</el-button>
      </div>
    </template>
    <div v-for="(item, index) in paths" :id="index">{{ item }}</div>
  </el-card>

  <el-card class="exclude-words" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>排除关键字</span>
            <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="ml-1 w-20"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" @click="showInput">
              添加排除项
            </el-button>
      </div>
    </template>
    <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
  </el-card>
  <div class="count-container">
    <el-button type="success" style="height: 14vmin; width: 14vmin; border-radius: 7vmin;">
      Count !
    </el-button>
  </div>
</div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.code-path {
  width: 100%;
  max-height: 55%;
  overflow-y: auto;
}

.exclude-words {
  max-height: 25%;
}

.card-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.count-container {
  display: flex;
  height: 20%;
  justify-content: space-around;
}
</style>