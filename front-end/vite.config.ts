import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const pocketbase_url = "http://localhost:8090"; // localhost-to-localhost

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			// proxy "/api" and "/_" to pocketbase_url
			"/api": pocketbase_url,
			"/_": pocketbase_url,
		},
	},
});
