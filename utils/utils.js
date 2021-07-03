const fs = require('fs');
const { selectPrompt } = require('./prompts');
const readXlsxFile = require('read-excel-file/node');
const { SourcePrompt, TargetPrompt } = require('../models/prompts.model.');

const getSourceFile = async function (modeString, sourcesPath, ending) {
  let sourceFiles = getFolders(sourcesPath);
  let filteredFiles = filterFiles(sourceFiles, ending);
  let sourceChoices = createChoices(filteredFiles);
  let sourceFile = await selectPrompt(SourcePrompt[modeString], sourceChoices);
  return sourceFile;
}

const getTargetFile = async function (modeString, targetPath, ending) {
  let targetFiles = getFolders(targetPath);
  let filteredFiles = filterFiles(targetFiles, ending);
  let targetChoices = createChoices(filteredFiles);
  let targetFile = await selectPrompt(TargetPrompt[modeString], targetChoices);
  return targetFile;
}

const getFolders = function (path) {
  return fs.readdirSync(path);
}

const filterFiles = function (files, ending) {
  return files.filter(file => file.endsWith(ending));
}

const createChoices = function (stringArray) {
  return stringArray.map(element => {
    return { title: element, value: element  }
  })
}

// TODO: Implement as safety-feature at some point
// const createCopy = function () {
//   console.log('creating a copy');
// }

// TODO: Implement late to make code DRY
// const readXLSX = function () {
//   console.log('reading XLSX');
// }

const update = function (sourceDataObject, targetDataObject) {
  console.log(`updating ${targetDataObject} with questions from ${sourceDataObject}`);
  let oldTargetData = JSON.parse(fs.readFileSync(`./targets/${targetDataObject}`));
  let oldTargetQuestions = oldTargetData.SURVEY.QUESTIONS;

  readXlsxFile(`./sources/${sourceDataObject}`)
    .then((rows) => {
      if (rows[0][0].toLowerCase() === 'id' && rows[0][1].toLowerCase() === 'question') {
        let dataArray = rows.slice(1);
        dataArray.forEach(row => {
          console.log(row[0]);
          if (oldTargetQuestions[row[0]]) {
            oldTargetQuestions[row[0]] = row[1];
          }
        })
      } else {
        console.error('Error: Sourcefile has the wrong format');
      }
    })
    .then(() => {
      oldTargetData.SURVEY.QUESTIONS = oldTargetQuestions;
    })
    .then(() => {
      let stringifiedData = JSON.stringify(oldTargetData, null, 2);
      fs.writeFileSync(`./outputs/${targetDataObject}`, stringifiedData);
      console.log(`successfully created new file ${targetDataObject}`);
    })
    .catch(err => console.log('error when adding questions: ', err));
}

const add = function (sourceDataObject, targetDataObject) {
  console.log(`adding from ${sourceDataObject} to ${targetDataObject}`);

  let oldTargetData = JSON.parse(fs.readFileSync(`./targets/${targetDataObject}`));
  let addQuestions = {};

  readXlsxFile(`./sources/${sourceDataObject}`)
    .then((rows) => {
      if (rows[0][0].toLowerCase() === 'id' && rows[0][1].toLowerCase() === 'question') {
        let dataArray = rows.slice(1);
        dataArray.forEach(row => {
          addQuestions[row[0]] = row[1];
        })
      } else {
        console.error('Error: Sourcefile has the wrong format');
      }
    })
    .then(() => {
      let newQuestionObject = { ...oldTargetData.SURVEY.QUESTIONS, ...addQuestions };
      oldTargetData.SURVEY.QUESTIONS = newQuestionObject;
    })
    .then(() => {
      let stringifiedData = JSON.stringify(oldTargetData, null, 2);
      fs.writeFileSync(`./outputs/${targetDataObject}`, stringifiedData);
      console.log(`successfully created new file ${targetDataObject}`);
    })
    .catch(err => console.log('error when adding questions: ', err));
}

const translate = function (sourceDataObject, targetDataObject) {
  let oldTargetData = JSON.parse(fs.readFileSync(`./targets/${targetDataObject}`));
  let oldQuestions = oldTargetData.SURVEY.QUESTIONS;

  readXlsxFile(`./sources/${sourceDataObject}`)
    .then((rows) => {
      if (rows[0][0].toLowerCase() === 'id' && rows[0][1].toLowerCase() === 'question') {
        let dataArray = rows.slice(1);
        dataArray.forEach(row => {
          if (oldQuestions[row[0]]) {
            oldQuestions[row[0]] = row[1];
          }
        })
      } else {
        console.error('Error: Sourcefile has the wrong format');
      }
    })
    .then(() => {
      oldTargetData.SURVEY.QUESTIONS = oldQuestions;
    })
    .then(() => {
      let stringifiedData = JSON.stringify(oldTargetData, null, 2);
      fs.writeFileSync(`./outputs/${targetDataObject}`, stringifiedData);
      console.log(`successfully created new file ${targetDataObject}`);
    })
    .catch(err => console.log('error when adding questions: ', err));
}

// JUST NECESSARY when not working with IDs; 
// SHOULD BE DELETED AT SOME POINT
// const translateJSON = function () {
//   let germanFile = JSON.parse(fs.readFileSync('./sources/de.json'));
//   let englishSourceFile = JSON.parse(fs.readFileSync('./sources/en.json'));
//   let englishTargetFile = JSON.parse(fs.readFileSync('./outputs/en.json'))
//   let englishQuestions = englishSourceFile.SURVEY.QUESTIONS;
//   let germanQuestions = germanFile.SURVEY.QUESTIONS;
//   // let questionData = sourceDataObject.SURVEY.QUESTIONS;
//   let addQuestions = {};

//   for (let key in germanQuestions) {
//     let germanString = germanQuestions[key];
//     // console.log('german string is: ', germanQuestions[key]);
//     if (englishTargetFile.SURVEY.QUESTIONS[key]) {
//       if (englishQuestions[germanString]) {
//         addQuestions[key] = englishQuestions[germanString];
//         console.log('successfully translated a question');
//       } else {
//         addQuestions[key] = 'NOT TRANSLATED YET';
//         console.log('could not translate a question');
//       }
//     } else {
//       console.error('Key not available in english Version')
//     }
//   }

//   englishTargetFile.SURVEY.QUESTIONS = addQuestions;
//   let stringifiedData = JSON.stringify(englishTargetFile, null, 2);
//   fs.writeFileSync('./targets/newEN.json', stringifiedData);
// }

module.exports = { getSourceFile, getTargetFile, add, update, translate };

