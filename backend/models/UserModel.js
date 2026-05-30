import {Schema,model} from "mongoose";

const userSchema = new Schema({

  name: {
    type: String,
    required: [true, "Name is required"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },

  phone: {
    type: String,
    required: [true, "Phone is required"]
  },

  password: {
    type: String,
    required: [true, "Password is required"]
  },

  role: {
    type: String,
    enum: ["ADMIN", "SHOPKEEPER", "CUSTOMER"],
    required: [true, "{Value} is invalid. Role must be either ADMIN, SHOPKEEPER, or CUSTOMER"] 
  },
  currentBalance: {
  type: Number,
  default: 0
},
  createdBy: {
   type: Schema.Types.ObjectId,
   ref: "User"
}

}, {
  timestamps: true,
  strict: "throw",
  versionKey: false
});

export const User = model("User", userSchema);