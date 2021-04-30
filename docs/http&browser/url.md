## 说一下从url输入到返回请求的过程

## url解析
url为什么需要解析？url编码方式？encodeURIComponent比encodeURI区别？

## dns解析
说说DNS解析流程？html如何做dns优化？


chrome://net-internals/ 的一些功能已经在Chrome 71之后被移除了。
chrome://net-internals/#dns 标签页下现在看不到浏览器缓存的DNS记录。但清除缓存按钮(clear host cache)还是正常工作的

### dns解析过程
以访问百度为例：
1. 在浏览器中输入www.baidu.com之后，系统会检查本地hosts文件是否存在域名映射，如果存在，则域名解析到此完成，我们在本地开发时经常就是这么做的。
2. 如果本地hosts文件不存在映射关系，则会查询本地DNS缓存，如果存在，则域名解析完成。
3. 如果本地DNS缓存没有命中，则查找本地DNS服务器，如果存在，则域名到此解析完成。
4. 如果本地DNS服务器已缓存了此域名映射关系，则返回此映射，完成域名解析。
5. 如果以上解析都失败了，本地DNS服务器会把请求发至 根DNS服务器，根DNS服务器收到请求后会返回一个负责该顶级域名服务器的IP。本地DNS服务器收到IP后，将会请求这个IP对应的服务器，就这样逐层查找，直至找到baidu.com主机

## 预解析的实现：
1. 用meta信息来告知浏览器, 当前页面要做DNS预解析:
```<meta http-equiv="x-dns-prefetch-control" content="on" />```
2. 在页面header中使用link标签来强制对DNS预解析: 
```<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />```


## 说说三次握手
说说三次握手？为啥两次不行？


## OSI模型
从网卡把数据包传输出去到服务器发生了什么？


## 缓存
3次握手之后接着说道，建立完链接，就该请求html文件了，如果html文件在缓存里面浏览器直接返回，如果没有，就去服务器拿

说说你对缓存的理解？什么是from disk cache和from memory cache ？什么时候会触发？

什么是启发式缓存？在什么条件下触发？


## 解析html
获取html之后，会解析html。说说这个过程？


## 页面渲染优化
说说 页面渲染的优化方法？

## 性能指标
如何诊断页面渲染时各个性能指标？


https://juejin.cn/post/6928677404332425223
https://www.zhihu.com/question/19721279/answer/677855112
