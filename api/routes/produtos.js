const fs = require('fs');

module.exports = function(app){

  app.get('/api/lista/produtos', function (req, res) {
    fs.readFile('./api/files/dataBaseMarisa.json', 'utf8', (err, data) => {
      if (err || !data) {
        res.json(err);
      } else {
        let obj = JSON.parse(data); 
        res.json(obj.items);
      }
    });
  });

  app.get('/api/produtos/:id', function (req, res) {
    fs.readFile('./api/files/dataBaseMarisa.json', 'utf8', (err, data) => {
      if (err || !data) {
        res.json(err);
      } else {
        const obj = JSON.parse(data);
        const produto = obj.items.find(item => item.product.id == req.params.id);
        
        if(produto !== undefined){
          res.status(200).json(produto);
        }else{
          res.status(404).json({"error": "true", "Message": "Produto não localizado."});
        }
      }
    });
  });

}
