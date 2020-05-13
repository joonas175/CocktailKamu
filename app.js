
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // For dev only!

const port = 80;

const app = express();

app.use(cors()); // for dev only!

app.use(express.json());

app.use(/(\/api\/)/, express.static('ckweb/dist/ckweb/'))


/**
 * Initialize controllers here
 */
var normalizedPath = path.join(__dirname, "controller");

fs.readdirSync(normalizedPath).forEach((file) => {
    let controllers = require("./controller/" + file).default;
    for (let controller of controllers) {
        let path = `/api${controller.path}`;
        if (controller.method === 'get') {
            app.get(path, controller.func);
        } else if (controller.method === 'put') {
            app.put(path, controller.func);
        }
    }

});


const server = app.listen(port, (args) => console.log("Listening on port: " + port));
