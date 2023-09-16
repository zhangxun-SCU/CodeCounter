import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElectronDevPlugin } from "./plugins/vite.electron.dev";
import {ElectronBuildPlugin} from "./plugins/vite.electron.build";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      ElectronDevPlugin(),
      ElectronBuildPlugin(),
  ],
    base: './', // 默认是绝对路径改为相对路径
    resolve: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
})
