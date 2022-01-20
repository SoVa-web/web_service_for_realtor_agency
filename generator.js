import connect_main from './persistance_layer/singlton_main_db.js';
import connect_provider2 from './persistance_layer/singlton_provider2.js';

import Query_Constructor from './persistance_layer/query.js';


const symbol_letters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
const symbol_number = "1234567890"
let number_item = 50000

class Generator{
    constructor(connect){
        this.connection = connect
    }

    async add_ads(){
        let value_lessor = `'${this.generate_word()}', '${this.generate_number()}', '${this.generate_word()}'`
		let value_ad = `'${this.generate_word()}', '${this.generate_word()}', '${this.generate_number()}', '${this.generate_number()}', '${this.generate_word()}'`
        let result = await this.insert(value_lessor, value_ad)
    }

    generate_word(){
        let str = `${symbol_letters[this.rand(symbol_letters.length)]}`
        let random_len = this.rand(100)
        for( let i = 0; i < random_len; i++){
            str += symbol_letters[this.rand(symbol_letters.length)]
        }
        return str
    }

    generate_number(){
        let str = `${symbol_number[this.rand(symbol_number.length - 1)]}`
        let random_len = this.rand(20)
        for( let i = 0; i < random_len; i++){
            str += symbol_number[this.rand(symbol_number.length)]
        }
        return str
    }

    rand(uper){
        return Math.floor(Math.random() * uper)
    }

    async process(){
        console.log("start generation")
        while(number_item > 0){
            number_item -= 1
            await this.add_ads()
        }
        console.log("end generation")
    }

    async insert(value_lessor, value_ad){ //if main db
        let id_lessor = await  this.connection.query(`select*from set_lessor(${value_lessor});`);
        let id = id_lessor.rows[0].set_lessor
        let result = await this.connection.query(`select*from set_ad(${id}, ${value_ad});`)
        let id_ad = await result.rows[0].set_ad
        return id_ad;
    }

}


const generator = new Generator(connect_main)
//const gen_prov1 = new Generator(connect_provider2)

await generator.process()
//await gen_prov1.process()
