import redis from "redis";

const client = redis.createClient()

client.on('connect', ()=>{
    console.log("Connection to redis")
})

client.on('error', (err) => {
    console.log(err.message)
})


client.on('end', (err)=>{
    console.log("End connect redis " + err)
})

export default client;