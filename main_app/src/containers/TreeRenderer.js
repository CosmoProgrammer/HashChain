import React, { useState, useEffect } from "react";
import Tree from "./Tree";

const TreeRenderer = (props) => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props)
        const response = await fetch(`http://localhost:7793/getitem/${props.id}`);
        const data = await response.json();
        if(data!=="Item not found"){
          console.log("hi")
          let localStorageItems = []
          console.log(localStorage['items'])
          if(localStorage.getItem("items")){
            localStorageItems = JSON.parse(localStorage.getItem("items")) ;
          }
          localStorageItems[data.id] =  data.name
          localStorage.setItem("items", localStorageItems);
        }
        setItem(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.id]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {item && <Tree item={item} />}
    </div>
  );
};

export default TreeRenderer;
