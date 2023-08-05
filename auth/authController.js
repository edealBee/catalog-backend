import User from '../Modules/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length == 0) {
      return res.status(400).json({
        message: 'Пользователей еще нет',
      });
    }
    return res.json(users);
  } catch (err) {
    return res.json({
      message: 'Не удалось получить пользователей',
    });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const condidate = await User.findOne({ email });
    if (condidate) {
      return res.status(400).json({
        message: 'Это почта уже используется',
      });
    }
    const salt = await bcrypt.genSalt(16);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      passwordHash: hash,
    });
    await user.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      {
        expiresIn: '30d',
      },
    );
    const { passwordHash, ...userData } = user;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (!isUser) {
      res.status(400).json({
        message: 'Пользователя не существует',
      });
    }
    const passwordValidate = await bcrypt.compare(password, isUser.passwordHash);

    if (!passwordValidate) {
      res.status(400).json({
        message: 'Пароль был введён неправильно',
      });
    }

    const token = jwt.sign(
      {
        _id: isUser._id,
      },
      'secret',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = isUser;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось войти',
    });
  }
};
