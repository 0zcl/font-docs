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

深入：https://juejin.cn/post/6844904008432222215#heading-7
https://zhuanlan.zhihu.com/p/138446061