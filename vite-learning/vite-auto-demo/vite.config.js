// Vite 配置文件，通过配置文件精细化控制 Vite 行为
import { defineConfig } from "vite"
// 通过 legacy 为指定旧版浏览器提供支持
import legacy from "@vitejs/plugin-legacy"
// 不使用 defineConfig 函数包装的配置项不带 TypeScript 类型推断
// export default {/* 配置项 */}
// 使用 defineConfig 函数包装的配置项带 TypeScript 类型推断
// export default defineConfig({/* 配置项 */})

export default defineConfig({
    // 使用插件
    plugins: [
        legacy({
            // 支持的浏览器范围
            targets: ['defaults', "ie >= 8"]
        })
    ]
})