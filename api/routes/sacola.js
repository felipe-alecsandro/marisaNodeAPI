const fs = require('fs');

module.exports = function(app){

  app.get('/api/total/sacola', function (req, res) {
    fs.readFile('./api/files/dataBaseMarisa.json', 'utf8', (err, data) => {
      if (err || !data) {
        res.json(err);
      } else {
        let obj = JSON.parse(data); 
        var qtdTotal = 0;
        obj.sacola.map(item => qtdTotal += item.qtd);
        res.status(200).json({ totalSacola: qtdTotal });
      }
    });
  });

  app.get('/api/lista/sacola', function (req, res) {
    fs.readFile('./api/files/dataBaseMarisa.json', 'utf8', (err, data) => {
      if (err || !data) {
        res.json(err);
      } else {
        let obj = JSON.parse(data);
        
        if (obj = app.api.util.buildBodyBag(obj)) {
          res.status(200).json(obj);
        } else {
          res.status(500).json({ msg: 'Erro ao buscar os dados no servidor.Tente novamente.' })
        }

      }
    });
  });

  app.put('/api/sacola/insert/:id', function (req, res) {
    fs.readFile('./api/files/dataBaseMarisa.json', 'utf8', (err, data) => {
      if (err || !data) {
        res.json(err);
      } else {

        const idProduct = req.params.id;
        let obj = JSON.parse(data);

        let produto = obj.sacola.find(item => {
          if (item.id == idProduct) {
            ++item.qtd;
            return item;
          }
        });
        if (produto === undefined) {
          res.status(500).json({ error: true, msg: 'Erro ao localizar produto' });
        } else {
          fs.writeFile("./api/files/dataBaseMarisa.json", JSON.stringify(obj), function (err) {
            if (err) {
              res.status(500).json({ error: true, msg: 'Erro interno, tente novamente' });
            } else {
              var qtdTotal = 0;
              obj.sacola.map(item => qtdTotal += item.qtd);
              res.status(200).json({ totalSacola: qtdTotal });
            }
          });
        }
      }
    });
  });

  app.put('/api/sacola/add/:id', function (req, res) {
    fs.readFile('./api/files/dataBaseMarisa.json', 'utf8', (err, data) => {
      if (err || !data) {
        res.json(err);
      } else {

        const idProduct = req.params.id;
        let obj = JSON.parse(data);

        let produto = obj.sacola.find(item => {
          if (item.id == idProduct) {
            ++item.qtd;
            return item;
          }
        });
        if (produto === undefined) {
          res.status(500).json({ error: true, msg: 'Erro ao localizar produto' });
        } else {
          fs.writeFile("./api/files/dataBaseMarisa.json", JSON.stringify(obj), function (err) {
            if (err) {
              res.status(500).json({ error: true, msg: 'Erro interno, tente novamente' });
            } else {
              if(obj = app.api.util.buildBodyBag(obj)){
                res.status(200).json(obj);
              }
            }
          });
        }
      }
    });
  });

  app.put('/api/sacola/rm/:id', function (req, res) {
    fs.readFile('./api/files/dataBaseMarisa.json', 'utf8', (err, data) => {
      if (err || !data) {
        res.json(err);
      } else {

        const idProduct = req.params.id;
        let obj = JSON.parse(data);

        let produto = obj.sacola.find(item => {
          if (item.id == idProduct && item.qtd > 0) {
            --item.qtd;
            return item;
          }
        });
        if (produto === undefined) {
          res.status(500).json({ error: true, msg: 'Erro ao localizar produto' });
        } else {
          fs.writeFile("./api/files/dataBaseMarisa.json", JSON.stringify(obj), function (err) {
            if (err) {
              res.status(500).json({ error: true, msg: 'Erro interno, tente novamente' });
            } else {
              if(obj = app.api.util.buildBodyBag(obj)){
                res.status(200).json(obj);
              }
            }
          });
        }
      }
    });
  });

  app.delete('/api/sacola/:id', function (req, res) {
    fs.readFile('./api/files/dataBaseMarisa.json', 'utf8', (err, data) => {
      if (err || !data) {
        res.json(err);
      } else {

        const idProduct = req.params.id;
        let obj = JSON.parse(data);

        let produto = obj.sacola.find(item => {
          if (item.id == idProduct) {
            item.qtd = 0;
            return item;
          }
        });
        if (produto === undefined) {
          res.status(500).json({ error: true, msg: 'Erro ao localizar produto' });
        } else {
          fs.writeFile("./api/files/dataBaseMarisa.json", JSON.stringify(obj), function (err) {
            if (err) {
              res.status(500).json({ error: true, msg: 'Erro interno, tente novamente' });
            } else {
              if(obj = app.api.util.buildBodyBag(obj)){
                res.status(200).json(obj);
              }
            }
          });
        }
      }
    });
  });

}
