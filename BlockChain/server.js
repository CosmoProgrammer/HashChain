const express = require('express'); 
const app = express(); 
const port = 7863
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
app.use(cors());
app.use(express.urlencoded({ extended: true })) 
app.use(express.json());

const { SupplyChain } = require('./SupplyChain')
const { UserChain } = require('./UserChain')

var SupplyChainInstance = new SupplyChain
var UserChainInstance = new UserChain

let id1 = UserChainInstance.addUser({'username':'Anirudh', 'password':'qwerty', 'deposit':20})
let id2 = UserChainInstance.addUser({'username':"Laaksh", 'password': '123456','deposit':10})

app.get('/login/:cred', (req, res) => {
    var creds = JSON.parse(res.params.cred)
    var username = creds.username
    if (UserChainInstance.findUser(username) == false){
        UserChainInstance.addUser(creds)
    }
    let id = UserChainInstance.addUser(cred)
    res.send('The Blockchain serverside is working')
    if (true){
        console.log('test')
    }
    UserChainInstance.verifyUser(username,password)
})

app.get('/getItem', (req, res) => {
    var item = JSON.parse(req.body.item)
})

app.get('/sendItem/:item/:func', (req, res) =>{
    var itemTemp = req.params.item
    var funcTemp = req.params.func
    var funcToBeSent = JSON.stringify(funcTemp)
    var item = JSON.stringify(itemTemp)
    console.log(funcToBeSent)
    res.send(funcToBeSent)
    console.log(item)
})

app.listen(port)