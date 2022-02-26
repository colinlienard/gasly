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
      console.log(snippet, path, file);

      fs.readFile(`.gasly/${snippet}`, 'utf8', (error, data) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(data);
      });

      rl.close();
    });
  });
});
