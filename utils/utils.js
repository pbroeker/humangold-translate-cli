const fs = require('fs');
const { selectPrompt } = require('./prompts');
const readXlsxFile = require('read-excel-file/node');
const { SourcePrompt, TargetPrompt } = require('../models/prompts.model.');
const { error } = require('console');

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

const createCopy = function () {
  console.log('creating a copy');
}

const readXLSX = function () {
  console.log('reading XLSX');
}

const translate = function (oldDataObject, translationObject) {
  console.log('translating');
}

const update = function (oldDataObject, newDataObject) {
  console.log('updating');
}

const add = function (sourceDataObject, targetDataObject) {
  console.log(`adding from ${sourceDataObject} to ${targetDataObject}`);

  let oldTargetData = JSON.parse(fs.readFileSync(`./targets/${targetDataObject}`));
  let addQuestions = {};

  readXlsxFile(`./sources/${sourceDataObject}`)
    .then((rows) => {
      if (rows[1][0] === 'question' && rows[1][1] === 'id') {
        let dataArray = rows.slice(2);
        dataArray.forEach(row => {
          addQuestions[row[1]] = row[0];
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
}

module.exports = { getSourceFile, getTargetFile, add };

