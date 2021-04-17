const { selectPrompt } = require('./utils/prompts');
const { operationPrompt, addSourcePrompt, addTargetPrompt } = require('./models/prompts.model.');
const { getSourceFile, getTargetFile, getFolders, createChoices } = require('./utils/utils');

const sourcesPath = './sources';
const targetPath = './targets';

(async () => {
  const operation = await selectPrompt(operationPrompt, operationPrompt.choices);
  console.log('chosen operation: ', operation);
  trySwitch(operation.operation);
})()

const addQuestions = async function () {
  let source = await getSourceFile('add', sourcesPath, 'xlsx');
  let target = await getTargetFile('add', targetPath, 'json');
  console.log(`source is: ${source}, target: ${target}`);
}

const updateQuestions = async function () {
  console.log('Update');
  let source = await getSourceFile('update', sourcesPath, 'xlsx');
  let target = await getTargetFile('update', targetPath, 'json');
  
  console.log(`source is: ${source}, target: ${target}`);
}

const translateQuestions = async function () {
  let source = await getSourceFile('translate', sourcesPath, 'json');
  let target = await getTargetFile('translate', targetPath, 'json');
  console.log(`source is: ${source}, target: ${target}`);
}

const trySwitch = function (operation) {
  switch (operation) {
    case 'add':
      addQuestions();
      break;
    case 'update':
      updateQuestions();
      break;
    case 'translate':
      translateQuestions();
      break;    
    default:
      console.log('Error: Unkown argument');
      break;
  }
}