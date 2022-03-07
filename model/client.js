
import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  website: String
})

module.exports = mongoose.models.Client || mongoose.model('Client', ClientSchema)