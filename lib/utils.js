const fs = require('fs')
const path = require('path')

/**
 * The following three functions are used to strip some patterns from a string which is just lick python String's methods
 * @param {String} string is a simple string
 * @param {String} pattern is the pattern that you want to strip from a string
 */
const lstrip = (string, pattern) =>
  string.slice(0, pattern.length) === pattern ? string.slice(pattern.length) : string
const rstrip = (string, pattern) =>
  string.slice(-pattern.length) === pattern ? string.slice(0, -pattern.length) : string
const strip = (string, pattern) => rstrip(lstrip(string, pattern), pattern)

const README = 'README'
const SUFFIX = '.md'
const DEFAULT_OPTIONS = {
  exclude: /img|image|src/g, // directories match this pattern would be exlucde when generating sidebar
  readmeFirst: true, // an option to decide whether to keep README at the top of sidebar
  pathHandler: (fp) => fp.replace(/\\/g, '/'), // replace windows '\' with '/'
  navLinkToPath: (link) => strip(link, '/'), // strip the '/' of a string at both side
  navLinkFilter: (link) => link.startsWith('/') && link.endsWith('/'), // decide whether this navLink Should be generated
}

/**
 * generate group for sidebar
 * @param {String} title is filename used for sidebar title
 * @param {Array} children is groups generated from subdirectories
 * @param {Boolean} collapsable determines whether sidebar is collapsable
 * @param {Number} sidebarDepth is levels of markdown title should be generated into sidebar
 */
const genGroup = (title = '', children = [], collapsable = true, sidebarDepth = 2) => ({
  title,
  collapsable,
  sidebarDepth,
  children,
})

function beautifulBar(options, ctx) {
  // here we override DEAULT_OPTIONS to receive user's options
  let opt = Object.assign({}, DEFAULT_OPTIONS, options)
  const { exclude, readmeFirst, pathHandler, navLinkToPath, navLinkFilter } = opt
  const { sourceDir, themeConfig } = ctx

  /**
   * a wrapper of makeSidebar function to provide some variable
   * @param {String} nav_abs_path is the absolute path of nav link
   */
  function makeSidebarWrapper(nav_abs_path) {
    /**
     * generate a sidebar recursively
     * @param {String} dir is current directory path
     */
    function makeSidebar(dir) {
      let children = []
      let names = fs.readdirSync(dir)
      for (let name of names) {
        let fp = path.join(dir, name)
        // notice that you should use lstat instead of stat to make sure the target is not a link
        let stats = fs.lstatSync(fp)
        // file that ends with '.md' suffix
        if (stats.isFile() && name.endsWith(SUFFIX)) {
          // we first consider the 'file' situation to make it clear that
          // our purpose is to add the file's relative path to 'current children'
          let relativePath = rstrip(pathHandler(path.relative(nav_abs_path, fp)), SUFFIX)
          // prepend README's relative path to make sure it keeps the first after remove 'README.md' SUFFIX
          if (relativePath.endsWith(README)) {
            // here we offer an option to place README at the top of the sidebar
            if (readmeFirst) {
              children.unshift(rstrip(relativePath, README))
            } else {
              children.push(rstrip(relativePath, README))
            }
          }
          // append other markdown files' relative path after remove '.md' SUFFIX
          else {
            children.push(relativePath)
          }
        }
        // directory which does not match exclude patterns
        else if (stats.isDirectory() && name.search(exclude) == -1) {
          // recursively
          temp = genGroup(name, makeSidebar(fp))
          children.push(temp)
        }
      }
      return children
    }
    return makeSidebar(nav_abs_path)
  }

  /**
   * yield parameter for makeSidebar function to generate sidebar
   * @param {Array} navs is a customized nav config in vuepress project
   */
  function* genNavPath(navs) {
    let queue = [...navs]
    while (queue.length) {
      let nav = queue.pop()
      if (nav.link && navLinkFilter(nav.link)) {
        yield nav.link
      } else if (nav.items instanceof Array) {
        for (each of nav.items) {
          queue.push(each)
        }
      }
    }
  }

  let sidebar = {}
  for (let nav_link of genNavPath(themeConfig.nav)) {
    // here we use a different name of nak_abs_path to avoid naming conflict
    let nav_link_absolute_path = path.join(sourceDir, navLinkToPath(nav_link))
    sidebar[nav_link] = makeSidebarWrapper(nav_link_absolute_path)
  }

  themeConfig.sidebar = sidebar
  // here we return this just for testing
  return sidebar
}

module.exports = beautifulBar
