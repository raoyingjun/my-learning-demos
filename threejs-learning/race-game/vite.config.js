import {defineConfig} from "vite";

export default defineConfig({
    build:{
        target: 'esnext',
        rollupOptions:{
            output:{
                manualChunks: {
                    'three': ['three']
                }
            }
        }
    },
})