import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import TreeRenderer from "./TreeRenderer";
import '../styles/Inventory.css'

const Inventory = ({itemIds}) => {
    console.log("HI")
    console.log(itemIds)
    const navigate = useNavigate()
    const [selectedIds, setSelectedIds] = useState([]);

    const handleConvert = (id) => {
        
    }

    const handleShip = (id) => {

    }

    const handleCombine = async () => {
        console.log("HI")
        console.log(selectedIds)
        let newDetails = generatePopupForm()
        newDetails.location = localStorage.getItem('username')
        console.log(newDetails)
        const response = await fetch(`http://localhost:7793/combine/${selectedIds}/${JSON.stringify(newDetails)}`, {method: 'POST'});
        const data = await response.json();
        window.location.reload(true)
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
        <>
            <div className="inventory-container">
                <h2 className="inventory-title">Inventory</h2>
                <div className="item-card-container">
                    {itemIds.map((id) => (
                        <Card id={id} onSelect={() => handleSelect(id)} handleConvert={handleConvert} handleShip={handleShip} selected={selectedIds.includes(id)}/>
                    ))}
                    {selectedIds.length > 1 && (
                        <button onClick={handleCombine}>Combine</button>
                    )}
                </div>
            </div>
        </>
    )
}

const Card = ({id, onSelect, handleConvert, handleShip, selected}) => {
    return(
        <div className={`item-card${selected ? 'true' : ''}`}>
            <TreeRenderer id={id} />
            <div className="item-card-btns">
                <button className="item-card-btn" onClick={() => handleConvert(id)}>Convert</button>
                <button className="item-card-btn" onClick={() => handleShip(id)}>Ship</button>
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