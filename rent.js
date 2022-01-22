import connect_main from './persistance_layer/singlton_main_db.js'
import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const signin_server = express();
signin_server.use(express.json()); 

const urlencodedParser = express.urlencoded({extended: false});


signin_server.listen(3005, () => {
    console.log('Application listening on port 3005!');
});


signin_server.post('/add_agr', urlencodedParser, async(req, res) => { 
      let result = await connect_main.query(`select * from add_agreement('${req.query.id}', '${req.query.st}')`);
      console.log(result.rows[0].add_agreement)
          res.send(JSON.stringify({
            'res': result.rows[0].add_agreement
          }))
      
});

