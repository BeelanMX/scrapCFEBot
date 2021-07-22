# scrapCFEBot

Request information from [CFE](https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/) page to be displayed in a discord bot

## 📰 How to Develop

To clone and run this application, you'll need [Git](https://git-scm.com) and [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)  installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/BeelanMX/scrapCFEBot
# Go into the repository
$ cd scrapCFEBot
# Install dependencies
$ yarn install
# Run the app
$ yarn start
```

## Node

This application is created using [Node14](https://nodejs.org/dist/latest-v14.x/docs/api/)

## Puppeteer with Node & linux

We are using the library [Puppeteer v10.1.0](https://pptr.dev/#?product=Puppeteer&version=v10.1.0)
To run in linux or WSL2 need install chromium-browser

```
#!/bin/bash
$ sudo apt-get update
$ sudo apt-get install chromium-browser
$ sudo apt-get install -y libgbm-dev
```

if there is some issues there are some reference [here](https://stackoverflow.com/a/65497048/7351895), [here](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-is-downloaded-but-fails-to-launch-on-nodejs-14)

### VsCode Extensions

Name: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Name: [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

Name: [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)

Name: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
