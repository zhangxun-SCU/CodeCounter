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
<div class="flex w-full justify-between items-center px-4 drag">
  <div class="title">
    <CodeCounterLogo size="40px"/>
  </div>
  <div class="winSetter flex justify-between h-4 w-1/12 right-1.5">
    <svg class="noDrag hover:bg-teal-200 hover:shadow-teal-100" aria-hidden="true" @click="setWin('miniWin')">
      <use xlink:href="#icon-zuixiaohua" class="text-xs"></use>
    </svg>
    <svg class="noDrag hover:bg-teal-200 hover:shadow-teal-100" aria-hidden="true" @click="setWin('maxiWin')">
      <use xlink:href="#icon-zuidahua" class="text-xs"></use>
    </svg>
    <svg class="noDrag hover:bg-teal-200 hover:shadow-teal-100" aria-hidden="true" @click="setWin('closeWin')">
      <use xlink:href="#icon-guanbi" class="text-xs"></use>
    </svg>
  </div>
</div>
</template>

<style scoped>
.drag {
  -webkit-app-region: drag;
}

.noDrag {
  -webkit-app-region: no-drag !important;
}


</style>