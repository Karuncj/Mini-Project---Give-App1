const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routers
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const organizationRoutes = require('./routes/organizations');
const requirementRoutes = require('./routes/requirements');
const postRoutes = require('./routes/post');
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/organizations`, organizationRoutes);
app.use(`${api}/requirements`, requirementRoutes);
app.use('${api}/post`,postRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'give'
  })
  .then(() => {
    console.log('Database Connection is ready');
    app.listen(8000, () => {
      console.log(api);
      console.log('Server is running');
    });
  })
  .catch((err) => {
    console.log(err);
  });
