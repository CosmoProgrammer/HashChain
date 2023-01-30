const express = require('express')
const app = express()
const port = 7863

app.get('/', (req, res) => {
    res.send('sup')
    console.log(req)
})

app.use('/')

app.post('/', (req, res) => {
    var username = JSON.parse(req.body.username)
    var pswd = JSON.parse(req.body.password)
    var item = JSON.parse(req.body.item)
})

app.listen(port)


