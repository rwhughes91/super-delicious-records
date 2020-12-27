module.exports = {
  webpack: function (cfg) {
    const originalEntry = cfg.entry
    cfg.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js'] && !entries['main.js'].includes('./src/client/polyfills.ts')) {
        entries['main.js'].unshift('./src/client/polyfills.ts')
      }

      return entries
    }

    return cfg
  },
}
