import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT: number = 3000;

// Use CORS middleware
app.use(cors());

app.get('/crypto-data', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://rest.cryptoapis.io/market-data/assets/assetId/630629f84e66ce0983f2cd4e?",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "d2c968a30581ab5f5573a717ec5dde7a5f6ba25d",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
