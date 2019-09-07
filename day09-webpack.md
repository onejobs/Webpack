## DAY09-webpack基础

### 01-反馈

| 姓名 | 意见或建议                                                   |
| ---- | ------------------------------------------------------------ |
| ***  | 传值可以在讲一讲                                             |
| ***  | 叔叔,从今以后我只能称你为您了 因为,你在我心上                |
| ***  | 第一要有志，第二要有识，第三要有恒， 有志则断不甘为下流， 有识则知学问无尽，不敢以一得自足， 有恒则断无不成之事 ——曾国藩 |
| ***  | 选了5个D 哎 敲代码吧 还不知道什么意思,明白一点吧 在写写就乱了 就不懂 |
| ***  | 写不出来，太难了                                             |
| ***  | 心事浩茫连广宇，于无声处听惊雷                               |
| ***  | 周叔叔总是把错的单词写的这么熟练啊哈哈哈哈哈哈哈，简直太可爱了 难得写一次建议，就特别崇拜叔叔，太守时了，必须给您拍巴巴掌！还有今天的课我终于能听懂点了哈哈哈哈 |

- 父传子
  - 子组件使用 props 接收
- 子传父
  - 子组件使用$emit()触发事件提交数据
- 非父子
  - 利用公用的 事件总线eventBus 来绑定事件与触发事件，通过事件来传递数据
    - 接收数据  绑定事件   eventBus.$on()
    - 传递数据  触发事件   eventBus.$emit()



### 02-回顾

- 粉丝管理-基础布局

```html
<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- 标签页 tabs -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div class="fans_item">
              <el-avatar :size="80" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              <p>吃货哈哈</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">粉丝画像123</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list'
    }
  }
}
</script>

<style scoped lang='less'>
.fans_item{
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  padding-top: 10px;
  p{
    font-size: 12px;
  }
}
</style>

```



- 粉丝管理-粉丝列表

结构

```html
<el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <!-- id 默认是对象类型 使用了json-bigint  key需要字符串 数字类型 -->
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
           <!-- 分页 -->
          <el-pagination
          style="text-align:center"
          background layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
          hide-on-single-page
          ></el-pagination>
```

数据

```js
 reqParams: {
        page: 1,
        per_page: 24
      },
      fansList: [],
      total: 0
```

函数

```js
 changePager (newPage) {
      this.reqParams.page = newPage
      this.getFans()
    },
    async getFans () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    }
```

修改样式：

```css
display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
```



- 粉丝管理-粉丝画像（echarts使用）

  - 数据可视化图表（柱状图，饼状图，线形图，k线图，雷达图）

  - 底层实现：canvas h5提供绘图的技术   但是API使用非常繁琐。

  - 数据可视化插件：echarts 是百度开发一款插件。  highCharts 国外。

  - 官网 [https://www.echartsjs.com](https://www.echartsjs.com/)

  - 使用步骤：

    - 第一步：npm install echarts --save
    - 第二步：import echarts from 'echarts'
    - 第三步：准备一个具备高宽的DOM容器  

    ```html
    <div ref="bar" style="width: 600px;height:400px;"></div>
    ```

    - 第四步：初始化echarts实例

    ```js
    const dom = this.$refs.bar
    const myEcharts = echarts.init(dom)
    ```

    - 第五步：准备配置对象（参考示例）

    ```js
    const option = {}
    ```

    - 第六步：使用配置

    ```js
    myEcharts.setOption(option)
    ```

    - 如果需要自定义：参考 https://www.echartsjs.com/zh/option.html





### 03-模块化历程

起初，js没有模块化概念，导致出现一些问题：

- 容易造成变量污染
- 文件之间的依赖关系模糊

浏览器端模块化：异步模块化规范

- require.js 是AMD规范 （异步模块化规范）   依赖前置
- sea.js 说CMD规范（通过模块化规范 异步）  依赖就近

Nodejs模块化：同步模块化规范

- CommonJS规范
- 导出：module.exports
- 导入：require

ES6模块化：同步模块化规范

- 默认导出  export default
- 导入 import xxx from 'xxx'

在浏览器端无法使用，Es6的模块化，需要使用打包工具，将基于Es6的的模块打包在一起。



### 04-webpack-介绍

- 中文官网：http://www.webpackjs.com
- 官方网站：https://webpack.js.org

*本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。*

- webpack是基于Nodejs的命令行工具
- 默认的作用是打包JS模块资源
- 当然配置加载器后，可以打包所有类型的资源文件。
- 也通过安装插件，可以对输出结果进行修改。
- 最后可以支持项目开发环境，提供服务器功能。

学习目的：

- 了解webpack这个工具基础使用
- 基于vue-cli可以自行修改一些默认配置



### 05-webpack-安装

全局安装：

```sh
npm i webpack -g
npm i webpack-cli -g
```

- 安装后，可以在全局使用命令 `webpack` ，但是不建议全局安装，因为各个项目依赖的版本不一样，全局更新后将影响，其他版本的项目。

**推荐本地项目单独使用：**

1. 初始化项目  package.json的文件

```bash
npm init -y
```

2. 安装  --save-dev 简写 -D

```sh
npm i webpack -D
npm i webpack-cli -D
```

3. 配置package.json

```json
{
    "scripts":{
        "build":"webpack"
    }   
}
```

4. 调用webpack工具

```bash
npm run build
```



第一次使用webpck打包：必须有src目录，默认入口文件是index.js。



### 06-webpack-打包模式（mode）

- 需要在配置文件下进行配置
- 默认的配置文件名称是：webpack.config.js

```js
module.exports = {
    //development 开发模式打包 打包速度快 没做优化处理
    //production 生成模式打包 打不速度慢 做了一些优化处理，压缩
    mode: 'development' // 开发模式打包
} 
```



### 07-webpack-入口与出口

- 默认入口是 src下的index.js文件
- 默认出口是 dist 目录下的 main.js 文件

```js
const path = require('path');

module.exports = {
  // 打包的入口文件
  entry: './src/index.js',
  // 输出的出口文件
  output: {
    // 必须指定的是绝对路径
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  }
};
```



### 08-webpack-打包css

```bash
npm install --save-dev style-loader css-loader
```

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };

