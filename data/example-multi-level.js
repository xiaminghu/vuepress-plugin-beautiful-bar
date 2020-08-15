module.exports = {
  nav: [{ text: 'NodeJS', link: '/nodejs/' }],
  sidebar: {
    '/nodejs/': [
      '',
      {
        title: 'vue',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          'vue/',
          { title: 'vuepress', collapsable: true, sidebarDepth: 2, children: ['vue/vuepress/'] },
        ],
      },
    ],
  },
}
