const url = require('url');
const fs = require('fs');
const path = require('path');

function getContentType (filePath) {
    switch (path.extname(filePath)) {
        case '.css':
            return 'text/css';
        case '.ico':
            return 'image/x-icon';
        case '.html':
            return 'text/html';
        case '.jpg':
            return 'image/jpeg';
        case '.jpeg':
            return 'image/jpeg';
        case '.js':
            return 'application/javascript';
        default:
            return 'text/plain'
    }
}

module.exports = (req,res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname.startsWith('/content') && req.method === 'GET') {
        fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 not found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(pathname)
            });

            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
};