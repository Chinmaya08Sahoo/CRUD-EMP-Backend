const { getData } = require("../../utils/shared/db/read");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require('fs')

module.exports.run = async (req, res, next) => {
    const { id, name, email, phone, age, address, role } = req.body;

    const allData = await getData();
    try {
        let obj = { id, name, email, phone, age, address, role }
        const userIndex = allData.findIndex((ele) => ele.Id == id)
        if (userIndex !== -1) {
            allData[userIndex] = obj
        }
        for (let i = 0; i < allData.length; i++) {
            if (i != userIndex) {
                const resultUser = {}
                const user = allData[i];

                Object.keys(user).forEach((item) => {
                    const lowerCase = item.toLocaleLowerCase();
                    resultUser[lowerCase] = user[item]
                })
                allData[i] = resultUser
            }
        }
        const csvWriter = createCsvWriter({
            path: './utils/db/emp.csv',
            header: [
                { id: 'id', title: 'Id' },
                { id: 'name', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'phone', title: 'Phone' },
                { id: 'role', title: 'Role' },
                { id: 'age', title: 'Age' },
                { id: 'address', title: 'Address' }
            ]
        })
        await csvWriter.writeRecords(allData);
        res.locals.rootData = obj
        next();
    } catch (error) {
        next(error)
    }


}