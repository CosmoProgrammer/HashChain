const {Block, BlockChain} = require("./BlockChainSkeleton.js")

class SupplyChain extends BlockChain {
    constructor(){ super() }

    addItem(item){
        const block = new Block(this.chain.length, new Date, item)
        this.addBlock(block)
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
        let itemToUpdate;
        this.chain.forEach(block => {
            block.data.forEach(item => {
                if (item.id === itemId) {
                    itemToUpdate = item;
                    itemToUpdate.location = newLocation;
                }
            });
        });
        let newBlock = new Block(Date.now(), [itemToUpdate]);
        this.addBlock(newBlock);
    }
    

    combineItems(newItemDetails, ...itemIds){
        let newItem = {
            id: newItemDetails['id'],
            location: newItemDetails['location'],
            name: newItemDetails['name'],
            description: newItemDetails['description'],
            quantity: newItemDetails['quantity'],
            expirationDate: newItemDetails['expirationDate'],
            cost: newItemDetails['cost'],
            compliance: newItemDetails['compliance'],
            componentItems: []
        }
        itemIds.forEach(itemId => {
            let item = this.findItem(itemId)
            newItem.componentItems.push(item)
        })
        this.addItem(newItem)
    }

    getItemsAtLocation(location){
        let itemAtLocation = []
        this.chain.forEach(block => {
            if(block.content.location == location){
                itemAtLocation.push(block.content)
            }
        })
        return itemAtLocation
    }
}


let myBlockChain = new SupplyChain
let item1 = {
    id: 1,
    location: "Kitchen",
    name: "Flour",
    description: "All purpose flour",
    quantity: 10,
    expirationDate: "2022-12-31",
    sourceInfo: "Local farmer",
    cost: 3,
    compliance: "Organic"
}  
let item2 = {
    id: 2,
    location: "Living Room",
    name: "Sugar",
    description: "Granulated sugar",
    quantity: 5,
    expirationDate: "2022-11-30",
    sourceInfo: "Local supplier",
    cost: 2,
    compliance: "Non-GMO"
}
myBlockChain.addItem(item1)
myBlockChain.addItem(item2)
//console.log(myBlockChain.findItem(1))
myBlockChain.combineItems({
    id: 3,
    location: "Living Room",
    name: "Sugar",
    description: "Granulated sugar",
    quantity: 5,
    expirationDate: "2022-11-30",
    sourceInfo: "Local supplier",
    cost: 2,
    compliance: "Non-GMO"
}, 1, 2)
myBlockChain.combineItems({
    id: 4,
    location: "Living Room",
    name: "Sugar",
    description: "Granulated sugar",
    quantity: 5,
    expirationDate: "2022-11-30",
    sourceInfo: "Local supplier",
    cost: 2,
    compliance: "Non-GMO"
}, 2,3)
for(let i=0; i<myBlockChain.chain.length; i++){
    console.log(myBlockChain.chain[i])
    if(myBlockChain.chain[i]['content']['componentItems']){
        console.log(myBlockChain.chain[i]['content']['componentItems'])
    }
}
//myBlockChain.saveBlockChainToFile()