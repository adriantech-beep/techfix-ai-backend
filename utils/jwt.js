import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = "1d"; // 1 day, adjust as needed

// Function to generate a token
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id, // store user id
      email: user.email, // optionally store email
      role: user.role, // useful for role-based access
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};
