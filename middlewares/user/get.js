const { NoRecordsFoundError } = require("../../utils/handler/error");
const { getData } = require("../../utils/shared/db/read")

module.exports.run = async (req, res, next) => {
    try {
        const {userId} = req.query
        const allData = await getData();

        const user = allData.find( (ele) => ele.Id == userId);
        const resultUser = {}
        if(!user) {
            throw new NoRecordsFoundError()
        }
        Object.keys(user).forEach((item) => {
            const lowerCase = item.toLocaleLowerCase();
            resultUser[lowerCase] = user[item]
        })
        res.locals.rootData = resultUser;
        next();
    } catch (error) {
        next(error)
    }
}