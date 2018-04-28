const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');


module.exports = merge(baseConfig, {
    // Укажите точку входа серверной части вашего приложения
    entry: './src/entry-server.js',
    
    // Это позволяет Webpack обрабатывать динамические импорты в Node-стиле,
    // а также сообщает `vue-loader` генерировать серверно-ориентированный код
    // при компиляции компонентов Vue.
    target: 'node',
    
    // Для поддержки source map в bundle renderer
    devtool: 'source-map',
    
    // Это сообщает что в серверной сборке следует использовать экспорты в стиле Node
    output: {
        libraryTarget: 'commonjs2'
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // Внешние зависимости приложения. Это значительно ускоряет процесс
    // сборки серверной части и уменьшает размер итогового файла сборки.
    externals: nodeExternals({
        // не выделяйте зависимости, которые должны обрабатываться Webpack.
        // здесь вы можете добавить больше типов файлов, например сырые *.vue файлы
        // нужно также указывать белый список зависимостей изменяющих `global` (например, полифиллы)
        whitelist: /\.css$/
    }),

    // Этот плагин преобразует весь результат серверной сборки
    // в один JSON-файл. Имя по умолчанию будет
    // `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin()
    ]
});

/*
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})*/
