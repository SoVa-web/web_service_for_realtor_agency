import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as http from 'http'
import Fasade from './business_layer/fasade.js';
import cache from './cach.js'
import fetch from 'cross-fetch';
import client from './redis-server.js';
import bodyParser from 'express';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import cors from 'cors';
import retry from 'retry'


var operation = retry.operation({
  retries: 5,
  factor: 3,
  minTimeout: 1 * 1000,
  maxTimeout: 60 * 1000,
  randomize: true,
});



client.connect()

const max_number_price = '999999999999'

const fasade = new Fasade()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(cors())


const urlencodedParser = express.urlencoded({extended: false});//********************************************************** */

app.use(express.static(path.join(__dirname)));//******************************************************************* */

app.listen(3000, () => {
  console.log('Application listening on port 3000!');
  caching()
});

app.use(bodyParser.json());

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


app.post('/all_db/', urlencodedParser, async function(
  request,
  response
){
  if (!request.body) return response.sendStatus(400)
  else{

    let result = await fasade.spesification(request.body)
  
   response.send(
     result
   )
  
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


app.get("/search"/* to builder */, urlencodedParser, async function (request, response) {//done

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

  http.get(config_options, async function (res) {
    res.setEncoding('utf8')

    let data = ''

    res.on('data', function (item_data) {
      data += item_data.toString()
    });

    res.on('end', async  function () {
      console.log(typeof(JSON.parse(data)))
      response.send(JSON.parse(data));
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

    res.on('data', function (item_data) {
      data += item_data.toString()
      console.log("we heere \n ")
    });

    res.on('end', function () {
      response.send(data);
    })

  });
});

function caching(){
  cache_prov1()
  cache_prov2()
  //client.get("provider2").then(data => console.log (data))
  //client.get("provider1").then(data => console.log (data))
}

function cache_prov2(){
  let bufer = []
  let num_p = 11

  function do_req(num){
     var config_options = {//conctuctor url
        host: 'localhost',
        port: 3002,//to builder
        path: `/price-list/?number=${num}`,
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
      });
      
      res.on('end', async function () {
          await client.set(`provider2_${num}`,  JSON.stringify(JSON.parse(data))).then(err => {
            console.log("Setting " + err)
          })
       
      })

    });
  } 

  for( let i =0; i < num_p; i++){
    do_req(i)
  }
}


function cache_prov1(){

  var config_options = {//conctuctor url
    host: 'localhost',
    port: 3001,/* to builder */
    path: `/search?price_from=0&price_to=${max_number_price}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'mode': 'cors'
    }
  };

  http.get(config_options, async function (res) {
    res.setEncoding('utf8')

    let data = ''

    res.on('data', function (item_data) {
      data += item_data.toString()
    });

    res.on('end', async  function () {
      await client.set("provider1", JSON.stringify(JSON.parse(data))).then(err => {
        console.log("Setting " + err)
      })
    })
  });
}


app.post('/add_agr', urlencodedParser, async function (
  req,
  result
) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  let id = req.query.id
  let st = req.query.st

  var config_options = {//conctuctor url
    host: 'localhost',
    port: 3005,/* to builder */
    path: `/add_agr?id=${id}&st=${st}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'mode': 'cors'
    }
  };

  http.get(config_options, async function (res) {
    res.setEncoding('utf8')

    let data = ''

    res.on('data', function (item_data) {
      data += item_data.toString()
    });

    res.on('end', async  function () {
      if (typeof(JSON.parse(data).res) == "number"){
        result.status(200).send("Well");
      }else{
        result.status(404).send("Not found");
      }
      
      
    })
  });

  

})

////////////////////////////////////////////////////////////////////////////////////////

var PROTO_PATH = './proto/user.proto';

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     defaults: true,
     oneofs: true
    });
var reg_proto = grpc.loadPackageDefinition(packageDefinition).reg;


///////////////////////////////////////////////////////////////

app.post('/register', urlencodedParser, async function (
  req,
  res
) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  let name = req.query.name
  let phone = req.query.phone
  let login = req.query.login
  let password = req.query.password

  let obj_user = {
    "name": name,
    "phone": phone,
    "login": login,
    "password": password
  }

  var client = new reg_proto.Users('localhost:3003',
  grpc.credentials.createInsecure());

  client.CreateUser(obj_user, function(err, response) {
    console.log(response);
    res.send(response)
  });

})



var PROTO_PATH = './proto/authentication.proto';

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     defaults: true,
     oneofs: true
    });
var auto_proto = grpc.loadPackageDefinition(packageDefinition).auto;

app.post('/signin',urlencodedParser, async function (

  req,
  res
) {
  let login = req.query.log
  let password = req.query.pas

  let auth_obj = {
    "password": password,
    "login": login
  }


  var client = new auto_proto.Data('localhost:3004',
  grpc.credentials.createInsecure());

  client.SignInUser(auth_obj, function(err, response) {
    console.log(response)
    if (response.status == 1){
      res.status(200).send("Well");
    }else{
      res.status(404).send("Not found");
    }
  });

})

