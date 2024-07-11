import * as esbuild from 'esbuild';
import {sassPlugin} from 'esbuild-sass-plugin';


// sass build
await esbuild.build({
  entryPoints: ['./src/scss/scss.js'],
  bundle: true,
  outdir: '../static/css',
  plugins: [sassPlugin()]
})