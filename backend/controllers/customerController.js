import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";

import {
  sendWelcomeEmail
} from "../utils/emailService.js";

import fs from "fs";

import {
  generateStatementPDF
}
from "../utils/statementService.js";

import {
  sendStatementEmail,
  sendContactEmail
}
from "../utils/emailService.js";

export const createCustomer = async (req, res) => {

  try {

    const {
      name,
      email,
      phone
    } = req.body;

    // Check existing customer

    const existingCustomer =
      await User.findOne({
        email
      });

    if (existingCustomer) {

      return res.status(400).json({
        message:
          "Customer already exists"
      });

    }

    // Generate temporary password

    const temporaryPassword =
      Math.random()
        .toString(36)
        .slice(-8);

    // Hash password

    const hashedPassword =
      await bcrypt.hash(
        temporaryPassword,
        10
      );

    // Create customer

    const customer =
      await User.create({

        name,

        email,

        password:
          hashedPassword,

        phone,

        role:
          "CUSTOMER",

        createdBy:
          req.user.id,

        mustChangePassword:
          true

      });

    const customerObj =
      customer.toObject();

    delete customerObj.password;

    /*
    ===========================
    SEND EMAIL
    ===========================
    */

    try {

      await sendWelcomeEmail(

        email,

        name,

        temporaryPassword

      );

      console.log(
        `Welcome email sent to ${email}`
      );

    } catch (emailError) {

      console.log(
        "Email Error:",
        emailError.message
      );

    }

    res.status(201).json({

      message:
        "Customer created successfully",

      temporaryPassword,

      customer:
        customerObj

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};

import { Transaction } from "../models/TransactionModel.js";

export const getCustomers = async (req, res) => {

  try {

    const customers =
      await User.find({

        createdBy:
          req.user.id,

        role:
          "CUSTOMER"

      })

      .select("-password")

      .populate(
        "createdBy",
        "name email"
      )

      .lean();

    const customersWithDueInfo =
      await Promise.all(

        customers.map(
          async (customer) => {

            const latestCredit =
              await Transaction.findOne({

                customer:
                  customer._id,

                shopkeeper:
                  req.user.id,

                type:
                  "CREDIT",

                isSettled:
                  false,

                dueDate: {
                  $ne: null
                }

              })

              .sort({
                dueDate: 1
              })

              .lean();

            let overdueDays = 0;

            if (

              latestCredit?.dueDate &&

              new Date(
                latestCredit.dueDate
              ) < new Date()

            ) {

              overdueDays =
                Math.floor(

                  (
                    new Date() -

                    new Date(
                      latestCredit.dueDate
                    )

                  ) /

                  (
                    1000 *
                    60 *
                    60 *
                    24
                  )

                );

            }

            return {

              ...customer,

              nextDueDate:
                latestCredit?.dueDate ||
                null,

              overdueDays

            };

          }
        )

      );

    res.status(200).json({

      customers:
        customersWithDueInfo

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};

export const getCustomerById = async (
  req,
  res
) => {

  try {

    const customer =
      await User.findOne({

        _id:
          req.params.id,

        createdBy:
          req.user.id,

        role:
          "CUSTOMER"

      }).select(
        "-password"
      );

    if (!customer) {

      return res.status(404).json({

        message:
          "Customer not found"

      });

    }

    res.status(200).json({
      customer
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

export const updateCustomer = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const {
      name,
      phone
    } = req.body;

    const customer =
      await User.findOne({

        _id: id,

        createdBy:
          req.user.id,

        role:
          "CUSTOMER"

      });

    if (!customer) {

      return res.status(404).json({

        message:
          "Customer not found"

      });

    }

    customer.name =
      name || customer.name;

    customer.phone =
      phone || customer.phone;

    await customer.save();

    const customerObj =
      customer.toObject();

    delete customerObj.password;

    res.status(200).json({

      message:
        "Customer updated successfully",

      customer:
        customerObj

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};

export const deleteCustomer = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const customer =
      await User.findOne({

        _id: id,

        createdBy:
          req.user.id,

        role:
          "CUSTOMER"

      });

    if (!customer) {

      return res.status(404).json({

        message:
          "Customer not found"

      });

    }

    await customer.deleteOne();

    res.status(200).json({

      message:
        "Customer deleted successfully"

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};



export const resendCredentials =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const customer =
        await User.findOne({

          _id: id,

          createdBy:
            req.user.id,

          role:
            "CUSTOMER"

        });

      if (!customer) {

        return res.status(404).json({

          message:
            "Customer not found"

        });

      }

      const temporaryPassword =

        Math.random()

          .toString(36)

          .slice(-8);

      customer.password =
        await bcrypt.hash(

          temporaryPassword,

          10

        );

      customer.mustChangePassword =
        true;

      await customer.save();

      await sendWelcomeEmail(

        customer.email,

        customer.name,

        temporaryPassword

      );

      res.status(200).json({

        message:
          "Credentials sent successfully",

        temporaryPassword

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


export const sendStatement =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const customer =
        await User.findOne({

          _id: id,

          createdBy:
            req.user.id,

          role:
            "CUSTOMER"

        });
        console.log("1. Customer found", customer);

      if (!customer) {

        return res.status(404).json({

          message:
            "Customer not found"

        });

      }

      const transactions =
        await Transaction.find({

          customer: id,

          shopkeeper:
            req.user.id

        })

        .sort({
          createdAt: -1
        });
        console.log("2. Transactions found", transactions);

      const pdfPath =
        await generateStatementPDF(

          customer,

          transactions

        );
        console.log("3. PDF generated", pdfPath);

      await sendStatementEmail(

        customer.email,

        customer.name,

        pdfPath

      );
      console.log("4. Statement email sent");

      fs.unlinkSync(
        pdfPath
      );

      console.log("5. PDF file deleted");

      res.status(200).json({

        message:
          "Statement sent successfully"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


  export const settleCustomer =
  async (req, res) => {

    try {

      const { customerId } =
        req.params;
        console.log("Settling customer with ID:", customerId);

      const customer =
        await User.findOne({

          _id: customerId,

          createdBy:
            req.user.id

        });
        console.log("1. Customer found", customer);

      if (!customer) {

        return res.status(404).json({

          message:
            "Customer not found"

        });

      }

      await Transaction.updateMany(

        {

          customer:
            customerId,

          shopkeeper:
            req.user.id,

          type:
            "CREDIT",

          isSettled:
            false

        },

        {

          $set: {

            isSettled:
              true

          }

        }

      );
       console.log("2. Transactions updated to settled");
      customer.currentBalance = 0;

      await customer.save();

      res.status(200).json({

        message:
          "Customer account settled successfully"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };

export const sendContactMessage =
  async (req, res) => {

    try {

      const {
        name,
        email,
        message
      } = req.body;

      await sendContactEmail(

        name,
        email,
        message

      );

      res.status(200).json({

        message:
          "Message sent successfully"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };