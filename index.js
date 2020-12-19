const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;

readFile(
  './quick.js',
  'utf-8',
  (err, fileContent) => {
    if (err) {
      console.log(err); // Do something to handle the error or just throw it
      throw new Error(err);
    }
    txs = JSON.parse(JSON.stringify(fileContent));
    finalTxs = [];
    for (let i = 0; i <= 1; i++) {
      finalTxs.push(fileContent[i]);
    }
    const csvData = csvjson.toCSV(finalTxs, {
      properties: 'data, races'
    });
    writeFile('./presidential4.csv', csvData, (err) => {
      if (err) {
        console.log(err); // Do something to handle the error or just throw it
      }
      console.log('Success!');
    });
  }
);
