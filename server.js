// To make the restful server with CRUD functionality, import express and pg to start.
const express = require('express');
const app = express();
const { Pool } = require('pg');

//here is the port that the server will be listening on
const port = 3008;

const pool = new Pool({ //this pool is the connection to the database
    user: "matthewhopper",
    host: "localhost",
    database: "donuts_db",
    port: 5432
});

app.use(express.static("public")); // this middleware lets us use the public folder to serve static files, but this is not needed for this project, I'm just leaving it here for reference
app.use(express.json()); // this is a middleware that allows us to parse json data and use it in our server

// now i have to define routes for my server to use (CRUD)

// READ
app.get("/donuts_db", async (req, res) => { // this is the route for reading all the donuts in the database
    try{ // the response data needs to be all the donuts in the database and return a 200 status code
        const results = await pool.query('SELECT * FROM donuts');
        res.status(200).json(results.rows); // this is the response data that return all the donuts in the database
    } catch(err) {
        console.error(err);
        res.status(500).send("Problem getting donuts from donuts_db");
    }
});

// READ 1
app.get("/donuts_db/:id", async (req, res) => { // this is the route for reading one donut in the database
    const { id } = req.params; // this destructured id is the id of the donut that is being requested
    try { // i need to return a 404 if a non-existent id is given
        const results = await pool.query('SELECT * FROM donuts WHERE id = $1', [id]);
        if(results.rows.length === 0) {
            res.status(404).send("Donut not found");
        } else {
            res.status(200).json(results.rows[0]);
        } // this is the response data that returns one donut in the database
    } catch(err) {
        console.error(err);
        res.status(500).send("Problem getting donut from donuts_db");
    }
});

// CREATE
app.post("/donuts_db", async (req, res) => { // this is the route for creating a donut in the database
    const {name, topping, qty} = req.body; 
    try{
        const result = await pool.query('INSERT INTO donuts (name, topping, qty) VALUES ($1, $2, $3) RETURNING *', [name, topping, qty]);
        // an example of what the req.body would look like is {name: "chocolate", topping: "sprinkles", qty: 1}
        // the response data should be the newly created donut and a 201 status code
        res.status(201).json(result.rows[0]);
    } catch(err) {
        console.error(err);
        res.status(500).send("Problem creating donut in donuts_db");
    }
});

// UPDATE
app.patch("/donuts_db/:id", async (req, res) => {
    const { id } = req.params;
    const {name, topping, qty} = req.body;
    try { // this also needs to return a 404 if a non-existent id is given
        const result = await pool.query('UPDATE donuts SET name = $1, topping = $2, qty = $3 WHERE id = $4 RETURNING *', [name, topping, qty, id]);
        if(result.rows.length === 0) {
            res.status(404).send(" The donut was not found");
        } else {
            res.status(200).json(result.rows[0]);
        } // the response data should be the updated donut and 200 status code
    } catch(err) {
        console.error(err);
        res.status(500).send("Problem updating donut in donuts_db");
    }
});

// lastly, DELETE
app.delete("/donuts_db/:id", async (req, res) => {
    const { id } = req.params;
    try { // this also needs to return a 404 if a non-existent id is given
        const result = await pool.query('DELETE FROM donuts WHERE id = $1 RETURNING *', [id]);
        if(result.rows.length === 0) {
            res.status(404).send("The donut was not found");
        } else {
            res.status(200).json(result.rows[0]);
        } // the response data should be the deleted donut and 200 status code
    } catch(err) {
        console.error(err);
        res.status(500).send("Problem deleting donut from donuts_db");
    }
});



//here is my listener
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});