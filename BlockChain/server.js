const express = require('express'); 
const app = express(); 
const port = 7863
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.get('/', (req, res) => {
    res.send('The Blockchain serverside is working')
    if (true){
        console.log('test')
    }
})

app.post('/', (req, res) => {
    var username = JSON.parse(req.body.username)
    var pswd = JSON.parse(req.body.password)
    var item = JSON.parse(req.body.item)
    var func = JSON.parse(req.body.func)
})


app.listen(port, () => console.log(`Listening on port ${port}`)); 

