const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入名字']
  },
  email: {
    type: String,
    required: [true, '請輸入 Email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, '請輸入密碼']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
