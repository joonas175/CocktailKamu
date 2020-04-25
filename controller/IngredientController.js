const { Ingredient } = require('../entities/Ingredient');

const controllers = [
    {
        method: 'get',
        path: '/ingredient',
        func: (req, res) => {
            res.status(501).send({
                status: 501,
                message: "Not yet implemented!"
            })
        }
    },
    {
        method: 'put',
        path: '/ingredient',
        func: async (req, res) => {
            
            let ingredient = new Ingredient();

            try {
                let resp = await ingredient.insert();
            } catch (error) {
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