```



### 09-webpack-打包less

- 注意：less-loader 依赖 less 的，所以提前安装 less 模块。

```diff
npm install --save-dev style-loader css-loader less less-loader
```

```diff
const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, 
+      {
+        test: /\.less$/,
+        use: [
+          'style-loader',
+          'css-loader',
+          'less-loader'
+        ]
+      }
    ]
  }
}

```



### 10-webpack-打包图片

```bash
npm install --save-dev file-loader
```

```diff
onst path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };

```



### 11-webpack-打包字体文件

```less
// 定义一个字体
@font-face{
  font-family: "hm-79";
  src: url(../assets/fonts/font.ttf) format('truetype');
}
// 使用这个字体
p{
  font-family: hm-79
}
```

配置即可。

```diff
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }

```



### 12-webpack-生成html

```bash
npm install --save-dev html-webpack-plugin
```

```diff
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],

```

如果你想要了解更多 `HtmlWebpackPlugin` 插件提供的全部功能和选项，那么你就应该多多熟悉 [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) 仓库。

使用自己的文件做为模版：

```diff
+   plugins: [
+     new HtmlWebpackPlugin({
+       template: 'index.html'
+     })
+   ],

```



### 13-webpack-清理dist

- 在每次打包前，清空dist目录。

https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder

```bash
npm install clean-webpack-plugin --save-dev
```

```diff
+ const {CleanWebpackPlugin} = require('clean-webpack-plugin');
```

```diff
    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],

```



### 14-webpack-babel介绍

- 目前部分浏览器和 Node.js 已经支持 ES6，但由于它们对 ES6 所有的标准支持不全，这导致在开发中不敢全面地使用 ES6。
- Babel 是一个 JavaScript 编译器，能将 ES6 代码转为 ES5 代码，让你使用最新的语言特性而不用担心兼容性问题，把采用 ES6 编写的代码转换成目前已经支持良好的 ES5 代码。

- 官网：https://babeljs.io/



### 15-webpack-babel使用

```bash
npm install -D babel-loader @babel/core @babel/preset-env 
```

```javascript
module: {
  rules: [
    {
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

```

以上操作是语法解析，但是ES6还更新了一些高阶函数。

```bahs
npm install --save @babel/polyfill
```

使用：必须优先导入模块，之后的js才可以使用当前模块提供的函数（实现了ES6提供的高阶函数）

```js
import "@babel/polyfill";
```

或者：

```js
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
};
```



### 16-webpack-sourceMap

为了更容易地追踪错误和警告，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

```diff
+   devtool: 'inline-source-map',
    plugins:

```



### 17-webpack-watch监听

我们添加一个用于启动 webpack watch mode 的 npm scripts：

```diff
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"
    },

```

唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，因此接下来我们会尝试通过 `webpack-dev-server` 实现此功能。



### 18-webpack-dev-server

`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading),自动刷新浏览器进行实时的预览。

```bash
npm install --save-dev webpack-dev-server

```

```diff
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },

```

**package.json**

```diff
    "scripts": {
+     "serve": "webpack-dev-server --open",

```

执行：

```bash
npm run serve

```

- 不会把资源打包到磁盘中，存储在内存中。读取更快。

### 19-webpack-热更新

- 实现浏览器不刷新，更新打包后的结果，默认对js不生效，对样式生效。

```diff
+ const webpack = require('webpack');

  module.exports = {
    entry: {
-      app: './src/index.js',
-      print: './src/print.js'
+      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: '模块热替换'
      }),
+     new webpack.HotModuleReplacementPlugin()
    ],

```



### 20-webpack-打包vue文件

https://vue-loader.vuejs.org/zh/guide/#vue-cli

```bash
npm install -D vue-loader vue-template-compiler

```

```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}

```

### 21-webpack-路径别名

```js
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

```

### 22-webpack-文件后缀

```diff
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
+    extensions: ['.js', '.vue', '.json', '.css']
  },

```

