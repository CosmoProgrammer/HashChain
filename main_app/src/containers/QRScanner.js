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
    <div>
      <QrScanner onScan={handleScan} />
      {result}
    </div>
  );
};

export default QRScanner;
