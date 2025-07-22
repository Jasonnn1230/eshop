const jwt = require('jsonwebtoken');

// 驗證使用者是否登入
const protect = (req, res, next) => {
  let token;

  // 從 header 取得 token
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // 驗證 token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 將解碼後的 userId & role 加到 req.user
      req.user = {
        id: decoded.userId,
        role: decoded.role
      };

      next(); // 通過驗證，執行下一步
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Token 無效或已過期' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: '未授權，請先登入' });
  }
};

// 驗證是否為管理員
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: '拒絕存取，管理員權限不足' });
  }
};

module.exports = { protect, admin };
