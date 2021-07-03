const operationPrompt = {
  name: 'operation',
  message: 'What do you want to do?',
  choices: [
    // { title: 'Get survey results', description: 'Creating a result excel from existing surveys', value: 'results' },
    // { title: 'Change questions to Ids', description: 'Changing question strings to IDs', value: 'translateJSON' },
    { title: 'Add new questions', description: 'Adding new questions to the application', value: 'add' },
    { title: 'Update questions', description: 'Changing/Updating questions from the application', value: 'update' },
    { title: 'Translate questions', description: 'Adding translations to a known language-file', value: 'translate' }
  ],
  initial: 0
}

const SourcePrompt = {

  add: {
    name: 'source',
    message: 'Choose the source of the new questions (has to be a .xlsx-file).',
    choices: [],
    initial: 0
  },
  update: {
    name: 'source',
    message: 'Choose the source of the new questions (has to be a .xlsx-file).',
    choices: [],
    initial: 0
  },
  translate: {
    name: 'source',
    message: 'Choose the source of the translations (has to be a .xlsx-file).',
    choices: [],
    initial: 0
  }
 
}

const TargetPrompt = {
  add: {
    name: 'target',
    message: 'Choose, to which file the data should be added',
    choices: [],
    initial: 0
  },
  update: {
    name: 'target',
    message: 'Choose, which language file should be updated with the new data.',
    choices: [],
    initial: 0
  },
  translate: {
    name: 'target',
    message: 'Choose, which file should be translated',
    choices: [],
    initial: 0
  }
  
}



module.exports = { operationPrompt, SourcePrompt, TargetPrompt };