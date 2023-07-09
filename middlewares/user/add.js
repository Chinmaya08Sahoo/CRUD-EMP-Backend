// const csvParser = require("csv-parser");
// const fs = require('fs')
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { uuid } = require('uuidv4');

// // const json2csv = require('json2csv');
// let {json2csv} = require('json-2-csv');
// const newLine = '\r\n';


const fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({ sendHeaders: false }); //Instantiate var
var csvFilename = "./utils/db/emp.csv";



module.exports.run = async (req, res, next) => {
    try {

        //1st try
        // let fields = ['Id', 'Name', 'Email', 'Phone', 'Age', 'Role', 'Address'];
        // let { name, email, phone, role, age, address } = req.body

        // const user = {
        //     id: uuid(),
        //     name,
        //     email,
        //     phone,
        //     role,
        //     age,
        //     address
        // }
        // var toCsv = {
        //     data: [user],
        //     fields: fields,
        //     header: false,
        // };

        // fs.stat('./utils/db/emp.csv', function (err, stat) {
        //     if (err == null) {
        //       console.log('File exists');

        //       //write the actual data and end with newline
        //       var csv = json2csv(toCsv) + newLine;

        //       fs.appendFile('./utils/db/emp.csv', csv, function (err) {
        //         if (err) throw err;
        //         console.log('The "data to append" was appended to file!');
        //       });
        //     } else {
        //       //write the headers and newline
        //       console.log('New file, just writing headers');
        //       fields = fields + newLine;

        //       fs.writeFile('./utils/db/emp.csv', fields, function (err) {
        //         if (err) throw err;
        //         console.log('file saved');
        //       });

        //     }
        //   });

        // res.locals.rootData = user;
        // next();



        //2nd try
        // const records = [];
        // const { name, email, phone, role, age, address} = req.body
        // const csvWriter = createCsvWriter({
        //     path: './utils/db/emp.csv',
        //     header: [
        //         { id: 'id', title: 'Id'},
        //         { id: 'name', title: 'Name'},
        //         { id: 'email', title: 'Email'},
        //         { id: 'phone', title: 'Phone'},
        //         { id: 'role', title: 'Role'},
        //         { id: 'age', title: 'Age'},
        //         {id: 'address', title: 'Address'}
        //     ]
        // })
        // const user = {
        //     id: uuid(),
        //     name,
        //     email,
        //     phone,
        //     role,
        //     age,
        //     address
        // }
        // records.push(user)
        // await csvWriter.writeRecords(records)
        // res.locals.rootData = user,
        // next()




        //3rd try
        let { name, email, phone, role, age, address } = req.body

        if (!fs.existsSync(csvFilename)) {
            writer = csvWriter({ sendHeaders: false });
            writer.pipe(fs.createWriteStream(csvFilename));
            writer.write({
                header1: 'Id',
                header2: 'Name',
                header3: 'Email',
                header4: 'Phone',
                header5: 'Age',
                header6: 'Address',
                header7: 'Role'
            });
            writer.end();
        }

        // Append some data to CSV the file    
        writer = csvWriter({ sendHeaders: false });
        writer.pipe(fs.createWriteStream(csvFilename, { flags: 'a' }));
        writer.write({
            header1: uuid(),
            header2: name,
            header3: email,
            header4: phone,
            header5: age,
            header6: address,
            header7: role,
        });
        writer.end();

    res.locals.rootData = { name, email, phone, age, address, role}
    next();
    } catch (error) {
        next(error)
    }
}