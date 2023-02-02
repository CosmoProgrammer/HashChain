import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/History.css";

const History = () => {
  const [itemList, setItemList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let localStorageItems = []
    console.log(localStorage['items'])
    if(localStorage.getItem("items")){
      localStorageItems = JSON.parse(localStorage.getItem("items")) ;
    }
    console.log(localStorageItems)
    setItemList(localStorageItems);
  }, []);

  return (
    <div className="item-list-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button
                  onClick={() => navigate(`/item/${item.id}`)}
                  className="item-list-view-btn"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
