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
            console.log(req.query);
            
            try {
                let idArray = Object.keys(req.query).find((value) => value === 'id_array');
                if(idArray) {
                    let recipes = await RecipeService.getRecipesByIngredientIDs(JSON.parse(req.query['id_array']));

                    res.send(recipes);
                } else if(Object.keys(req.query).length === 0){
                    console.log("Get all recipes")
                    let recipes = await RecipeService.getRecipes();

                    res.send(recipes);
                } else {
                    console.log("Get recipes by terms")
                    let recipes = await RecipeService.searchByTerms(req.query);

                    res.send(recipes);
                }
            } catch(error) {
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
        path: `/recipe/:id(\\d+)`,
        func: async (req, res) => {
            try {
                console.log(req.params)

                let ingredients = await RecipeService.getFullRecipeByID(req.params.id);

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