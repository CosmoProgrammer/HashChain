import React, { useState } from 'react';
import '../styles/item.css';

const Item = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="item-container">
      <div className="item-header" onClick={toggleExpand}>
        <div className="item-header-text">{item.name}</div>
        <div className="item-header-toggle">
          {isExpanded ? '-' : '+'}
        </div>
      </div>
      {isExpanded && (
        <div className="item-details">
          <div className="item-detail">
            <div className="item-detail-label">Location<img src='../styles/icons tisb/location icon.png' style={{height:'20px',width:"20px"}}/>:</div>
           <div className="item-detail-value">{item.location}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Description:</div>
            <div className="item-detail-value">{item.description}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Quantity<img src='../styles/icons tisb/quantity icon.png' style={{height:'20px',width:"20px"}}/>:</div>
            <div className="item-detail-value">{item.quantity}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Expiration Date:</div>
            <div className="item-detail-value">{item.expirationDate}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Source Info:</div>
            <div className="item-detail-value">{item.sourceInfo}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Cost<img src='../styles/icons tisb/cost icon.png' style={{height:'20px',width:"20px"}}/>:</div>
            <div className="item-detail-value">{item.cost}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Compliance:</div>
            <div className="item-compliance">
              <div className="item-compliance-detail">
                <div className="item-compliance-label">Temperature<img src='../styles/icons tisb/temperature-icon-png-1.png' style={{height:'20px',width:"20px"}}/>:</div>
                <div className="item-compliance-value">
                  {item.compliance.temperature.toString()}
                </div>
              </div>
              <div className="item-compliance-detail">
                <div className="item-compliance-label">Moisture<img src='../styles/icons tisb/moisture-icon-26.jpg' style={{height:'20px',width:"20px"}}/>:</div>
                <div className="item-compliance-value">
                  {item.compliance.moisture.toString()}
                </div>
              </div>
            </div>
          </div>
          {item.componentItems.length > 0 && (
            <div className="item-children">
              {item.componentItems.map((childItem, index) => (
                <Item key={index} item={childItem} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
