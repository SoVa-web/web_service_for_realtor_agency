import connect2 from './singlton_provider2.js';
import connect1 from './singlton_provider1.js';
import connect_main from './singlton_main_db.js';


class Builder {
  constructor() {
    this.connection
  }


  async select_filter(lower, uper){ //if prov 1
    this.connection = connect1
    const result = await this.connection.query(`select*from getting_list_descriptin_by_price('${lower}', '${uper}');`)
    console.log("builder \n " + result.rows)
    return result.rows
  }

  async select(){ //if main db
    this.connection = connect_main
    const result = await this.connection.query(`select*from getting_list_description();`)
    return result.rows
  }

  async select_list(){ //if prov 2
    this.connection = connect2
    const  result = await this.connection.query(`select*from getting_price_list_real_estate_by_name();`);
    return result.rows;
  }

  async select_details(id){ //if prov 2
    this.connection = connect2
    const result  = await this.connection.query(`select*from getting_detail_by_id_real_estate(${id});`)
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

export {Builder};