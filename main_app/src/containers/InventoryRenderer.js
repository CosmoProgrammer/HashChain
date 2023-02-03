import React, { useState, useEffect } from 'react';
import Inventory from './Inventory';

const InventoryRenderer = () => {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const fetchIds = async () => {
      const username = localStorage.getItem("username");
      const response = await fetch(`http://localhost:7793/location/${username}`);
      const data = await response.json();
      setIds(data);
    };
    fetchIds();
  }, []);

  return <Inventory itemIds={ids} />;
};

export default InventoryRenderer;
