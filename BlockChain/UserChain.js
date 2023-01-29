const SHA256 = require("crypto-js/sha256");
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
        let toHash = hashedSaltedUser.password
        console.log(toHash === 'qwerty')
        console.log(SHA256(toHash) === SHA256('qwerty'))
        hashedSaltedUser.password = SHA256(toHash)
        const block = new Block(this.chain.length, new Date, hashedSaltedUser)
        this.addBlock(block)
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
        let hashedSaltedPassword = SHA256(password)
        console.table([hashedSaltedPassword,user.password, password])
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
            this.addUser(newfromBlock,true)
            this.addUser(newtoBlock,true)
        } else return "Not enough deposit"
    }

}

let myBlockChain = new UserChain
let id1 = myBlockChain.addUser({'username':'Anirudh', 'password':'qwerty', 'deposit':20})
let id2 = myBlockChain.addUser({'username':"Laaksh", 'password': '123456','deposit':10})
myBlockChain.transaction(id1,id2,10)
console.log(myBlockChain.chain)
console.log(myBlockChain.verifyUser('Anirudh','qwerty'))
console.log(SHA256('qwerty'))