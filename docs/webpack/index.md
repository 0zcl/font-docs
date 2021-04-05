## 解析CSS
```javascript
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader 运行顺序为从右到左或者从下到上
        use: [
          "style-loader",  // 将样式通过 style 标签插入到 head 中
          "css-loader"     // 加载 css 文件，转化为 commonjs 对象
          "less-loader"    // 转换 less 文件为 css 文件
        ]
      }
    ]
  }
}
```

## 热更新原理（简述）

你编译出的bundle.js文件包含两个部分：hmr runtime和你的js代码。而webpack的dev server中包含一个hmr server，它能够和浏览器中的bundle.js建立websocket连接，当你的js代码发生变化，hmr server会建立一个说明变化内容的json发送到浏览器端的hmr runtime，runtime接收到变化会主动去更新你的js代码，你的页面也就发生变化了
![webpack热更新](@assets/webpack/4.png)

* 初始化阶段：1、2、A、B
* 更新阶段：1、2、3、4、5

深入：https://juejin.cn/post/6844904008432222215#heading-7
https://zhuanlan.zhihu.com/p/138446061

## 代码压缩(webpack5)
* css：[CssMinimizerWebpackPlugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)
* js: [TerserWebpackPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/) webpack5自带最新版的terser-webpack-plugin插件
```javascript
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(),
      new CssMinimizerPlugin(),
    ]
  }
```

## 自动清理构建目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

## 资源内联
资源内联（inline resource），就是将一个资源以内联的方式嵌入进另一个资源里面。

CSS 内联的思路是：
* 先将 css 提取打包成一个独立的 css 文件（使用MiniCssExtractPlugin.loader）
* 然后读取提取出的 css 内容注入到页面的 style 里面去。这个过程在构建阶段完成

如：CSS 内联图片: 通常将小图片通过 base64 的方式内嵌进 CSS 里面
```css
.search {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJ0lEQVQ4T6XSsUoEMRAG4H/ClZaLmbSW1pZ6+gAnFrK+gZXoK6jvIILgE6gIcnYWgmJno6AgYp1Z2EcIGQnsHbuaQ9abMkO+TGaGMGfQnPfxC3DOrajqPoB1AArgnohOvffPucc6ADMfAjgCUMYYH9MFY8wagEsAxyKScp2YAtbaERGNRST7LWZWVd2squq2LbSBMyK6E5GrXKnW2i1jzMh7v5sFmPkzhDCs69rngKIo3GAweBKRpVnAVwhh9Q/gRUQWs4Bz7jzGeFNV1ThXATOXAA5EJDV1Gr2aSETb3vvrLJAOmTmNKY2yVNUHVSVjzBDABYA3ADsi8j4TSIlmkfYAbABYUNUPACdE9NpAHaTXKjPz8k+kF9B8s4P0BibIpBf/AtpN/AYx54AR58WxmQAAAABJRU5ErkJggg==) no-repeat;
}
```
* HTML 和 JS 内联
* HTML 和 CSS 内联：[html-inline-css-webpack-plugin](https://github.com/Runjuu/html-inline-css-webpack-plugin#readme)
![css-inline](@assets/webpack/9.png)
* 图片、字体内联：url-loader。limit属性


## 面试
问：说说less-loader、css-loader、style-loader的作用

答：
style-loader：插入样式是一个动态的过程，你可以直接查看打包后的 html 源码并不会看到 html 有 style 样式的。style-loader 是webpack运行时动态的创建 style 标签，然后将 css style 插入到 style 标签里面去，对应的源码：https://github.com/webpack-contrib/style-loader/blob/master/src/runtime/injectStylesIntoStyleTag.js#L260

css-loader：将 css 转换成 commonjs 对象，也就是样式代码会被放到 js 里面去了。

