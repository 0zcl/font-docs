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
        text: 'Vue',
        items: [
          {
            text: '响应式',
            link: '/vue/reactive/'
          },
          {
            text: '模版编译',
            link: '/vue/compiler/'
          },
          {
            text: '虚拟DOM',
            link: '/vue/vnode/'
          },
          {
            text: '整体流程',
            link: '/vue/whole-process/'
          }
        ]
      },
      {
        text: '移动端',
        link: '/mobile/'
      },
      {
        text: '算法与数据结构',
        link: '/code-reviews/'
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
            'evenLoop',
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
            ['interview', '面试']
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
            'iso',
            ['cache', '浏览器缓存'],
            ['composite', '层合成'],
            ['url', 'URL输入到返回请求的过程'],
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
      '/vue/reactive/': [
        {
          title: '响应式',
          collapsable: false,
          children: [
            {
              title: '响应式',
              path: '/vue/reactive/'
            }
          ]
        }
      ],
      '/vue/compiler/': [
        {
          title: '模版编译',
          collapsable: false,
          children: [
            {
              title: '模版编译',
              path: '/vue/compiler/'
            }
          ]
        }
      ],
      '/vue/vnode/': [
        {
          title: '虚拟DOM',
          collapsable: false,
          children: [
            {
              title: '虚拟DOM',
              path: '/vue/vnode/'
            }
          ]
        }
      ],
      '/vue/whole-process/': [
        {
          title: '整体流程',
          collapsable: false,
          children: [
            {
              title: '整体流程',
              path: '/vue/whole-process/'
            }
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