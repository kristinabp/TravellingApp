const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3050;

app.use(cors());
app.use(bodyParser.json());

app.get('/restorantsSug/:city', (req, res) => {
  const city = req.params.city;

  const jsonData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
  res.send(jsonData).json({ message: 'Data received successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
