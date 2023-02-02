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
            <tr key={item[0]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>
                <button
                  onClick={() => navigate(`/item/${item[0]}`)}
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
