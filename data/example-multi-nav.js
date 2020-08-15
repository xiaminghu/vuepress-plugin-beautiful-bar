module.exports = {
  nav: [
    { text: 'demo', link: '/demo' },
    {
      text: 'Platform',
      items: [
        { text: 'win', link: '/platform/win/' },
        { text: 'mac', link: '/platform/mac/' },
        { text: 'linux', link: '/platform/linux/' },
      ],
    },
  ],
  sidebar: {
    '/platform/linux/': [''],
    '/platform/mac/': [''],
    '/platform/win/': [''],
  }
}
