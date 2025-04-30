import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// import sveltePreprocess from 'svelte-preprocess'; // No longer needed

export default defineConfig({
  plugins: [
    svelte()
    // svelte({
    //  preprocess: sveltePreprocess() // Remove preprocessor config
    // })
  ]
});
