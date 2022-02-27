#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Snippet to use: ', (snippet) => {
  rl.question('Path: ', (filePath) => {
    rl.question('New file name: ', (file) => {
      const [snippetName, extension] = snippet.split('.');

      try {
        const content = fs.readFileSync(`.gasly/${snippet}`, 'utf8');
        const replacedContent = content.replaceAll(snippetName, file);
        fs.writeFileSync(`${filePath}/${file}.${extension}`, replacedContent);
        console.log(`Your file has been created ! Open it by clicking here: ${path.resolve('.')}/${filePath}/${file}.${extension}`);
      } catch {
        console.log('An error occured. See the documentation: https://github.com/ColinLienard/gasly#readme');
      }

      rl.close();
    });
  });
});
