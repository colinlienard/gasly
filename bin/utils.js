/* eslint-disable import/prefer-default-export */
const readline = require('readline');

const clearLog = (number) => {
  for (let i = 0; i < number; i += 1) {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
  }
};

const splitFileName = (file) => {
  const [name] = file.split('.');
  const extension = file.replace(name, '');
  console.log(name, extension);
  return [name, extension];
};

module.exports = {
  clearLog,
  splitFileName,
};
