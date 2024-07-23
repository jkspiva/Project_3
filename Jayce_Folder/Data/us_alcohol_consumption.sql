--DROP TABLE in case it already exists

--DROP TABLE US_alcohol;

CREATE TABLE US_alcohol (
	state VARCHAR (50),
	state_abbrev VARCHAR (50),
	year INT,
	beer_per_capita FLOAT,
	wine_per_capita FLOAT,
	spirits_per_capita FLOAT,
	all_beverages FLOAT
);

