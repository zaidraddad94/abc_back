const mongoose = require("mongoose");
var autoincrement = require('simple-mongoose-autoincrement');

const schema = mongoose.Schema({
  name: String,
  timeZone: String,
  nameAR: String,
  phoneCode: String,
  currency: String,
  flag: String,
  status:String,
  deleted:Boolean
});
schema.plugin(autoincrement, {field: 'no'});


module.exports = mongoose.model("Country", schema);
