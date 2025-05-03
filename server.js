const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const port = 3000;

app.use('/', routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});