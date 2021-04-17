const prompts = require('prompts');

const selectPrompt = async (contentObject, choices) => {
  console.log('prompts called with: ', choices);
  const response = await prompts({
    type: 'select',
    name: contentObject.name,
    message: contentObject.message,
    choices: choices,
    initial: contentObject.initial
  });
  return response;
};

module.exports = { selectPrompt }