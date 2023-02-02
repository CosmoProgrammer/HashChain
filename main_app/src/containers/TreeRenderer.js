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
        var pastSearches = [];
        if(localStorage["items"]) {
          pastSearches = JSON.parse(localStorage["items"]);
        }
        if(pastSearches[0][0] !== data.id){
          pastSearches.unshift([data.id,data.name]);
        }
        if(pastSearches.length > 10){
          pastSearches.pop()
        }
        localStorage["items"] = JSON.stringify(pastSearches);
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
