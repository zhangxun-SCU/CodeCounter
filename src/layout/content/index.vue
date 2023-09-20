<script setup lang="ts">
import { useIpcRenderer } from "@vueuse/electron"
const ipcRender = useIpcRenderer()
function send() {
  ipcRender.send("submit", "打开资源管理器")
  ipcRender.on("reply", (event, arg) => {
    if (!arg.canceled) {
      (document.getElementById("message") as HTMLElement).innerHTML = arg.filePaths[0];
    }
    console.log(arg)
  });
}
</script>

<template>
  <div class="container">
    <el-button @click="send">选择文件夹</el-button>
    <span id="message"></span>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 80vh;
  background-color: darkgray;
}
</style>