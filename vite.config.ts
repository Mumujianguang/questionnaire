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
    server: {
        host: '0.0.0.0',
        port: 5773,
        proxy: {
            '/openapi': {
                target: 'http://10.1.80.43:18080/'
            }
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
