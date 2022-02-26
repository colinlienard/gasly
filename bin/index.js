#! /usr/bin/env node
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readFile = (snippet) => new Promise((resolve, reject) => {
  fs.readFile(`.gasly/${snippet}`, 'utf8', (error, data) => {
    if (error) {
      reject(error);
    }
    resolve(data);
  });
});

const writeFile = (content, path) => new Promise((resolve, reject) => {
  fs.writeFile(path, content, (error) => {
    if (error) {
      reject(error);
    }
    resolve();
  });
});

rl.question('Snippet to use: ', (snippet) => {
  rl.question('Path: ', (path) => {
    rl.question('New file name: ', async (file) => {
      const [snippetName, extension] = snippet.split('.');

      const content = await readFile(snippet);

      const replacedContent = content.replaceAll(snippetName, file);

      writeFile(replacedContent, `${path}/${file}.${extension}`);

      rl.close();
    });
  });
});
