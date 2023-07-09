const { getData } = require("../../utils/shared/db/read")

module.exports.run = async (req, res, next) => {
    try {
        const allData = await getData();
        var users = allData.filter(value => Object.keys(value).length !== 0);
        res.locals.rootData = users
        next()
    } catch (error) {
        next(error)
    }
}
