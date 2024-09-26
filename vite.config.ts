import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			devOptions: {
				enabled: true
			},
			manifest: {
				name: 'Jueguito de gato',
				short_name: 'Gato',
				start_url: './index.html',
				lang: 'es-MX',
				scope: '.',
				display: 'standalone',
				background_color: '#71717a',
				theme_color: '#14b8a6',
				description: 'Juego sencillo de gato',
				icons: [
					{
						src: './img/icon.png',
						type: 'image/png',
						sizes: '144x144'
					}
				]
			}
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
