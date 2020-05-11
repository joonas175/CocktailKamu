const { IngredientService } = require('../service/IngredientService');

const controllers = [
    {
        method: 'put',
        path: '/ingredient',
        func: async (req, res) => {

            try {
                let ingredient = await IngredientService.insertIngredient(req.body);

                res.send(ingredient);
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

            console.log(req.query);

            try {

                if(Object.keys(req.query).length === 0) {
                    let ingredients = await IngredientService.getAllIngredients();

                    res.send(ingredients);
                } else {
                    let ingredients = await IngredientService.searchIngredients(req.query);

                    res.send(ingredients);
                }
                
            } catch(error) {
                console.log(error);
                res.status(500).send({
                    status: 500,
                    message: "Internal server error"
                })
            }
        },
    }
]

module.exports.default = controllers;