const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, requried: true},
  to: {type: String, requried: true, unique: true},
  code: {type: String, requried: true, unique: true},
  date: {type: Date, default: Date.now},
  clicks: {type: Number,  default: 0},
  owner: {type: Types.ObjectId, ref: 'User'}

})

module.exports = model('Link', schema);