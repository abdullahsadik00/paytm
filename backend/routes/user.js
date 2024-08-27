const express = require('express');
const { User } = require('../db');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const userRouter = express.Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

userRouter.post('/signup', async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs',
    });
  }

  const user = await User.findOne({
    username: body.username,
  });
  if (user._id) {
    return res.json({
      message: 'Email already taken / Incorrect inputs',
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      username: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: 'User created successfully',
    token: token,
  });
});

userRouter.post('/signin', async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs',
    });
  }
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  if(user){
    const token = jwt.sign({
      username:user._id
    },JWT_SECRET)
    return res.status(200).json({
      token: token
    })
  }else{
    return res.status(411).json({	message: "Error while logging in"    })
  }
});
module.exports = userRouter;
