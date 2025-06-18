// mocktest-website/backend/functions/upload-gk.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /uploadGK
 * 📌 Admin uploads daily GK questions (date, questions[])
 */
exports.uploadGK = functions.https.onRequest(async (req, res) => {
  const { date, questions } = req.body;

  if (!date || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).send("❌ Provide date and GK questions array");
  }

  try {
    const docId = `gk_${date}`;
    const gkRef = db.collection("daily_gk").doc(docId);

    await gkRef.set({
      date,
      questions,
      createdAt: new Date()
    });

    res.status(200).send("✅ Daily GK questions uploaded");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});