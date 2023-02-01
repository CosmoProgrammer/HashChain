import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import QrScanner from "react-qr-scanner";
import TreeRenderer from './TreeRenderer';

const QRScanner = () => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
      navigate(`/item/${data.text}`);
    }
    if (data){
        console.log(data.text);
    }
  };

  return (
    <div style={{verticalAlign: 'middle'}}>
      <fieldset align="center" style={{
        backgroundColor: '#eeeeee',
        margin: 'auto',
        verticalAlign: 'middle'
    }}>
      <legend style={{
        backgroundColor: 'gray',
        color: 'white',
        padding: '5px 10px'
      }}>Scan Code Here</legend>
      <QrScanner onScan={handleScan} />
      {result}
      </fieldset>
    </div>
  );
};

export default QRScanner;
