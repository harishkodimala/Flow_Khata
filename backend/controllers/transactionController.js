import {Transaction} from "../models/TransactionModel.js";

import {User} from "../models/UserModel.js";

export const addTransaction = async (req, res) => {

  try {

    const {

      customerId,

      type,

      amount,

      note,

      dueDate

    } = req.body;

    const customer =
      await User.findById(
        customerId
      );

    if (!customer) {

      return res.status(404).json({

        message:
          "Customer not found"

      });

    }
    if (
  type === "CREDIT" &&
  dueDate
) {

  const today =
    new Date();

  today.setHours(
    0, 0, 0, 0
  );

  const selectedDate =
    new Date(dueDate);

  selectedDate.setHours(
    0, 0, 0, 0
  );

  if (
    selectedDate < today
  ) {

    return res.status(400).json({

      message:
        "Due date cannot be in the past"

    });

  }

}

    const transaction =
      await Transaction.create({

        customer:
          customerId,

        shopkeeper:
          req.user.id,

        type,

        amount,

        note,

        dueDate:
          type === "CREDIT"
            ? dueDate
            : null

      });

    if (type === "CREDIT") {

      customer.currentBalance +=
        amount;

    } else if (
      type === "DEBIT"
    ) {

      customer.currentBalance -=
        amount;

    }

    await customer.save();

    res.status(201).json({

      message:
        "Transaction added",

      transaction,

      currentBalance:
        customer.currentBalance

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};

// Get transactions for a customer

export const getTransactions = async (req, res) => {

  try {

    const { customerId } = req.params;

    const transactions = await Transaction.find({

      customer: customerId,

      shopkeeper: req.user.id

    }).sort({ createdAt: -1 });

    res.status(200).json({
      transactions
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};