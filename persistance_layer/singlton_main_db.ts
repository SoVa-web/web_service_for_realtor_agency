import {Pool} from 'pg';
import { main_db } from './config_main_db';

export class ConnectionMainDB {
    private static provider_main_db: Pool

    static init(): boolean 
    {
        return this.provider_main_db !== undefined;
    }

    public static getConnect(): Pool 
    {
        if (this.init()) return this.provider_main_db;
        else {
            this.provider_main_db = new Pool(main_db);
            return this.provider_main_db;   
        }
    }
}
