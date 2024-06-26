const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3060;

app.use(cors());
app.use(bodyParser.json());

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
        url: 'http://localhost:3000', // Change this to match your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

let cityGlobal = "";
let startDateGlobal = "";
let endDateGlobal = "";

const dateRefactor = (oldDate) => {
  const desiredYear = oldDate.getFullYear();
  const desiredMonth = String(oldDate.getMonth() + 1).padStart(2, '0'); 
  const desiredDay = String(oldDate.getDate()).padStart(2, '0');
  
  const finalFormat = `${desiredYear}-${desiredMonth}-${desiredDay}`;
  return finalFormat;
}

app.post('/rentCarData', (req, res) => {
  const city = req.body.city;
  const startDate =  new Date(req.body.startDate);
  const endDate =  new Date(req.body.endDate);

  cityGlobal = city;
  startDateGlobal = dateRefactor(startDate);
  endDateGlobal = dateRefactor(endDate);

});

const returnedCar = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
  const carData = JSON.parse(jsonData);
  const currDate = dateRefactor(new Date());

  for (let index = 0; index < 60; index++) {
    if(carData.data[index].endDate <  currDate) {
      carData.data[index].rentalStatus = "available";
    }    
  }

  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(carData, null, 2), 'utf8', err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    res.status(200).send('Rental information updated successfully');
  });
}

/**
 * @swagger
 * /rentCar/:city:
 *   get:
 *     description: Returns all cars for rent
 *     parameters:
 *       - name: city
 *         in: path
 *         description: city for cars
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
app.get('/rentCar', (req, res) => {

  console.log("city" + cityGlobal);
  console.log("startDate" + startDateGlobal);
  console.log("EndDate" + endDateGlobal);
  //returnedCar();

  try {
    const jsonData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    const carData = JSON.parse(jsonData);

    let availableCars = [];
    let availableCarIndex = 0;

    for (let index = 0; index < 60; index++) {
        let firstDate = dateRefactor(new Date(carData.data[index].startDate));
        let lastDate = dateRefactor(new Date(carData.data[index].endDate));

        if(lastDate < startDateGlobal) {
          if(carData.data[index].rentalStatus == "available" && carData.data[index].location == cityGlobal) {
            availableCars[availableCarIndex] = carData.data[index];
            availableCarIndex ++;
          }
        }
    }

    res.status(200).json(availableCars);
  } catch (error) {
      console.error('Error reading data from file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/rentNewCar', (req, res) => {
  const { carId, rentalStatus } = req.body;

  console.log(carId)

  const jsonData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
  const carData = JSON.parse(jsonData);

  const selectedCar = carData.data.find(c => c.id == carId);

  console.log(carData.data.find(c => c.id === carId));

  if (!selectedCar) {
    return res.status(404).send('Car not found');
  }

  selectedCar.rentalStatus = "rent";
  selectedCar.startDate = startDateGlobal;
  selectedCar.endDate = endDateGlobal;


  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(carData, null, 2), 'utf8', err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    res.status(200).send('Rental information updated successfully');
  });

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
