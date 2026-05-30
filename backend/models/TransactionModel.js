import { Schema, model } from "mongoose";

const transactionSchema =
  new Schema(

    {

      customer: {

        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: [
          true,
          "Customer is required"
        ]

      },

      shopkeeper: {

        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: [
          true,
          "Shopkeeper is required"
        ]

      },

      type: {

        type: String,

        enum: [
          "CREDIT",
          "DEBIT"
        ],

        required: [
          true,
          "{VALUE} is invalid. Type must be either CREDIT or DEBIT"
        ]

      },

      amount: {

        type: Number,

        required: [
          true,
          "Amount is required"
        ]

      },

      note: {

        type: String,

        default: ""

      },

      /*
      ==========================
      NEW FIELDS
      ==========================
      */

      dueDate: {

        type: Date,

        default: null

      },

      isSettled: {

        type: Boolean,

        default: false

      }

    },

    {

      timestamps: true,

      versionKey: false,

      strict: "throw"

    }

  );

export const Transaction =
  model(
    "Transaction",
    transactionSchema
  );