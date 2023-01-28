const SHA256 = require("crypto-js/sha256");
const fs = require("fs");

class Block {
    constructor(index, timeStamp, content, prevHash='') {
        this.index = index
        this.timeStamp = timeStamp
        this.content = content
        this.prevHash = prevHash
        this.hash = this.getHash()
    }
    getHash() {
        return SHA256(this.index + this.prevHash + this.timeStamp + JSON.stringify(this.content)).toString()
    }
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesis()]
    }

    createGenesis(){
        return new Block(0, new Date(), "This is the Genesis Block, the beginning of the chain", "0")
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(block){
        block.prevHash = this.getLastBlock().hash
        block.hash = block.getHash()
        this.chain.push(block)
    }

    isChainTampered(){
        for(let i=0; i<this.chain.length; i++){
            const block = this.chain[i]
            const prevBlock = this.chain[i-1]
            if(block.hash !== block.getHash()){ return true }
            if(block.prevHash !== prevBlock.hash){ return true }
        }
        return false
    }

    revertChain(index){
        if (index > this.chain.length - 1){
            console.log("Invalid block index")
            return
        }
        this.chain.splice(index)
    }

    saveBlockChainToFile(filepath){
        let data = JSON.stringify(this.chain);
        fs.writeFileSync(filepath, data)
    }

    retrieveBlockChainFromFile(){
        let data = fs.readFileSync(filepath)
        this.chain = JSON.parse(data)
    }
}

module.exports = { Block, BlockChain }
