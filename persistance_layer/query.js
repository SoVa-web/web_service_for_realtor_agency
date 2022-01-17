import connect2 from './singlton_provider2.js';
import connect1 from './singlton_provider1.js';
import connect_main from './singlton_main_db.js';

class Query{
  constructor(){
    this.connection = undefined
    this.string_query  = undefined
  }

  set_connection(connection){
    this.connection = connection
    return this
  }

  set_string_query(str_query){
    this.string_query = str_query
    return this
  }
}

class Query_Constructor{
  constructor(){
    this.query = new Query
  }
  
  async select_filter(lower, uper){ //if prov 1 
    this.query = this.query
                          .set_connection(connect1)
                          .set_string_query(`select*from getting_list_descriptin_by_price('${lower}', '${uper}');`)
    return await this.send_query()
  }

  async select(){ //if main db
    this.query = this.query
                          .set_connection(connect_main)
                          .set_string_query(`select*from getting_list_description();`)
    return await this.send_query()
  }

  async select_list(){ //if prov 2
    this.query = this.query
                          .set_connection(connect2)
                          .set_string_query(`select*from getting_price_list_real_estate_by_name();`)
    return await this.send_query()
  }

  async select_details(id){ //if prov 2
    this.query = this.query
                          .set_connection(connect2)
                          .set_string_query(`select*from getting_detail_by_id_real_estate(${id});`)
    return await this.send_query()
  }

  async send_query(){
    const result = await this.query.connection.query(this.query.string_query)
    return result.rows
  }

  async insert(value_lessor, value_ad){ //if main db
    this.connection =  connect_main
    let id_lessor = await  this.connection.query(`select*from set_lessor(${value_lessor});`);
    let id = id_lessor.rows[0].set_lessor
    let result = await this.connection.query(`select*from set_ad(${id}, ${value_ad});`)
    let id_ad = await result.rows[0].set_ad
    return id_ad;
}
}

/*id_les bigint, adr text, 
										 descr text, price float, 
										 area_m float, type_real_estate varchar (255) */

export default Query_Constructor;