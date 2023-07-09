const fs = require('fs');
const csv = require('csv-parser');

function getData(file, type) {
    let data = [];
    return new Promise((resolve, reject) => {
        try {
            fs.createReadStream('./utils/db/emp.csv')
                .on('error', error => {
                    resolve([]);
                })
                .pipe(csv({}))
                .on('data', (row) => {
                    data.push(row)
                })
                .on('end', () => {
                    resolve(data);
                });
        } catch (error) {
            console.log('error', error);
            resolve([])
        }
    });
}


module.exports = {
    getData
}