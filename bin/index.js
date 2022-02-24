#! /usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Snippet to use: ', (snippet) => {
  rl.question('Path: ', (path) => {
    rl.question('New file name: ', (file) => {
      console.log(snippet, path, file);

      rl.close();
    });
  });
});
