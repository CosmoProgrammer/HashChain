const SHA256 = require("crypto-js/sha256");
const {Block, BlockChain} = require("./BlockChainSkeleton.js")

class UserChain extends BlockChain {
    constructor() { super() }

    addUser(user) {
        const block = new Block(this.chain.length, new Date, user)
        this.addBlock(block)
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
        }
    }

}

let myBlockChain = new UserChain
myBlockChain.addUser({'id':1, 'name':'Anirudh', 'deposit':20})
myBlockChain.addUser({'id':2, 'name':"Laaksh", 'deposit':10})
myBlockChain.transaction(1,2,10)
console.log(myBlockChain.chain)