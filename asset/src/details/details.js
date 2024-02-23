import React, { useState, useEffect } from "react";
import axios from "axios";

const Details = () => {
  const [cryptoData, setCryptoData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/crypto-data");
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cryptocurrency Data</h1>
      <h1>Bitcoin</h1>
      <h3>{(cryptoData.data.item.latestRate.amount)}</h3>
      
       <h1>Market Cap</h1>
       <h3>{(cryptoData.data.item.specificData.marketCapInUSD)}</h3>
      
       <h1>Circulating Supply</h1>
       <h3>{(cryptoData.data.item.specificData.circulatingSupply)}</h3>

       <h1>Maximum Supply</h1>
       <h3>{(cryptoData.data.item.specificData.maxSupply)}</h3>
    </div>
  );
};

export default Details;
