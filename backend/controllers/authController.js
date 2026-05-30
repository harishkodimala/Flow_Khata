import {User} from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {

  try {

    const { name, email, phone, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const newUser=new User({
      name,
      email,
      phone,
      password,
      role
    });
    await newUser.validate();

    newUser.password = await bcrypt.hash(newUser.password, 10);

    const created = await newUser.save();

    const newUserObj = created.toObject();

    delete newUserObj.password;

    res.status(201).json({
      message: "User registered successfully",
      user: newUserObj
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

//login controller 

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        phone: user.phone,

      },
      process.env.jwt_secret,
      {
        expiresIn: "7d"
      }
    );
     const userObj = user.toObject();
  console.log("UserObj from authenitcate :", userObj)
   delete userObj.password;
   res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 5 * 24 * 60 * 60 * 1000
});

    res.status(200).json({
      message: "Login successful",
      user: userObj
    });
    

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
//logout controller
export const logoutUser = async (req, res) => {

    try {

        res.clearCookie("token", {

            httpOnly: true,

            secure: false,

            sameSite: "lax"

        });

        res.status(200).json({

            message: "Logout successful"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};