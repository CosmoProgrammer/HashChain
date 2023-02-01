import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/EnterID.css';

const EnterID = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/item/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="enter-id-form">
      <input
        type="text"
        placeholder="Enter Item ID"
        value={id}
        onChange={(event) => setId(event.target.value)}
        className="enter-id-input"
      />
      <button type="submit" className="enter-id-button">
        Go
      </button>
    </form>
  );
};

export default EnterID;
