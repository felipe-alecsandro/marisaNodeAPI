const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

module.exports = function(){
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  consign()
   .include('./api/routes')
   .then('./api/util')
   .into(app);

  app.use(function (req, res, next) {
    res.status(404).json({"error": "true", "Message": "Endpoint Inexistente."});
    next();
  });

  return app;
}
