<script setup lang="ts">
import { useIpcRenderer } from "@vueuse/electron";
import {ref, reactive, nextTick} from 'vue';
import { useRouter } from 'vue-router'
import {useSettingStore} from '@/stores/setting.ts'
const router = useRouter();
const ipcRender = useIpcRenderer();
const settings = useSettingStore();
function send() {
  ipcRender.send("openExplorer", "打开资源管理器");
}
ipcRender.on("returnPath", (event, arg) => {
  // console.log(event);
  if (!arg.canceled) {
    // console.log(arg);
    paths.push(arg.filePaths[0]);
  }
});
//   选择的路径
const paths:string[] = reactive([]);

import { ElInput } from 'element-plus'
const inputValue = ref('')
const dynamicTags = ref(['lib', 'node_modules', '.git', '.idea'])
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

let loading = ref(false);
const sendCountInfo = (filePaths: string[], excludeKeys: string[]) => {
  console.log(period.value, selectedLanguages.value);
  ipcRender.send("countInfo", JSON.stringify({
    paths:filePaths,
    excludeKeys: excludeKeys,
    period: period.value,
    languages: selectedLanguages.value
  }));
  loading.value = true;
}

console.log(settings.languages)

const period = ref('');

const selectedLanguages = ref([]);

ipcRender.on("countRes", (event, args)=>{
  router.push({
    path: '/result',
    name: 'countAmount',
    query: {
      data: args.language
    },
  });
  console.log("res", args.language);
  loading.value = false;
})

ipcRender.on('debugTest', (event, args) => {
  console.log('debugTest', args)
})

</script>

<template>
<div class="container">
  <div>
    <el-select
        v-model="selectedLanguages"
        multiple
        collapse-tags
        collapse-tags-tooltip
        filterable
        :max-collapse-tags="3"
        placeholder="选择语言"
        style="width: 40%"
    >
      <el-option
          v-for="(item, key) of settings.languages"
          :key="key"
          :label="item.name"
          :value="item.name"
      />
    </el-select>
    <el-date-picker
        v-model="period"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="截至时间"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="A hh:mm:ss"
        :teleported="false"
        style="width: 40%"
    />
  </div>
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
    <el-button
        type="success"
        style="height: 14vmin; width: 14vmin; border-radius: 7vmin;"
        @click="sendCountInfo(paths, dynamicTags)"
        v-loading.fullscreen.lock="loading"
    >
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