import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     key: './whatsapp-clone-app-privateKey.key',
  //     cert: './whatsapp-clone-app.crt'
  //   },
  //   host: '0.0.0.0',
  // }
})
