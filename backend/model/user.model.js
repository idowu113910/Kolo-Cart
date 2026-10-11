import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
fullName: {
type: String,
required: [true, "User Full Name is required"],
trim: true,
minLength: 2,
maxLength: 50,
},

email: {
  type: String,
  trim: true,
  lowercase: true,
  sparse: true,
  unique: true,
},

number: {
  type: String,
  trim: true,
  default: null,
  maxLength: 15,
},

phoneVerified: {
  type: Boolean,
  default: false,
},

password: {
  type: String,
  default: null,
  select: false,
},

authProvider: {
  type: String,
  enum: ["Local", "Google", "Apple"],
  default: "Local",
  required: true,
},

providerId: {
  type: String,
  default: null,
}

},
{ timestamps: true },
);

userSchema.index(
{ authProvider: 1, providerId: 1, number: 1 },
{
unique: true,
partialFilterExpression: {
providerId: { $type: "string" },
},
},
);

const User = mongoose.model("User", userSchema);

export default User;
