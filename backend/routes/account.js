const express = require('express');
const { Account } = require('../db');
const { authMiddleware } = require('../middleware/authMiddleware');
const { default: mongoose } = require('mongoose');
const accountRouter = express.Router();

accountRouter.get('/balance', async (req, res) => {
  const userId = req.body.userId;
  const account = await Account.findOne({
    userId,
  });
  if (account) {
    res.json({
      balance: account.balance,
    });
  }
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  const { amount, to } = req.body;
  session.startTransaction();
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (amount > account.balance) {
    await session.abortTransaction();
    res.json({
      message: 'Insufficient Balance',
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    await session.abortTransaction();
    res.json({
      message: 'Invalid Account',
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );
  await session.commitTransaction();
  res.json({
    message: 'Transfer successful',
  });
});

module.exports = accountRouter;
