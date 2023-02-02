const {Block, BlockChain} = require("./BlockChainSkeleton.js")
const fs = require("fs");

class SupplyChain extends BlockChain {
    constructor(){ super() }

    addItem(item){
        let itemToAdd = item
        let id = this.createUniqueID()
        itemToAdd.id = id
        const block = new Block(this.chain.length, new Date, item)
        if(this.isChainTampered()){
            this.retrieveBlockChainFromFile('UserChain.json')
        }
        this.addBlock(block)
        this.saveBlockChainToFile('UserChain.json')
        return id
    }

    findItem(id){
        for(let i=this.chain.length-1; i>0; i--) {
            if(this.chain[i].content.id == id) { 
                return this.chain[i].content;
            }
        }
        return null;
    }

    changeItemLocation(itemId, newLocation) {
        let oldItem = this.findItem(itemId)
        let ids = JSON.parse(fs.readFileSync('./ignoreIds.json'))
        ids.push([itemId,oldItem.clocation])
        fs.writeFileSync('./ignoreIds.json', JSON.stringify(ids))
        let oldoldItem = this.findItem(itemId)
        let itemToUpdate = oldoldItem;
        itemToUpdate.clocation = newLocation;
        let newBlock = new Block(this.chain.length, Date.now(), [itemToUpdate]);
        this.addBlock(newBlock);
    }
    

    combineItems(newItemDetails, ...itemIds){
        let newItem = {
            location: newItemDetails['location'],
            clocation: newItemDetails['clocation'],
            name: newItemDetails['name'],
            description: newItemDetails['description'],
            quantity: newItemDetails['quantity'],
            sourceInfo: newItemDetails['sourceInfo'],
            expirationDate: newItemDetails['expirationDate'],
            cost: newItemDetails['cost'],
            compliance: newItemDetails['compliance'],
            itemAtLocation: true,
            componentItems: []
        }
        itemIds.forEach(itemId => {
            let item = this.findItem(itemId)
            newItem.componentItems.push(item)
        })
        let id = this.addItem(newItem)
        return id
    }

    convertItem(itemDetails, oldItemId) {
        let newItem = itemDetails
        newItem.componentItems = []
        let oldItem = this.findItem(oldItemId)
        newItem.componentItems.push(oldItem)
        newItem.itemAtLocation= true
        let id = this.addItem(newItem)
        return id
    }

    getItemsAtLocation(location){
        let itemAtLocation = []
        let ignoreIds = fs.readFileSync('ignoreIds.json')
        this.chain.forEach(block => {
            if(block.content.clocation == location){
                //for(let i = 0; i < ignoreIds.length; i++){
                //    let set = ignoreIds[i]
                //    if(set[0] !== block.id && set[1] == block.location){
                        itemAtLocation.push(block.content)
                //    }
                //}
            }
        })
        return itemAtLocation
    }
}

if (require.main === module) {
    let myBlockChain = new SupplyChain
    //Every item has an unique id. For example, this particular batch of rice from this farm has one id
    let item1 = {
        location: "Peril Farm",
        clocation: "Peril Farm",
        name: "Rice grains",
        description: "Rice grains",
        quantity: '500',
        expirationDate: "12/3/23",
        sourceInfo: "Farm",
        itemAtLocation: true,
        cost: 1000,
        componentItems: [],
        compliance: {
            temperature: (temp) => temp<=20,
            moisture: (moisture) => moisture<=60
        }
    }  
    let item2 = {
        location: "Rice Refinary",
        clocation: "Rice Refinary",
        name: "Rice Flour",
        description: "Rice Flour",
        quantity: '500 g',
        expirationDate: "12/4/23",
        sourceInfo: "Refinary",
        itemAtLocation: true,
        cost: 1500,
        componentItems: [],
        compliance: {
            temperature: (temp) => temp<=30,
            moisture: (moisture) => moisture<=30
        }
    }
    let item3 = {
        location: "Sugur Factory",
        clocation: "Sugur Factory",
        name: "Sugur",
        description: "Sugur",
        quantity: '100 g',
        expirationDate: "12/12/23",
        sourceInfo: "Factory",
        itemAtLocation: true,
        cost: 500,
        componentItems: [],
        compliance: {
            temperature: (temp) => temp<=80,
            moisture: (moisture) => moisture<=10
        }
    }  
    let item4 = {
        location: "Diary Farm",
        clocation: "Diary Farm",
        name: "Milk",
        description: "Milk",
        quantity: '1 L',
        expirationDate: "1/2/23",
        sourceInfo: "Farm",
        itemAtLocation: true,
        cost: 100,
        componentItems: [],
        compliance: {
            temperature: (temp) => temp<=30,
            moisture: (moisture) => moisture<=100
        }
    }  
    let id1 = myBlockChain.addItem(item1)
    myBlockChain.changeItemLocation(id1,'Rice Refinary')
    let id3 = myBlockChain.addItem(item3)
    let id4 = myBlockChain.addItem(item4)
    let id2 = myBlockChain.convertItem(item2,id1)
    let id5 = myBlockChain.combineItems({
        id: 5,
        location: "Bakery",
        clocation: "Bakery",
        name: "Cake",
        description: "Cake",
        quantity: '1',
        expirationDate: "2/1/23",
        sourceInfo: "Bakery",
        itemAtLocation: true,
        cost: 1000,
        compliance: {
            temperature: (temp) => temp<=30,
            moisture: (moisture) => moisture<=30
        }
    }, id2,id3,id4)
    myBlockChain.changeItemLocation(id5,'New Bakery')
    for(let i=0; i<myBlockChain.chain.length; i++){
        console.log("******************************************************************")
        console.log(myBlockChain.chain[i])
        if(myBlockChain.chain[i]['content']['componentItems']){
            console.log(myBlockChain.chain[i]['content']['componentItems'])
        }
        console.log("******************************************************************")
    }
    console.log(myBlockChain.getItemsAtLocation("New Bakery"))
    myBlockChain.saveBlockChainToFile('SupplyChain.json')
}
module.exports = { SupplyChain }


