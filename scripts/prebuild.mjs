import setupPdfjsAssets from './setup-pdfjs-assets.mjs'

async function prebuild() {
  await setupPdfjsAssets()
}

prebuild()
