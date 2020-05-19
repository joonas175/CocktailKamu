
/**
 * BaseService, which provides reusable functions to child services
 */
class BaseService {

    static get staticType () {
        throw Error("No type assigned");
    };

    /**
     * Get entities by search terms. Terms include columns defined in entity defined in staticType, and
     * operator, page, limit. Where clause is constructor from terms like
     * terms.id = 5  translates to  id LIKE 5
     * @todo integer handling without like
     * @param {*} terms 
     */
    static async searchByTerms(terms) {


        let operator = (terms['operator'] && terms['operator'].toUpperCase() === 'OR') ? ' OR ' : ' AND '

        const params = {
            where: Object.keys(terms)
                .filter((key) => Object.keys(this.staticType.columns).find((value) => value === key))
                .map((key) => `(${key} LIKE '%${terms[key]}%')`)
                .join(operator)
        };

        params.page = terms.page ? terms.page : 1;
        params.limit = terms.limit ? terms.limit : 10;
        
        const resp = await this.staticType.get(params);

        return resp;
    }

}

module.exports.BaseService = BaseService;