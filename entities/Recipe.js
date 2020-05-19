
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');

/**
 * Cocktail / drink recipe
 */
class Recipe extends BaseModel {

    static get columns () { 
        return {
            id: Types.int,
            name: Types.string,
            description: Types.string
        }
    }

    static get tableName() {
        return 'recipe'
    }

    /**
     * Select recipes, which select recipes from database which include an ingredient from the given array.
     * Counts total amount of ingredients per recipe, as well as owned ingredients per recipe.
     * This clause is long as shit, but hey, it works. 
     * Tbh maybe several queries could have been better :D
     * @param {*} idArray ingredient id's
     */
    static nativeQueryGetByRecipesByIngredientIDs(idArray) { // Longest function name ever :D
        let sql = `SELECT DISTINCT id, name, description, verified, totalIngredients, ownedIngredients
        FROM recipe
        INNER JOIN (SELECT recipe_id, COUNT(*) OVER (PARTITION BY recipe_id) AS totalIngredients FROM r_ingredient) AS temp1
        ON temp1.recipe_id = recipe.id
        INNER JOIN(SELECT recipe_id AS recipe_id2, COUNT(*) OVER (PARTITION BY recipe_id) AS ownedIngredients 
            FROM r_ingredient WHERE ingredient_id IN (${idArray.join(', ')})) AS temp2
        ON temp2.recipe_id2 = recipe.id
        WHERE id IN (SELECT DISTINCT recipe_id FROM r_ingredient WHERE ingredient_id IN (${idArray.join(', ')}))
        ORDER BY (totalIngredients - ownedIngredients) ASC
        ;`;

        console.log(sql);

        return Recipe.nativeQuery(sql);
    }

}

module.exports.Recipe = Recipe