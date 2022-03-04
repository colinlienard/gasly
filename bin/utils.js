/* eslint-disable import/prefer-default-export */
const readline = require('readline');

const clearLog = (number) => {
  for (let i = 0; i < number; i += 1) {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
  }
};

const colorize = (text, color) => {
  const colors = {
    blue: '36',
    green: '32',
    grey: '90',
    red: '91',
  };
  return `\x1b[${colors[color]}m${text}\x1b[0m`;
};

const splitFileName = (file) => {
  const [name] = file.split('.');
  const extension = file.replace(name, '');
  return [name, extension];
};

module.exports = {
  clearLog,
  colorize,
  splitFileName,
};
