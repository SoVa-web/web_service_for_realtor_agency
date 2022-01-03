import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fasade from './business_layer/fasade.js';


const service1 = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const urlencodedParser = express.urlencoded({extended: false});//********************************************************** */

service1.use(express.static(path.join(__dirname)));//******************************************************************* */


service1.listen(3001, () => {
    console.log('Application listening on port 3001!');
});


service1.post('/search', urlencodedParser, async function (//done
  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
  else{
    let result = await fasade.chainOfResponsibility(request.path, request.query)
    console.log("Sucsessfully got data from provider 1 \n"  + result)
   response.send(
     result
   )
  
  }
  
});
