import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Fasade from './business_layer/fasade.js';

const fasade = new Fasade()


const service2 = express();

const urlencodedParser = express.urlencoded({extended: false});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

service2.use(express.static(path.join(__dirname)));


service2.listen(3002, () => {
    console.log('Application listening on port 3002!');
});


service2.post('/price-list/', urlencodedParser, async function (//done
  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
  else{
    let result = await fasade.chain(request.path, request.query)
    console.log("Sucsessfully got data from provider 2 \n")
   response.send(
     result
   )
  
  }
  
});

service2.post('/details/', urlencodedParser, async function (//done
  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
  else{
    let result = await fasade.chain(request.path, request.query)
    console.log("Sucsessfully got data from provider 2 \n"  + result)
   response.send(
     result
   )
  
  }
  
});




