import {User} from "../models/UserModel.js";

import bcrypt from "bcryptjs";

export const createCustomer = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone
    } = req.body;

    // Check existing customer
    const existingCustomer = await User.findOne({
      email
    }).populate("createdBy", "name email");

    if (existingCustomer) {

      return res.status(400).json({
        message: "Customer already exists"
      });

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create customer
    const customer = await User.create({

      name,
      email,
      password: hashedPassword,
      phone,

      role: "CUSTOMER",

      createdBy: req.user.id

    });

    const customerObj = customer.toObject();

    delete customerObj.password;

    res.status(201).json({

      message: "Customer created successfully",

      customer: customerObj

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const getCustomers = async (req, res) => {

  try {

    const customers = await User.find({

      createdBy: req.user.id,

      role: "CUSTOMER"

    }).select("-password").populate("createdBy", "name email");

    res.status(200).json({
      customers
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};