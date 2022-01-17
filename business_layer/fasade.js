import ChainOfResponsibility from './CofR.js'

class Fasade{
    constructor(){
        this.chain_of_r = new ChainOfResponsibility()
    }

    async chain(route, body){
        return this.chain_of_r.chain(route, body)
    }
}

export default Fasade;