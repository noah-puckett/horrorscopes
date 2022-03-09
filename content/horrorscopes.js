const fs = require('fs');

const rawJSON = fs.readFileSync('./content/horrorscopes.json', 'utf8', (err, data) => {
    if(err) throw err;
});

const data = JSON.parse(rawJSON);

module.exports = data;