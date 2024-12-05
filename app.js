require('dotenv').config();
const express = require('express');
const connectDatabase = require('./backend/config/db');
const userRoutes = require('./backend/routes/userRoutes');

connectDatabase();

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || '5000';

app.listen(parseInt(PORT, 10), () => {
    console.log(`listen on http://localhost:${PORT}`);
})