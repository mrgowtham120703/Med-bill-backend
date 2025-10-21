const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const  connectDB  = require('./src/config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

connectDB();

// routes
app.use('/api/providers', require('./src/routes/provider'));
app.use('/api/patients', require('./src/routes/patient'));
app.use('/api/claim', require('./src/routes/claim'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));