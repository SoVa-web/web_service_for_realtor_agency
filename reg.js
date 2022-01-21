//import express from 'express';
//import path from 'path';
//import { fileURLToPath } from 'url';
//import { dirname } from 'path';
import connect_main from './persistance_layer/singlton_main_db.js'

/*const reg_server = express();
reg_server.use(express.json()); 

const urlencodedParser = express.urlencoded({extended: false});


reg_server.listen(3003, () => {
    console.log('Application listening on port 3003!');
});

reg_server.post('/register', urlencodedParser, async(req, res) => { 
    console.log(req.query.name) 
    const result = await connect_main.query(`select*from reg_w('${req.query.name}', '${req.query.phone}', '${req.query.login}', '${req.query.password}');`)
    console.log(result.rows[0].reg_w)
    res.send(JSON.stringify({
        'res': result.rows[0].reg_w
    }))
});*/

///////////////////////

var PROTO_PATH = './proto/user.proto';

import * as grpc_load from '@grpc/grpc-js';
import * as grpc_load_sync from '@grpc/proto-loader'

var packageDefinition = grpc_load_sync.loadSync(
    PROTO_PATH,
    {keepCase: true,
     defaults: true,
     oneofs: true
    });
var reg_proto = grpc_load.loadPackageDefinition(packageDefinition).reg;

async function CreateUser(call, callback) {
    const result = await connect_main.query(`select*from reg_w('${call.request.name}', '${call.request.phone}', '${call.request.login}', '${call.request.password}');`)
    callback(null, {
        id: result.rows[0].reg_w
    })
}

function main() {
  var server = new grpc_load.Server();
  server.addService(reg_proto.Users.service, {CreateUser: CreateUser});
  server.bindAsync('127.0.0.1:3003', grpc_load.ServerCredentials.createInsecure(), () => {
    console.log("Grpc 3003 is started!")
    server.start();
  });

}

main();