const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');

dotenv.config({path: './.env'});

connectDB();

const app = express();

app.use(express.json());

const cors = require('cors');

app.use(cors());

app.use('/api/auth',authRoute);
app.use('/api/categories',categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

