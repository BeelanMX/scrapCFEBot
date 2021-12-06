/* eslint-disable indent */
'use strict';

const { FILE } = require('dns');

module.exports = {
  name: 'clean',
  description: 'Erase all JSON files',
  cooldown: 0,
  execute(message, args) {
    // eslint-disable-next-line prettier/prettier
    const {readdir} = require('fs/promises');
    // eslint-disable-next-line prettier/prettier
    const {unlink} = require('fs');
    const fs = require('fs');
    const path = require('path');
    const FOLDER_REMOVE = './assets';
    readdir(FOLDER_REMOVE)
      .then((files) => {
        files.forEach((file) => {
          if (!file.match(/\w+.json/gm)){
            console.log(`No files to delete.`);
            message.reply(`No files to delete.`);
          }
          if (file.match(/\w+.json/gm)) {
            const FILE_PATH = path.join(FOLDER_REMOVE, file);
            unlink(FILE_PATH, (err) => {
              if (err) console.log(err);
              console.log(`${FILE_PATH} was deleted successfully.`);
              message.reply(`${FILE_PATH} was deleted successfully.`);
            });
          }
        });
      })
      .catch((err) => {
        console.error(`Something wrong happened removing the file ${err}`);
        message.reply('Something wrong happened removing the file');
      });
  },
};
