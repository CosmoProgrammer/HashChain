import React from "react";
import { useNavigate } from 'react-router-dom';

const Inventory = ({itemIds}) => {
    const navigate = useNavigate()

    return(
        <>
            <div className="inventory-container">
                <h2 className="inventory-title">Inventory</h2>
                <div className="item-card-container">
                    {itemIds.map((id) => (
                        <div key={id} className="item-card">
                        <Tree id={id} />
                         <div className="item-card-btns">
                            <button className="item-card-btn" onClick={() => handleConvert(id)}>Convert</button>
                            <button className="item-card-btn" onClick={() => handleShip(id)}>Ship</button>
                </div>
          </div>
        ))}
        </div>
        </div>
        </>
    )
}

export default Inventory;