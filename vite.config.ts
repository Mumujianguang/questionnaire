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
            '/sdcue': {
                target: 'https://hgzx.cdjxpt.com/',
                changeOrigin: true,
                headers: {
                    Cookie: 'locale=zh_CN; org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=zh_CN; X-Request-Auth=188d3406efe9f3b9d9cb543f56fc8d10476c7b3b57ad269b',
                    Csrfvarzhysefonsoft: '35bf9c94bdf0851f3b8fe8f61dc0ff8ed63041e9'
                }
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
