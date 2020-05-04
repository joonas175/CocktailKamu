
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');


class RecipeStep extends BaseModel {

    static get columns () { 
        return {
            id: Types.int,
            recipe_id: Types.int,
            description: Types.string
        }
    }

    static get tableName() {
        return 'r_step'
    }

}

module.exports.RecipeStep = RecipeStep