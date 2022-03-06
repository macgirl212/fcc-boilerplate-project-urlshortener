require('dotenv').config();
const bodyParser = require('body-parser')
const connectDB = require('./db/connect')
const cors = require('cors');
const express = require('express');
const urls = require('./routes/urls')

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded())

app.use('/public', express.static(`${process.cwd()}/public`));

// routes
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api/shorturl', urls)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is connected to database and listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()