# Vuepress Plugin Beautify Bar

## Documentations Here

[Github](http://xiaminghu.github.io/project/nodejs/vuepress-plugin-beautiful-bar/)
[Gitee](http://xiaminghu.gitee.io/project/nodejs/vuepress-plugin-beautiful-bar/)

## Usage

> 假设文件结构如下

```shell
tree docs

docs
├── demo.md
├── nodejs
│   ├── README.md
│   └── vue
│       ├── README.md
│       └── vuepress
│           └── README.md
└── README.md
```

> 你只需要在 config.js 中配置好你的 themeConfig.nav，并将 beautiful-bar 添加到插件列表

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'demo', link: '/demo'},
      {
        text: 'contact',
        items: [
          { text: 'Github', link: 'https://github.com/xiaminghu/vuepress-plugin-beautiful-bar' }
          { text: 'Gitee', link: 'https://gitee.com/xiaminghu/vuepress-plugin-beautiful-bar' }
          { text: 'Npm', link: 'https://www.npmjs.com/package/vuepress-plugin-beautiful-bar' }
        ]
      }
      {
        text: 'NodeJS',
        items: [
          { text: 'vue', link: '/platform/vue/' },
        ]
      }
    ]
  },
  plugins: [
    'beautiful-bar'
  ]
}
```

> beautifulBar 将会为你自动生成其相对应的 sidebar

```json
{
  "/nodejs/": [
    "",
    {
      "title": "vue",
      "collapsable": true,
      "sidebarDepth": 2,
      "children": [
        "vue/",
        {
          "title": "vuepress",
          "collapsable": true,
          "sidebarDepth": 2,
          "children": ["vue/vuepress/"]
        }
      ]
    }
  ]
}
```

## Options

> 大多数情况下你不需要去 `config.js` 编辑下面的配置，
> 但是如果当前版本的以下函数有一些 bug 而我没能来得及及时更新
> 你可以尝试修改下面的函数来临时修复这些 bug

`Github` 和 `Gitee` 在解析下面的表格中的 `|` 的时候会有问题，需要进行转义，但是 `Npm` 能够正常解析，
为了能够正常显示，这里需要对其进行转义，如果 `Npm` 转义后出现了问题的话，请忽视中间的 `\` 转义符号

|      key      |                        default                         |                        description                         |
| :-----------: | :----------------------------------------------------: | :--------------------------------------------------------: |
|    exclude    |                  `/img\|image\|src/g`                  |                用来排除部分文件夹的 JS 正则                |
|  readmeFirst  |                         `true`                         |             是否将 README 文件放在侧边栏的顶部             |
|  pathHandler  |            `(fp) => fp.replace(/\\/g, '/')`            | 用来处理路径的函数，目前只是为了替换 windows 的 `\` 为 `/` |
| navLinkFilter | `(link) => link.startsWith('/') && link.endsWith('/')` |   用来确保 nav link 不是指向一个 markdown 或 外链 的函数   |
