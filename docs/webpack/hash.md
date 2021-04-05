## 什么是文件指纹
* 打包后输出文件名的后缀
* 通常用于版本管理
* hash一般是结合CDN缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从源服务器上拉取对应数据，进而更新本地缓存

## 文件指纹如何生成
* Hash：和整个项目的构建相关，webpack打包阶段会生成Compiler，Compilation。webpack启动那一次，会生成Compiler（初始化一次）。但是每一次只要项目文件有修改，，Compilation都会发生变化。Compilation变换就会影响Hash的变换，整个项目构建的 hash 值就会更改。如果css/js都是使用hash作为文件指纹的话，那么某一个js或者css发生改变，所有打包出来的css/js指纹都会变化。不利于缓存
* Chunkhash：采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即chunkhash,chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响
* Contenthash：根据文件内容来定义 hash ，文件内容不变，则 contenthash 不变。某个页面既有js资源，又有css资源。如果css资源也使用Chunkhash。如果修改了js。由于css资源使用了Chunkhash，就会导致css内容没有变化，发布上线的文件却发生了变化。因此，通常对css资源使用Contenthash。这个时候可以使用mini-css-extract-plugin里的contenthash值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建

## JS 的文件指纹设置
设置 output 的 filename，使用 [chunkhash]，或[contenthash]
```javascript
module.exports = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
    }
};
```
## CSS 的文件指纹设置
设置 MiniCssExtractPlugin 的 filename，使用 [contenthash]
MiniCssExtractPlugin：将css资源提取到一个独立的文件。
```javascript
module.exports = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name][contenthash:8].css`
        }),
    ]
};
```
## 图片，字体文件的文件指纹设置
设置 file-loader（或url-loader） 的 name，使用 [hash]

| 占位符名称 | 含义 |
|  ----  | ----  |
| [ext]	| 资源后缀名
| [name] | 文件名称
| [path] | 文件的相对路径
| [floder] | 文件所在文件夹
| [contenthash] | 文件的内容hash，默认是md5生成
| [hash] | 文件内容hash，默认是md5生成。图片的hash和css/js资源的hash概念不一样，图片的hash是由图片内容决定的
| [emoji] | 一个随机的指代文件内容的emoji

注意：图片，字体文件的hash和css/js资源的hash概念不一样，图片，字体文件的hash是由内容决定的

```javascript
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name][hash:8].[ext] '
                    }
                }]
            }
        ]
    }
};
```
## Webpack 具体配置信息
```javascript
module.exports = {
    entry: {
        index: './test/test.js',
        about: './test/about.js'
    },
    output: {
        //打包文件名称  chunkhash:8设置js资源的文件指纹
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    // 设置图片资源的文件指纹 使用hash
                    name: '[name].[ext]?[hash]',
                    outputPath: 'static/img/',
                    publicPath: '/dist/static/img/'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,//解析字体
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',//设置字体资源的文件指纹 使用hash
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // 将css资源提取到一个独立的文件
            // 设置css资源的文件指纹 用contenthash
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].css'
        }),
    ]
}
```

## 通常的文件缓存策略
* html: header 头的 cache-control 会设置成 no-cache。也就是 html 文件不会走缓存
* css/js/img 等静态资源：header头的 cache-control 设置成强缓存，缓存时间通常是1年的样子。通过文件指纹控制缓存是否失效，文件指纹一变，请求就不会走旧文件了

 ## 面试
 问：文件指纹是什么？怎么用？

 答：文件指纹是 打包后输出文件名的后缀。文件指纹的生成 有hash、chunkhash、contenthash三种方式。hash和整个项目的构建有关，只要项目文件有修改，hash值就会更改；chunkhash根据不同的入口文件【entry】进行依赖文件解析，构建对应的chunk，生成对应的哈希值，不同的entry会生成不同的chunkhash, entry入口依赖的文件有个性，则chunkhash也会更改；contenthash 文件内容不变，contenthash不变。

#### 实际应用上 
chunkhash: 生产环境里把公共库和程序入口文件 区分开，单独打包构建，使用chunkhash来生成公共库的文件指纹。只要我们不改动公共库的代码，就可以保证其文件指纹不会受影响
```javasciprt
  output: {
    filename: "[name][chunkhash:8].js",    // JS 指纹设置，设置 output 的 filename，用 chunkhash
    path: __dirname + '/dist'
  },
```
contenthash: 通常对css资源使用contenthash，可以使用mini-css-extract-plugin单独抽取的CSS文件，设置filename使用contenthash，那么只要css文件内容不变，那么不会重复构建
```javascript
new MiniCssExtracPlugin({
  filename: "[name][contenthash:8].css",// css 指纹设置, 设置 MiniCssExtracPlugin 的 filename，用contenthash
})
```
在使用图片，字体文件的hash和css/js资源的hash概念不一样，图片，字体文件的hash是由内容决定的。只要图片，字体不变，那么其文件指纹也不变
```javascript
rules: [
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: 'img/[name][hash:8].[ext] '
            }
        }]
    }
]
```