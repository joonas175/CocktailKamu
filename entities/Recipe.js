
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');


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

    static nativeQueryGetByRecipesByIngredientIDs(idArray) { // Longest function name ever :D
        let sql = `SELECT DISTINCT id, name, description, verified, totalIngredients, ownedIngredients
        FROM recipe
        INNER JOIN (SELECT recipe_id, COUNT(*) OVER (PARTITION BY recipe_id) AS totalIngredients FROM r_ingredient) AS temp1
        ON temp1.recipe_id = recipe.id
        INNER JOIN(SELECT recipe_id AS recipe_id2, COUNT(*) OVER (PARTITION BY recipe_id) AS ownedIngredients 
            FROM r_ingredient WHERE ingredient_id IN (${idArray.join(', ')})) AS temp2
        ON temp2.recipe_id2 = recipe.id
        WHERE id IN (SELECT DISTINCT recipe_id FROM r_ingredient WHERE ingredient_id IN (${idArray.join(', ')}))
        ;`;

        console.log(sql);

        return Recipe.nativeQuery(sql);
    }

}

module.exports.Recipe = Recipe