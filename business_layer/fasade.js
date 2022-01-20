import ChainOfResponsibility from './CofR.js'
import Specification from './specification.js';

class Fasade{
    constructor(){
        this.chain_of_r = new ChainOfResponsibility()
        this.spec = new Specification()
    }

    async chain(route, body){
        return this.chain_of_r.chain(route, body)
    }

    spesification(body){
        return this.spec.implementation(body)
    }
}

export default Fasade;