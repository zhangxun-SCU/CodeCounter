<script setup lang="ts">
import { useIpcRenderer } from "@vueuse/electron"
const ipcRender = useIpcRenderer()

// 最小化最大化窗口
function toMin() {
  ipcRender.send("min-app")
  console.log("min")
  ipcRender.on("mini", () => {
    console.log("success")
  })
}

function toClose() {
  ipcRender.send("close-app")
}

function setWin(operate: string):void {
  ipcRender.send(operate)
}
</script>

<template>
<div class="container">
  <div class="title">CodeCounter</div>
  <button @click="toMin()" class="noDrag">最小化</button>
  <button @click="toClose()" class="noDrag">关闭</button>
</div>
</template>

<style scoped>
.container {
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  height: 5vh;
}

.noDrag {
  -webkit-app-region: no-drag !important;
}
</style>