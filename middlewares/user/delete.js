const { getData } = require("../../utils/shared/db/read");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

module.exports.run = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const users = await  getData();

        const userIndex = users.findIndex( (ele) => ele.Id == userId);
        users.splice(userIndex, 1);
        for (let i = 0; i < users.length; i++) {
            if (i != userIndex) {
                const resultUser = {}
                const user = users[i];

                Object.keys(user).forEach((item) => {
                    const lowerCase = item.toLocaleLowerCase();
                    resultUser[lowerCase] = user[item]
                })
                users[i] = resultUser
            }
        }
        const csvWriter = createCsvWriter({
            path: './utils/db/emp.csv',
            header: [
                { id: 'id', title: 'Id'},
                { id: 'name', title: 'Name'},
                { id: 'email', title: 'Email'},
                { id: 'phone', title: 'Phone'},
                { id: 'role', title: 'Role'},
                { id: 'age', title: 'Age'},
                {id: 'address', title: 'Address'}
            ]
        })
        await csvWriter.writeRecords(users);
        res.locals.rootData = {};
        next();
    } catch (error) {
        next(error)
    }
}