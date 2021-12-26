import {Pool} from 'pg';
import { config_provoder2 } from './config_provider2';

export class ConnectionProvider2 {
    private static provider2_db: Pool

    static init(): boolean 
    {
        return this.provider2_db !== undefined;
    }

    public static getConnect(): Pool 
    {
        if (this.init()) return this.provider2_db;
        else {
            this.provider2_db = new Pool(config_provoder2);
            return this.provider2_db;   
        }
    }
}
