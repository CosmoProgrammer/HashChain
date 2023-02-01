import React, { useState } from 'react';
import '../styles/item.css';
import loc from '../styles/location icon.png';
import quantity from '../styles/quantity icon.png';
import cost from '../styles/cost icon.png';
import temp from '../styles/temperature-icon-png-1.png';
import moisture from '../styles/moisture-icon-26.jpg';

const Tree = ({ item }) => {
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
            <div className="item-detail-label">Location<img src={loc} style={{height:'20px',width:"20px"}}/>:</div>
           <div className="item-detail-value">{item.location}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Description:</div>
            <div className="item-detail-value">{item.description}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Quantity<img src={quantity} style={{height:'20px',width:"20px"}}/>:</div>
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
            <div className="item-detail-label">Cost<img src={cost} style={{height:'20px',width:"20px"}}/>:</div>
            <div className="item-detail-value">{item.cost}</div>
          </div>
          <div className="item-detail">
            <div className="item-detail-label">Compliance:</div>
            <div className="item-compliance">
              <div className="item-compliance-detail">
                <div className="item-compliance-label">Temperature<img src={temp} style={{height:'20px',width:"20px"}}/>:</div>
                <div className="item-compliance-value">
                  {item.compliance.temperature}
                </div>
              </div>
              <div className="item-compliance-detail">
                <div className="item-compliance-label">Moisture<img src={moisture} style={{height:'20px',width:"20px"}}/>:</div>
                <div className="item-compliance-value">
                  {item.compliance.moisture}
                </div>
              </div>
            </div>
          </div>
          {item.componentItems.length > 0 && (
            <div className="item-children">
              {item.componentItems.map((childItem, index) => (
                <Tree key={index} item={childItem} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tree;
