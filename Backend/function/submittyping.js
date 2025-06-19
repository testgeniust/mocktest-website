// mocktest-website/backend/functions/submit-typing.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /submitTyping
 * 🔐 Expected payload:
 * {
 *   userId: "abc123",
 *   typedText: "user typed something...",
 *   speed: 42,
 *   accuracy: 92
 * }
 */
exports.submitTyping = functions.https.onRequest(async (req, res) => {
  const { userId, typedText, speed, accuracy } = req.body;

  if (!userId || !typedText || speed == null || accuracy == null) {
    return res.status(400).send("❌ Missing data");
  }

  try {
    await db.collection("typing_results").add({
      userId,
      typedText,
      speed,
      accuracy,
      timestamp: new Date()
    });
    res.status(200).send("✅ Typing result submitted");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});