
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');


class Ingredient extends BaseModel {

    columns = {
        id: Types.int,
        name: Types.string
    }

}

module.exports.Ingredient = Ingredient