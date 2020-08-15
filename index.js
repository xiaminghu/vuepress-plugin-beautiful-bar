const beautifulBar = require('./lib/utils')

/**
 *
 * @param {Object} options is user custom options set in siteConfig.plugins
 * @param {Obejct} ctx is context sent by vuepress project
 */
module.exports = (options, ctx) => ({
  async ready() {
    return beautifulBar(options, ctx)
  },
})
