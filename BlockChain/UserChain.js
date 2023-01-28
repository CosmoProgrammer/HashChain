const SHA256 = require("crypto-js/sha256");
const {Block, BlockChain} = require("./BlockChainSkeleton.js")

class UserChain extends BlockChain {
    constructor() { super() }

    addUser(user) {
        let hashedSaltedUser = user
        hashedSaltedUser.password = SHA256(hashedSaltedUser.password)
        const block = new Block(this.chain.length, new Date, hashedSaltedUser)
        this.addBlock(block)
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
        let hashedSaltedPassword = SHA256(password)
        if(hashedSaltedPassword == user.password) {
            return true
        } else return false 
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
            this.addUser(newfromBlock)
            this.addUser(newtoBlock)
        } else return "Not enough deposit"
    }

}

let myBlockChain = new UserChain
myBlockChain.addUser({'id':1, 'username':'Anirudh', 'password':'qwerty', 'deposit':20})
myBlockChain.addUser({'id':2, 'username':"Laaksh", 'password': '123456','deposit':10})
myBlockChain.transaction(1,2,10)
console.log(myBlockChain.chain)
console.log(myBlockChain.verifyUser('Anirudh','qwerty'))