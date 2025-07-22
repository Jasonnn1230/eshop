const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 註冊
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 檢查是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '此 Email 已被註冊' });
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 建立新使用者
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: '註冊成功' });
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 登入
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 檢查使用者
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '找不到此帳號' });
    }

    // 比對密碼
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '密碼錯誤' });
    }

    // 產生 JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

module.exports = { registerUser, loginUser };
