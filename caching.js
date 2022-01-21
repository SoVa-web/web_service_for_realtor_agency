import connect1 from "./persistance_layer/singlton_provider1.js";
import connect2 from "./persistance_layer/singlton_provider2.js";
import cache from "./cach.js";

async function caching(source, data){
    for(let i =0; i < data.length; i++){
        data[i]["source"] = source
        cache.push(data[i])
    }
}

export default caching;