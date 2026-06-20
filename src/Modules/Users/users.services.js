import { hashPassword, comparePassword } from "../../security/hashing.js";
import { encryptData } from "../../security/encryption.js";
import { UserModel as User } from "../../DB/models/user.Model.js";
import { generateToken } from "../../security/jwt.js";


export const signupService = async ({ name, email, password, phone, age }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(password);
  const encryptedPhone = encryptData(phone, process.env.PHONE_SECRET);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phone: encryptedPhone,
    age,
  });
  await newUser.save();

  return { message: "User registered successfully", data: newUser };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = generateToken({ userId: user._id });

  return { message: "Login successful", token };
};


export const updateUserService = async (userId, updates) => {

  if (updates.password) throw new Error("Password cannot be updated here");

  if (updates.email) {
    const existingUser = await User.findOne({ email: updates.email });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      throw new Error("Email already exists");
    }
  }
  
  if (updates.phone) {
    updates.phone = encryptData(updates.phone, process.env.PHONE_SECRET);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
  if (!updatedUser) throw new Error("User not found");

  return { message: "User updated successfully", data: updatedUser };
};



export const deleteService =  async (userId) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) throw new Error("User not found");
  return { message: "User deleted successfully" };
};


export const GetUsers= async () => {
  const users = await User.find();
  return users;
}

