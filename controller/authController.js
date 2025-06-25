const authService = require('../services/authService');


const registerUser = async (req, res) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};