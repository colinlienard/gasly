#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { clearLog, splitFileName, colorize } = require('./utils');

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
      `${previous}${previous && '\n'}${index === selected ? colorize(`> ${current}`, 'blue') : `  ${current}`}`
    ), ''),
  );
};

const logSuccess = (link) => {
  console.log(
    colorize('\n🎉 Success!', 'green'),
    'Open your file(s) by clicking here: ',
    colorize(`${path.resolve('.')}/${link}`, 'blue'),
  );
};

const createFile = (snippet, filePath, name) => {
  try {
    if (fs.statSync(`.gasly/${snippet}`).isDirectory()) {
      /* Create a directory and files inside it */
      fs.mkdirSync(`${filePath}/${name}`);

      const files = fs.readdirSync(`.gasly/${snippet}`);

      files.forEach((file) => {
        const [fileName, fileExtension] = splitFileName(file);

        const content = fs.readFileSync(`.gasly/${snippet}/${file}`, 'utf8');
        const replacedContent = content.replaceAll(snippet, name);
        fs.writeFileSync(`${filePath}/${name}/${fileName === snippet ? name : fileName}${fileExtension}`, replacedContent);
      });

      logSuccess(`${filePath}/${name}`);
    } else {
      /* Create a single file */
      const [snippetName, extension] = splitFileName(snippet);
      const fullName = `${filePath}/${name}${extension}`;

      const content = fs.readFileSync(`.gasly/${snippet}`, 'utf8');
      const replacedContent = content.replaceAll(snippetName, name);
      fs.writeFileSync(fullName, replacedContent);

      logSuccess(fullName);
    }
  } catch {
    console.log(
      colorize('\n💥 Error!', 'red'),
      'Something went wrong... Look at the documentation: ',
      colorize(' https://github.com/ColinLienard/gasly#readme', 'blue'),
    );
  }

  process.exit();
};

/* Start the prompt */
console.log(
  colorize('?', 'green'),
  'Choose the snippet you want to copy',
  colorize('(use keyboard arrows)', 'grey'),
);
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
        rl.question(`${colorize('?', 'green')} Path of the new file(s) ${colorize('>', 'grey')} `, (filePath) => {
          rl.question(`\n${colorize('?', 'green')} Name ${colorize('>', 'grey')} `, 'New name', (name) => {
            createFile(snippets[selected], filePath, name);
          });
        });
        break;
      default:
        break;
    }
  }
});
