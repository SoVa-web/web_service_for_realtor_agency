import {Pool} from 'pg';
import { config_provoder1 } from './config_provider1';

export class ConnectionProvider1 {
    private static provider1_db: Pool

    static init(): boolean 
    {
        return this.provider1_db !== undefined;
    }

    public static getConnect(): Pool 
    {
        if (this.init()) return this.provider1_db;
        else {
            this.provider1_db = new Pool(config_provoder1);
            return this.provider1_db;   
        }
    }
}
