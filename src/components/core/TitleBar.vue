<script setup lang="ts">
import { useIpcRenderer } from "@vueuse/electron";
const ipcRender = useIpcRenderer();
import {ref} from "vue";
import CodeCounterLogo from "@/components/core/CodeCounterLogo.vue";

let isWindowMax = ref(false);
// 最小化最大化窗口
function setWin(operate: string):void {
  if(operate === 'maxiWin') {
    if(isWindowMax.value) operate = 'windowedWin';
    isWindowMax.value = !isWindowMax.value;
  }
  ipcRender.send(operate);
}

</script>

<template>
<div class="container">
  <div class="title">
    <CodeCounterLogo size="40px"/>
  </div>
  <div class="winSetter">
    <svg class="icon noDrag" aria-hidden="true" @click="setWin('miniWin')">
      <use xlink:href="#icon-zuixiaohua"></use>
    </svg>
    <svg class="icon noDrag" aria-hidden="true" @click="setWin('maxiWin')">
      <use xlink:href="#icon-zuidahua"></use>
    </svg>
    <svg class="icon noDrag" aria-hidden="true" @click="setWin('closeWin')">
      <use xlink:href="#icon-guanbi"></use>
    </svg>
  </div>
</div>
</template>

<style scoped>
.container {
  position: relative;
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
}

.noDrag {
  -webkit-app-region: no-drag !important;
}

.winSetter {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 16vw;
  right: 3vw;
}

.icon {
  padding: 0 calc(20px - 0.5em);
  max-height: 40px;
}

.icon:hover {
  background-color: aqua;
}
</style>