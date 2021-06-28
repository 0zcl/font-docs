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
        items: [
          {
            text: '基础',
            link: '/basic/basic/'
          },
          {
            text: '手写代码',
            link: '/basic/code_write/'
          }
        ]
      },
      {
        text: 'css',
        link: '/css/'
      },
      {
        text: '浏览器相关',
        // link: '/browser/browser/'
        items: [
          {
            text: '浏览器',
            link: '/browser/browser/'
          },
          {
            text: 'HTTP',
            link: '/browser/http/'
          },
          {
            text: '网络安全',
            link: '/browser/security/'
          }
        ]
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
      '/basic/basic/': [
        {
          title: '基础知识',
          collapsable: false,
          // sidebarDepth: 3,
          children: [
            {
              title: '基础知识',
              path: '/basic/basic/',
              children: [
                ['', '模块化'],
                'moduleCircle',
                ['RegExp', '正则匹配'],
                '0.1+0.2',
                'evenLoop',
                ['interview', '面试']
              ]
            }
          ]
        }
      ],
      '/basic/code_write/': [
        {
          title: '手写代码',
          collapsable: false,
          children: [
            {
              title: '手写代码',
              path: '/basic/code_write/',
              children: [
                ['', '手写类型转换'],
                ['new', '手写new'],
                ['copy', '手写深拷贝'],
                ['create', '手写Object.create'],
                ['inherit', '手写继承'],
                ['extends', '手写extends'],
                ['instanceof', '手写instanceof'],
                ['call&apply&bind', '手写call、apply、bind'],
                ['jsonp', '手写jsonp'],
                ['getQueryString', '手写getQueryString'],
                ['setInterval', '手写setInterval'],
                ['debounce&throttle', '手写防抖与节流'],
                ['for_of', '手写对象属性值迭代器'],
                ['event_delegation', '手写事件委托'],
                ['lazyLoad', '手写图片懒加载'],
                ['ajax', '手写原生Ajax请求'],
                ['aop', '手写AOP装饰函数'],
                ['curry', '手写柯里函数'],
                ['timeChunk', '手写分时函数'],
                ['flat', '手写数组扁平化flat'],
                ['repeat', '手写数组去重'],
                ['eventEmit', '手写eventEmit类'],
                ['reactive', '手写Vue数据响应式'],
                ['nextTick', '手写Vue nextTick'],
                ['promise', '手写Promise']
              ]
            }
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
      '/browser/browser/': [
        {
          title: '浏览器',
          collapsable: false,
          children: [
            ['', '浏览器'],
            ['jsonp', 'JSONP'],
            ['url', 'URL输入到返回请求的过程'],
            ['cache', '浏览器缓存'],
            ['composite', '层合成']
          ]
        }
      ],
      '/browser/http/': [
        {
          title: 'http',
          collapsable: false,
          children: [
            ['', '一个数据包在网络中的心路历程']
          ]
        }
      ],
      '/browser/security/': [
        {
          title: '网络安全',
          collapsable: false,
          children: [
            ['', '网络安全']
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
              path: '/vue/reactive/',
              children: [
                ['', 'MVVM概念'],
                'reactive',
                ['nextTick', 'nextTick原理'],
                ['watch', 'watch原理'],
                ['computed', 'computed原理'],
                ['interview', '面试']
              ]
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
              path: '/vue/compiler/',
              children: [
                '',
                ['slot', '插槽'],
                ['keep-alive', 'keep-alive']
              ]
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
              path: '/vue/vnode/',
              children: [
                '',
                ['diff', 'diff算法'],
                ['ssr', 'SSR']
              ]
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
              path: '/vue/whole-process/',
              children: [
                '',
                ['use', '插件注册'],
                ['mixin', '混入'],
                ['filter', '过滤器'],
                ['directive', '自定义指令']
              ]
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