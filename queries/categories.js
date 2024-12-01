const db = require("../config/dbConfig.js")

async function getAllCategories() {
    try{
        const allCategories = await db.any("SELECT * FROM categories")

        // format category return obj
        const formattedCategories = allCategories.reduce((acc, {category_name, id}) => {
            acc[id] = category_name;
            return acc;
        }, {});

        return formattedCategories;
        

    }catch(err) {
        return err
    }
}

module.exports = {
    getAllCategories
}