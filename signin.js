/*import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const signin_server = express();
signin_server.use(express.json()); 

const urlencodedParser = express.urlencoded({extended: false});


signin_server.listen(3004, () => {
    console.log('Application listening on port 3004!');
});


signin_server.post('/signin', urlencodedParser, async(req, res) => { 
      let result = await connect_main.query(`select * from worker where email = '${req.query.log}' and password = '${req.query.pas}'`);
      console.log(result.rows)
      if (result.rows.length == 0) {
        res.send(JSON.stringify({
            'res': 0
          }))
      }else{
          res.send(JSON.stringify({
            'res': 1
          }))
      }
      
});*/

import connect_main from './persistance_layer/singlton_main_db.js'

var PROTO_PATH = './proto/authentication.proto';

import * as grpc_load from '@grpc/grpc-js';
import * as grpc_load_sync from '@grpc/proto-loader'

var packageDefinition = grpc_load_sync.loadSync(
    PROTO_PATH,
    {keepCase: true,
     defaults: true,
     oneofs: true
    });
var auto_proto = grpc_load.loadPackageDefinition(packageDefinition).auto;

async function SignInUser(call, callback) {
  let result = await connect_main.query(`select * from worker where email = '${call.request.login}' and password = '${call.request.password}'`);
    
  let status = undefined
  console.log(result.rows)
      if (result.rows.length == 0) {
        status = 0
      }else{
        status = 1
      }

  callback(null, {
    status: status
  })
}

function main() {
  var server = new grpc_load.Server();
  server.addService(auto_proto.Data.service, {SignInUser: SignInUser});
  server.bindAsync('127.0.0.1:3004', grpc_load.ServerCredentials.createInsecure(), () => {
    console.log("Grpc 3004 is started!")
    server.start();
  });

}

main();