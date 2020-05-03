
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');


class Ingredient extends BaseModel {

    static get columns () { 
        return {
            id: Types.int,
            name: Types.string
        }
    }

    static get tableName() {
        return 'ingredient'
    }

}

module.exports.Ingredient = Ingredient