const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3050;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(cors());
app.use(bodyParser.json());

const YELP_API_KEY = 'xspGCZKnbTP7H2oBoqT-FCY4QFTn9y5SuYZj-8afMSOZmxb-Ho0LqpQ6Wk4VSbkj3KbBpAqZygPKltOyIk7CtBpYBIbIuQbDAl7IN0zZvFpp88GWf7jJUypo4lczZnYx';
const apiKey = 'AIzaSyD9B-0oisrbexDlVkhMzoHYyj0lLTE4EXc';

app.get('/restaurants', async (req, res) => {
    const city = req.body.city;


  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        term: 'restaurants', // Search term
        location: 'Paris', // Location
        limit: 30, // Limit the number of results
      },
    });

    const restaurants = response.data.businesses;
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/restorantsSug/:city', (req, res) => {
  const city = req.params.city;

  const jsonData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
  res.send(jsonData).json({ message: 'Data received successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
