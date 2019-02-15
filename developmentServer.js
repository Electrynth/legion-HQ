const express = require('express');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./webpack.development.config.js');

const credentials = require('./credentials.json');

const compiler = webpack(config);
const app = express();

// app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, { publicPath: '/dist/' }));
app.use(webpackHotMiddleware(compiler));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const connectionString = `mongodb://legion-hq:${credentials.mongodb.password}@18.218.77.64:27017/development`;
mongoose.connect(connectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection err'));
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: String
});
const ListSchema = new Schema({
  userId: String,
  faction: String,
  mode: String,
  title: String,
  units: Array,
  commands: Array,
  uniques: Schema.Types.Mixed,
  notes: String,
  pointTotal: Number,
  objectiveCards: Array,
  deploymentCards: Array,
  conditionCards: Array
}, { minimize: false });
const UserModel = mongoose.model('users', UserSchema);
const ListModel = mongoose.model('lists', ListSchema);

const getCardId = (index) => {
  const mod = Math.floor(index / 26);
  const remainder = index % 26;
  const firstLetter = (mod + 10).toString(36);
  const secondLetter = (remainder + 10).toString(36);
  return `${firstLetter}${secondLetter}`;
};

app.get('/user', (req, res) => {
  if ('userId' in req.query) {
    UserModel.find({ _id: req.query.userId }, (errFind, resultsFind) => {
      if (errFind) res.json({ msg: errFind, error: true });
      else res.json({ results: resultsFind, error: false });
    });
  } else res.json({ msg: 'missing googleId', error: true });
});

app.post('/user', (req, res) => {
  if ('userId' in req.query) {
    const newEntry = new UserModel({ _id: req.query.userId, lists: [] });
    newEntry.save((errSave, resultsSave) => {
      if (errSave) res.json({ msg: errSave, error: true });
      else res.json({ user: resultsSave, error: false });
    });
  } else res.json({ msg: 'missing googleId', error: true });
});

app.put('/user', (req, res) => {
  if ('userId' in req.query && 'lists' in req.body) {
    UserModel.findOneAndUpdate(
      { _id: req.query.userId },
      { lists: req.body.lists },
      { new: true },
      (errUpdate, resultUpdate) => {
        if (errUpdate) res.json({ msg: errUpdate, error: true });
        else res.json({ user: resultUpdate, error: false });
      }
    );
  } else res.json({ msg: 'missing googleId or lists', error: true });
});

app.get('/lists', (req, res) => {
  if ('listId' in req.query) {
    ListModel.find({ _id: req.query.listId }, (errFind, resultsFind) => {
      if (errFind) res.json({ msg: errFind, error: true });
      else res.json({ results: resultsFind, error: false });
    });
  } else if ('userId' in req.query) {
    ListModel.find({ userId: req.query.userId }, (errFind, resultsFind) => {
      if (errFind) res.json({ msg: errFind, error: true });
      else res.json({ results: resultsFind, error: false });
    });
  } else res.json({ msg: 'missing listId', error: true });
});

app.post('/list', (req, res) => {
  if ('userId' in req.query && 'list' in req.body) {
    let newList = req.body.list;
    if ('_id' in newList) delete newList._id;
    const newListEntry = new ListModel({ ...newList, userId: req.query.userId });
    newListEntry.save((errListSave, resultsListSave) => {
      if (errListSave) res.json({ msg: errListSave, error: true });
      else res.json({ results: resultsListSave, error: false });
    });
  } else res.json({ msg: 'missing userId or list', error: true });
});

app.put('/list', (req, res) => {
  if ('listId' in req.query && 'list' in req.body) {
    ListModel.findOneAndUpdate(
      { _id: req.query.listId },
      { ...req.body.list },
      (errListUpdate, resultsListUpdate) => {
        if (errListUpdate) res.json({ msg: errListUpdate, error: true });
        else res.json({ list: resultsListUpdate, error: false });
      }
    );
  } else res.json({ msg: 'missing listId or list', error: true });
});

app.delete('/list', (req, res) => {
  if ('listId' in req.query) {
    ListModel.remove({ _id: req.query.listId }, (errDelete, resultsDelete) => {
      if (errDelete) res.json({ msg: errDelete, error: true });
      else res.json({ ...resultsDelete });
    });
  } else res.json({ msg: 'missing listId', error: true });
});

app.get('/data', (req, res) => {
  const response = {
    cards: {},
    unitsById: [],
    upgradesById: [],
    commandsById: [],
    uniques: {},
    status: 'error',
    message: 'Failed to read data file on server.',
    objectiveCards: [],
    deploymentCards: [],
    conditionCards: []
  };
  fs.readFile('data.json', 'utf8', (err, input) => {
    if (err) res.send(response);
    const spaceRegex = / /gi;
    const dotRegex = /\./gi;
    const data = JSON.parse(input);
    const {
      cards,
      commands,
      objectiveCards,
      deploymentCards,
      conditionCards
    } = data;
    response.objectiveCards = objectiveCards;
    response.deploymentCards = deploymentCards;
    response.conditionCards = conditionCards;
    let currentCardIdIndex = 0;
    cards.forEach((card) => {
      // const id = getCardId(currentCardIdIndex);
      const id = card.id;
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
      // const id = getCardId(currentCardIdIndex);
      const id = command.id;
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
