
class Types {
    
    static string = {
        validator: (value) => true,
    }

    static float = {
        validator: (value) => !isNaN(parseFloat(value))
    }

    static int = {
        validator: (value) => !isNaN(parseInt(value))
    }
}

module.exports.Types = Types;