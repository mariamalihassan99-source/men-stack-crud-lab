
const mongoose = require('mongoose')


const coffeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number,  min: 0.5, max: 50, required: true },
  country: { type: [String], required: true },
  isDecaf: { type: Boolean, required: true }

})

const Coffee = mongoose.model('Coffee', coffeeSchema)
module.exports = Coffee