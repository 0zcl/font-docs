module.exports = {
  title: '前端小册',
  description: 'Just playing around',
  themeConfig: {
    repo: 'http://gitlab.61info.com/i61/front-end-docs',
    editLinks: true,
    sidebarDepth: 3,
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'babel',
        link: '/babel/'
      },
      {
        text: '算法与数据结构',
        items: [
          { 
            text: '算法',
            items: [
              { text: '递归与回溯', link: '/code-reviews/algorithm/' },
              { text: '二叉树基础', link: '/code-reviews/algorithm/binaryTree' },
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
    ],
    sidebar: [
      {
        title: 'babel',
        path: '/babel/',
      },
      {
        title: '算法与数据结构',
        path: '/code-reviews/',
        collapsable: true,
        sidebarDepth: 3,
        children: [
          {
            title: '算法',
            path: '/code-reviews/algorithm/',
            children: [
              { title: '递归与回溯', path: '/code-reviews/algorithm/' },
              { title: '二叉树基础', path: '/code-reviews/algorithm/binaryTree' },
            ]
          },
          {
            title: '数据结构',
            path: '/code-reviews/data-structure/'
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