import { User } from "../models/UserModel.js";
import { Transaction } from "../models/TransactionModel.js";

/*
====================================
ADMIN DASHBOARD
====================================
*/

export const getAdminDashboard = async (req, res) => {

  try {

    const totalShopkeepers =
      await User.countDocuments({
        role: "SHOPKEEPER"
      });

    const totalCustomers =
      await User.countDocuments({
        role: "CUSTOMER"
      });

    const totalTransactions =
      await Transaction.countDocuments();

    const outstandingResult =
      await User.aggregate([

        {
          $match: {
            role: "CUSTOMER"
          }
        },

        {
          $group: {
            _id: null,
            totalOutstanding: {
              $sum: "$currentBalance"
            }
          }
        }

      ]);

    const outstanding =
      outstandingResult[0]?.totalOutstanding || 0;

    res.status(200).json({

      success: true,

      data: {

        totalShopkeepers,

        totalCustomers,

        totalTransactions,

        outstanding

      }

    });

  } catch (error) {

    console.error(
      "Admin Dashboard Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        process.env.NODE_ENV === "production"
          ? "Failed to load dashboard"
          : error.message

    });

  }

};

/*
====================================
GET ALL SHOPKEEPERS
====================================
*/

export const getShopkeepers = async (req, res) => {

  try {

    const shopkeepers =
      await User.find({

        role: "SHOPKEEPER"

      })

      .select("-password")

      .sort({
        createdAt: -1
      });

    res.status(200).json({

      success: true,

      count: shopkeepers.length,

      shopkeepers

    });

  } catch (error) {

    console.error(
      "Get Shopkeepers Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        process.env.NODE_ENV === "production"
          ? "Failed to fetch shopkeepers"
          : error.message

    });

  }

};

/*
====================================
GET ALL CUSTOMERS
====================================
*/

export const getCustomers = async (req, res) => {

  try {

    const customers =
      await User.find({

        role: "CUSTOMER"

      })

      .select("-password")

      .populate({

        path: "createdBy",

        select:
          "name email phone"

      })

      .sort({
        createdAt: -1
      });

    res.status(200).json({

      success: true,

      count: customers.length,

      customers

    });

  } catch (error) {

    console.error(
      "Get Customers Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        process.env.NODE_ENV === "production"
          ? "Failed to fetch customers"
          : error.message

    });

  }

};

/*
====================================
DELETE SHOPKEEPER
====================================
*/

export const deleteShopkeeper = async (req, res) => {

  try {

    const { id } = req.params;

    const shopkeeper =
      await User.findOne({

        _id: id,

        role: "SHOPKEEPER"

      });

    if (!shopkeeper) {

      return res.status(404).json({

        success: false,

        message:
          "Shopkeeper not found"

      });

    }

    await User.findByIdAndDelete(id);

    res.status(200).json({

      success: true,

      message:
        "Shopkeeper deleted successfully"

    });

  } catch (error) {

    console.error(
      "Delete Shopkeeper Error:",
      error.message
    );

    res.status(500).json({

      success: false,

      message:
        process.env.NODE_ENV === "production"
          ? "Failed to delete shopkeeper"
          : error.message

    });

  }

};