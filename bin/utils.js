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
    blue: 36,
    green: 32,
    grey: 90,
    red: 91,
    yellow: 33,
  };
  return `\x1b[${colors[color]}m${text}\x1b[0m`;
};

const logError = (text) => {
  console.log(
    colorize('\n💥 Error!', 'red'),
    `${text} Look at the documentation:`,
    colorize(' https://github.com/ColinLienard/gasly#readme', 'blue'),
  );
};

const logSuccess = (path) => {
  console.log(
    colorize('\n🎉 Success!', 'green'),
    'Open your file(s) by clicking here:',
    colorize(`${path}`, 'blue'),
  );
};

const splitFileName = (file) => {
  const [name] = file.split('.');
  const extension = file.replace(name, '');
  return [name, extension];
};

module.exports = {
  clearLog,
  colorize,
  logError,
  logSuccess,
  splitFileName,
};
