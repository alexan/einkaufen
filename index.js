const express = require('express')
const morgan  = require('morgan')

const app = express()

const cacheBuster = /.+\.[a-z,0-9]+\..{1,3}$/

app
.use(morgan('combined'))
.use(express.static('dist', {
   setHeaders(response, path) {
      if (cacheBuster.test(path)) {
         response.header('Cache-Control', 'public,max-age=31536000,immutable')
      }
   }
}))

app.listen(3000, () => console.log('listening on port 3000!'))