import pool from "../../config/db.js";

export const getProfile = async (req, res) => {
  const [[user]] = await pool.query(
    "SELECT id, name, email, phone, location, bio, profile_image, created_at FROM users WHERE id=?",
    [req.userId]
  );
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { name, phone, location, bio } = req.body;

  await pool.query(
    "UPDATE users SET name=?, phone=?, location=?, bio=? WHERE id=?",
    [name, phone, location, bio, req.userId]
  );

  res.json({ message: "Profile updated" });
};

export const updateProfilePicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  await pool.query(
    "UPDATE users SET profile_image=? WHERE id=?",
    [imagePath, req.userId]
  );

  res.json({
    message: "Profile picture updated",
    image: imagePath,
  });
};

export const deleteAccount = async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=?", [req.userId]);
  res.json({ message: "Account deleted" });
};
