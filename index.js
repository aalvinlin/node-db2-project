const express = require("express");

const server = express();
server.use(express.json());

const port = 5000;

server.get("/", (req, res) => {
    res.send("<h1>Car Sales Server Running</h1>")
})

server.listen(port, () => {
    console.log("Server running on port", port);
})