const Collection = require('../models/collectionModel');

const collectionController = {};

collectionController.getAllCards = (req, res, next) => {
  Collection.find({}, (err, cards) => {
    if (err) return next ('Error in collectionController.getAllcards: ' + err);
    res.locals.cards = cards;
    return next();
  });
};

collectionController.addCard = (req, res, next) => {
  //need to fill in with paramaters needed for checking the db to see if the card is there to either change the number or create the card
  Collection.create(req.body, (err, docs) => {
    if(err){
      console.log(err);
      return next(err);
    } else {
      res.locals.response = 'You have added ' + req.body.cardName + ' to your collection.';
      return next();
    }
  });
}

collectionController.deleteCard = (req, res, next) => {
  Collection.deleteOne({ cardName: req.body.cardName }, (err, docs) => {
    if(err) console.log(err);
    else {
      res.locals.response = 'You have deleted ' + req.body.cardName + ' from your collection.'
      return next();
    }
  });
}

collectionController.updateCard = (req, res, next) => {
  Collection.findOneAndUpdate({ cardName: req.body.cardName }, { cardCount: req.body.cardCount }, { returnDocument: 'after' }, (err, docs) => {
    if(err) console.log(err);
    else {
      res.locals.response = docs;
      return next();
    }
  });
}



module.exports = collectionController;