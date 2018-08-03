var fs = require('fs');

function readFile(file, code, callback) {
    fs.readFile(file, code, callback);
}

module.exports = () => {
    return readFile;
} 