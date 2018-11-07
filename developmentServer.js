const express = require('express');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require('md5');
const config = require('./webpack.development.config.js');

const credentials = require('./credentials.json');

const compiler = webpack(config);
const app = express();

const connectionString = `mongodb://legion-hq:Order927972450@18.218.77.64:27017/production`;
mongoose.connect(connectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection err'));
const { Schema } = mongoose;
const UserSchema = new Schema({
  userId: String,
  lists: Array
});
const UserModel = mongoose.model('users', UserSchema);

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

app.post('/list', (req, res) => {
  if ('_id' in req.body && 'listIndex' in req.body) {
    UserModel.find({ _id: req.body._id }, (findErr, findResults) => {
      if (findResults.length === 0) {
        // user entry no longer exists
        res.json({ msg: 'no results found', error: true });
      } else {
        if (!('lists' in findResults[0])) {
          // 'lists' is not in user entry... someone is tampering with API...
          res.json({ msg: 'lists object not found', error: true });
        }
        const { lists } = findResults[0];
        if (typeof lists[req.body.listIndex] === 'undefined') {
          // list at listIndex no longer exists
          res.json({ msg: 'list index not found', error: true });
        } else {
          res.json({ list: lists[req.body.listIndex], error: false });
        }
      }
    });
  } else {
    // missing _id or listIndex
    res.json({ msg: 'incomplete list search', error: true });
  }
});

app.post('/fetch', (req, res) => {
  const userId = md5(req.body.googleId);
  UserModel.find({ userId }, (findErr, findResults) => {
    if (findErr) res.json({ msg: findErr, error: true });
    else if (findResults.length === 0) {
      const newEntry = new UserModel({ userId, lists: [] });
      newEntry.save((createErr, createResults) => {
        if (createErr) res.json({ msg: findErr, error: true });
        else res.json({ user: createResults, error: false });
      });
    } else {
      res.json({ user: findResults[0], error: false });
    }
  });
});

app.post('/save', (req, res) => {
  if ('_id' in req.body && 'lists' in req.body) {
    UserModel.findOneAndUpdate(
      { _id: req.body._id },
      { lists: req.body.lists },
      { new: true },
      (err, result) => {
        if (err) res.json({ msg: err, error: true });
        else res.json({ user: result, error: false });
      }
    );
  } else {
    res.json({ msg: 'incomplete save', error: true });
  }
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
