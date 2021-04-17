const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

module.exports = function (source, target) { 
  console.log(`update called: source ${source}, target: ${target}`);
};

// for (const key in parsedSourceData.SURVEY.QUESTIONS) {
//     counter++;
//     console.log(counter);
// }
// console.log(parsedSourceData.SURVEY.QUESTIONS);


// File path.
// let result = {};
// readXlsxFile('./sources/Fragenkatalog.xlsx')
//   .then((rows) => {
//     // rows.forEach(row => {
//         // result[row[1]] = row[0];
//         console.log(rows[0], rows[1]);
//     // });
//   })

  // .then(() => {
  //   parsedSourceData.SURVEY.QUESTIONS = result;
  //   console.log('result is: ', result);
  // })
  // .then(() => {
  //   let data = JSON.stringify(parsedSourceData, null, 2);
  //   fs.writeFileSync('./outputs/de.json', data);
  // })
