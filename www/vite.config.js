import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import {
  join
} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), legacy({
    targets:  [
      "last 1 version",
      "> 1%",
      "IE 10"
    ]
  })],
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
})