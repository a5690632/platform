// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

// const cdn = {
//   css: [],
//   js: [
//     'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
//     'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
//     'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
//     'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
//   ]
// }

module.exports = {
  // 基本路径

  // 输出文件目录

  // webpack配置
  publicPath: isProduction ? "../" : "/",
  // 输出文件目录

  chainWebpack: (config) => {
    // 配置别名

    if (isProduction) {
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码

      // 生产环境注入cdn
      // config.plugin('html')
      //   .tap(args => {
      //     args[0].cdn = cdn;
      //     return args;
      //   });
    }
  },
  configureWebpack: (config) => {
    if (isProduction) {
      // 用cdn方式引入
      // config.externals = {
      //   'vue': 'Vue',
      //   'vuex': 'Vuex',
      //   'vue-router': 'VueRouter',
      //   'axios': 'axios'
      // }

      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100,
            },
            common: {
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60,
            },
            styles: {
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all",
              enforce: true,
            },
            runtimeChunk: {
              name: "manifest",
            },
          },
        },
      };
      config.plugins.push(
        //生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      );
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  devServer: {
    open: true, // 自动开启浏览器
    compress: false, // 开启压缩
    proxy: {
      "/dev": {
        target: "http://127.0.0.1:7001/",
        changeOrigin: true,
        pathRewrite: { "^/dev": "/" },
      },
    },
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
