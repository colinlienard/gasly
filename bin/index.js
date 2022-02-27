#! /usr/bin/env node
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Snippet to use: ', (snippet) => {
  rl.question('Path: ', (path) => {
    rl.question('New file name: ', (file) => {
      const [snippetName, extension] = snippet.split('.');

      try {
        const content = fs.readFileSync(`.gasly/${snippet}`, 'utf8');
        const replacedContent = content.replaceAll(snippetName, file);
        fs.writeFileSync(replacedContent, `${path}/${file}.${extension}`);
      } catch (error) {
        console.log(error);
      }

      rl.close();
    });
  });
});
