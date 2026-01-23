import pool from "../../config/db.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";
import uuid from "../../utils/uuid.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

   
    const [exists] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exists.length) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordHash = await hashPassword(password);

    await pool.query(
      `
      INSERT INTO users (
        id,
        name,
        email,
        password_hash
      ) VALUES (?, ?, ?, ?)
      `,
      [uuid(), name, email, passwordHash]
    );

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [[user]] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user.id),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const [[user]] = await pool.query(
      "SELECT password_hash FROM users WHERE id = ?",
      [req.userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await comparePassword(
      currentPassword,
      user.password_hash
    );

    if (!isValid) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const newHash = await hashPassword(newPassword);

    await pool.query(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [newHash, req.userId]
    );

    res.json({ message: "Password updated" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Password update failed" });
  }
};
