import React from "react";

function Card(item) {
    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
          <h3>{item.name}</h3>
          <p>Location: {item.location}</p>
          <p>Name: {item.name}</p>
          <p>Description: {item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Expiration Date: {item.expirationDate}</p>
          <p>Source Info: {item.sourceInfo}</p>
          <p>Cost: {item.cost}</p>
          <p>Temperature compliance: {item.compliance.temperature.toString()}</p>
          <p>Moisture compliance: {item.compliance.moisture.toString()}</p>
        </div>
      );
}

export default Card