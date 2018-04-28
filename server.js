const fs = require('fs')
const path = require('path')
const Vue = require('vue')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const compression = require('compression')
const favicon = require('serve-favicon')
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
const isProd = process.env.NODE_ENV === 'production'
//const createApp = require('./src/app');
const app = express()

const templatePath = resolve('./src/components/index.template.html');
const template = fs.readFileSync(templatePath, 'utf-8');
/*const bundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createRenderer(bundle, {
    template,
    clientManifest
  });*/

const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // рекомендуется
  template,
  clientManifest
})

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))



app.get('*', (req, res) => {
 render(req, res)
})

app.listen(8080)

function render (req, res) {
    const context = { url: req.url }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Страница не найдена')
        } else {
          res.status(500).end('Внутренняя ошибка сервера')
        }
      } else {
        res.end(html)
      }
    })
}

function render1 (req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue HN 2.0', // default title
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}
