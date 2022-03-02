#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { clearLog } = require('./utils');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const snippets = fs.readdirSync('.gasly', 'utf8');

let selected = 0;

const logSnippets = () => {
  console.log(
    snippets.reduce((previous, current, index) => (
      `${previous}${previous && '\n'}${index === selected ? '>' : ' '} ${current}`
    ), ''),
  );
};

const createFile = (snippet, filePath, file) => {
  const [snippetName, extension] = snippet.split('.');

  try {
    const content = fs.readFileSync(`.gasly/${snippet}`, 'utf8');
    const replacedContent = content.replaceAll(snippetName, file);
    fs.writeFileSync(`${filePath}/${file}.${extension}`, replacedContent);
    console.log(`Your file has been created ! Open it by clicking here: ${path.resolve('.')}/${filePath}/${file}.${extension}`);
  } catch {
    console.log('An error occured. See the documentation: https://github.com/ColinLienard/gasly#readme');
  }

  process.exit();
};

/* Start the prompt */
console.log('Choose the snippet you want to copy (use keyboard arrows):\n');
logSnippets();

/* Let user select a snippet */
process.stdin.on('keypress', (chunk, key) => {
  if (key) {
    switch (key.name) {
      case 'down':
        selected = selected < snippets.length - 1 ? selected + 1 : selected;
        clearLog(snippets.length);
        logSnippets();
        break;
      case 'up':
        selected = selected > 0 ? selected - 1 : selected;
        clearLog(snippets.length);
        logSnippets();
        break;
      case 'return':
        /* Prompt the path and the name of the new file */
        rl.question('Path: ', (filePath) => {
          rl.question('New file name: ', (file) => {
            createFile(snippets[selected], filePath, file);
          });
        });
        break;
      default:
        break;
    }
  }
});
