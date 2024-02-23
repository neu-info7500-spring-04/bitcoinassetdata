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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cryptoData || !cryptoData.data || !cryptoData.data.item) {
    return <div>Data not available</div>;
  }

  const { latestRate, specificData } = cryptoData.data.item;

  const formatChange = (change) => {
    const roundedChange = parseFloat(change).toFixed(2);
    return roundedChange;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Arial, sans-serif" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>BITCOIN</h2>
        <h2>About Bitcoin</h2>
        <p>Bitcoin (BTC) is a digital asset, its price now is {latestRate.amount} USD.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <thead>
            <tr>
              <th colSpan="2">Market Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <img
                  src={`data:image/png;base64,${cryptoData.data.item.assetLogo.imageData}`}
                  alt="Bitcoin"
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Value:</strong></td>
              <td>${latestRate.amount}</td>
            </tr>
            <tr>
              <td><strong>Market Cap:</strong></td>
              <td>{specificData.marketCapInUSD}</td>
            </tr>
            <tr>
              <td><strong>Asset Type:</strong></td>
              <td>{specificData.assetType}</td>
            </tr>
            <tr>
              <td><strong>Circulating Supply:</strong></td>
              <td>{specificData.circulatingSupply}</td>
            </tr>
            <tr>
              <td><strong>Maximum Supply:</strong></td>
              <td>{specificData.maxSupply}</td>
            </tr>
            <tr>
              <td><strong>Change (1 Hour):</strong></td>
              <td>{formatChange(specificData["1HourPriceChangeInPercentage"])}%</td>
            </tr>
            <tr>
              <td><strong>Change (1 Day):</strong></td>
              <td>{formatChange(specificData["24HoursPriceChangeInPercentage"])}%</td>
            </tr>
            <tr>
              <td><strong>Change (1 Week):</strong></td>
              <td>{formatChange(specificData["1WeekPriceChangeInPercentage"])}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
