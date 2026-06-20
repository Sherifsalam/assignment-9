import { UserModel } from "../../DB/models/user.Model.js";
import { signupService, loginService ,updateUserService } from "./users.services.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;
    const result = await signupService({ name, email, password, phone, age });
    res
      .status(201)
      .json({ message: "User registered successfully", data: result });
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService({ email, password });
    res.status(200).json({ message: "Login successful", data: result });
  } catch (error) {
    if (error.message === "Invalid email or password") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const updates = req.body;
    const result = await updateUserService(userId, updates);
    res.status(200).json(result);
  } catch (error) {
    if (
      error.message === "Email already exists" ||
      error.message === "Password cannot be updated here"
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const deleteUser =  async (req, res) => {
  try {
    const userId = req.userId;
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const GetAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ message: "Users retrieved successfully", data: users });
  }
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};