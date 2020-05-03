
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

}

module.exports.Recipe = Recipe