import pkg from 'pg';
import { main_db } from './config_main_db.js';

const { Pool } = pkg

class ConnectionMainDB {
    constructor(){
        this.provider_main_db
    }

    connect()
    {
        if (this.provider_main_db !== undefined) return this.provider_main_db;
        else {
            this.provider_main_db = new Pool(main_db);
            return this.provider_main_db;   
        }
    }

}


let connect_main = await new ConnectionMainDB().connect();

export default connect_main;