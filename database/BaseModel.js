let { dbPool } = require('./DatabaseLayer');

class BaseModel {

    constructor(){ }

    columns;

    get conn () {
        return dbPool.getConnection()
    }

    get tableName() {
        throw "No table name specified"
    }

    async insert() {

        console.log()

        if(this.columns === null) {
            throw "No columns specified!"
        }

        for(let column of Object.keys(this.columns)) {
            console.log(column)
        }

        let conn = await this.conn

    }
}

module.exports.BaseModel = BaseModel