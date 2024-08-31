const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://sadik:Sadik%403012@cluster0.7v7sara.mongodb.net/paytm'
);
const { Schema } = mongoose;

const userSchema = new Schema({
  usename: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 10,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 10,
  },
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Balance', accountSchema);
module.exports = {
  User,
  Account,
};
