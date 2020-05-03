let { dbPool } = require('./DatabaseLayer');
const { Types } = require('./DatabaseTypes');

class BaseModel {

    constructor(props){
        Object.assign(this, props);
        this.columns = this.constructor.columns;
        this.conn = this.constructor.conn;
        this.tableName = this.constructor.tableName;
    }

    static get columns () {
        throw "No columns specified!"
    }

    static get conn () {
        return dbPool.getConnection()
    }

    static get tableName() {
        throw "No table name specified"
    }

    static mapToDbType(obj, columns) {
        let newObj = {};
        for(let key of Object.keys(columns)) {
            if(obj[key] !== undefined && obj[key] !== null) {
                switch(columns[key]){
                    case Types.string:
                        newObj[key] = `'${obj[key]}'`; 
                        break;

                    case Types.float: 
                        if(isNaN(parseFloat(obj[key]))){
                            throw "Number error in field " + key;
                        } else {
                            newObj[key] = parseFloat(obj[key]); 
                            break;
                        }

                    case Types.int: 
                        if(isNaN(parseInt(obj[key]))){
                            throw "Number error in field " + key;
                        } else {
                            newObj[key] = parseInt(obj[key]);
                            break;
                        }
                }
            } else {
                newObj[key] = "NULL"
            }
        }
        return newObj;
    }

    async insert() {

        let conn;
        let hasError;
        let obj;

        try {

            obj = BaseModel.mapToDbType(this, this.columns);

            let sql = `INSERT INTO ${this.tableName} `
            + `(${Object.keys(this.columns).join(', ')})` // columns
            + ` VALUES (${Object.keys(this.columns).map((key) => obj[key]).join(', ')});` // values

            console.log(sql);

            conn = await this.conn

            const response = await conn.query(sql);

            console.log(response);

            obj.id = response.insertId;

        } catch (error) {
            console.log(error);
            hasError = error;
        }

        if(conn != null) conn.end();
        
        if(hasError !== null && hasError !== undefined) throw hasError;

        return obj;

    }

    static async get(params) {

        let hasError;
        let resp;
        let conn;

        try {

            let sql = `SELECT ${Object.keys(this.columns).join(', ')} FROM ${this.tableName} `
            + ((params && params.where) ? ('WHERE ' + params.where) : '') // where clause
            + ((params && params.order) ? params.order : '') // order clause

            console.log(sql)
            
            conn = await this.conn

            resp = await conn.query(sql);

            console.log(resp)

        } catch (error) {
            console.log(error)
            hasError = error;
        }

        if(conn != null) conn.end();
        
        if(hasError !== null && hasError !== undefined) throw hasError;

        return resp;

    }
}

module.exports.BaseModel = BaseModel