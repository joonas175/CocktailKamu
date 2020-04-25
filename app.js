
const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 80;

const app = express();

app.use(express.json());

var normalizedPath = path.join(__dirname, "controller");

fs.readdirSync(normalizedPath).forEach((file) => {
    let controllers = require("./controller/" + file).default;
    for (let controller of controllers) {
        console.log(controller);
        if (controller.method === 'get') {
            app.get(controller.path, controller.func);
        } else if (controller.method === 'put') {

        }
    }

});

const server = app.listen(port, (args) => console.log("Listening on port: " + port));
