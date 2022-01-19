import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as http from 'http'
import Fasade from './business_layer/fasade.js';

const fasade = new Fasade()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const urlencodedParser = express.urlencoded({extended: false});//********************************************************** */

app.use(express.static(path.join(__dirname)));//******************************************************************* */

app.listen(3000, () => {
  console.log('Application listening on port 3000!');
});

app.post('/addAd', urlencodedParser,  async function (//done
  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
  else {
    let result = await fasade.chain(request.originalUrl, request.body)
    response.send("Inserted in DB, ID = " + result)
  }

 
})


app.post('/search_by_price', urlencodedParser, async function (//done
  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
  else{
    let result = await fasade.chain(request.originalUrl, request.body)
    console.log(result[0][0])
  
   response.send(
     result
   )
  
  }
  
})


app.get("/search"/* to builder */, urlencodedParser, function (request, response) {//done

  var config_options = {//conctuctor url
    host: 'localhost',
    port: 3001,/* to builder */
    path: request.originalUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'mode': 'cors'
    }
  };

  http.get(config_options, function (res) {
    res.setEncoding('utf8')

    let data = ''

    res.on('data', function (item_data) {
      data += item_data.toString()
      console.log("we heere \n " + data)
    });

    res.on('end', function () {
      response.send(data);
    })

  });
});






app.get('/price-list/'/* to builder */, urlencodedParser, function (request, response) {

  var config_options = {//conctuctor url
    host: 'localhost',
    port: 3002,//to builder
    path: request.originalUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'mode': 'cors'
    }
  };

  http.get(config_options, function (res) {
    res.setEncoding('utf8')

    let data = ''

    res.on('data', function (item_data) {
      data += item_data.toString()
      console.log("we heere \n ")
    });

    res.on('end', function () {
      response.send(data);
    })

  });
});



app.get('/details/*'/* to builder */, urlencodedParser, function (request, response) {

  var config_options = {//conctuctor url
    host: 'localhost',
    port: 3002,//to builder
    path: request.originalUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'mode': 'cors'
    }
  };

  http.get(config_options, function (res) {
    res.setEncoding('utf8')

    let data = ''

    res.on('data', function (chuitem_datank) {
      data += item_data.toString()
      console.log("we heere \n ")
    });

    res.on('end', function () {
      response.send(data);
    })

  });
});
