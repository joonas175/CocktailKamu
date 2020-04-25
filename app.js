
import express from "express";

const port = 80;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(501).send({
        status: 501,
        message: "Not yet implemented!"
    })
})

const server = app.listen(port).once('listening', () => console.log("Listening on " + port));
