const path = require('path')

module.exports = {
  title: '前端小册',
  description: 'Just playing around',
  themeConfig: {
    repo: 'https://github.com/0zcl',
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
        text: '基础',
        link: '/basic/'
      },
      {
        text: 'css',
        link: '/css/'
      },
      {
        text: 'HTTP与浏览器原理',
        link: '/http&browser/'
      },
      {
        text: 'nodejs',
        link: '/nodejs/'
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
        text: '移动端',
        link: '/mobile/'
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
      },
      {
        text: '工具',
        items: [
          { 
            text: '公共函数库',
            target:'_blank',
            link: 'https://0zcl.github.io/utils-library/'
          },
          { 
            text: 'h5-sdk',
            target:'_blank',
            link: 'https://0zcl.github.io/h5-sdk/'
          },
          { 
            text: '移动端多页面模版',
            target:'_blank',
            link: 'https://github.com/0zcl/h5_template'
          },
          { 
            text: 'zcl脚手架',
            target:'_blank',
            link: 'http://gitlab.61info.com:8190/zcl/tpc-cli'
          }
        ]
      }
    ],
    sidebar: {
      '/basic/': [
        {
          title: '基础知识',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['', '模块化'],
            'moduleCircle',
            ['RegExp', '正则匹配'],
            '0.1+0.2',
            ['interview', '面试']
          ]
        }
      ],
      '/css/': [
        {
          title: 'CSS高频面试题',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['', '盒子模型'],
            ['center', '水平垂直居中'],
            ['triangle', '画三角形'],
            'bfc',
            ['layout', '三栏布局'],
            'interview'
          ]
        }
      ],
      '/http&browser/': [
        {
          title: 'HTTP与浏览器原理',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['', 'JSONP'],
            ['url', 'url输入到返回请求的过程'],
            'interview'
          ]
        }
      ],
      '/nodejs/': [
        {
          title: 'Nodejs',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['', '基础']
          ]
        }
      ],
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
            'module_chunk_bundle',
            'hash',
            'postcss',
            ['__webpack_require__', 'webpack 模块加载原理'],
            'lazy-load'
          ]
        }
      ],
      '/mobile/': [
        {
          title: '移动端',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['', 'rem原理'],
            ['adaptation', '移动端适配']
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
    ["md-enhance", {
      sub: true,
      sup: true,
    }],
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}