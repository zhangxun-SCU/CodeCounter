<script setup lang="ts">
import {onMounted} from "vue";
import {useSettingStore} from "@/stores/setting.ts";
const settingStore = useSettingStore();
onMounted(async () => {
  let settings = await import("@/setting.json");
  settingStore.languages = settings.languageSet;
  console.log(settingStore)
})
</script>

<template>
  <router-view>
  </router-view>
</template>

<style scoped>

</style>
