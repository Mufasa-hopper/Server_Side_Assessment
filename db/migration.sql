--i will drop the table it it already exists
DROP TABLE IF EXISTS donuts;


--I will need to create the table "dounts"
CREATE table donuts (
    id SERIAL PRIMARY KEY,
    name text,
    topping text,
    qty integer
)

--in the terminal type psql postgres to connect to the postgres database, then \c donuts_db to connect to the donuts database, then \i migration.sql to run the migration file