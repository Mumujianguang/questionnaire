import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': {
            NODE_ENV: '"production"'
        }
    },
    build: {
        lib: {
            entry: './src/module/index.ts',
            name: 'ScoreApp',
            formats: ['umd'],
            fileName: (format) => `score-app.${format}.js`
        },
        cssCodeSplit: true
    }
})
