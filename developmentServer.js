const express = require('express');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const config = require('./webpack.development.config.js');
// const mongoClient = require('mongodb').MongoClient;

const compiler = webpack(config);
const app = express();

// const connectionString = 'mongodb://18.218.77.64:27017/development';
// mongoClient.connect(connectionString, (err, db) => {
//   if (err) console.log(err);
//   else console.log('success', db);
// });

const getCardId = (index) => {
  const mod = Math.floor(index / 26);
  const remainder = index % 26;
  const firstLetter = (mod + 10).toString(36);
  const secondLetter = (remainder + 10).toString(36);
  return `${firstLetter}${secondLetter}`;
};

// app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, { publicPath: '/dist/' }));
app.use(webpackHotMiddleware(compiler));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/data', (req, res) => {
  const response = {
    cards: {},
    unitsById: [],
    upgradesById: [],
    commandsById: [],
    uniques: {},
    status: 'error',
    message: 'Failed to read data file on server.'
  };
  fs.readFile('data.json', 'utf8', (err, input) => {
    if (err) res.send(response);
    const spaceRegex = / /gi;
    const dotRegex = /\./gi;
    const data = JSON.parse(input);
    const { cards, commands } = data;
    let currentCardIdIndex = 0;
    cards.forEach((card) => {
      const id = getCardId(currentCardIdIndex);
      currentCardIdIndex += 1;
      let imageName = `${card.name.replace(spaceRegex, '%20')}`;
      imageName = imageName.replace(dotRegex, '%2E');
      if (card.isUnique) response.uniques[id] = false;
      if (card.rank.includes('upgrade')) {
        const imageLocation = `/upgrades/${imageName}.png`;
        const iconLocation = `/upgradeIcons/${imageName}.png`;
        response.cards[id] = {
          id,
          imageLocation,
          iconLocation,
          ...card
        };
        response.upgradesById.push(id);
      } else {
        const imageLocation = `/units/${imageName}.png`;
        const iconLocation = `/unitIcons/${imageName}.png`;
        response.cards[id] = {
          id,
          imageLocation,
          iconLocation,
          totalCost: card.cost,
          upgradesEquipped: new Array(card.upgradeBar.length),
          ...card
        };
        response.unitsById.push(id);
      }
    });
    commands.forEach((command) => {
      const id = getCardId(currentCardIdIndex);
      currentCardIdIndex += 1;
      response.commandsById.push(id);
      response.uniques[id] = false;
      let imageName = `${command.name.replace(spaceRegex, '%20')}`;
      imageName = imageName.replace(dotRegex, '%2E');
      const imageLocation = `/commands/${imageName}.png`;
      const iconLocation = `/commandIcons/${imageName}.png`;
      response.cards[id] = {
        id,
        imageLocation,
        iconLocation,
        ...command
      };
    });
    response.status = 'success';
    response.message = '';
    res.send(response);
  });
});

app.use(express.static(path.join(__dirname, 'src/assets/images')));

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = 3000;
const hostname = '0.0.0.0';

app.listen(port, hostname, console.log(hostname, port));
