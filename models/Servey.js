const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipients');

const serveySchema = new Schema({
  body: String,
  title: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('serveys', serveySchema);

