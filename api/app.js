const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: '../.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
