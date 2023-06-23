-- now i will seed the table "donuts" with some data
INSERT INTO donuts (name, topping, qty) VALUES ('Grape Escape', 'Grape Jam', 10);
INSERT INTO donuts (name, topping, qty) VALUES ('Cocomotive', 'Chocolate', 19);
INSERT INTO donuts (name, topping, qty) VALUES ('Health Nut', 'Almonds', 15);
INSERT INTO donuts (name, topping, qty) VALUES ('Nuttellingya', 'Nutella', 9);
INSERT INTO donuts (name, topping, qty) VALUES ('Lemongracias', 'Lemon Custard', 3);
INSERT INTO donuts (name, topping, qty) VALUES ('Maybe its Mapleline', 'Maple', 45);
INSERT INTO donuts (name, topping, qty) VALUES ('Clint Yeastwood', NULL, 15);
INSERT INTO donuts (name, topping, qty) VALUES ('Colonel Custard', 'Custard', 26);
INSERT INTO donuts (name, topping, qty) VALUES ('Pecan Sam', 'Pecans', 12);

--in the terminal type psql postgres to connect to the postgres database, then \c donuts_dbto connect to the donuts database, then \i seed.sql to run the seed file
-- once you have run the seed file, you can type SELECT * FROM donuts; to see the data that was inserted into the table