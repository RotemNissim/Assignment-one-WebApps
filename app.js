const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes');
const mongoConnectionString = process.env.CONNECTION_STRING;
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());

mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.use(postRoutes);
// app.use(commentRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
