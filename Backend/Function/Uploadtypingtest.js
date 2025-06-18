// mocktest-website/backend/functions/upload-typing-text.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /uploadTypingText
 * 📌 Admin uploads daily English typing test text
 */
exports.uploadTypingText = functions.https.onRequest(async (req, res) => {
  const { date, text } = req.body;

  if (!date || !text) {
    return res.status(400).send("❌ Provide both date and typing text");
  }

  try {
    const docId = `typing_${date}`;
    await db.collection("daily_typing").doc(docId).set({
      date,
      text,
      createdAt: new Date()
    });

    res.status(200).send("✅ Typing text uploaded successfully");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});