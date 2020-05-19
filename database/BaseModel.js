let { dbPool } = require('./DatabaseLayer');
const { Types } = require('./DatabaseTypes');

/**
 * Base model for all database objects.
 * Includes a lot of convenience methods.
 * I tried to make this code as reusable as possible, but
 * I still had to do a lot of native queries in service layer.
 */
class BaseModel {

    constructor(props){
        Object.assign(this, props);
        this.columns = this.constructor.columns;
        this.conn = this.constructor.conn;
        this.tableName = this.constructor.tableName;
    }

    /**
     * Columns and types of the object
     */
    static get columns () {
        throw "No columns specified!"
    }

    /**
     * Default connection for database.
     * Can be overridden.
     */
    static get conn () {
        return dbPool.getConnection()
    }

    /**
     * Table for this entity
     */
    static get tableName() {
        throw "No table name specified"
    }

    /**
     * Transforms object to a format which can be easily joined in an SQL query.
     * Add '' to string. Check validity of numbers. Purges object from values
     * not defined in columns.
     * 
     * @param {*} obj object to format
     * @param {*} columns  columns of the object
     */
    static _toQueryFormat(obj, columns) {
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

    /**
     * Call _toQueryFormat for this object
     */
    toQueryFormat() {
        return BaseModel._toQueryFormat(this, this.columns);
    }

    /**
     * Return object with properties defined in columns only
     */
    sanitized() {
        let newObj = {};
        for(let key of Object.keys(this.columns)){
            if(this[key]){
                newObj[key] = this[key];
            }
        }
        return newObj;
    }

    /**
     * Insert a new object into database.
     * All tables have id as primary key, so trying to modify
     * old value will throw an error.
     */
    async insert() {

        let conn;
        let hasError;
        
        try {

            let obj = this.toQueryFormat();

            let sql = `INSERT INTO ${this.tableName} `
            + `(${Object.keys(this.columns).join(', ')})` // columns
            + ` VALUES (${Object.keys(this.columns).map((key) => obj[key]).join(', ')});` // values

            console.log(sql);

            conn = await this.conn

            const response = await conn.query(sql);

            this.id = response.insertId;

        } catch (error) {
            console.log(error);
            hasError = error;
        }

        if(conn != null) conn.end();
        
        if(hasError !== null && hasError !== undefined) throw hasError;

        return this.sanitized();

    }

    /**
     * Same as insert, except allows modifying.
     * @todo use same function for update and insert
     */
    async update() {
        let conn;
        let hasError;
        
        try {

            let obj = this.toQueryFormat();

            let sql = `REPLACE INTO ${this.tableName} `
            + `(${Object.keys(this.columns).join(', ')})` // columns
            + ` VALUES (${Object.keys(this.columns).map((key) => obj[key]).join(', ')});` // values

            console.log(sql);

            conn = await this.conn

            const response = await conn.query(sql);

            this.id = response.insertId;

        } catch (error) {
            console.log(error);
            hasError = error;
        }

        if(conn != null) conn.end();
        
        if(hasError !== null && hasError !== undefined) throw hasError;

        return this.sanitized();
    }

    /**
     * Get objects from database.
     * Params can include where, order, limit and page clauses as plain strings.
     * 
     * @todo clause builder in this class
     * 
     * @param {*} params 
     */
    static async get(params) {

        let hasError;
        let resp;
        let conn;

        try {

            let sql = `SELECT ${Object.keys(this.columns).join(', ')} FROM ${this.tableName} `
            + ((params && params.where) ? (`WHERE ${params.where} `) : '') // where clause
            + ((params && params.order) ? `${params.order} ` : '') // order clause
            + ((params && params.limit && params.page) ? (`LIMIT ${(params.page - 1) * params.limit}, ${params.limit}`) : '');

            console.log(sql)
            
            conn = await this.conn

            resp = await conn.query(sql);

        } catch (error) {
            console.log(error)
            hasError = error;
        }

        if(conn != null) conn.end();
        
        if(hasError !== null && hasError !== undefined) throw hasError;

        return resp;

    }

    /**
     * Native sql query
     * @param {*} sql query string as sql
     */
    static async nativeQuery(sql) {
        let hasError;
        let resp;
        let conn;

        try {
            
            conn = await this.conn

            resp = await conn.query(sql);

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