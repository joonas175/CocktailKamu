
class BaseService {

    static get staticType () {
        throw Error("No type assigned");
    };

    static async searchByTerms(terms) {

        const params = {
            where: Object.keys(terms).filter((key) => (key != 'page' && key != 'limit')).map((key) => `(${key} LIKE '%${terms[key]}%')`).join(' AND ')
        };

        params.page = terms.page ? terms.page : 1;
        params.limit = terms.limit ? terms.limit : 10;
        
        const resp = await this.staticType.get(params);

        return resp;
    }

}

module.exports.BaseService = BaseService;