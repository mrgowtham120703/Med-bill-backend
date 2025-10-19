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