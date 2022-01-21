import Query_Constructor from '../persistance_layer/query.js';


class CofR{
	constructor(){
		this.handlers = [new Insert(), new SelectMainDB(), new SelectProvider1(), new SelectDetailProvider2(), new SelectProvider2()]
		this.builder = new Query_Constructor()
	}

	async chain(route, body){
		let result = null
		for(let i = 0; i < this.handlers.length; i++){
			if (this.handlers[i].route == route) {
				result = await this.handlers[i].query(body, this.builder)
				return result
			} 
		}
	}

}


class Handler{
	constructor(route){
		this.route = route
	}

	async query(){

	}
} 




class Insert extends Handler{
	constructor(){
		super('/addAd');
	}	
	async query(body, builder){
			try{
				let value_lessor = `'${body.name}', '${body.number_phone}', '${body.email}'`
			let value_ad = `'${body.adress}', '${body.description}', '${body.price}', '${body.area}', '${body.type}'`
			let result = await builder.insert(value_lessor, value_ad)
			return result
			}
			catch(err){
				console.log("Error setting data to main DB. Error in handler \n" + err)
			}
	}
}

class SelectMainDB extends Handler{
	constructor(){
		super('/search_by_price');
	}
	async query(body, builder){
		try{
			const result = await builder.select()
			let arr = []
			for(let i = 0 ; i < result.length; i++){
				if(result[i].declared_price >= body.price_from && result[i].declared_price <= body.price_to)arr.push(result[i])
			}
			return arr;
		}
		catch(err){
			console.log("Error getting data from main DB. Error in handler \n" + err)
		}
	}
}

class SelectProvider1 extends Handler{
	constructor(){
		super('/search');
	}

	async query(body, builder){
		try{
			const result = await builder.select_filter(body.price_from, body.price_to)
			return result;
		}
		catch(err){
			console.log("Error getting data from first provider. Error in handler \n" + err)
		}
	}
}

class SelectProvider2 extends Handler{
	constructor(){
		super('/price-list/');
	}

	async query(body, builder){
		try{
			const result = await builder.select_list(body.number)
			return result;
		}
		catch(err){
			console.log("Error getting data from first provider. Error in handler \n" + err)
		}
	}
}

class SelectDetailProvider2 extends Handler{
	constructor(){
		super('/details/');
	}

	async query(body, builder){
		try{
			const result = await builder.select_details(body.id)
			return result;
		}
		catch(err){
			console.log("Error getting data from first provider. Error in handler \n" + err)
		}
	}
}



export default CofR;

	