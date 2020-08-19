# Vuepress Plugin Beautiful Bar

## Documentations Here

[Github](http://xiaminghu.github.io/project/nodejs/vuepress-plugin-beautiful-bar/)
[Gitee](http://xiaminghu.gitee.io/project/nodejs/vuepress-plugin-beautiful-bar/)

## Usage

> Suppose our file structure is as follows

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

> All you need to do is to config `themeConfig.nav` at `.vuepress/config.js`, and add `beautiful-bar` into `plugins`

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

> and `beautifulBar` will generate corresponding sidebar for you automatically

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

> in most cases you don't need to edit those configs in `config.js`,
> but if there's some bug with these functions and I'm not able to update the package timely,
> it would be a good choice to modify those functions.

`Github` and `Gitee` has some error parsing the following table when I use a symbol `|` in this way: `/img|image|src/g`,
while `npm` and `vuepress` have no such problem. In order to display it correctly in `Github` and `Gitee`,
I need to escape the `|` with `\`, which may look strange in `Npm` and `Vuepress`. If so, please just ignore it.

|      key      |                        default                         |                                    description                                     |
| :-----------: | :----------------------------------------------------: | :--------------------------------------------------------------------------------: |
|    exclude    |                   `/img\|image\|src/g`                   |                           RegExp of excluded directories                           |
|  readmeFirst  |                         `true`                         |                       place README.md at the top of sidebar                        |
|  pathHandler  |            `(fp) => fp.replace(/\\/g, '/')`            |                            function to handle with path                            |
| navLinkFilter | `(link) => link.startsWith('/') && link.endsWith('/')` | function makes sure nav link does not refer to a markdown file or an external link |
