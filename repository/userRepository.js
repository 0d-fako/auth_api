const User = require('../model/User');


const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};


const findUserById = async (userId) => {
  return await User.findById(userId).select('-password'); 
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById
};