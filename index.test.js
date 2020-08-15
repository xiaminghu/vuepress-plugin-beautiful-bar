const path = require('path')
const index = require('./index')

/**
 * A function wrapper for easier testing
 * @param {String} name is example's name
 * @param {String} description is the first parameter of jest `it` function
 * @param {Object} options is the user's config in siteconfig.plugins
 */
const test = (name, description, options = {}) => {
  it(description, async () => {
    const sourceDir = path.join(__dirname, 'docs', `example-${name}`)
    let example = require(path.join(__dirname, 'data', `example-${name}.js`))
    let ctx = { themeConfig: { 'nav': example.nav }, sourceDir }
    let sidebar = await index(options, ctx).ready()
    console.log(JSON.stringify(sidebar))
    // expect(sidebar).toEqual(example.sidebar)
  });
}

describe('beautifulBar', () => {
  // test('exclude', 'should not contain excluded directories')
  // test('multi-nav', 'should contain directories from different nav')
  // test('chinese', 'should run chinese case correctly')
  test('multi-level', 'should contain directories of different depth')
})
