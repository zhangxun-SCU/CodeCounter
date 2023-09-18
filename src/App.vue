<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ipcRenderer} from 'electron'
// window.ipcRenderer = ipcRenderer
//
// // import { app , shell } from 'electron'
// // shell.openPath(`${app.getAppPath()}`)
//
function submit() {
  ipcRenderer.send("submit", "打开资源管理器")
}

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <button @click="submit">test open file</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
