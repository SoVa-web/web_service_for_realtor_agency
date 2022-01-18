import connect_main from './persistance_layer/singlton_main_db.js';
import Query_Constructor from './persistance_layer/query.js';


const symbol_letters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
const symbol_number = "1234567890"
let number_item = 100000

class Generator{
    constructor(){
        this.connection = connect_main
        this.builder = new Query_Constructor()
    }

    async add_ads(){
        let value_lessor = `'${this.generate_word()}', '${this.generate_number()}', '${this.generate_word()}'`
		let value_ad = `'${this.generate_word()}', '${this.generate_word()}', '${this.generate_number()}', '${this.generate_number()}', '${this.generate_word()}'`
        let result = await this.builder.insert(value_lessor, value_ad)
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

}


const generator = new Generator()

await generator.process()