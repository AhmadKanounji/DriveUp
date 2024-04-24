const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send('Unable to login');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send('Unable to login');
    }
    
    const expiresIn = rememberMe ? '7d' : '2h';
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn });

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});


router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('No user found with that email');
    }

    const resetToken = user.createPasswordResetToken();
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const resetURL = `http://${req.headers.host}/auth/reset-password/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    await transport.sendMail({
      to: user.email,
      from: 'no-reply@example.com',
      subject: 'Your password reset token (valid for 10 mins)',
      text: message
    });

    res.status(200).send({ message: 'Token sent to email!' });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).send('Error sending email. Try again later.');
  }
});


router.patch('/reset-password/:token', async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).send('Token is invalid or has expired');
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.send('Password has been reset');
});


module.exports = router;
