const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const collectionController = require('./controllers/collectionController');

const PORT = 3000;

const mongoURI = 'mongodb+srv://wrreiff:thisainteasy@cluster0.mwfj4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'MtG_Organizer'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(error => console.log('Mongoose connection error: mongoose did not connect', error.stack));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));



app.use('/build', express.static(path.join(__dirname, '../build')));

app.post('/submitCard', collectionController.addCard, (req, res) => {
  return res.status(200).json(res.locals.response);
});

app.get('/getCards', collectionController.getAllCards, (req, res) => {
  return res.status(200).json(res.locals.cards);
});

app.delete('/deleteCard', collectionController.deleteCard, (req,res) => {
  return res.status(200).json(res.locals.response);
});

app.put('/updateCard', collectionController.updateCard, (req, res) => {
  return res.status(200).json(res.locals.response);
})

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('*', (req,res) => {
  res.status(404).send('Not Foundy');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


  app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });