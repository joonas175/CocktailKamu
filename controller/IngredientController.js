const { Ingredient } = require('../entities/Ingredient');

const controllers = [
    {
        method: 'put',
        path: '/ingredient',
        func: async (req, res) => {

            console.log(req.body)
            
            let ingredient = new Ingredient();

            try {
                let resp = await ingredient.insert(req.body);

                res.send(resp);
            } catch (error) {
                console.log(error);
                res.status(500).send({
                    status: 500,
                    message: "Internal server error"
                })
            }

        }
    },
    {
        method: 'get',
        path: '/ingredient',
        func: async (req, res) => {

            try {
                let resp = await Ingredient.get();

                res.send(resp);
            } catch(error) {
                console.log(error);
                res.status(500).send({
                    status: 500,
                    message: "Internal server error"
                })
            }
        }
    }
]

module.exports.default = controllers;