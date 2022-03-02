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

/* Log available snippets */
const logSnippets = () => {
  console.log(
    snippets.reduce((previous, current, index) => (
      `${previous}${previous && '\n'}${index === selected ? '>' : ' '} ${current}`
    ), ''),
  );
};

const createFile = (snippet, filePath, name) => {
  try {
    if (fs.statSync(`.gasly/${snippet}`).isDirectory()) {
      /* Create a directory and files inside it */
      fs.mkdirSync(`${filePath}/${name}`);

      const files = fs.readdirSync(`.gasly/${snippet}`);

      files.forEach((file) => {
        const [fName, fExtension] = file.split('.');

        const content = fs.readFileSync(`.gasly/${snippet}/${file}`, 'utf8');
        const replacedContent = content.replaceAll(snippet, name);
        fs.writeFileSync(`${filePath}/${name}/${fName === snippet ? name : fName}.${fExtension}`, replacedContent);
      });

      console.log(`Your files has been created ! Open them by clicking here: ${path.resolve('.')}/${filePath}/${name}`);
    } else {
      /* Create a single file */
      const [snippetName, extension] = snippet.split('.');
      const fullName = `${filePath}/${name}.${extension}`;

      const content = fs.readFileSync(`.gasly/${snippet}`, 'utf8');
      const replacedContent = content.replaceAll(snippetName, name);
      fs.writeFileSync(fullName, replacedContent);

      console.log(`Your file has been created ! Open it by clicking here: ${path.resolve('.')}/${fullName}`);
    }
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
        if (selected < snippets.length - 1) {
          selected += 1;
          clearLog(snippets.length);
          logSnippets();
        }
        break;
      case 'up':
        if (selected > 0) {
          selected -= 1;
          clearLog(snippets.length);
          logSnippets();
        }
        break;
      case 'return':
        /* Prompt the path and the name of the new file */
        rl.question('Path: ', (filePath) => {
          rl.question('New file name: ', (name) => {
            createFile(snippets[selected], filePath, name);
          });
        });
        break;
      default:
        break;
    }
  }
});
