const express = require('express');
const config = require('./config');
const errorMiddleware = require('./Middleware/error.middleware');
const apiRoute = require('./routes');
const app = express();
const port = config.port || 3000;
app.use(express.json());
app.use('/api', apiRoute);

app.use((req, res) => {
  throw Error;
});

app.use(errorMiddleware);
app.listen(port, console.log('app is listening to port ' + port));
