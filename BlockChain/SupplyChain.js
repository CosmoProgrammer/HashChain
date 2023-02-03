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
            componentItems: []
        }
        itemIds.forEach(itemId => {
            let item = this.findItem(itemId)
            newItem.componentItems.push(item)
            item.clocation = false
            this.addItem(item)
        })
        let id = this.addItem(newItem)
        return id
    }

    convertItem(itemDetails, oldItemId) {
        let newItem = itemDetails
        newItem.componentItems = []
        let oldItem = this.findItem(oldItemId)
        newItem.componentItems.push(oldItem)
        oldItem.clocation = false
        this.addItem(oldItem)
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
        description: "These are grains of rice",
        quantity: '5 kg',
        expirationDate: "12th March 2023",
        sourceInfo: "Farm",
        cost: 1000,
        componentItems: [],
        compliance: {
            temperature: "temp<=20",
            moisture: "moisture<=60"
        }
    }  
    let item2 = {
        location: "Mariata's Rice Refinary",
        clocation: "Mariata's Rice Refinary",
        name: "Rice Flour",
        description: "This is Rice Flour",
        quantity: '4 kg',
        expirationDate: "10th March 2023",
        sourceInfo: "Refinary",
        cost: 1500,
        componentItems: [],
        compliance: {
            temperature: "temp<=40",
            moisture: "moisture<=40"
        }
    }
    let item3 = {
        location: "Lenovo's Sugur Factory",
        clocation: "Lenovo's Sugur Factory",
        name: "Sugur",
        description: "Sweet stuff that is not salty",
        quantity: '100 g',
        expirationDate: "12th December 2023",
        sourceInfo: "Factory",
        cost: 500,
        componentItems: [],
        compliance: {
            temperature: "temp<=80",
            moisture: "moisture<=40"
        }
    }  
    let item4 = {
        location: "Milky Cow's Diary Farm",
        clocation: "Milky Cow's Diary Farm",
        name: "Milk",
        description: "White liquid that is priceless and invaluable",
        quantity: '1 L',
        expirationDate: "1st Febuary 2023",
        sourceInfo: "Farm",
        cost: 100,
        componentItems: [],
        compliance: {
            temperature: "temp<=100",
            moisture: "moisture<=80"
        }
    }  
    let id1 = myBlockChain.addItem(item1)
    myBlockChain.changeItemLocation(id1,'Rice Refinary')
    let id2 = myBlockChain.convertItem(item2,id1)
    myBlockChain.changeItemLocation(id2,'New Bakery')
    let id3 = myBlockChain.addItem(item3)
    myBlockChain.changeItemLocation(id3,'New Bakery')
    let id4 = myBlockChain.addItem(item4)
    myBlockChain.changeItemLocation(id4,'New Bakery')
    let id5 = myBlockChain.combineItems({
        id: 5,
        location: "New Bakery",
        clocation: "New Bakery",
        name: "Cake",
        description: "Does anything more have to to be said",
        quantity: '1',
        expirationDate: "2/1/23",
        sourceInfo: "Bakery",
        cost: 1000,
        compliance: {
            temperature: "temp<=50",
            moisture: "moisture<=30"
        }
    }, id2,id3,id4)
    let item6 = {
        location: "New Bakery",
        clocation: "New Bakery",
        name: "Cream",
        description: "White liquid that almost as priceless and invaluable as milk",
        quantity: '1 L',
        expirationDate: "1st Febuary 2023",
        sourceInfo: "Bakery",
        cost: 100,
        componentItems: [],
        compliance: {
            temperature: "temp<=40",
            moisture: "moisture<=60"
        }
    } 
    let id6 = myBlockChain.addItem(item6)
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


