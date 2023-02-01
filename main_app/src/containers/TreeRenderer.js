import React, { useState, useEffect } from "react";
import Tree from "./Tree";

const ItemFetcher = (props) => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props)
        const response = await fetch(`http://localhost:7793/getitem/${props.id}`);
        const data = await response.json();
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

export default ItemFetcher;
