import pkg from 'pg';
const {Pool} = pkg;
import { config_provoder1 } from './config_provider1.js';

class ConnectionProvider1 {
    constructor(){
        this.provider1_db
    }

    getConnect() 
    {
        if (this.provider1_db !== undefined) return this.provider1_db;
        else {
            this.provider1_db = new Pool(config_provoder1);
            return this.provider1_db;   
        }
    }
}


let connect1 = new ConnectionProvider1().getConnect();

export default connect1;