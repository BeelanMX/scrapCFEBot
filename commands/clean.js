module.exports = {
  name: 'clean',
  description: 'Erase all JSON files',
  cooldown: 0,
  execute(message, ARGS) {

    const fs = require('fs').promises
    const path = require('path')
    const FOLDER_TO_REMOVE = './assets'

    fs.readdir(FOLDER_TO_REMOVE)
      .then(files => {
        console.log('Path')
        const unlinkPromises = files.map(file => {
          const filePath = path.join(FOLDER_TO_REMOVE, file)
          return fs.unlink(filePath)
        })
        message.reply('Files removed succesfully')
        return Promise.all(unlinkPromises)
      }).catch(err => {
        console.error('Something wrong happened removing the file', err)
        message.reply('Something wrong happened removing the file')
      })
}
}