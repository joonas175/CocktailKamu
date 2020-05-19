const { VoteService } = require('../service/VoteService');

const controllers = [
    {
        method: 'put',
        path: '/vote/:id(\\d+)',
        func: async (req, res) => {

            try {
                let ingredient = await VoteService.insertIngredient(req.params.id);

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
        path: '/vote/id',
        func: async (req, res) => {

            console.log(req.query);

            console.log(req.userId);

            try {

                if(Object.keys(req.query).length === 0) {
                    let ingredients = await IngredientService.getAllIngredients();

                    res.send(ingredients);
                } else {
                    let ingredients = await IngredientService.searchByTerms(req.query);

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
        requiresSignIn: true
    }
]

module.exports.default = controllers;