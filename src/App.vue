<script setup lang="ts">
import {onMounted} from "vue";
import {useSettingStore} from "@/stores/setting.ts";
const settingStore = useSettingStore();
onMounted(async () => {
  let settings = await import("@/setting.json");
  settingStore.languages.push(...settings.languageSet);
  console.log(settings)
})
</script>

<template>
  <router-view>
  </router-view>
</template>

<style scoped>

</style>