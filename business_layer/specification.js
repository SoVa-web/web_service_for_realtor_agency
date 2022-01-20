import client from '../redis-server.js'

function pr(){
    client.get(`provider2_10`).then(data => console.log(JSON.parse(data)))
}

export default pr;