if (ENV.isDev) {
   require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
}

export default (scene, debug) => {
   if (ENV.isDev && debug) {
       scene.addIndicators()
   }
}