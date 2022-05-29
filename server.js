import express from 'express'
import path from 'path'

const app = express()
const port = 80

const __dirname = path.resolve()

app.use(express.static(__dirname + '/webapp'))

const router = express.Router()

router.get('/', function (req, res) {
  res.sendFile(path.join(`${__dirname}/index.html`))
})

//add the router
app.use('/', router)

app.listen(80, () => console.log('Node server listening on port 80!'))
