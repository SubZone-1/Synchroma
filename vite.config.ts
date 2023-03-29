import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: false,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '../node_modules/realtime-bpm-analyzer/dist/realtime-bpm-processor.js*',
          dest: '.'
        }
      ]
    })
  ]
}
