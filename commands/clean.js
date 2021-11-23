module.exports = {
  name: 'clean',
  description: 'Erase all JSON files',
  cooldown: 0,
  execute(message, ARGS) {

const fs = require('fs').promises
const path = require('path')
const AssetsFiles = './assets'

fs.readdir(AssetsFiles)
  .then(files => {
    const unlinkPromises = files.map(file => {
      const filePath = path.join(AssetsFiles, file.endsWith('.json'))
      return fs.unlink(filePath)
    })
    return Promise.all(unlinkPromises)
  }).catch(err => {
    message.reply(`Something wrong happened removing files of ${AssetsFiles}`)
  })
}
}