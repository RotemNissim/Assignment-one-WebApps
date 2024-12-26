const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const postRoutes = require('./routes/postRoutes');
const postsController = require('./controllers/postController');
const postsController = require('./controllers/commentController');

const mongoConnectionString = process.env.CONNECTION_STRING;
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
mongoose.connect(mongoConnectionString)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit the application if the connection fails
    });


app.use(postRoutes);
app.use(commentRoutes);
app.use('/api', postsController);
app.use('/api', commentController);

app.listen(port, () => console.log(`Server running on port ${port}`));
