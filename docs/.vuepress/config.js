module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    repo: 'http://gitlab.61info.com/i61/front-end-docs',
    editLinks: true,
    sidebar: 'auto',
    sidebarDepth: 2,
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '算法与数据结构',
        items: [
          { 
            text: '算法',
            items: [
              { text: '命名规范', link: '/code-reviews/algorithm/' },
            ]
          },
          { 
            text: '数据结构',
            items: [
              { text: '命名规范', link: '/code-reviews/data-structure/' },
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}