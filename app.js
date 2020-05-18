
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // For dev only!
const { SecurityLayer } = require('./security/SecurityLayer');

const port = 8081;

const app = express();

app.use(cors()); // for dev only!

app.use(express.json());

/**
 * For static files
 */
const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];


/**
 * Initialize controllers here
 */
var normalizedPath = path.join(__dirname, "controller");

fs.readdirSync(normalizedPath).forEach((file) => {
    let controllers = require("./controller/" + file).default;
    for (let controller of controllers) {
        let path = `/api${controller.path}`;
        if (controller.method === 'get') {
            app.get(path, SecurityLayer.setSecurityLayer(controller))
            app.get(path, controller.func);
        } else if (controller.method === 'put') {
            app.put(path, controller.func);
        }
    }

});

/**
 * Serve index for all calls except api calls
 */
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`ckweb/dist/ckweb/${req.url}`));
    } else {
      res.sendFile(path.resolve('ckweb/dist/ckweb/index.html'));
    }
});


const server = app.listen(port, (args) => console.log("Listening on port: " + port));
