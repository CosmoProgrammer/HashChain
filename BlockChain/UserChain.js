const SHA256 = require("crypto-js/sha256");
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const {Block, BlockChain} = require("./BlockChainSkeleton.js")

class UserChain extends BlockChain {
    constructor() { super() }

    addUser(user,cond=false) {
        let hashedSaltedUser = user
        let id = hashedSaltedUser.id
        if(cond==false) {
            id = this.createUniqueID()
            hashedSaltedUser.id = id
        }
        if(typeof hashedSaltedUser.password == 'string'){ hashedSaltedUser.password = SHA256(hashedSaltedUser.password) }
        const block = new Block(this.chain.length, new Date, hashedSaltedUser)
        if(this.isChainTampered()){
            this.retrieveBlockChainFromFile('UserChain.json')
        }
        this.addBlock(block)
        this.saveBlockChainToFile('UserChain.json')
        return id
    }

    findUser(username){
        for(let i=this.chain.length-1; i>0; i--) {
            if(this.chain[i].content.username == username) { 
                return this.chain[i].content;
            }
        }
        return null;
    }

    verifyUser(username,password){
        let user = this.findUser(username)
        if(!user){
            console.log("can't let you in")
             return false; }
        let hashedSaltedPassword = SHA256(password)
        if(hashedSaltedPassword == user.password.toString()) {
            return true
        } else { return false }
    }

    transaction(from, to, amt) {
        let fromBlock, newfromBlock, toBlock, newtoBlock
        for(let i=this.chain.length-1; i>0; i--) {
            if(this.chain[i].content.id == from) { 
                fromBlock =  this.chain[i].content;
                break
            }
        }
        for(let i=this.chain.length-1; i>0; i--) {
            if(this.chain[i].content.id == to) { 
                toBlock =  this.chain[i].content;
                break
            }
        }
        if(fromBlock.deposit >= amt){
            newfromBlock = fromBlock
            newfromBlock.deposit = newfromBlock.deposit - amt
            newtoBlock = toBlock
            newtoBlock.deposit = newtoBlock.deposit + amt
            this.addUser(newfromBlock,true)
            this.addUser(newtoBlock,true)
        } else return "Not enough deposit"
    }

}

if (require.main === module) {
    let myBlockChain = new UserChain
    let id1 = myBlockChain.addUser({'username':'Anirudh', 'password':'qwerty', 'deposit':20})
    let id2 = myBlockChain.addUser({'username':"Laaksh", 'password': '123456','deposit':10})
    myBlockChain.transaction(id1,id2,10)
    console.log(myBlockChain.chain)
    console.log(myBlockChain.verifyUser('Laaksh','1234356'))
}

module.exports = { UserChain }