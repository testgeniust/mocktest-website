// mocktest-website/backend/functions/set-result-config.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /setResultConfig
 * 📌 Admin sets marking config per test paper (mock test)
 */
exports.setResultConfig = functions.https.onRequest(async (req, res) => {
  const { paperId, marksPerCorrect, marksPerWrong, totalMarks, timeLimit } = req.body;

  if (!paperId || marksPerCorrect === undefined || marksPerWrong === undefined || !totalMarks || !timeLimit) {
    return res.status(400).send("❌ Missing required fields");
  }

  try {
    await db.collection("result_config").doc(paperId).set({
      paperId,
      marksPerCorrect,
      marksPerWrong,
      totalMarks,
      timeLimit, // in minutes
      updatedAt: new Date()
    });

    res.status(200).send("✅ Result config set successfully");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});