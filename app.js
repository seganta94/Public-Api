import express from "express";
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const apiKey = "3ade1154e4af90628021c0f3f9efd187"

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.post('/stock', async (req, res) => {
  const apiUrl = 'http://api.marketstack.com/v1/eod';
  const stockTicketSymbol = req.body.stockTicker

  try {
    const result = await axios.get(apiUrl, {
      params: {
        access_key: apiKey,
        symbols: stockTicketSymbol
      }
    });

    const stockData = result.data.data[0];

    res.render('index.ejs', { content: stockData });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})
