const express = require('express'); 
const app = express(); 
const port = 7793
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

SupplyChainInstance.retrieveBlockChainFromFile('SupplyChain.json')

let id1 = UserChainInstance.addUser({username:'Anirudh', password:'qwerty', 'deposit':20})
let id2 = UserChainInstance.addUser({username:"Laaksh", password: '123456','deposit':10})

app.get('/login/:cred', (req, res) => {   
    var tcreds = req.params.cred
    var creds = JSON.parse(tcreds)
    console.log(creds)
    console.log(creds.password)
    //res.send('The Blockchain serverside is working')
    if (UserChainInstance.verifyUser(creds.username, creds.password)) {
        console.log('Login successful')
        res.send('true')
    }
    else{
        console.log(creds)
        res.send('false')
    }
})

/*app.get('/getItem', (req, res) => {
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
})*/

app.get("/getitem/:id", (req, res) => {
    console.log("HERE")
    console.log(req.params.id)
    const id = req.params.id;
    const item = SupplyChainInstance.findItem(id);
    console.log(SupplyChainInstance)
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.send(item);
  });  

app.listen(port, () => { console.log(`Listening at http://localhost:${port}`) });