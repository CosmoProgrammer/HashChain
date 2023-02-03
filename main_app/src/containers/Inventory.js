import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import TreeRenderer from "./TreeRenderer";
import '../styles/Inventory.css'
import '../styles/home.css';

const Inventory = ({itemIds}) => {
    //console.log("HI")
    //console.log(itemIds)
    const navigate = useNavigate()
    const [selectedIds, setSelectedIds] = useState([]);

    const handleConvert = async (id) => {
        //console.log("HIIIII")
        let newDetails = generatePopupForm()
        newDetails.location = localStorage.getItem('username')
        //console.log(newDetails)
        const response = await fetch(`http://localhost:7793/convert/${JSON.stringify(id)}/${JSON.stringify(newDetails)}`, {method: 'POST'});
        //const data = await response.json();
        //console.log(data)
        window.location.href = window.location.href;
    }

    const handleAdd = async (event) => {
        //console.log("HIIIII")
        event.preventDefault();
        console.log("Addings")
        let newDetails = generatePopupForm()
        newDetails.location = localStorage.getItem('username')
        //console.log(newDetails)
        const response = await fetch(`http://localhost:7793/add/${JSON.stringify(newDetails)}`, {method: 'POST'});
        //const data = await response.json();
        //console.log(data)
        window.location.href = window.location.href;
    }

    const handleShip = async (id) => {
        //console.log("HIIIII")
        let location = prompt("Enter the location:- ")
        const response = await fetch(`http://localhost:7793/ship/${JSON.stringify(id)}/${JSON.stringify(location)}`, {method: 'POST'});
        //const data = await response.json();
        //console.log(data)
        window.location.href = window.location.href;
    }

    const handleSell = async (id) => {
        //console.log("HIIIII")
        const response = await fetch(`http://localhost:7793/sell/${JSON.stringify(id)}`, {method: 'POST'});
        //const data = await response.json();
        //console.log(data)
        window.location.href = window.location.href;
    }

    const handleCombine = async () => {
        //console.log("HI")
        console.log(selectedIds)
        let newDetails = generatePopupForm()
        newDetails.location = localStorage.getItem('username')
        console.log(newDetails)
        const response = await fetch(`http://localhost:7793/combine/${selectedIds}/${JSON.stringify(newDetails)}`, {method: 'POST'});
        //const data = await response.json();
        //console.log(data)
        window.location.href = window.location.href;
    }


    const handleSelect = (id) => {
        
        setSelectedIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(selectedId => selectedId !== id);
            }
        return [...prevIds, id];
        });
    }

    return(
        <div className="home">
        <button onClick={handleAdd}>Add Item</button>
            <div className="inventory-container">
                <h2 className="inventory-title">Inventory</h2>
                <div className="item-card-container">
                    {itemIds.map((id) => (
                        <Card id={id} onSelect={() => handleSelect(id)} handleConvert={() => handleConvert(id)} handleShip={() => handleShip(id)} handleSell={() => handleSell(id)} handleselected={selectedIds.includes(id)}/>
                    ))}
                    {selectedIds.length > 1 && (
                        <button onClick={handleCombine}>Combine</button>
                    )}
                </div>
            </div>
        </div>
    )
}

const Card = ({id, onSelect, handleConvert, handleShip, handleSell, selected }) => {
    return(
        <div className={`item-card${selected ? 'true' : ''}`}>
            <TreeRenderer id={id} />
            <div className="item-card-btns">
                <button className="item-card-btn" onClick={() => handleConvert(id)}>Convert</button>
                <button className="item-card-btn" onClick={() => handleShip(id)}>Ship</button>
                <button className="item-card-btn" onClick={() => handleSell(id)}>Sell</button>
                <button className="item-card-btn" onClick={onSelect}>Select</button>
            </div>
        </div>
    )
}

const generatePopupForm = () => {
    const formData = {};
    const formFields = [
      { label: "Name", id: "name" },
      { label: "Description", id: "description" },
      { label: "Quantity", id: "quantity" },
      { label: "Expiration Date", id: "expirationDate" },
      { label: "Cost", id: "cost" },
      { label: "Source Info (Farm/Bakery/Factory etc)", id: "sourceInfo" },
      { label: "Temperature", id: "temperature" },
      { label: "Moisture", id: "moisture" },
    ];
  
    formFields.forEach((field) => {
      const input = prompt(field.label);
      formData[field.id] = input;
    });
  
    return formData;
};  


export default Inventory;