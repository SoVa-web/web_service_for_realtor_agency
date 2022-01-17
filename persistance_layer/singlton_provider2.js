import pkg from 'pg';
import { config_provoder2 } from './config_provider2.js';

const {Pool} = pkg

class ConnectionProvider2 {
    constructor(){
        this.provider2_db
    }

    getConnect()
    {
        if (this.provider2_db !== undefined) return this.provider2_db;
        else {
            this.provider2_db = new Pool(config_provoder2);
            return this.provider2_db;   
        }
    }
}



let connect2 = new ConnectionProvider2().getConnect();

export default connect2;