import User from "../schemas/User.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "Email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: "Passwords do not match" });
    }

    const hashedPw = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPw,
      provider: "local",
      role: "staff",
    });
    await newUser.save();

    const jwtToken = generateToken(newUser);

    return res.status(201).json({
      token: jwtToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.provider !== "local") {
      return res.status(400).json({ message: "Please sign in with Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const jwtToken = generateToken(user);

    return res.json({
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
