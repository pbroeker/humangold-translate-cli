const fs = require('fs');
const { selectPrompt } = require('./prompts');
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

const add = function (oldDataObject, addDataObject) {
  console.log('adding');
}

module.exports = { getSourceFile, getTargetFile };

