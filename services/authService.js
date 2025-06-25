const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  findUserByEmail,
  createUser,
  findUserById
} = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (userData) => {
  const existing = await findUserByEmail(userData.email);
  if (existing) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await createUser({
    ...userData,
    password: hashedPassword
  });

  
  const { password, ...safeUser } = user.toObject();
  return safeUser;
};


const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  const { password: pwd, ...safeUser } = user.toObject();
  return { token, user: safeUser };
};


const getUserProfile = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new Error('User not found');
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};