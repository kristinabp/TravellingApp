const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3050;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(cors());
app.use(bodyParser.json());

const YELP_API_KEY = 'xspGCZKnbTP7H2oBoqT-FCY4QFTn9y5SuYZj-8afMSOZmxb-Ho0LqpQ6Wk4VSbkj3KbBpAqZygPKltOyIk7CtBpYBIbIuQbDAl7IN0zZvFpp88GWf7jJUypo4lczZnYx';
const apiKey = 'AIzaSyD9B-0oisrbexDlVkhMzoHYyj0lLTE4EXc';

const cities = {
  europe: ['London', 'Paris', 'Berlin', 'Madrid', 'Rome'],
  usa: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'Documentation for Express API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

let cityGlobal = "";

app.post('/restaurantsData', async (req, res) => {
  const jsonString = JSON.stringify(req.body.city);
  var city = jsonString.replace(/"/g, '');
  cityGlobal = city;
});

/**
 * @swagger
 * /restaurants:
 *   get:
 *     description: Returns all restorants
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
app.get('/restaurants', async (req, res) => {

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        term: 'restaurants',
        location: `${cityGlobal}`,
        limit: 30,
      },
    });

    const restaurants = response.data.businesses;
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * @swagger
 * /cities/europe:
 *   get:
 *     description: Returns all cities in Europe
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
app.get('/cities/europe', (req, res) => {
  res.status(200).json(cities.europe);
});

/**
 * @swagger
 * /cities/usa:
 *   get:
 *     description: Returns all cities in USA
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
app.get('/cities/usa', (req, res) => {
  res.status(200).json(cities.usa);
});

/**
 * @swagger
 * /restorantsSug/:city:
 *   get:
 *     description: Returns all restorants
 *     parameters:
 *       - name: city
 *         in: path
 *         description: city for restorants
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
app.get('/restorantsSug/:city', (req, res) => {
  const city = req.params.city;

  const jsonData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
  res.send(jsonData).json({ message: 'Data received successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
