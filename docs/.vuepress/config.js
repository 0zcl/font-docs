const path = require('path')

module.exports = {
  title: '前端小册',
  description: 'Just playing around',
  themeConfig: {
    repo: 'http://gitlab.61info.com/i61/front-end-docs',
    // editLinks: true,
    // sidebarDepth: 4,
    displayAllHeaders: true,
    // activeHeaderLinks: true,
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
        text: 'webpack',
        link: '/webpack/'
      },
      {
        text: '算法与数据结构',
        link: '/code-reviews/'
        // items: [
        //   { 
        //     text: '算法',
        //     items: [
        //       { text: '递归与回溯', link: '/code-reviews/algorithm/' },
        //       { text: '二叉树基础', link: '/code-reviews/algorithm/binaryTree' },
        //     ]
        //   },
        //   { 
        //     text: '数据结构',
        //     items: [
        //       { text: '命名规范', link: '/code-reviews/data-structure/' },
        //     ]
        //   }
        // ]
      }
    ],
    sidebar: {
      '/babel/': [
        {
          title: 'Babel',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['', 'Introduction'],
            'Babel_VS_Ts'
          ]
        }
      ],
      '/webpack/': [
        {
          title: 'webpack',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['', '基础用法'],
            'module_chunk_bundle'
          ]
        }
      ],
      '/code-reviews/': [
        {
          title: '算法',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['', 'Introduction'],
            'binaryTree'
          ]
        }
      ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'public/assets')
      }
    }
  },
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}