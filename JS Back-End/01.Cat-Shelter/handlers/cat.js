const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');
const rootPath = path.normalize(path.join(__dirname, '../views/cat/'));


module.exports = (req,res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        const stream = fs.createReadStream(rootPath + 'addCat.html');

        stream.on('data', (data) => {
            let catBreedTemplate = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedTemplate);
            res.write(data);
        });

        stream.on('end', () => {
            res.end();
        });

        stream.on('error', (err) => {
            console.log(err);
        });

    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }


        });
    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        const stream = fs.createReadStream(rootPath + 'addBreed.html');
    }
};