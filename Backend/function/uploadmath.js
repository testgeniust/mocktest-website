// mocktest-website/backend/functions/upload-maths.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * 📥 Endpoint: /uploadMaths
 * 📌 Admin uploads daily 50 maths questions (date, questions[])
 */
exports.uploadMaths = functions.https.onRequest(async (req, res) => {
  const { date, questions } = req.body;

  if (!date || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).send("❌ Provide date and questions array");
  }

  try {
    const docId = `maths_${date}`;
    const mathsRef = db.collection("daily_maths").doc(docId);

    await mathsRef.set({
      date,
      questions,
      createdAt: new Date()
    });

    res.status(200).send("✅ Daily Maths questions uploaded");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});