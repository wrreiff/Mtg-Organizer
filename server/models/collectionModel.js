const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    cardName: {type: String, required: true, unique: true },
    cardCount: {type: Number, required: true}
});

module.exports = mongoose.model('Collection', collectionSchema);