const {Block, BlockChain} = require("./BlockChainSkeleton.js")

class UserChain extends BlockChain {
    constructor() { super() }

    addUser(user) {
        const block = new Block(this.chain.length, new Date, user)
        this.addBlock(block)
    }

    
}