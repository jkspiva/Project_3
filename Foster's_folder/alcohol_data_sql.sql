create table alcohol (
	state varchar(32),
	state_abrev varchar (2),
	year int,
	beer_per_capita float,
	wine_per_capita float,
	spirits_per_capita float,
	all_alc float
);
drop table alcohol

select * from alcohol

select *
from alcohol
where year = 2016

select *
from alcohol
where year = 2015

select *
from alcohol
where year = 2014

select *
from alcohol
where year = 2013

select *
from alcohol
where year = 2012

select *
from alcohol
where year = 2011

select *
from alcohol
where year = 2010

select *
from alcohol
where year = 2009

select *
from alcohol
where year = 2008

select *
from alcohol
where year = 2007

select *
from alcohol
where year = 2006

select *
from alcohol
where year = 2005

select *
from alcohol
where year = 2004

select *
from alcohol
where year = 2003

select *
from alcohol
where year = 2002

select *
from alcohol
where year = 2001

select AVG(all_alc)
from alcohol
where state = 'New Hampshire'