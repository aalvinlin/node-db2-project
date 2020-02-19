const express = require("express");

const server = express();
server.use(express.json());

const database = require("./dbConfig.js");

server.get("/", (req, res) => {
    res.send("<h1>Car Sales Server Running</h1>")
})

server.get("/api/cars", (req, res) => {

    database("cars")
        .then(response => {
            console.log("GET /api/cars response:", response);
            res.status(200).json(response);
        })
        .catch(error => {
            console.log("GET /api/cars error:", error);
            res.status(500).json({message: "GET /api/cars failed."});
        })
    
});

server.get("/api/cars/:id", (req, res) => {

    database("cars")
    .where({id: req.params.id})
    .first()
        .then(response => {
            console.log("GET /api/cars/:id response:", response);

            if (response)
                { res.status(200).json(response); }
            else
                { res.status(404).json({message: "No car with id " + req.params.id + " found."}); }
        })
        .catch(error => {
            console.log("GET /api/cars/:id error:", error);
            res.status(500).json({message: "GET /api/cars/:id failed."});
        })
    
});

server.post("/api/cars", (req, res) => {

    if (!req.body || !req.body.vin)
        { res.status(400).json({message: "VIN is required."}) }
    
    database("cars")
    .insert(req.body)
        .then(response => {
            console.log("POST /api/cars response:", response);

            if (response.length > 0)
                { res.status(201).json(response); }
            else
                { res.status(404).json({message: "Couldn't POST to /api/cars"}); }
        })
        .catch(error => {
            console.log("POST /api/cars error:", error);
            res.status(500).json({message: "Couldn't POST to /api/cars"});
        })
});


server.put("/api/cars/:id", (req, res) => {

    database("cars")
    .where({id: req.params.id})
    .update(req.body)
        .then(numberUpdated => {
            console.log("PUT /api/cars/:id response:", numberUpdated);

            if (numberUpdated > 0)
                { res.status(200).json(numberUpdated); }
            else
                { res.status(404).json({message: "No car with ID " + req.params.id + " found."}); }
        })
        .catch(error => {
            console.log("PUT /api/cars/:id error:", error);
            res.status(500).json({message: "Couldn't PUT to /api/cars/:id"});
        })
});

const port = 5000;

server.listen(port, () => {
    console.log("Server running on port", port);
})