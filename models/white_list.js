const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WhiteList = new Schema({
    path: {type: String, required: true},
    device: {type: String},
    enabled: {type: Boolean, default: true}
});

mongoose.model('white_lists', WhiteList);
