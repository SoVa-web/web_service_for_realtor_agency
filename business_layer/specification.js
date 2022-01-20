import client from '../redis-server.js'
import Query_Constructor from '../persistance_layer/query.js';

const builder = new Query_Constructor()


class Specification{
    implementation(body){
        let onlyPrice = new OnlyPrice(body)
        let truthOnlyPrice = onlyPrice.check()
        if (truthOnlyPrice) return filterPrice(body)

        let onlyType = new OnlyType(body)
        let truthOnlyType = onlyType.check()
        if (truthOnlyType) return filterType(body)

        let typeAndPrice = new TypeAndPrice(body)
        let truthTypeAndPrice = typeAndPrice.check()
        if (truthTypeAndPrice) return filterTypeAndPrice(body)
        
        return {};
    }
}


class CompositeSpecification {
    constructor(body){
        this.price_from
        this.price_to
        this.type_real_estate
    }

    check(){

    }
}


class OnlyPrice extends CompositeSpecification{
    constructor(body){
        super(body)
        this.price_from = body.price_from
        this.price_to = body.price_to
        this.type_real_estate = body.type_real_estate
    }

    check(){
        if (this.price_from != '' && this.price_to != '' && this.type_real_estate == '') return true;
        else return false;
    }

}

class OnlyType extends CompositeSpecification{
    constructor(body){
        super(body)
        this.price_from = body.price_from
        this.price_to = body.price_to
        this.type_real_estate = body.type_real_estate
    }

    check(){
        if (this.price_from == '' && this.price_to == '' && this.type_real_estate != '') return true;
        else return false;

    }

}

class TypeAndPrice extends CompositeSpecification{
    constructor(body){
        super(body)
        this.price_from = body.price_from
        this.price_to = body.price_to
        this.type_real_estate = body.type_real_estate
    }

    check(){
        if (this.price_from != '' && this.price_to != '' && this.type_real_estate != '') return true;
        else return false;

    }

}

async function filterPrice(body){
    let arr_res = []
    let mainRes = await builder.select()
    let el = {}
    for(let i = 0 ; i < mainRes.length; i++){
        if(mainRes[i].declared_price >= body.price_from && mainRes[i].declared_price <= body.price_to){
            el = mainRes[i]
            el["source"] = "main"
            arr_res.push(el)
        }
    }

    let prov1 = await client.get("provider1")
    let res = JSON.parse(prov1)
    for(let i =0; i < res.length; i++){
        if(res[i].declared_price >= body.price_from && res[i].declared_price <= body.price_to){
            el = res[i]
            el["source"] = "prov1"
            arr_res.push(el)
        }
    }

    for (let i =0; i < 11; i++){
        prov1 = await client.get(`provider2_${i+1}`)
        res = JSON.parse(prov1)
        for(let i =0; i < res.length; i++){
            if(res[i].price >= body.price_from && res[i].price <= body.price_to){
                el = res[i]
                el["source"] = "prov2"
                arr_res.push(el)
            }
        }
    }
   
    return {
        "filter price result": arr_res
    }
}

function filterType(body){
    return {}
}


function filterTypeAndPrice(body){
    return {}
}


export default Specification;