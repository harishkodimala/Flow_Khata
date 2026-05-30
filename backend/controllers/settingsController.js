import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";

/*
=========================
GET PROFILE
=========================
*/

export const getProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.status(200).json({
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
=========================
UPDATE PROFILE
=========================
*/

export const updateProfile =
  async (req, res) => {

    try {

      const {
        name,
        phone
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found"
        });

      }

      user.name =
        name || user.name;

      user.phone =
        phone || user.phone;

      await user.save();

      const userObj =
        user.toObject();

      delete userObj.password;

      res.status(200).json({

        message:
          "Profile updated successfully",

        user: userObj

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };

/*
=========================
CHANGE PASSWORD
=========================
*/

export const changePassword =
  async (req, res) => {

    try {

      const {

        currentPassword,

        newPassword

      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found"
        });

      }

      const isMatch =
        await bcrypt.compare(

          currentPassword,

          user.password

        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Current password is incorrect"
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.status(200).json({

        message:
          "Password updated successfully"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };