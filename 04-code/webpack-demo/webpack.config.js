const path = require('path')
// 生成html在dist目录下
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清理 dist 目录  参考 https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  // mode 选项  打包的模式
  // development  开发模式的打包 特点：不压缩，打包速度更快。
  // production 生产（线上运行）模式的打包  特点：进行压缩，打包速度慢一些。
  // 默认 production 模式。
  mode: 'development',

  // 插件配置
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 生成后的HTML的title  生成全新HTML页面
      // title: 'Output Management'
      // 以index.html做为模版 在dist下生成index.html
      template: './index.html'
    })
  ],

  // 入口  默认加载 ./src/index.js
  entry: './src/index.js',
  // 出口
  output: {
    // 打包结果的输出路径  文件夹默认生成文件夹 dist
    // 必须是绝对路径
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  },

  // 加载器配置
  module: {
    // 加载规则
    rules: [
      {
        // 加载后缀名.css文件
        test: /\.css$/,
        // loader 加载器，解析器
        // 执行按照 从下往上执行
        // css-loader加载了css代码，style-loader 把加载代码追加到style标签上预览
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 加载后缀名.less文件
        // less-loader  解析less成css  依赖less核心包
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 加载后缀名 png|svg|jpg|gif|jpeg 文件
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        // 加载后缀名 woff|woff2|eot|ttf|otf 文件
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        // 解析ES6语法 为ES5语法
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}