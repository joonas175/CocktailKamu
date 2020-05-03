const { RecipeService } = require('../service/RecipeService');

const controllers = [
    {
        method: 'put',
        path: '/recipe',
        func: async (req, res) => {

            try {
                let recipe = await RecipeService.insertRecipe(req.body);

                res.send(recipe);
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
        path: '/recipe',
        func: async (req, res) => {

            try {
                let ingredients = await RecipeService.getRecipes();

                res.send(ingredients);
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