create table lessor(
ID bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
full_name  varchar (255) NOT NULL, 
phone_number varchar (255),
email varchar (255) NOT NULL,
login varchar (255) NOT NULL,
"password" varchar (255) NOT NULL,
contact_phone_number varchar (255),
contact_email varchar (255) NOT NULL
)

create table employee(
ID bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
full_name  varchar (255) NOT NULL, 
phone_number varchar (255),
email varchar (255) NOT NULL,
login varchar (255) NOT NULL,
"password" varchar (255) NOT NULL,
position_name varchar (255) NOT NULL,
permission varchar (255) NOT NULL
)

create table real_estate(
ID bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
id_lessor bigint NOT NULL,
id_realtor bigint NOT NULL,
adress varchar (255) NOT NULL,
description text,
declared_price float,
area float NOT NULL,
"type" varchar (255) NOT NULL,
FOREIGN KEY(id_lessor) REFERENCES lessor(ID),
FOREIGN KEY(id_realtor) REFERENCES employee(ID)
)

create table photo(
ID bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
id_real_estate bigint NOT NULL,
link text NOT NULL,
FOREIGN KEY(id_real_estate) REFERENCES real_estate(ID)
)

create table agreement(
ID bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
id_real_estate bigint NOT NULL,
status varchar (255) NOT NULL,
approved_lessor bool NOT NULL,
approved_notary bool NOT NULL,
date_signing date,
FOREIGN KEY(id_real_estate) REFERENCES real_estate(ID)
)
/*for all db*/

insert into lessor (full_name, phone_number, email, login,
					"password", contact_phone_number, contact_email)
values ('Mark Markov', '+3806777777777', 'mark.mark.w@gmail.com', 'mark',
		'afrsdrfctgvhb3', '+3806775555577', 'mark.w@outlook.com')
	   
select*from lessor

insert into employee (full_name, phone_number, email, login,
					"password", position_name, permission)
values ('Olha Suprun', '+380675547832', 'olha.suprun.w@gmail.com', 'sova', 'asdsfregrthg23',
		'realtor', 'admin')
	   
select*from employee

insert into real_estate (id_lessor, id_realtor, adress, description, declared_price, area, type)
values (1, 1, 'м. Київ, Єдинорога 7, квартира 16', 
		'рожеві шпалери, ламінатне покриття на підлозі, меблі є', 
		'34.65', '255.65', 'житлове приміщення, квартира')

select*from real_estate
/******************************************************************************/



/* for Provider 2 */

select getting_price_list_real_estate()

CREATE OR REPLACE FUNCTION public.getting_price_list_real_estate()
 RETURNS TABLE(id_real_estate bigint, price float, type_name character varying)
 LANGUAGE sql
AS $function$ 
	select   distinct 
	real_estate.ID as id_real_estate,  real_estate.declared_price * real_estate.area as price, real_estate.type as type_name
	from real_estate 
$function$

select getting_detail_by_id_real_estate_by_realtor(1)
CREATE OR REPLACE FUNCTION public.getting_detail_by_id_real_estate_by_realtor(id_real_estate bigint)
 RETURNS TABLE(adress character varying, description text, declared_price float, area float, 
			   "type" character varying,
			   realtor_name character varying, contact_number_realtor character varying,
			   contact_email_realtor  character varying,
			   lessor_name character varying, contact_number_lessor character varying,
			   contact_email_lessor  character varying)
 LANGUAGE sql
AS $function$ 
	select   distinct 
	real_estate.adress as adress, real_estate.description as description, 
	real_estate.declared_price as declared_price,
	real_estate.area as area, real_estate.type as "type",
	employee.full_name as realtor_name, employee.phone_number as contact_number_realtor,
	employee.email as contact_email_realtor,
	lessor.full_name as lessor_name, lessor.contact_phone_number as contact_number_lessor,
	lessor.contact_email as contact_email_lessor
	from real_estate
	inner join employee on real_estate.id_realtor = employee.ID
	inner join lessor on lessor.ID = real_estate.id_lessor 
	where real_estate.ID = id_real_estate
$function$